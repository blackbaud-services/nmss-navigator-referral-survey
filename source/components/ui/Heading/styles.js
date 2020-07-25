import merge from 'lodash/merge'

export default (
  { color, font, size, spacing, styles },
  { calculateSpacing, fonts, colors, scale, treatments }
) => ({
  root: merge(
    {
      ...treatments.head,
      ...calculateSpacing(spacing, 'margin'),
      fontSize: scale(size),
      fontFamily: fonts[font],
      color: color && colors[color]
    },
    styles
  )
})
