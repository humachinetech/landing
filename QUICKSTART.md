# Quick Start Guide

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

## Installation

### Option 1: Install All Dependencies at Once
```bash
npm run install:all
```

### Option 2: Install Separately

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## Configuration

### Backend Environment Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` and set your MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/landing
PORT=4000
```

**For MongoDB Atlas (cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/landing
PORT=4000
```

## Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm run start:dev
```

The GraphQL playground will be available at: **http://localhost:4000/graphql**

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

The frontend will be available at: **http://localhost:3000**

## Testing the GraphQL API

1. Open the GraphQL Playground at `http://localhost:4000/graphql`

2. Try creating a lead:
```graphql
mutation {
  createLead(createLeadInput: {
    email: "test@example.com"
    name: "Test User"
    subscribed: true
    source: "landing-page"
  }) {
    id
    email
    name
    subscribed
    createdAt
  }
}
```

3. Query all leads:
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

## Project Structure

```
landing/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── graphql/       # GraphQL queries/mutations
│   │   └── lib/           # Apollo Client setup
│   └── package.json
│
├── backend/               # NestJS + GraphQL + MongoDB
│   ├── src/
│   │   ├── leads/         # Leads module
│   │   │   ├── dto/       # Data Transfer Objects
│   │   │   ├── entities/  # GraphQL entities
│   │   │   ├── schemas/   # MongoDB schemas
│   │   │   ├── leads.resolver.ts
│   │   │   └── leads.service.ts
│   │   └── app.module.ts
│   └── package.json
│
└── package.json           # Root package.json
```

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running: `mongod` or check MongoDB service
- Verify the connection string in `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend default port: 4000
- Frontend default port: 3000
- Change ports in `backend/.env` and `frontend/vite.config.ts` if needed

### CORS Errors
- Backend CORS is configured for `http://localhost:3000`
- If using a different frontend port, update `backend/src/main.ts`

## Next Steps

1. Customize the landing page design in `frontend/src/components/LandingPage.tsx`
2. Add more GraphQL queries/mutations as needed
3. Extend the MongoDB schema with additional fields
4. Add authentication if needed
5. Deploy to your preferred hosting platform

## Need Help?

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [GraphQL Documentation](https://graphql.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
