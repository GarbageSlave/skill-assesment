FROM oven/bun:1

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

ENTRYPOINT [ "bun", "run", "dev"]