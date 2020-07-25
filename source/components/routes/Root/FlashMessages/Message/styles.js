export default (
  { theme },
  { colors, radiuses, rhythm, shadows, transitions },
  keyframes
) => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    padding: `${rhythm(0.5)} ${rhythm(1)}`,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors[theme || 'grey'],
    color: colors.light,
    boxShadow: shadows.dark,
    borderRadius: rhythm(radiuses.small),
    textAlign: 'left',
    animation: `${keyframes.dropInOut} 7000ms ease-out forwards`,
    marginBottom: '0.375rem',
    marginTop: '-4rem',
    opacity: 0
  },

  content: {
    fontWeight: 'bold',
    lineHeight: '1.5em'
  },

  close: {
    marginLeft: rhythm(0.5),
    cursor: 'pointer',
    transition: transitions.easeOut,

    '& svg': {
      display: 'block'
    },

    '&:hover': {
      backgroundColor: colors.shadeDark
    }
  }
})

export const keyframes = {
  dropInOut: {
    '0%, 100%': {
      marginTop: '-4rem',
      opacity: 0
    },
    '5%, 95%': {
      marginTop: 0,
      opacity: 1
    }
  }
}
