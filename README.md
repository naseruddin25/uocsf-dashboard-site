# UOCSF Dashboard Site

This is the static website for the United Online Child Safety Foundation (UOCSF), providing a dashboard for child safety metrics and information.

## What the Site Is

A responsive dashboard website showcasing UOCSF's mission to protect children from online threats, including exploitation, grooming, AI-enabled abuse, and digital dangers through education, technology, and advocacy.

## Updating KPIs

KPIs and dynamic data are managed in `scripts.js`. To update:

1. Open `scripts.js`
2. Locate the data arrays/objects for KPIs (e.g., threat statistics, program metrics)
3. Update the values as needed
4. Commit and push changes to deploy

## Deployment with GitHub Pages

This site is hosted on GitHub Pages.

1. Push changes to the `main` branch
2. GitHub Pages automatically deploys from the root folder
3. Site URL: `https://<USERNAME>.github.io/uocsf-dashboard-site/`

## Connecting a GoDaddy Domain

1. In your GoDaddy account, go to Domain Settings
2. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: `<USERNAME>.github.io`
3. In GitHub repo Settings > Pages, set Custom Domain to `www.uocsf.org`
4. GitHub will verify and enable the custom domain

**Note:** Ensure the CNAME file in the repo root contains `www.uocsf.org`
