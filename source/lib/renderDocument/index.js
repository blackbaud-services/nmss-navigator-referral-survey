import React, { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderServerCSS } from 'constructicon/lib/renderDocument'

import Helmet from 'react-helmet'

export const Document = ({
  head,
  content,
  state = {},
  styles = ['/main.css'],
  scripts = ['/main.js'],
  itemType = 'http://schema.org/WebSite'
}) => (
  <html itemScope itemType={itemType}>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='CnvHeaderVersion' content='v5.0' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.script.toComponent()}
      {head.style.toComponent()}
      <link
        href='//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet'
        type='text/css'
      />
      <link
        rel='stylesheet'
        href='https://secure.nationalmssociety.org/assets/Styles/MSNational/main2015.css'
      />
      {styles.map((style, index) => (
        <link key={index} rel='stylesheet' href={style} />
      ))}
    </head>
    <body>
      <main id='mount' dangerouslySetInnerHTML={{ __html: content }} />
      <script
        id='initial-state'
        type='application/json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(state) }}
      />
      <script src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.6/iframeResizer.contentWindow.min.js' />
      {scripts.map((script, index) => (
        <script key={index} src={script} />
      ))}
    </body>
  </html>
)

export const renderDocument = ({
  assets,
  content,
  state = {},
  DocumentComponent = Document
}) => {
  const styles = assets.filter(asset => asset.match(/\.css$/))
  const scripts = assets.filter(asset => asset.match(/\.js$/))

  return (
    '<!doctype html>' +
    renderToStaticMarkup(
      createElement(DocumentComponent, {
        head: Helmet.rewind(),
        styles,
        scripts,
        content: renderServerCSS(content || ''),
        state
      })
    )
  )
}

export const loadScript = (url, callback) => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => callback()
  }
}

export default renderDocument
