const express = require("express");
const AWS = require("aws-sdk");

const app = express();

AWS.config.update({ region: "us-east-2" });

const ec2 = new AWS.EC2();
const cloudwatch = new AWS.CloudWatch();

app.get("/monitoring", async (req,res) => 
{
  try
  {
    const result = [];
    
    const ec2Data = await ec2.describeInstances(
    {
      Filters: [{ Name: "instance-state-name", Values: ["running"] }]
    }).promise();

    for (let i = 0; i < ec2Data.Reservations.length; i++)
    {
      const reservation = ec2Data.Reservations[i];

      for (let j = 0; j < reservation.Instances.length; j++)
      {
        const instance = reservation.Instances[j];

        const instanceId = instance.InstanceId;
        const state = instance.State.Name;
        const type = instance.InstanceType;

        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);

        // CPU
        const cpuData = await cloudwatch.getMetricStatistics(
        {
          Namespace: "AWS/EC2",
          MetricName: "CPUUtilization",
          Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          StartTime: startTime,
          EndTime: endTime,
          Period: 300,
          Statistics: ["Average"]
        }).promise();

        let cpuValue = 0;
        if (cpuData.Datapoints.length > 0)
        {
          cpuValue = cpuData.Datapoints[cpuData.Datapoints.length - 1].Average;
        }

        // Network In
        const netInData = await cloudwatch.getMetricStatistics(
        {
          Namespace: "AWS/EC2",
          MetricName: "NetworkIn",
          Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          StartTime: startTime,
          EndTime: endTime,
          Period: 300,
          Statistics: ["Sum"]
        }).promise();

        let networkIn = 0;
        if (netInData.Datapoints.length > 0)
        {
          networkIn = netInData.Datapoints[netInData.Datapoints.length - 1].Sum;
        }

        // Network Out
        const netOutData = await cloudwatch.getMetricStatistics(
        {
          Namespace: "AWS/EC2",
          MetricName: "NetworkOut",
          Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          StartTime: startTime,
          EndTime: endTime,
          Period: 300,
          Statistics: ["Sum"]
        }).promise();

        let networkOut = 0;
        if (netOutData.Datapoints.length > 0)
        {
          networkOut = netOutData.Datapoints[netOutData.Datapoints.length - 1].Sum;
        }

        // Disk Read
        const diskReadData = await cloudwatch.getMetricStatistics(
        {
          Namespace: "AWS/EC2",
          MetricName: "DiskReadOps",
          Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          StartTime: startTime,
          EndTime: endTime,
          Period: 300,
          Statistics: ["Sum"]
        }).promise();

        let diskRead = 0;
        if (diskReadData.Datapoints.length > 0)
        {
          diskRead = diskReadData.Datapoints[diskReadData.Datapoints.length - 1].Sum;
        }

        // Disk Write
        const diskWriteData = await cloudwatch.getMetricStatistics(
        {
          Namespace: "AWS/EC2",
          MetricName: "DiskWriteOps",
          Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          StartTime: startTime,
          EndTime: endTime,
          Period: 300,
          Statistics: ["Sum"]
        }).promise();

        let diskWrite = 0;
        if (diskWriteData.Datapoints.length > 0)
        {
          diskWrite = diskWriteData.Datapoints[diskWriteData.Datapoints.length - 1].Sum;
        }

        result.push(
        {
          id: instanceId,
          state: state,
          type: type,
          cpuPercent: Number(cpuValue.toFixed(2)),
          networkInBytes: networkIn,
          networkOutBytes: networkOut,
          diskReadOps: diskRead,
          diskWriteOps: diskWrite
        });
      }
    }

    res.json({ instances: result });
  }
  catch(error)
  {
    console.log(error);
    res.json({ status: "Error fetching monitoring data" });
  }
});

app.listen(5000, () =>
{
  console.log("Server started successfully");
});