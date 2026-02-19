CPUUtilization Retrieval via CloudWatch API (Sprint 2)

Objective
Retrieve CPUUtilization via CloudWatch API.

Command Used
aws cloudwatch get-metric-statistics --region us-east-2 --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-0bb4e6b6787d754c4 --statistics Average --period 300 --start-time 2026-02-18T00:00:00Z --end-time 2026-02-20T23:59:00Z --query "Datapoints[-1].{CPU_Percent:Average}" --output table

Result
Successfully retrieved CPUUtilization.
