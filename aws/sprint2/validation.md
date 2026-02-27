Validation – Sprint 2


Region: us-east-2

Instances Checked:
- i-0f0e251f85548b8c8 (mysql-db-server)
- i-0bb4e6b6787d754c4 (apache-web-server)

What I Verified:

1. EC2 Status
Used DescribeInstances API to confirm both instances are running and returning correct metadata (Name, Public IP, AZ).

2. CPU Metrics
CPUUtilization is returning valid datapoints for both instances using CloudWatch GetMetricStatistics.
Latest CPU values:
- mysql-db-server: ~0.15%
- apache-web-server: ~0.27%

3. Network Metrics
NetworkIn and NetworkOut are returning valid datapoints for both instances.

4. Disk Metrics
DiskReadBytes and DiskWriteBytes returned no datapoints in the last 1 hour window.
In JSON output these appear as null.
This may be due to low disk activity during that time window.

5. Memory Metrics
CWAgent namespace returned no results.
CloudWatch Agent is not installed, so memory metrics are currently unavailable.

Output File:
aws/sprint2/instances_metrics.json

Conclusion:
Monitoring is working correctly for EC2 status, CPU, and network.
Disk metrics need further observation.
Memory monitoring will require CloudWatch Agent installation in a future sprint.