export default ({ small }, { colors, rhythm, scale }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexPack: 'center',
    height: !small && '50vh',
    minHeight: !small && `calc(100vh - ${rhythm(10)})`,
    padding: small && rhythm([6, 2])
  },
  heading: {
    marginBottom: rhythm(1.5),
    fontSize: scale(1.5)
  }
})
