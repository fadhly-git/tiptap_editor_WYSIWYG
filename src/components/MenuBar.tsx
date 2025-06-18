import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link,
  Image,
  Table,
  Highlighter,
  Type,
  Palette,
  Download,
  FileText,
  Code,
  Minus
} from 'lucide-react'
import { useState, useCallback } from 'react'
import ColorPicker from './ColorPicker'
import LinkDialog from './LinkDialog'
import ImageDialog from './ImageDialog'
import TableDialog from './TableDialog'

interface MenuBarProps {
  editor: Editor | null
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false)
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showTableDialog, setShowTableDialog] = useState(false)

  const addImage = useCallback((src: string, alt?: string) => {
    if (editor && src) {
      editor.chain().focus().setImage({ src, alt: alt || '' }).run()
    }
  }, [editor])

  const setLink = useCallback((url: string, text?: string) => {
    if (!editor) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    if (text) {
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const insertTable = useCallback((rows: number, cols: number) => {
    if (editor) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const exportAsHTML = () => {
    const content = editor.getHTML()
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAsText = () => {
    const content = editor.getText()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children, 
    title 
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent ${
        isActive ? 'bg-blue-100 border-blue-300 text-blue-700' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  )

  const Separator = () => (
    <div className="w-px h-8 bg-gray-300 mx-1" />
  )

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2">
      {/* First Row - Basic Formatting */}
      <div className="flex flex-wrap items-center gap-1 mb-2">
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Urungkan (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Ulangi (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Basic Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Tebal (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Miring (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Garis Bawah (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Coret"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Text Color */}
        <div className="relative">
          <ToolbarButton
            onClick={() => setShowTextColorPicker(!showTextColorPicker)}
            title="Warna Teks"
          >
            <Type className="w-4 h-4" />
          </ToolbarButton>
          {showTextColorPicker && (
            <div className="absolute top-12 left-0 z-10">
              <ColorPicker
                color={editor.getAttributes('textStyle').color || '#000000'}
                onChange={(color) => {
                  editor.chain().focus().setColor(color).run()
                  setShowTextColorPicker(false)
                }}
                onClose={() => setShowTextColorPicker(false)}
              />
            </div>
          )}
        </div>

        {/* Highlight Color */}
        <div className="relative">
          <ToolbarButton
            onClick={() => setShowHighlightColorPicker(!showHighlightColorPicker)}
            isActive={editor.isActive('highlight')}
            title="Sorotan"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
          {showHighlightColorPicker && (
            <div className="absolute top-12 left-0 z-10">
              <ColorPicker
                color={editor.getAttributes('highlight').color || '#ffff00'}
                onChange={(color) => {
                  editor.chain().focus().toggleHighlight({ color }).run()
                  setShowHighlightColorPicker(false)
                }}
                onClose={() => setShowHighlightColorPicker(false)}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Text Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Rata Kiri"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Rata Tengah"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Rata Kanan"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Rata Kiri-Kanan"
        >
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Daftar Poin"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Daftar Nomor"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Quote */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Kutipan"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        {/* Code */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Kode Inline"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Insert Elements */}
        <ToolbarButton
          onClick={() => setShowLinkDialog(true)}
          isActive={editor.isActive('link')}
          title="Sisipkan Link"
        >
          <Link className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => setShowImageDialog(true)}
          title="Sisipkan Gambar"
        >
          <Image className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => setShowTableDialog(true)}
          title="Sisipkan Tabel"
        >
          <Table className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Garis Horizontal"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Export Options */}
        <ToolbarButton
          onClick={exportAsHTML}
          title="Ekspor sebagai HTML"
        >
          <Download className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={exportAsText}
          title="Ekspor sebagai Teks"
        >
          <FileText className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Second Row - Headings and Font Styles */}
      <div className="flex flex-wrap items-center gap-1">
        {/* Heading Styles */}
        <select
          value={
            editor.isActive('heading', { level: 1 }) ? '1' :
            editor.isActive('heading', { level: 2 }) ? '2' :
            editor.isActive('heading', { level: 3 }) ? '3' :
            editor.isActive('heading', { level: 4 }) ? '4' :
            editor.isActive('heading', { level: 5 }) ? '5' :
            editor.isActive('heading', { level: 6 }) ? '6' :
            'paragraph'
          }
          onChange={(e) => {
            const value = e.target.value
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run()
            } else {
              editor.chain().focus().toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run()
            }
          }}
          className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
        >
          <option value="paragraph">Paragraf</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Font Family */}
        <select
          value={editor.getAttributes('textStyle').fontFamily || 'default'}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'default') {
              editor.chain().focus().unsetFontFamily().run()
            } else {
              editor.chain().focus().setFontFamily(value).run()
            }
          }}
          className="px-3 py-1 border border-gray-300 rounded text-sm bg-white ml-2"
        >
          <option value="default">Font Default</option>
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times">Times</option>
          <option value="Courier">Courier</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Dialogs */}
      {showLinkDialog && (
        <LinkDialog
          onSubmit={setLink}
          onClose={() => setShowLinkDialog(false)}
          initialUrl={editor.getAttributes('link').href || ''}
        />
      )}

      {showImageDialog && (
        <ImageDialog
          onSubmit={addImage}
          onClose={() => setShowImageDialog(false)}
        />
      )}

      {showTableDialog && (
        <TableDialog
          onSubmit={insertTable}
          onClose={() => setShowTableDialog(false)}
        />
      )}
    </div>
  )
}

export default MenuBar
