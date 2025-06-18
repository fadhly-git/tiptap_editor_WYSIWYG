import { HexColorPicker } from 'react-colorful'
import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  onClose: () => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(color)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Preset colors for quick selection
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#008000', '#000080', '#800080', '#008080', '#808000', '#C0C0C0', '#808080',
    '#FF9999', '#99FF99', '#9999FF', '#FFFF99', '#FF99FF', '#99FFFF', '#FFE6CC', '#E6E6E6'
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    onChange(newColor)
  }

  const handlePresetColorClick = (presetColor: string) => {
    setSelectedColor(presetColor)
    onChange(presetColor)
  }

  return (
    <div
      ref={pickerRef}
      className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Pilih Warna</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Color Picker */}
      <div className="mb-4">
        <HexColorPicker color={selectedColor} onChange={handleColorChange} />
      </div>

      {/* Color Input */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Kode Warna (Hex)
        </label>
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => {
            const value = e.target.value
            if (value.match(/^#[0-9A-Fa-f]{0,6}$/)) {
              setSelectedColor(value)
              if (value.length === 7) {
                onChange(value)
              }
            }
          }}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>

      {/* Preset Colors */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Warna Cepat
        </label>
        <div className="grid grid-cols-8 gap-1">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => handlePresetColorClick(presetColor)}
              className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
                selectedColor === presetColor ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: presetColor }}
              title={presetColor}
            />
          ))}
        </div>
      </div>

      {/* Current Color Preview */}
      <div className="mt-4 flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
        <span className="text-xs text-gray-600">{selectedColor}</span>
      </div>
    </div>
  )
}

export default ColorPicker
