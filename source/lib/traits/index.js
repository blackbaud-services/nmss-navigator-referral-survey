import { radiuses, rhythm, scale } from 'constructicon/lib/traits'

export const fonts = {
  head: `'Source Sans Pro', Helvetica, Arial, sans-serif`,
  body: `'Source Sans Pro', Helvetica, Arial, sans-serif`
}
export const colors = {
  primary: '#cc3f10',
  secondary: '#444',
  tertiary: '#555',
  light: '#fdfdfd',
  grey: '#544d46',
  dark: '#282828',
  danger: '#d9534f'
}

export const treatments = {
  head: {
    fontFamily: fonts.head,
    fontWeight: 700
  },
  body: {
    fontFamily: fonts.body,
    color: colors.grey
  },
  label: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.333em',
    minHeight: 0
  },
  input: {
    lineHeight: 1,
    backgroundImage: 'inherit',
    borderRadius: '3px',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, .15) inset',
    border: '1px solid #aec0c6',
    padding: '10px',
    fontSize: '13px',
    verticalAlign: 'middle',
    height: '2.65rem'
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
