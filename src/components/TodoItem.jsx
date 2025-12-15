import { useState, useEffect, useRef } from 'react'

function TodoItem({ todo, isEditing, onEdit, onSave, onCancel, onDelete, onToggle, group }) {
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Update edit text when todo text changes
  useEffect(() => {
    setEditText(todo.text)
  }, [todo.text])

  // Handle saving the edited text
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedText = editText.trim()
    if (trimmedText) {
      onSave(trimmedText)
    } else {
      onCancel()
    }
  }

  // Show edit form when editing
  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 text-sm"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  // Get styles for completed todos
  const completedStyles = todo.completed ? 'opacity-60' : ''
  const textStyles = todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
  const checkboxStyles = todo.completed
    ? 'bg-gray-900 border-gray-900'
    : 'border-gray-300 hover:border-gray-400'

  // Check if we should show the group label
  const showGroupLabel = group && group.id !== 'default'

  return (
    <div className={`bg-white rounded-lg border border-gray-100 p-3 transition-all duration-150 hover:border-gray-200 hover:shadow-sm group ${completedStyles}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${checkboxStyles}`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        {/* Todo text and group label */}
        <div className="flex-1 min-w-0">
          <p className={`break-words text-sm ${textStyles}`}>
            {todo.text}
          </p>
          
          {showGroupLabel && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-xs text-gray-400">
                {group.name}
              </span>
            </div>
          )}
        </div>
        
        {/* Edit and delete buttons (shown on hover) */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded"
            title="Edit todo"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
            title="Delete todo"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem

