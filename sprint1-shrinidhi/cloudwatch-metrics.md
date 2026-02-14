CloudWatch Monitoring – Sprint 1


Objective:
Retrieve monitoring metrics (CPU, Network, Disk) for EC2 instances using CloudWatch APIs.

Step 1 – CPU Utilization Retrieval

$END=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$START=(Get-Date).AddHours(-1).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-0f0e251f85548b8c8 --start-time $START --end-time $END --period 300 --statistics Average --region us-east-2 --output table

Result:
Successfully retrieved CPU utilization values for both EC2 instances.

Step 2 – Network and Disk Metrics Retrieval

Used GetMetricData API with JSON query file to retrieve:
- NetworkIn
- NetworkOut
- DiskReadBytes
- DiskWriteBytes


CPU metrics are available by default under AWS/EC2 namespace.
Disk metrics may show empty values if there is no disk activity.
Memory metrics require CloudWatch Agent installation and are not available by default.
