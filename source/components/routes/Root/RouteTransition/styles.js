export default (props, traits) => ({
  enter: {
    opacity: 0.25,
    transform: 'translateX(-100%)',
    transition: 'all 500ms ease'
  },
  enterActive: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'all 500ms forward'
  },
  exit: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'all 500ms backward'
  },
  exitActive: {
    opacity: 0.25,
    transform: 'translateX(-100%)',
    transition: 'all 500ms ease'
  }
})
