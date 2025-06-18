import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import Focus from '@tiptap/extension-focus'
import { useState } from 'react'
import MenuBar from './MenuBar'

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Mulai menulis di sini...'
}) => {
  const [editorContent, setEditorContent] = useState(content)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      FontFamily.configure({
        types: [TextStyle.name, ListItem.name],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount.configure({
        limit: 10000,
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setEditorContent(html)
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
        placeholder,
      },
    },
  })

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      <MenuBar editor={editor} />
      <div className="border-t border-gray-200">
        <EditorContent 
          editor={editor} 
          className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        />
      </div>
      {editor && (
        <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
          <div>
            Karakter: {editor.storage.characterCount.characters()} / 10,000
          </div>
          <div>
            Kata: {editor.storage.characterCount.words()}
          </div>
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
