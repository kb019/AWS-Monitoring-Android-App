import express from "express";
import cors from "cors";
import AWS from "aws-sdk";
import http from "http";

const app = express();
app.use(cors());
app.use(express.json());

AWS.config.update({ region: "us-east-2" });

const ec2 = new AWS.EC2();
const cloudwatch = new AWS.CloudWatch();

app.get("/monitoring", async (req, res) => {
  try {
    console.log("🔹 Monitoring endpoint hit");

    const result = [];


    const ec2Data = await ec2.describeInstances({
      Filters: [{ Name: "instance-state-name", Values: ["running"] }]
    }).promise();

    console.log("🔹 EC2 response received");

    if (!ec2Data.Reservations.length) {
      console.log("⚠️ No running instances found");
      return res.json({ instances: [] });
    }

    for (const reservation of ec2Data.Reservations) {
      for (const instance of reservation.Instances) {

        const instanceId = instance.InstanceId;
        const state = instance.State.Name;
        const type = instance.InstanceType;

        console.log(`🔸 Fetching metrics for ${instanceId}`);

        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);


        const [
          cpuData,
          netInData,
          netOutData,
          diskReadData,
          diskWriteData
        ] = await Promise.all([
          cloudwatch.getMetricStatistics({
            Namespace: "AWS/EC2",
            MetricName: "CPUUtilization",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 300,
            Statistics: ["Average"]
          }).promise(),

          cloudwatch.getMetricStatistics({
            Namespace: "AWS/EC2",
            MetricName: "NetworkIn",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 300,
            Statistics: ["Sum"]
          }).promise(),

          cloudwatch.getMetricStatistics({
            Namespace: "AWS/EC2",
            MetricName: "NetworkOut",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 300,
            Statistics: ["Sum"]
          }).promise(),

          cloudwatch.getMetricStatistics({
            Namespace: "AWS/EC2",
            MetricName: "DiskReadOps",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 300,
            Statistics: ["Sum"]
          }).promise(),

          cloudwatch.getMetricStatistics({
            Namespace: "AWS/EC2",
            MetricName: "DiskWriteOps",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 300,
            Statistics: ["Sum"]
          }).promise()
        ]);

        const cpuValue = cpuData.Datapoints.length
          ? cpuData.Datapoints.at(-1).Average
          : 0;

        const networkIn = netInData.Datapoints.length
          ? netInData.Datapoints.at(-1).Sum
          : 0;

        const networkOut = netOutData.Datapoints.length
          ? netOutData.Datapoints.at(-1).Sum
          : 0;

        const diskRead = diskReadData.Datapoints.length
          ? diskReadData.Datapoints.at(-1).Sum
          : 0;

        const diskWrite = diskWriteData.Datapoints.length
          ? diskWriteData.Datapoints.at(-1).Sum
          : 0;

        result.push({
          instanceId,
          state,
          type,
          metrics: {
            cpuUtilization: Number(cpuValue.toFixed(2)),
            networkInBytes: networkIn,
            networkOutBytes: networkOut,
            diskReadOps: diskRead,
            diskWriteOps: diskWrite
          }
        });

        console.log(`✅ Metrics fetched for ${instanceId}`);
      }
    }

    console.log("✅ Sending response");
    res.json({
      timestamp: new Date().toISOString(),
      region: AWS.config.region,
      instances: result
    });

  } catch (error) {
    console.error("❌ Error occurred:", error);
    res.status(500).json({
      status: "Error fetching monitoring data",
      error: error.message
    });
  }
});

const PORT = 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
