import { useState } from 'react'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'

function TodoList({ todos, onAddTodo, onUpdateTodo, onDeleteTodo, onToggleTodo, selectedGroup, groups }) {
  const [editingId, setEditingId] = useState(null)

  // Handle saving an edited todo
  const handleSaveEdit = (id, text) => {
    onUpdateTodo(id, { text: text })
    setEditingId(null)
  }

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingId(null)
  }

  // Handle starting to edit a todo
  const handleStartEdit = (id) => {
    setEditingId(id)
  }

  // Get empty message based on selected group
  const getEmptyMessage = () => {
    if (selectedGroup === 'all') {
      return 'No todos yet. Create your first task!'
    }
    return 'No todos in this group. Add one to get started!'
  }

  // Find the group for a todo
  const getTodoGroup = (todo) => {
    return groups.find(group => group.id === todo.groupId)
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <AddTodoForm
        onAdd={onAddTodo}
        selectedGroup={selectedGroup}
        groups={groups}
      />
      
      {todos.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            {getEmptyMessage()}
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onEdit={() => handleStartEdit(todo.id)}
              onSave={(text) => handleSaveEdit(todo.id, text)}
              onCancel={handleCancelEdit}
              onDelete={() => onDeleteTodo(todo.id)}
              onToggle={() => onToggleTodo(todo.id)}
              group={getTodoGroup(todo)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList

