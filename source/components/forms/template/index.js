import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import SurveyQuestion from '../../ui/SurveyQuestion'
import { findQuestion } from '../../../lib/survey'

const FormTemplate = ({
  form,
  location,
  onSuccess,
  prevUrl = '/',
  submit,
  questions
}) => (
  <Form
    form={form}
    onSubmit={onSuccess}
    action={{ label: 'Previous', to: prevUrl }}
    submit={submit}
  >
    <Grid spacing={{ x: 0.5, y: 0.25 }}>
      {questions.map(({ questionId }) => {
        const column = get(
          findQuestion(location, questionId)
          , 'col'
        )
        return (
          <GridColumn
            key={questionId}
            xs={12}
            sm={column ? 6 : 12}
          >
            <SurveyQuestion {...form.fields[questionId]} />
          </GridColumn>
        )
      })}
    </Grid>
  </Form>
)
const mapStateToProps = ({ formState, survey }) => ({ formState, survey })

export default compose(connect(mapStateToProps), withForm(form))(FormTemplate)
