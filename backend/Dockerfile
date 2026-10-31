# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY apps/web-admin-system/package.json ./apps/web-admin-system/package.json
RUN --mount=type=cache,target=/root/.npm \
    npm ci --workspace backend --include-workspace-root --no-audit --no-fund

FROM dependencies AS build
COPY backend ./backend
RUN npm run build --workspace backend

# Migration/bootstrap là job riêng; API chạy bản JavaScript đã biên dịch.
FROM build AS tools
WORKDIR /app/backend
USER node
CMD ["node", "scripts/docker-init.mjs"]

FROM base AS production-dependencies
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY apps/web-admin-system/package.json ./apps/web-admin-system/package.json
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --workspace backend --include-workspace-root --no-audit --no-fund \
    && mkdir -p backend/node_modules

FROM base AS runtime
ENV NODE_ENV=production PORT=3001
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=production-dependencies --chown=node:node /app/backend/node_modules ./backend/node_modules
COPY --from=build --chown=node:node /app/backend/package.json ./backend/package.json
COPY --from=build --chown=node:node /app/backend/dist ./backend/dist
WORKDIR /app/backend
USER node
EXPOSE 3001
CMD ["node", "dist/main.js"]
