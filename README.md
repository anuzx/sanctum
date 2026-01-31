# Techonologies used

1.Nextjs -> for frontend <br>
2.bun -> for run time <br>
3.upstach/redis -> for database<br>
4.upstach/realtime -> for realtime communication <br>
5.elysia -> for backend <br>
6.zod -> for data validation<br>
7.Tanstack_Query -> for query and mutation of endpoints <br>
8.Tailwind-css -> for styling

## Running Locally with Docker

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Clone the repository
```bash
git clone https://github.com/anuzx/sanctum.git
cd scantum
```
2. Build and start the app 
```bash
docker compose up --build
```
3.Open the app in your browser : http://localhost:3000

# For daily Development 
```
docker compose up --watch
```

# stop the container

```
docker compose down
```

---

## Note:

```md
### Environment Variables
Make sure required environment variables i.e. Upstash credentials are configured before running in production.
