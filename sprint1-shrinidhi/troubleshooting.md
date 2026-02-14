AWS CLI Troubleshooting – Sprint 1


Issue 1 – Invalid JSON Errors
While using inline JSON for GetMetricData, PowerShell produced parsing errors.

Solution
Instead of writing JSON directly inside the CLI command, I created a separate JSON file (queries.json) and used:

--metric-data-queries file://queries.json

This resolved the formatting issue.

Issue 2 – Empty Metric Values
Initially, CloudWatch returned empty datapoints.

Root Cause
The date range used was before the EC2 instance launch time.

Solution
Checked the instance launch time using DescribeInstances and corrected the start and end time window.

Issue 3 – Memory Showing None
Memory metrics returned null values.

Explanation
Memory metrics are not collected by default. CloudWatch Agent must be installed on EC2 to enable memory monitoring.
