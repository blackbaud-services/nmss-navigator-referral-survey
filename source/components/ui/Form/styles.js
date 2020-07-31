export default (props, { breakpoints, mediaQuery, rhythm, scale }) => ({
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
  }
})
