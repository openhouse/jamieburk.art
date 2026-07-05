# syntax=docker/dockerfile:1.7

FROM node:26-bookworm-slim AS base
WORKDIR /repo
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/site/package.json ./apps/site/package.json
RUN npm ci

FROM base AS builder
COPY --from=deps /repo/node_modules ./node_modules
COPY . .
RUN npm run build -w @jamie/site

FROM node:26-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/public ./apps/site/public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/public ./public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/.next/static ./apps/site/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "if [ -f apps/site/server.js ]; then node apps/site/server.js; else node server.js; fi"]
