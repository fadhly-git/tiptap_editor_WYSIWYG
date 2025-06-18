import { useState, useRef, useEffect } from 'react'
import { X, Table, Grid } from 'lucide-react'

interface TableDialogProps {
  onSubmit: (rows: number, cols: number) => void
  onClose: () => void
}

const TableDialog: React.FC<TableDialogProps> = ({ onSubmit, onClose }) => {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [withHeader, setWithHeader] = useState(true)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  
  const dialogRef = useRef<HTMLDivElement>(null)

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rows > 0 && cols > 0) {
      onSubmit(rows, cols)
      onClose()
    }
  }

  const handleGridClick = (selectedRows: number, selectedCols: number) => {
    setRows(selectedRows)
    setCols(selectedCols)
  }

  const renderTablePreview = () => {
    const maxRows = 10
    const maxCols = 10
    const cells = []

    for (let row = 1; row <= maxRows; row++) {
      for (let col = 1; col <= maxCols; col++) {
        const isSelected = row <= rows && col <= cols
        const isHovered = hoveredCell && row <= hoveredCell.row && col <= hoveredCell.col
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`w-4 h-4 border border-gray-300 cursor-pointer transition-colors ${
              isSelected || isHovered
                ? 'bg-blue-500 border-blue-600'
                : 'bg-white hover:bg-gray-100'
            }`}
            onMouseEnter={() => setHoveredCell({ row, col })}
            onClick={() => handleGridClick(row, col)}
          />
        )
      }
    }

    return (
      <div 
        className="inline-grid grid-cols-10 gap-0 p-2 border border-gray-200 rounded"
        onMouseLeave={() => setHoveredCell(null)}
      >
        {cells}
      </div>
    )
  }

  const renderActualTablePreview = () => {
    const tableRows = []
    
    for (let row = 0; row < rows; row++) {
      const cells = []
      for (let col = 0; col < cols; col++) {
        const isHeader = withHeader && row === 0
        cells.push(
          <td
            key={col}
            className={`border border-gray-300 px-2 py-1 text-xs ${
              isHeader ? 'bg-gray-100 font-semibold' : 'bg-white'
            }`}
          >
            {isHeader ? `Header ${col + 1}` : `Cell ${row}-${col + 1}`}
          </td>
        )
      }
      
      tableRows.push(
        <tr key={row}>
          {cells}
        </tr>
      )
    }

    return (
      <div className="overflow-auto max-h-48 border border-gray-200 rounded">
        <table className="w-full border-collapse">
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    )
  }

  const displayRows = hoveredCell ? hoveredCell.row : rows
  const displayCols = hoveredCell ? hoveredCell.col : cols

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Table className="w-5 h-5" />
            Sisipkan Tabel
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
          {/* Grid Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Ukuran Tabel
            </label>
            <div className="flex flex-col items-center gap-2">
              {renderTablePreview()}
              <p className="text-sm text-gray-600">
                <Grid className="w-4 h-4 inline mr-1" />
                {displayRows} × {displayCols} tabel
              </p>
            </div>
          </div>

          {/* Manual Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Baris
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kolom
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={withHeader}
                onChange={(e) => setWithHeader(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                Sertakan baris header
              </span>
            </label>
          </div>

          {/* Table Preview */}
          {rows > 0 && cols > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview Tabel
              </label>
              {renderActualTablePreview()}
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
              disabled={rows <= 0 || cols <= 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sisipkan Tabel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TableDialog
