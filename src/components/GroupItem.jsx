function GroupItem({ group, isSelected, onSelect, onDelete }) {
  // Check if this is a system group that can't be deleted
  const isSystemGroup = group.id === 'all' || group.id === 'default'

  // Get styles based on whether group is selected
  const getContainerStyles = () => {
    if (isSelected) {
      return 'bg-gray-900 text-white'
    }
    return 'text-gray-700 hover:bg-gray-100'
  }

  // Get color for the dot indicator
  const getDotColor = () => {
    if (isSelected) {
      return '#fff'
    }
    return group.color
  }

  // Handle delete button click (stop event from bubbling to parent)
  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      onClick={onSelect}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-all duration-150 ${getContainerStyles()}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: getDotColor() }}
        />
        <span className="text-sm font-medium truncate">
          {group.name}
        </span>
      </div>
      
      {!isSystemGroup && (
        <button
          onClick={handleDeleteClick}
          className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded opacity-0 group-hover:opacity-100"
          title="Delete group"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default GroupItem

