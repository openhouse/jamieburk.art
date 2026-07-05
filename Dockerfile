# syntax=docker/dockerfile:1.7

FROM node:26-bookworm-slim AS base
WORKDIR /repo
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/www/package.json ./apps/www/package.json
RUN npm ci

FROM base AS builder
ARG NEXT_PUBLIC_SITE_ENV=production
ARG NEXT_PUBLIC_SITE_URL=https://jamieburk.art
ARG NEXT_PUBLIC_ENABLE_INDEXING=false
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_CONTACT_EMAIL_LABEL="Email Jamie"
ARG NEXT_PUBLIC_LINKEDIN_URL=
ARG NEXT_PUBLIC_GITHUB_URL=
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ENABLE_INDEXING=$NEXT_PUBLIC_ENABLE_INDEXING
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_EMAIL_LABEL=$NEXT_PUBLIC_CONTACT_EMAIL_LABEL
ENV NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
COPY --from=deps /repo/node_modules ./node_modules
COPY . .
RUN npm run build -w @jamie-burkart/www

FROM node:26-bookworm-slim AS runner
WORKDIR /app
ARG NEXT_PUBLIC_SITE_ENV=production
ARG NEXT_PUBLIC_SITE_URL=https://jamieburk.art
ARG NEXT_PUBLIC_ENABLE_INDEXING=false
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_CONTACT_EMAIL_LABEL="Email Jamie"
ARG NEXT_PUBLIC_LINKEDIN_URL=
ARG NEXT_PUBLIC_GITHUB_URL=
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_SITE_ENV=$NEXT_PUBLIC_SITE_ENV
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ENABLE_INDEXING=$NEXT_PUBLIC_ENABLE_INDEXING
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_EMAIL_LABEL=$NEXT_PUBLIC_CONTACT_EMAIL_LABEL
ENV NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /repo/apps/www/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/www/public ./apps/www/public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/www/public ./public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/www/.next/static ./apps/www/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/www/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "if [ -f apps/www/server.js ]; then node apps/www/server.js; else node server.js; fi"]
