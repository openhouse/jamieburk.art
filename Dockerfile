# syntax=docker/dockerfile:1

FROM node:26-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run typecheck --workspace=@jamieburkart/web
RUN npm run build --workspace=@jamieburkart/web

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/.next apps/web/.next
COPY --from=builder /app/apps/web/public apps/web/public
COPY --from=builder /app/apps/web/next.config.mjs apps/web/next.config.mjs
COPY --from=builder /app/apps/web/src/content apps/web/src/content

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=@jamieburkart/web"]
