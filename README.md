# To-Do List Application

A modern, feature-rich to-do list application built with React, Vite, and Tailwind CSS.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete todos
- 🔍 **Search Functionality**: Search through all your todos
- 📁 **Groups**: Organize todos into custom groups with color coding
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 💾 **Local Storage**: All data is automatically saved to your browser's local storage
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Create Todos**: Type in the input field and click "Add" or press Enter
2. **Complete Todos**: Click the checkbox next to a todo to mark it as complete
3. **Edit Todos**: Click the edit icon to modify a todo
4. **Delete Todos**: Click the delete icon to remove a todo
5. **Search**: Use the search bar to filter todos by text
6. **Create Groups**: Click "New Group" in the sidebar to create a custom group
7. **Filter by Group**: Click on a group in the sidebar to view only todos from that group
8. **Delete Groups**: Click the X icon on custom groups (system groups cannot be deleted)

## Tech Stack

- **React 19**: UI library
- **Vite 7**: Build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **LocalStorage**: Data persistence

## Project Structure

```
src/
├── components/
│   ├── AddGroupModal.jsx    # Modal for creating new groups
│   ├── AddTodoForm.jsx      # Form for adding new todos
│   ├── GroupItem.jsx        # Individual group item in sidebar
│   ├── SearchBar.jsx        # Search input component
│   ├── Sidebar.jsx          # Sidebar with groups list
│   ├── TodoItem.jsx         # Individual todo item
│   └── TodoList.jsx         # List of todos
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles with Tailwind imports
```
