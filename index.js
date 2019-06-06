const fs = require('fs')
const {tokenize} = require('./tokenizer/index')
const {
  renderEmphasis,
  renderHeading,
  renderHtml,
  renderImage,
  renderInlineCode,
  renderList,
  renderParagraph,
  renderStrong,
  renderText,
  renderThematicBreak
} = require('./renderers/index')

const headingLevelOffset = 0

const tokenToMarkup = token => {
  const {type} = token
  const tokenRenderer = {
    emphasis: () => renderEmphasis({
      token,
      tokenToMarkup
    }),
    heading: () => renderHeading({
      token,
      headingLevelOffset,
      tokenToMarkup
    }),
    html: () => renderHtml({token}),
    image: () => renderImage({token}),
    inlineCode: () => renderInlineCode({token}),
    list: () => renderList({
      token,
      tokenToMarkup
    }),
    paragraph: () => renderParagraph({
      token,
      tokenToMarkup
    }),
    strong: () => renderStrong({
      token,
      tokenToMarkup
    }),
    text: () => renderText({token}),
    thematicBreak: () => renderThematicBreak()
  }
  return tokenRenderer[type] ? tokenRenderer[type]() : ''
}

fs.readFile('test.md', 'utf8', (error, markdownContent) => {
  if (!error) {
    const markup =
      tokenize(markdownContent)
        .map(tokenToMarkup)
        .join('\n')
    fs.writeFile('index.html', markup, error => {
      if (error) {
        console.err(error)
      }
      else {
        console.log('HTML content was successfully written to index.html.\n')
      }
    })
  }
  else {
    console.err(error)
  }
})

