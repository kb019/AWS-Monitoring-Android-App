# EC2 List Retrieval (Sprint 1)

## Objective
Retrieve list of EC2 instances using AWS Open API.

## Command Used
aws ec2 describe-instances --region us-east-2 --filters "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].{ID:InstanceId,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress,State:State.Name,Type:InstanceType}" --output table

## Result
Successfully retrieved EC2 instance list.
