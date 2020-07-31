import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withForm from 'constructicon/with-form'
import form from './form'
import Grid from 'constructicon/grid'
import GridColumn from 'constructicon/grid-column'
import Form from '../../ui/Form'
import SurveyQuestion from '../../ui/SurveyQuestion'

const FormTemplate = ({
  form,
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
        return (
          <GridColumn
            key={questionId}
            xs={12}
            sm={process.env.COLUMN_FIELDS.indexOf(questionId) !== -1 ? 6 : 12}
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
