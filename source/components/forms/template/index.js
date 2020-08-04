import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { find, get } from 'lodash'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import UseAddress from '../../ui/UseAddress'
import UsePhone from '../../ui/UsePhone'
import SurveyQuestion from '../../ui/SurveyQuestion'
import { findQuestion, findQuestionByText, getPatientInfoSchema } from '../../../lib/survey'
import { setModel } from '../../../store/formState'

const FormTemplate = ({
  form,
  formState: { additionalInfo, answers },
  isPatient,
  location: { pathname },
  nextUrl,
  prevUrl = '/',
  push,
  setModel,
  questions
}) => {
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState([])
  const [isDisabled, setDisabled] = useState([])

  const handleSuccess = data =>
    Promise.resolve()
      .then(() => setModel(data, pathname))
      .then(() => setStatus('success'))

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

  useEffect(() => {
    const exists = find(questions, i => i.useReferral && i)

    if ((pathname === '/patient-info' || pathname === '/additional-contact') && !isPatient && !exists) {
      questions.splice(1, 0, { useReferral: true })
    }
  }, [])

  return (
    <Form
      form={form}
      onSubmit={handleSuccess}
      action={{ label: 'Previous', to: prevUrl }}
      serverErrors={errors}
    >
      <Grid spacing={{ x: 0.5, y: 0.25 }}>
        {questions.map(({ questionId, useReferral }, index) => {
          const column = get(findQuestion(pathname, questionId), 'col')
          if (useReferral) {
            return (
              <GridColumn key={index} xs={12}>
                <UseAddress form={form} pathname={pathname} />
                <UsePhone form={form} pathname={pathname} />
              </GridColumn>
            )
          } else {
            return (
              <GridColumn key={questionId} xs={12} sm={column ? 6 : 12}>
                <SurveyQuestion
                  disabled={isDisabled.indexOf(Number(questionId)) !== -1}
                  {...form.fields[questionId]}
                />
              </GridColumn>
            )
          }
        })}
      </Grid>
    </Form>
  )
}

const mapStateToProps = ({ answers, formState, survey }) => {
  const referralModel = get(formState, 'model./referral-info')
  const keyId = findQuestionByText('/referral-info', 'personIs').id
  const isPatient = referralModel && referralModel[`${keyId}`] && referralModel[`${keyId}`].indexOf('Patient') !== -1

  return {
    answers,
    formState,
    isPatient,
    survey
  }
}

export default compose(
  connect(mapStateToProps, { setModel }),
  withForm(form)
)(FormTemplate)
