export default (props, { breakpoints, colors, mediaQuery, rhythm, scale }) => ({
  form: {
    root: {
      paddingBottom: 0,
      '& > button': {
        display: 'none'
      }
    }
  },
  btns: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: rhythm(1),
    [mediaQuery('sm')]: {
      flexDirection: 'row'
    }
  },
  btn: {
    textTransform: 'none',
    flex: 1,
    fontSize: scale(1.25),
    maxWidth: breakpoints.sm,
    '&:hover': {
      textDecoration: 'none'
    }
  },
  errors: {
    margin: rhythm([1, 0]),
    padding: rhythm([0.5, 0.75]),
    backgroundColor: colors.danger,
    fontWeight: 'bold',
    color: colors.light,
    '& > div': {
      lineHeight: 1.5,
      margin: rhythm([0, 0, 0.25])
    },
    '& > div:last-child': {
      margin: 0
    }
  }
})
