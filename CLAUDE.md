# Project Management Tool - CLAUDE.md

## Project Overview

A full-featured, browser-based project management tool built for developers. This application enables users to manage multiple projects with Kanban boards and todo lists, all stored locally in the browser.

**Target Users**: Developers and technical project managers who need a simple, fast, offline-capable project management tool.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **Storage**: Browser localStorage
- **Runtime**: Node.js 18+ or Bun

## Architecture

### State Management
- React `useState` for all state
- Initial state loaded from localStorage using lazy initialization
- Auto-save to localStorage via `useEffect` on state changes
- No external state management library needed

### Component Structure

```
Home (Client Component)
├── State: projects, currentProjectId, isCreateModalOpen
├── ProjectSelector (Client Component)
│   └── CreateProjectModal (Client Component)
└── Current Project View
    ├── KanbanBoard (Client Component)
    │   ├── DndContext (dnd-kit)
    │   ├── KanbanColumn × 3 (todo, in-progress, done)
    │   │   ├── Droppable area
    │   │   └── TaskCard × N (Sortable)
    │   └── DragOverlay
    └── TodoList (Client Component)
```

### Data Model

**Project**: Container for tasks and todos
- `id`: Unique identifier (UUID)
- `name`: Project name
- `description`: Project description
- `tasks`: Array of Task objects
- `todos`: Array of TodoItem objects
- `createdAt`, `updatedAt`: ISO timestamps

**Task**: Kanban board item
- `id`: Unique identifier (UUID)
- `title`: Task title
- `description`: Task description
- `status`: 'todo' | 'in-progress' | 'done'
- `createdAt`, `updatedAt`: ISO timestamps

**TodoItem**: Simple checklist item
- `id`: Unique identifier (UUID)
- `text`: Todo text
- `completed`: Boolean
- `projectId`: Reference to parent project
- `createdAt`: ISO timestamp

### Storage Layer

**File**: `lib/storage.ts`

All localStorage operations are centralized in this module:
- `getProjects()`: Retrieve all projects
- `saveProjects(projects)`: Save all projects
- `addProject(project)`: Add a new project
- `updateProject(id, updates)`: Update specific project
- `deleteProject(id)`: Delete project by ID
- `getProject(id)`: Get single project by ID

**Storage Key**: `project-management-data`

**Error Handling**: All storage operations include try-catch blocks that log errors to console but don't crash the app.

## Key Features

### 1. Kanban Board (Drag & Drop)
- Uses @dnd-kit for accessibility-friendly drag-and-drop
- Three fixed columns: Todo, In Progress, Done
- Drag tasks between columns to update status
- Visual feedback during drag (hover states, drag overlay)
- Inline editing of task title and description

### 2. Todo List
- Simple checkbox-based task list
- Separate from Kanban tasks (different use cases)
- Quick add with Enter key support
- Progress indicator (X/Y completed)

### 3. Project Management
- Multiple projects supported
- Sidebar for project selection
- Active project highlighted
- Delete with confirmation
- Each project has isolated tasks and todos

### 4. Local Storage Persistence
- All data stored in browser localStorage
- Automatic save on every state change
- No backend required
- Offline-first architecture

## Setup Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Testing Strategy

**Manual Testing Checklist**:
- [ ] Create a new project
- [ ] Add tasks to each Kanban column
- [ ] Drag tasks between columns
- [ ] Edit task title and description
- [ ] Delete tasks
- [ ] Add todos and check them off
- [ ] Delete todos
- [ ] Switch between projects
- [ ] Delete a project
- [ ] Refresh page (verify data persists)
- [ ] Test on mobile device
- [ ] Test dark mode

**Browser Testing**:
- Chrome/Edge (primary)
- Firefox
- Safari
- Mobile browsers

## Deployment

This is a static Next.js app that can be deployed to:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- GitHub Pages (with static export)
- Any static hosting

**Build command**: `npm run build`
**Output directory**: `.next` (or `out` if using static export)

## Known Limitations

1. **Single User**: No authentication, designed for single-user use
2. **Browser-Specific**: Data stored per browser (no cross-device sync)
3. **No Cloud Backup**: Data lost if browser storage is cleared
4. **Storage Limit**: Constrained by browser localStorage limits (~5-10MB)
5. **No Collaboration**: Not designed for team use

## Anti-Patterns to Avoid

❌ **Don't**:
- Don't add authentication (out of scope for localStorage-based app)
- Don't add server-side features (breaks offline-first design)
- Don't use `useEffect` to set state on mount (use lazy initialization)
- Don't mutate state directly (always use immutable updates)
- Don't ignore TypeScript errors (strict mode enabled)

✅ **Do**:
- Keep all state in the top-level component (simple data flow)
- Use TypeScript interfaces for all data structures
- Validate data when reading from localStorage
- Handle edge cases (empty projects, no current project)
- Preserve dark mode compatibility

## Future Enhancement Ideas

If this project is extended, consider:
- [ ] Export/Import as JSON (backup/restore)
- [ ] Task due dates and reminders
- [ ] Task priority levels (high/medium/low)
- [ ] Tags/labels for tasks
- [ ] Search and filter functionality
- [ ] Keyboard shortcuts (accessibility)
- [ ] Undo/redo functionality
- [ ] Archive completed tasks
- [ ] Custom column names
- [ ] IndexedDB for larger storage capacity

## Code Organization Principles

1. **Component Files**: One component per file
2. **TypeScript Types**: Centralized in `lib/types.ts`
3. **Utilities**: Centralized in `lib/` directory
4. **Client Components**: All components use `'use client'` directive (interactive app)
5. **Prop Drilling**: Acceptable for this small app (no context/state library needed)

## Performance Considerations

- **Lazy State Initialization**: Prevents unnecessary localStorage reads
- **Memoization**: Not needed (small data sets, simple components)
- **Virtual Scrolling**: Not needed (typical project has <100 tasks)
- **Code Splitting**: Automatic via Next.js dynamic imports

## Accessibility

- Drag-and-drop uses @dnd-kit (screen reader friendly)
- Semantic HTML (buttons, forms, headers)
- Keyboard navigation support
- Focus states on interactive elements
- Dark mode support (follows system preferences)

## Common Development Tasks

### Adding a New Field to Tasks

1. Update `Task` interface in `lib/types.ts`
2. Update task creation in `app/page.tsx` (handleAddTask)
3. Update task editing in `components/TaskCard.tsx`
4. Add UI for the new field

### Changing Kanban Columns

1. Update `Task['status']` type in `lib/types.ts`
2. Update columns in `components/KanbanBoard.tsx`
3. Update task filtering logic

### Adding Export/Import

1. Add functions to `lib/storage.ts`:
   - `exportProjects()`: Return JSON string
   - `importProjects(json)`: Parse and validate JSON
2. Add UI buttons in `app/page.tsx`
3. Handle file download/upload

## Troubleshooting

**Issue**: Data not persisting
- Check browser console for localStorage errors
- Verify not in incognito/private mode
- Check if localStorage is enabled in browser settings

**Issue**: Drag-and-drop not working
- Check browser console for errors
- Verify @dnd-kit packages are installed
- Ensure JavaScript is enabled

**Issue**: Build fails
- Run `npm run lint` to check for errors
- Run `npx tsc --noEmit` to check TypeScript
- Clear `.next` directory and rebuild

## Code Review Checklist

Before committing changes:
- [ ] `npm run lint` passes with no errors
- [ ] `npx tsc --noEmit` passes with no errors
- [ ] `npm run build` succeeds
- [ ] Manual testing of affected features
- [ ] No console errors in browser
- [ ] Dark mode still works
- [ ] Mobile responsive still works

---

Last updated: 2026-01-11
