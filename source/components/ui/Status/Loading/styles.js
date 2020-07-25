export default (props, traits, keyframes) => {
  const { colors, rhythm } = traits

  const { color = 'primary', size = 4 } = props
  const dotSize = size / 6

  return {
    root: {
      height: rhythm(dotSize),
      textAlign: 'center'
    },

    dot: {
      position: 'relative',
      display: 'inline-block',
      margin: `auto ${rhythm(0.33)}`,
      width: rhythm(dotSize),
      height: rhythm(dotSize),
      backgroundColor: colors[color],
      lineHeight: 0,
      transformOrigin: 'bottom',
      borderRadius: '50%',
      animation: `${keyframes.dots} 600ms infinite alternate`,
      '&:nth-of-type(2)': {
        animationDelay: '200ms'
      },
      '&:nth-of-type(3)': {
        animationDelay: '400ms'
      }
    }
  }
}

export const keyframes = {
  dots: {
    '0%': {
      opacity: 0,
      transform: 'scale(0)'
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)'
    }
  }
}
