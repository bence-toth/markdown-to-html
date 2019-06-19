const {markdownToMarkup} = require('./index')
const {JSDOM} = require('jsdom')

describe('Headings', () => {
  it('with # syntax should render correctly', () => {
    const text = 'Heading'
    const headings = [
      `# ${text}`,
      `## ${text}`,
      `### ${text}`,
      `#### ${text}`,
      `##### ${text}`,
      `###### ${text}`
    ]
    headings.map((heading, headingIndex) => {
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(heading)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName).toBe(`H${headingIndex + 1}`)
      expect(root.children[0].textContent).toBe(text)
    })
  })

  it('with =/- syntax should render correctly', () => {
    const text = 'Heading'
    const headings = [
      `${text}\n=======`,
      `${text}\n-------`,
    ]
    headings.map((heading, headingIndex) => {
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <div id="root">
          ${markdownToMarkup(heading)}
        </div>`
      )
      const root = dom.window.document.getElementById('root')
      expect(root.children.length).toBe(1)
      expect(root.children[0].tagName).toBe(`H${headingIndex + 1}`)
      expect(root.children[0].textContent).toBe(text)
    })
  })
})

describe('Thematic break', () => {
  it('should render correctly', () => {
    const markdown = 'Some text\n\n-----\n\nSome more text'
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <div id="root">
        ${markdownToMarkup(markdown)}
      </div>`
    )
  const root = dom.window.document.getElementById('root')
    expect(root.children.length).toBe(3)
    expect(root.children[1].tagName).toBe('HR')
  })
})

// Simple blockquote
// Blockquote with embedded markdown
// Code block (syntax highlighting, copying to clipboard)
// Emphasis, strong
// Headings with embedded markdown
// Free HTML
// Image with and without title
// Inline code
// Simple link
// Link with embedded markdown
// Simple paragraph
// Paragraph with embedded markdown
// Danger, warning, notice boxes
// Ordered list of simple paragraphs
// Ordered list of paragraphs with embedded markdown
// Unordered list of simple paragraphs
// Unordered list of paragraphs with embedded markdown
// Lists in lists, lists in lists in lists
// Auto links
// Reference resolver - Simple link
// Reference resolver - Link with embedded markdown
// Reference resolver - Images with and without title
