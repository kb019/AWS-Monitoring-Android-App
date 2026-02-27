
$REGION="us-east-2"
$IDS=@("i-0f0e251f85548b8c8","i-0bb4e6b6787d754c4")  # EC2 instances
$END=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$START=(Get-Date).AddHours(-1).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

foreach($id in $IDS){
  Write-Output "== $id =="
  aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=$id `
    --start-time $START --end-time $END --period 300 --statistics Average --region $REGION --output table

  aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name NetworkIn --dimensions Name=InstanceId,Value=$id `
    --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output table

  aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name NetworkOut --dimensions Name=InstanceId,Value=$id `
    --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output table

  aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name DiskReadBytes --dimensions Name=InstanceId,Value=$id `
    --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output table

  aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name DiskWriteBytes --dimensions Name=InstanceId,Value=$id `
    --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output table

  Write-Output ""
}
