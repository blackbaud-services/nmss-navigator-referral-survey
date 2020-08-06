import React, { useEffect, useState } from 'react'
import InputField from 'constructicon/input-field'
import InputValidations from 'constructicon/input-validations'
import Label from 'constructicon/label'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

const MultiCheck = ({
  classNames,
  error,
  id,
  label,
  onChange,
  options = [],
  hint,
  required,
  styles,
  validations
}) => {
  const [checkboxes, setCheckboxes] = useState('')
  const handleClick = (val, valueText) => {
    setCheckboxes(
      val
        ? checkboxes.concat(`${valueText}*`)
        : checkboxes.replace(`${valueText}*`, '')
    )
  }

  useEffect(() => {
    return onChange && onChange(checkboxes.trim())
  }, [checkboxes])

  return (
    <div className={classNames.root}>
      <Label
        id={`label-${id}`}
        inputId={id}
        required={required}
        styles={styles.label}
      >
        {label}
      </Label>
      {hint && <div className={classNames.hint}>{hint}</div>}
      {error && (
        <InputValidations
          styles={{ root: styles.error }}
          validations={validations}
        />
      )}
      {options.map(({ label, value }, index) => {
        const valueText = value
        return (
          <InputField
            key={index}
            autoComplete='nope'
            type='checkbox'
            name={`${id}_${index}`}
            id={`${id}_${index}`}
            label={label}
            value={valueText}
            onChange={val => handleClick(val, valueText)}
            checked={checkboxes.indexOf(valueText) !== -1}
            styles={styles.input}
          />
        )
      })}
    </div>
  )
}

export default withStyles(styles)(MultiCheck)
