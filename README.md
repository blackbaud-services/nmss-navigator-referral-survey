# nmss-navigator-referral-survey

# Survey Setup
- all req fields must have N/A as possible answer (we auto select this on form init in case sections get skipped over)

## Troubleshooting
Make sure ip address is added to ip server ranges. This should not change, but if our AWS instance has confiug updates there is a chance the IP cpould change. To check, go to AWS console and check the A name cloudfront distrubution url for blackbaud-sites. Then check the IP address:
https://www.whatsmydns.net/#A/micro-40369183.us-east-1.elb.amazonaws.com


