export default (props, { rhythm, scale, treatments }) => ({
  root: {},
  hint: {
    fontStyle: 'italic',
    fontSize: scale(-1.2),
    marginBottom: rhythm(0.5)
  },
  label: {
    root: {
      ...treatments.label
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
      display: 'inline-block'
    }
  },
  error: {
    ...treatments.error
  }
})
