# NMSS Navigator Survey [![Build Status](https://travis-ci.com/blackbaud-services/nmss-navigator-referral-survey.svg?token=ndsoyNuX4LzdzVnawZqB&branch=master)](https://travis-ci.com/blackbaud-services/nmss-navigator-referral-survey)

SPA using Luminate Online Survey API, deployed to AWS S3 and embedded in iframe on a PageBuilderPage:
- [Iframe](https://secure.nationalmssociety.org/site/SPageServer?pagename=navigator_referral_survey)
- [Hosted App](https://nmss-referral-survey.blackbaud-sites.com)

This is a SPA survey, which first pulls the survey using the Luminate API. This allows NMSS staff to configure the survey in Luminate, we will then process the response to serve up a multi-screen SPA.

## Development
All updates and devlopment should be done in a branch, tested locally and then submitted to a Pull Request for review.

### System Requirements

- Node (version 10): local JavaScript runtime to run the application
- Yarn: reliable dependency management for Node applications

[Guide to installing Node and Yarn on Mac](https://medium.com/@itsromiljain/the-best-way-to-install-node-js-npm-and-yarn-on-mac-osx-4d8a8544987a)

### Running Site Locally

#### 1. Clone the repository to your development environment

```
git clone git@github.com:blackbaud-services/nmss-navigator-referral-survey.git my-project-name
cd nmss-navigator-referral-survey
```

#### 2. Install dependencies

```
yarn install
```

This may take a few minutes.


#### 3. Run the application

```
yarn start
```

The development server will now be serving your app, and can be viewed at [http://localhost:8080](http://localhost:8080).

Note that the development server will live re-load changes to your browser as you make changes to the codebase.

### Getting started

For more information about how we build sites, read [our documentation here](https://blackbaud-professional-services.github.io/services-engineering).


## Survey Setup

- Content and order of the questions and answers are set in Survey Config in Luminate. You can set fields as required or not on any page. Each page is separated by a hidden text question with the values Page-1, Page 2 etc. This is how we are controlling which questions are in which screen.

- Since some questions can be skipped depending on how the respondent answers, any required field with answers attached (ie dropdowns, mutli-checks) will need to have an option for N/A. Basically when submitting the form, any required field not filled in gets the value of N/A

- You can add new questions or content (use caption questions to add text etc). However, we did not test all question types, only the ones currently used by NMSS (short text, mult choice, single dropdown, caption). This means additional work may need to be done for accomodating new question types.

- A lot of the logic does depend on question ids (ie copying address or phone number, setting patient info from referral screen). New questions should not break the form, but won't be incorporated into any of the logic without a code change. Survey schema is manually added to the *lib -> survey* file. This is used for cross referecning and allows the app to discern field displays based on previous selections. If this is not kept up to do, then things like columns display, show/hide fields based on previous answers, and copying phone/address fields will not work.

- The order of the pages does have some significance, so changing the order of pages would require a code change. The additional info section and the last page before submission (preferences) definitely do need to stay in the same place since they have special logic and functions that occur on those steps.

- survey schema is manually added to the *lib -> survey* file. This is used for cross referencing and allows the app to discern field displays based on previous selections. If this is not kept up to do, then things like columns display, show/hide fields based on previous answers, and copying phone/address fields will not work.

# TO DO
- add captcha

