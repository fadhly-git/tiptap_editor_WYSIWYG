import { useState, useRef, useEffect } from 'react'
import { X, Link, ExternalLink } from 'lucide-react'

interface LinkDialogProps {
  onSubmit: (url: string, text?: string) => void
  onClose: () => void
  initialUrl?: string
  initialText?: string
}

const LinkDialog: React.FC<LinkDialogProps> = ({
  onSubmit,
  onClose,
  initialUrl = '',
  initialText = ''
}) => {
  const [url, setUrl] = useState(initialUrl)
  const [text, setText] = useState(initialText)
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const dialogRef = useRef<HTMLDivElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    // Focus on URL input when dialog opens
    setTimeout(() => {
      urlInputRef.current?.focus()
    }, 100)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      return
    }

    let finalUrl = url.trim()
    
    // Add protocol if missing
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    onSubmit(finalUrl, text.trim() || undefined)
    onClose()
  }

  const handleRemoveLink = () => {
    onSubmit('')
    onClose()
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : 'https://' + url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Link className="w-5 h-5" />
            {initialUrl ? 'Edit Link' : 'Tambah Link'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL *
            </label>
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com atau example.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                url && !isValidUrl(url) ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {url && !isValidUrl(url) && (
              <p className="text-red-500 text-xs mt-1">URL tidak valid</p>
            )}
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teks Link (opsional)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Teks yang akan ditampilkan"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-500 text-xs mt-1">
              Jika kosong, URL akan digunakan sebagai teks
            </p>
          </div>

          {/* Options */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Buka di tab baru
              </span>
            </label>
          </div>

          {/* URL Preview */}
          {url && isValidUrl(url) && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs text-gray-600 mb-1">Preview:</p>
              <a
                href={url.startsWith('http') ? url : 'https://' + url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline break-all"
              >
                {text || url}
              </a>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {initialUrl && (
                <button
                  type="button"
                  onClick={handleRemoveLink}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium"
                >
                  Hapus Link
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!url.trim() || !isValidUrl(url)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {initialUrl ? 'Update' : 'Tambah'} Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LinkDialog
