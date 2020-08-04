import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { filter, get } from 'lodash'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import SurveyQuestion from '../../ui/SurveyQuestion'
import { findQuestion, findQuestionByText } from '../../../lib/survey'
import { setFlashMessage } from '../../../store/flashMessages'
import { setModel } from '../../../store/formState'
import { submitSurvey } from '../../../store/survey'

const SubmitForm = ({
  auth,
  setFlashMessage,
  form,
  formState: { additionalInfo, answers },
  location: { pathname },
  push,
  setModel,
  submitSurvey,
  survey,
  questions
}) => {
  const [status, setStatus] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSuccess = data =>
    Promise.resolve()
      .then(() => setModel(data, pathname))
      .then(() => setStatus('success'))

  const handleSubmit = () =>
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => submitSurvey(answers, survey))
      .then(() => setLoading(false))
      .then(() => push('/thank-you'))
      .catch(error => {
        console.log(error)
        setLoading(false)
        setFlashMessage('Unknown error occurred, please try again later', 'danger')
        setStatus('fail')
      })

  useEffect(() => {
    if (status === 'fail') {
      setErrors(['Unknown error occurred, please try again later'])
    }
    if (status === 'success') {
      handleSubmit()
    }
  }, [status])

  useEffect(() => {
    if (additionalInfo && !additionalInfo.showAdditionalContact) {
      form.updateValues({
        [`${get(findQuestionByText('/preferences', 'signature2'), 'id')}`]: 'N/A'
      })
    }
  }, [additionalInfo])

  const displayQuestions =
    filter(questions, question => {
      const additionalContactIds = [
        get(findQuestionByText('/preferences', 'signature2'), 'id'),
        get(findQuestionByText('/preferences', 'signature2Caption'), 'id')
      ]
      const showAdditionalContactConsent = additionalInfo && additionalInfo.showAdditionalContact

      if (additionalContactIds.indexOf(Number(question.questionId)) === -1 || showAdditionalContactConsent) {
        return question
      }
    })
  return (
    <Form
      form={form}
      onSubmit={handleSuccess}
      isLoading={isLoading}
      action={{ label: 'Previous', to: 'provider-info' }}
      submit={survey.submitButtonLabel}
      serverErrors={errors}
    >
      <Grid spacing={{ x: 0.5, y: 0.25 }}>
        {displayQuestions.map(({ questionId }) => {
          const column = get(findQuestion('/preferences', questionId), 'col')
          return (
            <GridColumn key={questionId} xs={12} sm={column ? 6 : 12}>
              <SurveyQuestion
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
  return {
    auth,
    formState,
    survey
  }
}

export default compose(
  connect(mapStateToProps, { setFlashMessage, setModel, submitSurvey }),
  withForm(form)
)(SubmitForm)
