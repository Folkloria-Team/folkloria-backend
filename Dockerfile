# Gunakan image Bun resmi
FROM oven/bun AS base

# Set workdir
WORKDIR /app

# Copy package.json & bun.lockb (jika ada)
COPY bun.lockb package.json ./

# Install dependencies (pakai bun install)
RUN bun install --frozen-lockfile

# Copy seluruh source code
COPY . .

# Expose port Hono
EXPOSE 3333

# Command default untuk menjalankan Hono
CMD ["bun", "run", "start"]
