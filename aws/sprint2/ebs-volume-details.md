EBS Volume Details

Objective:
Retrieve EBS volume details for EC2 instances using AWS CLI.
EBS (Elastic Block Store) is the storage attached to EC2 instances. This  helps monitor infrastructure storage configuration as part of the cloud monitoring system.

Command Used:

aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=i-0bb4e6b6787d754c4 --region us-east-2 --query "Volumes[].{VolumeId:VolumeId,Size:Size,Type:VolumeType,State:State,AvailabilityZone:AvailabilityZone}" --output table

Result:
Successfully retrieved EBS volume information.

Instance i-0bb4e6b6787d754c4:
- VolumeId: vol-04e8f0964c7aff8d4
- Size: 8 GB
- Type: gp3
- State: in-use
- AvailabilityZone: us-east-2c

Instance i-0f0e251f85548b8c8:
- VolumeId: vol-0fba542b2a0014954
- Size: 8 GB
- Type: gp3
- State: in-use
- AvailabilityZone: us-east-2c




