FROM node:18

WORKDIR /usr/src/app

# Install only production dependencies first (better cache)
COPY package*.json ./
RUN npm install

# Install dev tools like typescript
RUN npm install -g typescript ts-node nodemon

# Copy everything
COPY . .

# Expose port
EXPOSE 3000

# Run with nodemon + ts-node (no manual build, live reload)
CMD ["npm", "run", "dev"]

FROM postgres:15

# Copy schema.sql into the special initialization folder
COPY src/db/schema.sql /docker-entrypoint-initdb.d/