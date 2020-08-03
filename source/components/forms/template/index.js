import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import SurveyQuestion from '../../ui/SurveyQuestion'
import { findQuestion, findQuestionByText, getPatientInfoSchema } from '../../../lib/survey'
import { setModel } from '../../../store/formState'
import { submitSurvey } from '../../../store/survey'

const FormTemplate = ({
  auth,
  form,
  formState: { additionalInfo, answers },
  isPatient,
  location: { pathname },
  nextUrl,
  prevUrl = '/',
  push,
  setModel,
  submitSurvey,
  submit,
  survey,
  questions
}) => {
  const [status, setStatus] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [isDisabled, setDisabled] = useState([])

  const handleSuccess = data =>
    Promise.resolve()
      .then(() => setModel(data, pathname))
      .then(() => setStatus('success'))

  const handleSubmit = () =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => submitSurvey(answers, survey, auth))
      .then(() => setLoading(false))
      .then(() => push(nextUrl))
      .catch(() => {
        setLoading(false)
        setStatus('fail')
      })

  useEffect(() => {
    if (status === 'fail') {
      setErrors(['Unknown error occured'])
    }
    if (status === 'success') {
      switch (pathname) {
        case '/additional-info':
        case 'additional-info':
          additionalInfo &&
            push(
              additionalInfo.showPatientInfo
                ? '/patient-info'
                : additionalInfo.showAdditionalContact
                  ? '/additional-contact'
                  : '/provider-info'
            )
          break
        case '/preferences':
        case 'preferences':
          handleSubmit()
          break
        default:
          push(nextUrl)
      }
    }
  }, [status])

  useEffect(() => {
    if (isPatient) {
      const providePatientInfo = findQuestionByText('/additional-info', 'providePatientInfo').id
      const patientInfoSchema = getPatientInfoSchema()
      const patientInfoIds = patientInfoSchema.map(i => i.id).concat(providePatientInfo)

      const updatePatientFields = patientInfoSchema.reduce((obj, i) => {
        const answerId = findQuestionByText('/referral-info', i.question).id
        obj[`${i.id}`] = answers[answerId]
        return obj
      }, {})

      setDisabled(patientInfoIds)

      form.updateValues({
        [`${providePatientInfo}`]: true,
        ...updatePatientFields
      })
    }
  }, [isPatient])

  return (
    <Form
      form={form}
      onSubmit={handleSuccess}
      isLoading={isLoading}
      action={{ label: 'Previous', to: prevUrl }}
      submit={submit}
      serverErrors={errors}
    >
      <Grid spacing={{ x: 0.5, y: 0.25 }}>
        {questions.map(({ questionId }) => {
          const column = get(findQuestion(pathname, questionId), 'col')
          return (
            <GridColumn key={questionId} xs={12} sm={column ? 6 : 12}>
              <SurveyQuestion
                disabled={isDisabled.indexOf(Number(questionId)) !== -1}
                {...form.fields[questionId]}
              />
            </GridColumn>
          )
        })}
      </Grid>
    </Form>
  )
}

const mapStateToProps = ({ auth, formState, survey }) => {
  const referralModel = get(formState, 'model./referral-info')
  const keyId = findQuestionByText('/referral-info', 'personIs').id
  const isPatient = referralModel && referralModel[`${keyId}`] && referralModel[`${keyId}`].indexOf('Patient') !== -1

  return {
    auth,
    formState,
    isPatient,
    survey
  }
}

export default compose(
  connect(mapStateToProps, { setModel, submitSurvey }),
  withForm(form)
)(FormTemplate)
