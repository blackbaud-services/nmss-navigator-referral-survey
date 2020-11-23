import React from 'react'
import withStyles from 'constructicon/with-styles'
import styles from './styles'
import ComboChoice from '../ComboChoice'
import InputField from 'constructicon/input-field'
import InputSelect from 'constructicon/input-select'
import MutliCheck from '../MultiCheck'
import RichText from '../RichText'

const SurveyQuestion = ({
  classNames,
  fullwidth,
  options = [],
  name,
  questionHint,
  status,
  styles,
  type,
  value,
  ...props
}) => {
  const mapComponent = type => {
    switch (type) {
      case 'Caption':
        return RichText
      case 'MultiSingle':
        return InputSelect
      case 'MultiMulti':
        return MutliCheck
      case 'ComboChoice':
        return ComboChoice
      default:
        return InputField
    }
  }

  const deserializeField = type => {
    switch (type) {
      case 'NumericValue': {
        return 'number'
      }
      case 'LargeTextValue':
      case 'TextValue': {
        return 'textarea'
      }
      case 'ShortTextValue': {
        return 'text'
      }
      case 'YesNo': {
        return 'checkbox'
      }
      default: {
        return type
      }
    }
  }

  const Tag = mapComponent(type)

  return (
    <div className={classNames.relative}>
      <Tag
        {...props}
        name={name}
        autoComplete='nope'
        styles={styles.root}
        type={deserializeField(type)}
        validations={props.validations}
        error={props.error}
        value={value}
        status={type === 'checkbox' && value ? 'fetched' : status}
        options={options}
        hint={questionHint}
        children={type === 'Caption' && props.label}
      />
    </div>
  )
}

export default withStyles(styles)(SurveyQuestion)
