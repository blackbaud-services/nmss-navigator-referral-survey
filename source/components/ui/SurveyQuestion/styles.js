import merge from 'lodash/merge'

export default (
  { currency, label, phone, styles, type },
  { breakpoints, colors, mediaQuery, radiuses, rhythm, scale, treatments }
) => {
  const commonStyles = {
    root: {
      maxWidth: type === 'YesNo' ? '100%' : breakpoints.xs
    },
    label: {
      ...treatments.label
    },
    input: {
      ...treatments.input
    },
    field: {
      ...treatments.input
    },
    error: {
      display: 'inline-block',
      position: 'relative',
      padding: rhythm([0.25, 0.5]),
      paddingLeft: '2rem',
      marginTop: '1em',
      borderRadius: rhythm(radiuses.medium),
      backgroundColor: colors.danger,
      color: colors.light,
      lineHeight: 1.5,
      fontSize: scale(-1),
      fontWeight: 'bold',

      '&:before': {
        content: '"i"',
        position: 'absolute',
        left: '0.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '1rem',
        height: '1rem',
        lineHeight: '1rem',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: 900,
        fontSize: '1rem',
        backgroundColor: colors.light,
        color: colors.danger,
        borderRadius: rhythm(radiuses.large)
      },

      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        left: '0.5rem',
        width: '1rem',
        height: '1rem',
        border: '8px solid transparent',
        borderBottomColor: colors.danger
      },

      '> div': {
        display: 'inline',
        margin: 0
      }
    }
  }

  const inputStyles = type => {
    switch (type) {
      case 'YesNo': {
        return {
          root: {
            paddingLeft: 0
          },

          field: {
            display: 'inline-block'
          },

          label: {
            display: 'inline-block',
            marginBottom: 0
          }
        }
      }

      case 'MultiSingle': {
        return {
          root: {}
        }
      }

      default: {
        return {
          root: {
            ...((currency || phone) && {
              '&:before': {
                content: currency && '"$"',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                zIndex: 4,
                height: rhythm(1.75),
                top: label ? rhythm(1.25) : rhythm(0),
                left: rhythm(0.5),
                fontSize: scale(-0.5),
                paddingRight: rhythm(0.5),
                borderRight: `2px solid ${colors.lightGrey}`
              }
            })
          },

          field: {
            ...treatments.input,
            '&::-webkit-input-placeholder': { color: colors.grey },
            '&::-mox-placeholder': { color: colors.grey },
            '&:-ms-input-placeholder': { color: colors.grey },
            '&:-moz-placeholder': { color: colors.grey }
          },

          input: {
            '&:focus + span': {
              boxShadow: 'none'
            }
          },

          selected: {
            right: rhythm(1.33),
            fontSize: scale(-1),
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',

            [mediaQuery('md')]: {
              fontSize: scale(-0.5)
            }
          },

          results: {
            maxHeight: rhythm(7)
          }
        }
      }
    }
  }

  return {
    root: merge(commonStyles, inputStyles(type), styles)
  }
}
