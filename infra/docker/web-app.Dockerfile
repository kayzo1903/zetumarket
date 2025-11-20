FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build --filter web-seller...

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/web-seller/.next .next
COPY --from=builder /app/apps/web-seller/public public
COPY --from=builder /app/apps/web-seller/package.json .
RUN pnpm install --prod
EXPOSE 3000
CMD ["pnpm", "start"]
