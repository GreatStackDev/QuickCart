# ---------- 1️⃣ Builder Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ---------- 2️⃣ Runner Stage ----------
FROM node:18-alpine

WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
