export default (props, { breakpoints, scale, treatments }) => ({
  root: {
    maxWidth: breakpoints.xs
  },
  label: {
    root: {
      ...treatments.label
    }
  },
  select: {
    input: {
      ...treatments.input
    }
  },
  input: {
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 0
    },
    label: {
      display: 'inline-block',
      margin: 0,
      order: 1,
      fontSize: scale(-0.75)
    },
    field: {
      ...treatments.input
    }
  }
})
