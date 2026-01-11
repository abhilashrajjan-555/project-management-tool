# Project Management Tool

A full-featured project management application built for developers. Manage multiple projects with Kanban boards and todo lists, all stored locally in your browser.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## Features

✨ **Project Management** - Create, switch, and manage multiple projects
📊 **Kanban Board** - Visual task management with drag-and-drop
✅ **Todo Lists** - Quick task tracking with checkboxes
💾 **Local Storage** - All data persists in your browser
🎨 **Beautiful UI** - Clean, modern interface with dark mode support
📱 **Responsive** - Works great on desktop and mobile

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd project-management-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Create a Project** - Click "New Project" to get started
2. **Add Tasks** - Use the Kanban board to create tasks in any column
3. **Drag & Drop** - Move tasks between columns (Todo → In Progress → Done)
4. **Add Todos** - Use the todo list for quick checklist items
5. **Switch Projects** - Select different projects from the sidebar

For detailed usage instructions, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **@dnd-kit** - Drag and drop functionality
- **localStorage** - Browser-based data persistence

## Project Structure

```
project-management-tool/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── KanbanBoard.tsx   # Kanban board with drag-and-drop
│   ├── KanbanColumn.tsx  # Individual Kanban columns
│   ├── TaskCard.tsx      # Task card component
│   ├── TodoList.tsx      # Todo list component
│   └── ...
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript interfaces
│   └── storage.ts        # localStorage utilities
└── DOCUMENTATION.md       # Detailed documentation
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Development

### Prerequisites

- Node.js 18+ or Bun
- Modern browser with localStorage support

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Kanban Board
- Three customizable columns (Todo, In Progress, Done)
- Smooth drag-and-drop between columns
- Inline editing of tasks
- Task creation dates
- Delete tasks with one click

### Todo List
- Quick add with Enter key
- Check/uncheck completion status
- Progress tracking (X/Y completed)
- Simple deletion

### Project Management
- Unlimited projects
- Project descriptions
- Quick project switching
- Bulk deletion

## Data Storage

All data is stored locally in your browser using localStorage. This means:

✅ No server required
✅ Works offline
✅ Fast and responsive
⚠️ Data is browser-specific (not synced across devices)
⚠️ Clearing browser data will delete your projects

## Browser Support

- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

## Documentation

For comprehensive documentation, including:
- Detailed feature descriptions
- Architecture overview
- TypeScript types
- Customization guide
- Troubleshooting

See [DOCUMENTATION.md](./DOCUMENTATION.md).

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (`npm run lint`, `npm run build`)
5. Submit a pull request

## License

MIT License - feel free to use and modify for your projects.

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@dnd-kit](https://dndkit.com/)

---

**Need help?** Check out [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed usage instructions.
