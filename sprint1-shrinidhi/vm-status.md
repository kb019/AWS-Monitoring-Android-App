VM Status Retrieval – Sprint 1


Objective:
The goal of this task was to retrieve the VM (EC2) status using AWS Open APIs.

What I Did:
I used the AWS CLI to call the DescribeInstances API and retrieve details of running EC2 instances.

Command Used:

aws ec2 describe-instances --region us-east-2 --filters "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].{ID:InstanceId,Name:Tags[?Key=='Name']|[0].Value,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress,State:State.Name,Type:InstanceType}" --output table

Result:
The command successfully returned:
- Instance ID
- Instance Name
- Private IP
- Public IP
- Instance State (running)
- Instance Type

