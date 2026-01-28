# Docker Setup

Run the full stack (frontend + backend + MySQL) with Docker Compose.

## Quick Start

```bash
# Copy env example
cp env.docker.example .env

# Edit .env if needed (defaults work for local dev)
# nano .env

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Open **http://localhost** in your browser.

---

## Services

| Service | Port | Description |
|---------|------|-------------|
| **ui** | 80 | React frontend (nginx) |
| **api** | 4000 | NestJS backend (GraphQL) |
| **mysql** | 3306 | MySQL database |

---

## Environment Variables

Create `.env` from `env.docker.example`:

```bash
cp env.docker.example .env
```

Key variables:

- `MYSQL_ROOT_PASSWORD` - MySQL root password
- `MYSQL_DATABASE` - Database name (default: `landing`)
- `MYSQL_USER` / `MYSQL_PASSWORD` - App DB user
- `CORS_ORIGIN` - Allowed origin for API (default: `http://localhost`)
- `VITE_GRAPHQL_URI` - GraphQL endpoint for frontend build (default: `/graphql`)

---

## Commands

### Start services

```bash
docker-compose up -d
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f ui
docker-compose logs -f mysql
```

### Rebuild after code changes

```bash
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build api
docker-compose up -d --build ui
```

### Stop services

```bash
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v
```

### Access containers

```bash
# Backend shell
docker-compose exec api sh

# MySQL shell
docker-compose exec mysql mysql -u root -p

# Frontend (nginx) shell
docker-compose exec ui sh
```

---

## Development

### Backend only (with Docker MySQL)

```bash
# Start MySQL
docker-compose up -d mysql

# Run backend locally (from api/)
cd api
yarn install
yarn dev
```

### Frontend only (with Docker backend)

```bash
# Start backend + MySQL
docker-compose up -d api mysql

# Run frontend locally (from ui/)
cd ui
yarn install
yarn dev
```

---

## Production Build

```bash
# Build images
docker-compose build

# Tag and push (if using a registry)
docker tag landing-api:latest your-registry/landing-api:latest
docker tag landing-ui:latest your-registry/landing-ui:latest
docker push your-registry/landing-api:latest
docker push your-registry/landing-ui:latest
```

---

## Troubleshooting

- **Port already in use**: Change `UI_PORT` or `MYSQL_PORT` in `.env`
- **MySQL connection refused**: Wait for MySQL healthcheck (10-30s on first start)
- **GraphQL 404**: Ensure `VITE_GRAPHQL_URI=/graphql` in `.env` (frontend build-time)
- **CORS errors**: Set `CORS_ORIGIN` in `.env` to match your frontend URL

---

## Architecture

```
┌─────────┐
│   UI    │ (nginx:80) → serves React build
└────┬────┘
     │ /graphql
     ↓
┌─────────┐
│   API   │ (Node:4000) → NestJS GraphQL
└────┬────┘
     │
     ↓
┌─────────┐
│  MySQL  │ (3306) → Database
└─────────┘
```

All services on `landing-network` bridge network.
