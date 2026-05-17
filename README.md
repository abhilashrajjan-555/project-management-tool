# Project Management Tool

Kanban-style project and task management app with local-first storage.
Built for fast execution tracking across multiple projects.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## Overview

This application helps teams and individual builders manage execution without backend setup.

- Create and switch between multiple projects
- Track task flow with a drag-and-drop Kanban board
- Maintain lightweight todos for quick follow-ups
- Persist all data in browser `localStorage`

## Problem

Small builders and teams often need a simple execution board without setting up accounts, databases, or a full project management system.

## Solution

This app provides a local-first Kanban workspace that runs in the browser. Users can create projects, move tasks through a simple workflow, and track quick todos without backend infrastructure.

## Core Features

- Multi-project workspace with create/switch/delete flows
- Kanban board with Todo, In Progress, and Done columns
- Drag-and-drop task status updates using `@dnd-kit`
- Inline task editing and deletion
- Per-project todo list with completion tracking
- Responsive UI for desktop and mobile

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- DnD: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- Storage: Browser `localStorage`

## Project Structure

```text
project-management-tool/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── KanbanBoard.tsx
│   ├── KanbanColumn.tsx
│   ├── TaskCard.tsx
│   ├── TodoList.tsx
│   ├── ProjectSelector.tsx
│   └── CreateProjectModal.tsx
├── lib/
│   ├── types.ts
│   └── storage.ts
└── DOCUMENTATION.md
```

## Quick Start

```bash
git clone https://github.com/abhilashrajjan-555/project-management-tool.git
cd project-management-tool
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Data & Persistence

All project data is stored in browser `localStorage`.

- No backend required
- Works offline in the same browser profile
- Data does not sync across devices by default
- Clearing browser storage removes saved projects/tasks

## Use Cases

- Personal project tracking
- Lightweight team planning prototype
- Internal workflow demos
- Frontend architecture sample for local-first apps

## What This Shows

- Local-first product design
- Drag-and-drop task workflow implementation
- Clear React component separation
- Browser persistence with explicit limitations
- Practical MVP scope control

## Documentation

- Detailed guide: [DOCUMENTATION.md](./DOCUMENTATION.md)
- Quick setup: [QUICK-START.md](./QUICK-START.md)
- Build summary: [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)

## License

MIT.
