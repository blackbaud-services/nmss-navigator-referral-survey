import merge from 'lodash/merge'

export default (
  { align, size, spacing, styles },
  { calculateSpacing, colors, rhythm, scale, treatments }
) => {
  const headingStyles = fontSize => ({
    ...treatments.head,
    marginBottom: rhythm(0.75),
    fontSize: scale(fontSize),
    color: colors.grey
  })

  const baseStyles = {
    fontSize: size ? scale(size) : scale(0.25),
    lineHeight: 1.4,
    textAlign: align,
    ...calculateSpacing(spacing),
    '& h2': headingStyles(2.5),
    '& h3': headingStyles(1.5),
    '& h4': headingStyles(1.25),
    '& h5': headingStyles(1),
    '& h6': headingStyles(0.5),
    '& > span > p': {
      marginBottom: rhythm(0.5),
      lineHeight: 1.4
    },
    '& a': {
      color: colors.primary,
      cursor: 'pointer'
    },
    '& strong': {
      fontWeight: 700
    }
  }

  return {
    root: merge(baseStyles, styles)
  }
}
