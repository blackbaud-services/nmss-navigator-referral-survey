import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from './components/routes/Root'
import Home from './components/routes/Home'
import ReferralInfo from './components/routes/ReferralInfo'
import AdditionalInfo from './components/routes/AdditionalInfo'
import PatientInfo from './components/routes/PatientInfo'
import AdditionalContact from './components/routes/AdditionalContact'
import ProviderInfo from './components/routes/ProviderInfo'
import Preferences from './components/routes/Preferences'
import ThankYou from './components/routes/ThankYou'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Home} />
    <Route path='/referral-info' component={ReferralInfo} />
    <Route path='/additional-info' component={AdditionalInfo} />
    <Route path='/patient-info' component={PatientInfo} />
    <Route path='/additional-contact' component={AdditionalContact} />
    <Route path='/provider-info' component={ProviderInfo} />
    <Route path='/preferences' component={Preferences} />
    <Route path='/thank-you' component={ThankYou} />
  </Route>
)
