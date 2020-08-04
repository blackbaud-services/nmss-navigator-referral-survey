export default (
  props,
  { rhythm, scale },
  keyframes
) => ({
  root: {
    lineHeight: 1.4
  },
  iconWrap: {
    margin: rhythm([1, 0]),
    display: 'flex'
  },
  icon: {
    animation: `${keyframes.rotate} 750ms linear`,
    flex: 1
  },
  content: {
    padding: rhythm([0, 1, 1]),
    fontSize: scale(1.2),
    '& li': {
      marginBottom: rhythm(0.75)
    },
    '& ul': {
      padding: rhythm([1, 0, 0, 2])
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
      margin: 0
    },
    field: {
      display: 'inline-block'
    }
  }
})

export const keyframes = {
  rotate: {
    '0%': {
      transform: 'rotate(90deg)',
      flex: 0
    },
    '100%': {
      transform: 'rotate(0deg)'
    }
  }
}
