import { useState } from 'react'
import RichTextEditor from './components/RichTextEditor'
import { FileText, Save, Eye, Download, Settings } from 'lucide-react'

function App() {
  const [content, setContent] = useState(`
    <h1>Selamat Datang di Rich Text Editor</h1>
    <p>Ini adalah editor teks yang lengkap dan canggih yang memungkinkan Anda untuk:</p>
    <ul>
      <li><strong>Format teks</strong> dengan berbagai pilihan styling</li>
      <li><em>Menambahkan gambar</em> dan konten multimedia</li>
      <li><u>Membuat tabel</u> yang interaktif</li>
      <li>Dan masih banyak lagi...</li>
    </ul>
    <p>Mulai menulis konten Anda di sini dan nikmati pengalaman editing yang menyenangkan!</p>
    <blockquote>
      <p>"Kreativitas dimulai dengan satu kata, satu kalimat, satu paragraf..."</p>
    </blockquote>
  `)
  const [showPreview, setShowPreview] = useState(false)
  const [documentTitle, setDocumentTitle] = useState('Dokumen Baru')

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  const saveDocument = () => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${documentTitle}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAsText = () => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const textContent = tempDiv.textContent || tempDiv.innerText || ''
    
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${documentTitle}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Rich Text Editor</h1>
              </div>
              <div className="hidden sm:block text-sm text-gray-500">
                Editor WYSIWYG yang lengkap dan modern
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showPreview
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Toggle Preview"
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              
              <button
                onClick={saveDocument}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                title="Simpan Dokumen"
              >
                <Save className="w-4 h-4 inline mr-1" />
                Simpan
              </button>
              
              <div className="flex flex-row relative ">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.value === 'text') {
                      exportAsText()
                    } else if (e.target.value === 'html') {
                      saveDocument()
                    }
                    e.target.value = ''
                  }}
                >
                  <option value="">Export</option>
                  <option value="html">HTML</option>
                  <option value="text">Text</option>
                </select>
                <Download className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Document Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="text-2xl font-bold text-gray-900 border-none outline-none w-full bg-transparent"
            placeholder="Masukkan judul dokumen..."
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {showPreview ? (
          /* Preview Mode */
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Preview Dokumen</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
              >
                Kembali ke Editor
              </button>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold mb-4">{documentTitle}</h1>
              <div 
                dangerouslySetInnerHTML={{ __html: content }}
                className="leading-relaxed"
              />
            </div>
          </div>
        ) : (
          /* Editor Mode */
          <div className="space-y-6">
            <RichTextEditor
              content={content}
              onChange={handleContentChange}
              placeholder="Mulai menulis konten Anda di sini..."
            />
            
            {/* Tips & Shortcuts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Tips & Keyboard Shortcuts
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Format Teks</h4>
                  <div className="space-y-1 text-gray-600">
                    <p><kbd className="kbd">Ctrl+B</kbd> - Tebal</p>
                    <p><kbd className="kbd">Ctrl+I</kbd> - Miring</p>
                    <p><kbd className="kbd">Ctrl+U</kbd> - Garis Bawah</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Aksi Editor</h4>
                  <div className="space-y-1 text-gray-600">
                    <p><kbd className="kbd">Ctrl+Z</kbd> - Undo</p>
                    <p><kbd className="kbd">Ctrl+Y</kbd> - Redo</p>
                    <p><kbd className="kbd">Ctrl+S</kbd> - Simpan</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Fitur Khusus</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>• Drag & drop gambar</p>
                    <p>• Auto-save setiap perubahan</p>
                    <p>• Export ke berbagai format</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
