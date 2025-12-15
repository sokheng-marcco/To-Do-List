import { useState } from 'react'

// Available colors for groups
const GROUP_COLORS = [
  '#ec4899', '#f43f5e',
  '#ef4444', '#f59e0b', '#10b981', '#06b6d4',
  '#3b82f6', '#a855f7', 
]

function AddGroupModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (trimmedName) {
      onAdd(trimmedName, selectedColor)
      setName('')
      onClose()
    }
  }

  // Handle clicking outside the modal to close it
  const handleBackdropClick = () => {
    onClose()
  }

  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  // Get styles for color button based on selection
  const getColorButtonStyles = (color) => {
    if (selectedColor === color) {
      return 'border-gray-900 scale-110'
    }
    return 'border-gray-200 hover:border-gray-300 hover:scale-105'
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
        onClick={handleModalClick}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Create New Group
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 text-sm transition-all"
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Color
            </label>
            <div className="flex flex-wrap gap-2.5">
              {GROUP_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${getColorButtonStyles(color)}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGroupModal

