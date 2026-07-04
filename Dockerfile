# syntax=docker/dockerfile:1

FROM node:26-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /repo

FROM base AS deps
ENV NODE_ENV=development
COPY package.json package-lock.json ./
COPY apps/site/package.json ./apps/site/package.json
RUN npm ci

FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /repo/node_modules ./node_modules
COPY . .
RUN npm run build -w @jamie/site

FROM node:26-slim AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/public ./apps/site/public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/site/.next/static ./apps/site/.next/static

USER nextjs
EXPOSE 3000
WORKDIR /app/apps/site
CMD ["node", "server.js"]
