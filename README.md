# nmss-navigator-referral-survey

# Survey Setup
- all req fields must have N/A as possible answer (we auto select this on form init in case sections get skipped over)

- survey schema is manually added to the lib -> survey file. This is used for corss referecning and allows the app to discern field displays based on previous selections. If this is not kept up to do, then things like columns display, show/hide fields based on previous answers, and copying phone/address fields will not work.

## Troubleshooting
Make sure ip address is added to ip server ranges. This should not change, but if our AWS instance has confiug updates there is a chance the IP cpould change. To check, go to AWS console and check the A name cloudfront distrubution url for blackbaud-sites. Then check the IP address:
https://www.whatsmydns.net/#A/micro-40369183.us-east-1.elb.amazonaws.com


