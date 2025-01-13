import { Mark } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

const ReverseText = Mark.create({
  name: 'reverseText',

  addAttributes() {
    return {
      reversed: {
        default: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span.reverse-text',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { class: 'reverse-text' }, 0]
  },

  addCommands() {
    return {
      toggleReverseText: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            focus: () => {
              const styleTag = document.createElement('style')
              styleTag.innerHTML = `
                .reverse-text {
                  display: inline-block;
                  transform: scaleX(-1); /* Reverses the text horizontally */
                }
              `
              document.head.appendChild(styleTag)
            },
          },
        },
      }),
    ]
  },
})

export default ReverseText
