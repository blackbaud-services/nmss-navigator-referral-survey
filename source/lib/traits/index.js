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
  dark: '#282828'
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
  }
}
