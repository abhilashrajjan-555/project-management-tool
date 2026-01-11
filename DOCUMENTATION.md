# Project Management Tool Documentation

A full-featured project management application built with Next.js 15, TypeScript, and Tailwind CSS. This tool is designed for developers to manage their projects with Kanban boards and todo lists, all stored locally in the browser.

## Features

### 1. Project Management
- **Create Projects**: Create multiple projects with names and descriptions
- **Switch Projects**: Easily switch between different projects
- **Delete Projects**: Remove projects you no longer need
- **Local Storage**: All data persists in browser localStorage

### 2. Kanban Board
- **Three Columns**: Todo, In Progress, and Done
- **Drag & Drop**: Drag tasks between columns to update their status
- **Task Management**:
  - Add new tasks to any column
  - Edit task title and description inline
  - Delete tasks
  - View task creation date
- **Visual Feedback**: Hover effects and drag overlays for better UX

### 3. Todo List
- **Quick Todos**: Simple checklist for quick task tracking
- **Toggle Completion**: Check/uncheck todos
- **Progress Tracking**: See completed vs total count
- **Delete Todos**: Remove completed or unwanted items

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Storage**: Browser localStorage
- **Runtime**: Node.js or Bun

## Project Structure

```
project-management-tool/
├── app/
│   ├── page.tsx                 # Main application page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── KanbanBoard.tsx          # Kanban board container with DnD
│   ├── KanbanColumn.tsx         # Individual column (Todo/In Progress/Done)
│   ├── TaskCard.tsx             # Task card with edit/delete
│   ├── TodoList.tsx             # Todo list component
│   ├── ProjectSelector.tsx      # Project selection sidebar
│   └── CreateProjectModal.tsx   # Modal for creating projects
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   └── storage.ts               # localStorage utilities
└── package.json                 # Dependencies
```

## Getting Started

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Usage Guide

### Creating Your First Project

1. When you first open the app, you'll see a prompt to create a project
2. Click "Create Your First Project" or the "+ New Project" button
3. Enter a project name (required) and description (optional)
4. Click "Create Project"

### Managing Tasks on the Kanban Board

**Adding a Task:**
1. Click the "+ Add" button in any column (Todo, In Progress, Done)
2. A new task appears with default title "New Task"
3. Click "Edit" to modify the title and description
4. Click "Save" to confirm changes

**Moving Tasks:**
1. Click and drag a task card
2. Drop it in a different column to change its status
3. The task updates automatically

**Editing a Task:**
1. Click "Edit" on any task card
2. Modify the title and/or description
3. Click "Save" to confirm or "Cancel" to discard changes

**Deleting a Task:**
1. Click "Delete" on the task card
2. The task is removed immediately

### Using the Todo List

**Adding a Todo:**
1. Type your todo text in the input field
2. Click "Add" or press Enter
3. The todo appears in the list

**Completing a Todo:**
1. Click the checkbox next to a todo
2. Completed todos show with strikethrough text

**Deleting a Todo:**
1. Click "Delete" next to any todo
2. The todo is removed immediately

### Switching Between Projects

1. View all projects in the left sidebar
2. Click on any project to view its tasks and todos
3. The currently selected project is highlighted in blue

### Deleting a Project

1. Click "Delete" on the project in the sidebar
2. Confirm the deletion
3. All tasks and todos for that project are permanently removed

## Data Storage

All data is stored in browser localStorage under the key `project-management-data`. This means:

- ✅ Data persists between sessions
- ✅ No server required
- ✅ Works offline
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete your projects

## Architecture

### State Management

The app uses React's built-in `useState` hooks for state management:
- Projects are initialized from localStorage on mount
- Changes to projects trigger automatic saves to localStorage
- All state updates are immutable to prevent bugs

### Component Hierarchy

```
Home (app/page.tsx)
├── ProjectSelector
│   └── CreateProjectModal
└── For each project:
    ├── Project Header
    ├── KanbanBoard
    │   ├── KanbanColumn (Todo)
    │   │   └── TaskCard(s)
    │   ├── KanbanColumn (In Progress)
    │   │   └── TaskCard(s)
    │   └── KanbanColumn (Done)
    │       └── TaskCard(s)
    └── TodoList
```

### Data Flow

1. **Loading**: Projects load from localStorage into state on mount
2. **Updates**: User actions update state via handler functions
3. **Persistence**: `useEffect` watches for state changes and saves to localStorage
4. **UI**: Components re-render automatically when state changes

## TypeScript Types

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  todos: TodoItem[];
}
```

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  updatedAt: string;
}
```

### TodoItem
```typescript
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  projectId: string;
}
```

## Customization

### Styling

The app uses Tailwind CSS. To customize colors, spacing, or other design elements:

1. Edit `tailwind.config.ts` for global theme changes
2. Modify component class names for specific changes
3. The app supports dark mode automatically via Tailwind's `dark:` classes

### Adding Features

To extend the application:

1. **Add new task properties**: Update the `Task` interface in `lib/types.ts`
2. **Custom columns**: Modify the `status` type and update `KanbanBoard.tsx`
3. **Export/Import**: Add functions in `lib/storage.ts` for JSON export/import
4. **Due dates**: Add date fields to tasks and filtering logic
5. **Tags/Labels**: Add tag arrays to tasks and filtering UI

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Responsive design works on mobile

## Limitations

- No user authentication (single-user, browser-based)
- No cloud sync (data stored locally only)
- No collaboration features
- Storage limited by browser localStorage limits (~5-10MB)

## Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Drag & Drop Not Working
- Ensure JavaScript is enabled
- Try refreshing the page
- Check browser console for errors

### Dark Mode Issues
- Dark mode follows your system preferences
- Some browsers may not support automatic dark mode detection

## Future Enhancements

Potential features to add:
- [ ] Export/Import projects as JSON
- [ ] Task due dates and reminders
- [ ] Task priority levels
- [ ] Tags and filters
- [ ] Search functionality
- [ ] Archive completed tasks
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts
- [ ] Cloud sync option
- [ ] Team collaboration

## Contributing

This is a standalone project. To contribute:
1. Fork the repository
2. Make your changes
3. Test thoroughly (run `npm run lint` and `npm run build`)
4. Submit a pull request

## License

MIT License - feel free to use and modify for your projects.

## Support

For issues or questions:
- Check this documentation
- Review the code comments
- Open an issue on GitHub (if applicable)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
