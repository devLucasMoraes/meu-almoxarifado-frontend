FROM node:lts-slim AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --production
EXPOSE 3000
CMD ["pnpm", "start"]