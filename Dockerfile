# syntax=docker/dockerfile:1

FROM node:26-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/site/package.json ./apps/site/package.json
COPY packages/content/package.json ./packages/content/package.json
COPY packages/design-tokens/package.json ./packages/design-tokens/package.json
RUN npm ci

FROM deps AS builder
COPY . .
RUN npm run build -w @jamieburkart/site

FROM node:26-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/site/.next/standalone ./
COPY --from=builder /app/apps/site/.next/static ./apps/site/.next/static
COPY --from=builder /app/apps/site/public ./apps/site/public

WORKDIR /app/apps/site
EXPOSE 3000

CMD ["node", "server.js"]
