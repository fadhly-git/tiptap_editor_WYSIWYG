import { useState, useRef, useEffect } from 'react'
import { X, Image, Upload, Link } from 'lucide-react'

interface ImageDialogProps {
  onSubmit: (src: string, alt?: string) => void
  onClose: () => void
}

const ImageDialog: React.FC<ImageDialogProps> = ({ onSubmit, onClose }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('url')
  const [imageUrl, setImageUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [dragOver, setDragOver] = useState(false)
  
  const dialogRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    
    // Focus appropriate input when dialog opens
    setTimeout(() => {
      if (activeTab === 'url') {
        urlInputRef.current?.focus()
      }
    }, 100)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, activeTab])

  useEffect(() => {
    // Create preview URL when file is selected
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl('')
    }
  }, [imageFile])

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === 'url') {
      if (!imageUrl.trim()) return
      onSubmit(imageUrl.trim(), altText.trim() || undefined)
    } else {
      if (!imageFile) return
      try {
        const base64 = await convertFileToBase64(imageFile)
        onSubmit(base64, altText.trim() || undefined)
      } catch (error) {
        console.error('Error converting file to base64:', error)
        return
      }
    }
    
    onClose()
  }

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
    } catch {
      return false
    }
  }

  const currentImageSrc = activeTab === 'url' ? imageUrl : previewUrl

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Tambah Gambar
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'url'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Link className="w-4 h-4 inline mr-1" />
            URL Gambar
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-1" />
            Upload File
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Tab */}
          {activeTab === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar *
              </label>
              <input
                ref={urlInputRef}
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  imageUrl && !isValidImageUrl(imageUrl) ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {imageUrl && !isValidImageUrl(imageUrl) && (
                <p className="text-red-500 text-xs mt-1">
                  URL gambar tidak valid. Pastikan berakhiran .jpg, .png, .gif, dll.
                </p>
              )}
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Gambar *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? 'border-blue-400 bg-blue-50'
                    : imageFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                {imageFile ? (
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      {imageFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600">
                      Klik untuk memilih atau seret file gambar ke sini
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF hingga 10MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teks Alternatif (Alt Text)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Deskripsi gambar untuk aksesibilitas"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-500 text-xs mt-1">
              Digunakan untuk aksesibilitas dan SEO
            </p>
          </div>

          {/* Image Preview */}
          {currentImageSrc && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                <img
                  src={currentImageSrc}
                  alt={altText || 'Preview'}
                  className="max-w-full max-h-48 mx-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden text-center text-red-500 text-sm py-4">
                  Gagal memuat gambar
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={
                activeTab === 'url'
                  ? !imageUrl.trim() || !isValidImageUrl(imageUrl)
                  : !imageFile
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tambah Gambar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ImageDialog
