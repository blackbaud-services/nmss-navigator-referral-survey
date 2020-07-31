import merge from 'lodash/merge'

export default (
  { align, bottomMargin, size, spacing, styles },
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
    textAlign: align,
    ...calculateSpacing(spacing),
    '& h2': headingStyles(2.5),
    '& h3': headingStyles(2),
    '& h4': headingStyles(1.5),
    '& h5': headingStyles(1),
    '& h6': headingStyles(0.5),
    '& > span > p': {
      marginBottom: rhythm(0.5),
      lineHeight: 1.4
    },
    '& > span > :last-child': {
      marginBottom: bottomMargin ? rhythm(0.75) : 0
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
