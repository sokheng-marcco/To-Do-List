import { useState } from 'react'
import GroupItem from './GroupItem'
import AddGroupModal from './AddGroupModal'

function Sidebar({ groups, selectedGroup, onSelectGroup, onAddGroup, onDeleteGroup }) {
  const [showAddModal, setShowAddModal] = useState(false)

  // Handle opening the add group modal
  const handleOpenModal = () => {
    setShowAddModal(true)
  }

  // Handle closing the add group modal
  const handleCloseModal = () => {
    setShowAddModal(false)
  }

  // Handle selecting a group
  const handleSelectGroup = (groupId) => {
    onSelectGroup(groupId)
  }

  // Handle deleting a group
  const handleDeleteGroup = (groupId) => {
    onDeleteGroup(groupId)
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Groups
        </h2>
        <button
          onClick={handleOpenModal}
          className="w-full px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Group
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {groups.map(group => (
          <GroupItem
            key={group.id}
            group={group}
            isSelected={selectedGroup === group.id}
            onSelect={() => handleSelectGroup(group.id)}
            onDelete={() => handleDeleteGroup(group.id)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddGroupModal
          onClose={handleCloseModal}
          onAdd={onAddGroup}
        />
      )}
    </div>
  )
}

export default Sidebar

