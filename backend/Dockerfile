FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


COPY tsconfig.json tsconfig.json
COPY src ./src
COPY scripts ./scripts
RUN npm run build

FROM node:18-alpine AS development

ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=base /app/dist ./dist
COPY --from=base /app/scripts ./scripts

EXPOSE 3000
USER node

CMD ["node", "dist/index.js"]

