import { useState, useEffect } from 'react'

function AddTodoForm({ onAdd, selectedGroup, groups }) {
  const [text, setText] = useState('')
  const [groupId, setGroupId] = useState(selectedGroup === 'all' ? 'default' : selectedGroup)

  useEffect(() => {
    if (selectedGroup !== 'all') {
      setGroupId(selectedGroup)
    }
  }, [selectedGroup])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText) {
      onAdd(trimmedText, groupId)
      setText('')
    }
  }

  // Get groups that can be selected (exclude 'all')
  const getSelectableGroups = () => {
    return groups.filter(group => group.id !== 'all')
  }

  const selectableGroups = getSelectableGroups()
  const showGroupSelect = selectedGroup === 'all'

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 placeholder-gray-400 text-sm transition-all"
          autoFocus
        />
        
        {showGroupSelect && (
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="px-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 text-sm transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNSA1TDkgMSIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==')] bg-[length:10px_6px] bg-no-repeat bg-[right_12px_center]"
          >
            {selectableGroups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
        
        <button
          type="submit"
          className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
    </form>
  )
}

export default AddTodoForm

