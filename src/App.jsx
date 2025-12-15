import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TodoList from './components/TodoList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  // Load todos from localStorage when app starts
  const getInitialTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    return []
  }

  // Load groups from localStorage when app starts
  const getInitialGroups = () => {
    const savedGroups = localStorage.getItem('groups')
    if (savedGroups) {
      return JSON.parse(savedGroups)
    }
    // Default groups if nothing is saved
    return [
      { id: 'all', name: 'All Tasks', color: '#6366f1' },
      { id: 'default', name: 'Personal', color: '#8b5cf6' }
    ]
  }

  const [todos, setTodos] = useState(getInitialTodos)
  const [groups, setGroups] = useState(getInitialGroups)
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Save groups whenever they change
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  // Get the list of todos to show based on selected group and search
  const getFilteredTodos = () => {
    let result = todos

    // Filter by group
    if (selectedGroup !== 'all') {
      result = result.filter(todo => todo.groupId === selectedGroup)
    }

    // Filter by search query
    if (searchQuery !== '') {
      const searchLower = searchQuery.toLowerCase()
      result = result.filter(todo => todo.text.toLowerCase().includes(searchLower))
    }

    return result
  }

  const filteredTodos = getFilteredTodos()

  // Add a new todo
  const addTodo = (text, groupId = 'default') => {
    const newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      groupId: groupId,
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
  }

  // Update an existing todo
  const updateTodo = (id, updates) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...updates }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // Delete a todo
  const deleteTodo = (id) => {
    const remainingTodos = todos.filter(todo => todo.id !== id)
    setTodos(remainingTodos)
  }

  // Toggle completed status of a todo
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      updateTodo(id, { completed: !todo.completed })
    }
  }

  // Add a new group
  const addGroup = (name, color) => {
    const newGroup = {
      id: Date.now().toString(),
      name: name,
      color: color
    }
    setGroups([...groups, newGroup])
  }

  // Delete a group
  const deleteGroup = (groupId) => {
    // Can't delete system groups
    if (groupId === 'all' || groupId === 'default') {
      return
    }

    // Move todos from deleted group to default group
    const updatedTodos = todos.map(todo => {
      if (todo.groupId === groupId) {
        return { ...todo, groupId: 'default' }
      }
      return todo
    })
    setTodos(updatedTodos)

    // Remove the group
    const remainingGroups = groups.filter(group => group.id !== groupId)
    setGroups(remainingGroups)

    // If we deleted the selected group, switch to 'all'
    if (selectedGroup === groupId) {
      setSelectedGroup('all')
    }
  }

  // Get the name of the currently selected group
  const getSelectedGroupName = () => {
    const group = groups.find(g => g.id === selectedGroup)
    if (group) {
      return group.name
    }
    return 'All Tasks'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        onAddGroup={addGroup}
        onDeleteGroup={deleteGroup}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {getSelectedGroupName()}
          </h1>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <TodoList
            todos={filteredTodos}
            onAddTodo={addTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
            selectedGroup={selectedGroup}
            groups={groups}
          />
        </main>
      </div>
    </div>
  )
}

export default App
