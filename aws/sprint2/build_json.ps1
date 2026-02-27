


$REGION="us-east-2"
$IDS=@("i-0f0e251f85548b8c8","i-0bb4e6b6787d754c4")

$END=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$START=(Get-Date).AddHours(-1).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$result = @()

foreach($id in $IDS){

  $inst = aws ec2 describe-instances --instance-ids $id --region $REGION --output json | ConvertFrom-Json
  $name = ($inst.Reservations[0].Instances[0].Tags | Where-Object { $_.Key -eq "Name" } | Select-Object -First 1).Value
  $publicIp = $inst.Reservations[0].Instances[0].PublicIpAddress

  $cpu = aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization `
    --dimensions Name=InstanceId,Value=$id --start-time $START --end-time $END --period 300 --statistics Average --region $REGION --output json | ConvertFrom-Json

  $netin = aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name NetworkIn `
    --dimensions Name=InstanceId,Value=$id --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output json | ConvertFrom-Json

  $netout = aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name NetworkOut `
    --dimensions Name=InstanceId,Value=$id --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output json | ConvertFrom-Json

  $dread = aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name DiskReadBytes `
    --dimensions Name=InstanceId,Value=$id --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output json | ConvertFrom-Json

  $dwrite = aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name DiskWriteBytes `
    --dimensions Name=InstanceId,Value=$id --start-time $START --end-time $END --period 300 --statistics Sum --region $REGION --output json | ConvertFrom-Json

  $r = [PSCustomObject]@{
    instanceId = $id
    name = $name
    publicIp = $publicIp
    cpuLatest = if($cpu.Datapoints.Count -gt 0){ ($cpu.Datapoints | Sort-Object Timestamp)[-1].Average } else { $null }
    netinLatest = if($netin.Datapoints.Count -gt 0){ ($netin.Datapoints | Sort-Object Timestamp)[-1].Sum } else { $null }
    netoutLatest = if($netout.Datapoints.Count -gt 0){ ($netout.Datapoints | Sort-Object Timestamp)[-1].Sum } else { $null }
    diskReadLatest = if($dread.Datapoints.Count -gt 0){ ($dread.Datapoints | Sort-Object Timestamp)[-1].Sum } else { $null }
    diskWriteLatest = if($dwrite.Datapoints.Count -gt 0){ ($dwrite.Datapoints | Sort-Object Timestamp)[-1].Sum } else { $null }
  }

  $result += $r
}

$result | ConvertTo-Json -Depth 5 | Out-File aws/sprint2/instances_metrics.json -Encoding utf8
Write-Output "Saved aws/sprint2/instances_metrics.json"