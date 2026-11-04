FROM node:24-bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl postgresql-client && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate && npm run build
EXPOSE 3001
CMD ["node", "dist/main.js"]
