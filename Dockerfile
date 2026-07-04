# syntax=docker/dockerfile:1.7

FROM node:26-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/site/package.json apps/site/package.json
COPY packages/content-schema/package.json packages/content-schema/package.json
COPY packages/design-tokens/package.json packages/design-tokens/package.json

RUN npm ci

FROM node:26-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build -w @jamie/site

FROM node:26-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/apps/site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/site/.next/static ./apps/site/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/site/public ./apps/site/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/site/server.js"]
