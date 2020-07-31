import React, { useEffect, useState } from 'react'
import InputField from 'constructicon/input-field'
import InputSelect from 'constructicon/input-select'
import withStyles from 'constructicon/with-styles'
import styles from './styles'

const ComboChoice = ({
  classNames,
  onChange,
  options = [],
  styles,
  ...props
}) => {
  const [value, setValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const dropdownList = options.concat([{ label: 'Other', value: 'Other' }])

  useEffect(() => {
    if (value !== '' || value !== 'Other') {
      return onChange && onChange(value)
    }
  }, [value])

  useEffect(() => {
    if (inputValue && inputValue !== '') {
      return onChange && onChange(inputValue)
    }
  }, [inputValue])

  return (
    <div className={classNames.root}>
      <InputSelect
        {...props}
        options={dropdownList}
        onChange={v => setValue(v)}
        styles={styles.select}
      />
      {value === 'Other' && (
        <InputField
          type='text'
          name={`${props.id}_other`}
          id={`${props.id}_other`}
          value={inputValue}
          label='Please provide more details if selecting "Other"'
          onChange={v => setInputValue(v)}
        />
      )}
    </div>
  )
}

export default withStyles(styles)(ComboChoice)
