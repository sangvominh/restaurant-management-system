FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV API_INTERNAL_URL=http://backend:3001
RUN npm run build
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
CMD ["sh", "-c", "mkdir -p .next/standalone/.next/static && cp -r .next/static/. .next/standalone/.next/static/ && exec node .next/standalone/server.js"]
