import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import SurveyQuestion from '../../ui/SurveyQuestion'
import { setColumn } from '../../../lib/form'
import { setFlashMessage } from '../../../store/flashMessages'
import { setModel } from '../../../store/formState'
import { submitSurvey } from '../../../store/survey'

const OnePageForm = ({
  auth,
  setFlashMessage,
  form,
  formState: { answers },
  location: { pathname },
  router,
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
      .then(() => submitSurvey(answers, survey, auth))
      .then(() => setLoading(false))
      .then(() => router.push('/thank-you'))
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

  return (
    <Form
      form={form}
      onSubmit={handleSuccess}
      isLoading={isLoading}
      submit={survey.submitButtonLabel}
      serverErrors={errors}
    >
      <Grid spacing={{ x: 0.5, y: 0.25 }} align='flex-end'>
        {questions.map(({ questionId, questionType }) => {
          return (
            <GridColumn
              key={questionId}
              xs={12}
              sm={setColumn(questionType) ? 6 : 12}
            >
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

const mapStateToProps = ({ auth, formState, survey }) => ({
  auth,
  formState,
  survey
})

const mapDispatchToProps = {
  setFlashMessage,
  setModel,
  submitSurvey
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm(form),
  withRouter
)(OnePageForm)
