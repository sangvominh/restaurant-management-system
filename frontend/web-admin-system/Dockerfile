# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/web-admin-system/package.json ./frontend/web-admin-system/package.json
RUN --mount=type=cache,target=/root/.npm \
    npm ci --workspace web-admin-system --include-workspace-root --no-audit --no-fund

FROM dependencies AS build
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY frontend/web-admin-system ./frontend/web-admin-system
RUN npm run build --workspace web-admin-system

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/frontend/web-admin-system/.next/standalone ./
COPY --from=build --chown=node:node /app/frontend/web-admin-system/.next/static ./frontend/web-admin-system/.next/static
COPY --from=build --chown=node:node /app/frontend/web-admin-system/public ./frontend/web-admin-system/public
USER node
EXPOSE 3000
CMD ["node", "frontend/web-admin-system/server.js"]
