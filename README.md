# Landing Page - Full Stack Application

A modern landing page built with React + Vite + TypeScript frontend and NestJS + GraphQL + MongoDB backend.

## Project Structure

```
landing/
├── frontend/          # React + Vite + TypeScript
└── backend/           # NestJS + GraphQL + MongoDB
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/landing
PORT=4000
```

5. Start the backend server:
```bash
npm run start:dev
```

The GraphQL playground will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Features

### Backend
- NestJS framework with TypeScript
- GraphQL API with Apollo Server
- MongoDB integration with Mongoose
- Lead management system (email collection)
- CORS enabled for frontend communication

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Apollo Client for GraphQL queries
- Modern, responsive UI with gradient design
- Email subscription form

## GraphQL API

### Mutations

**Create Lead**
```graphql
mutation {
  createLead(createLeadInput: {
    email: "user@example.com"
    name: "John Doe"
    subscribed: true
  }) {
    id
    email
    name
    subscribed
    createdAt
  }
}
```

### Queries

**Get All Leads**
```graphql
query {
  leads {
    id
    email
    name
    subscribed
    createdAt
  }
}
```

**Get Single Lead**
```graphql
query {
  lead(id: "lead-id") {
    id
    email
    name
    subscribed
  }
}
```

## MongoDB Schema

### Lead Schema
```typescript
{
  email: string (required, unique)
  name?: string (optional)
  subscribed: boolean (default: false)
  source?: string (optional)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Development

### Backend Commands
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
