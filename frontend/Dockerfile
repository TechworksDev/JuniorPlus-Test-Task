FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Открываем порт Vite
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
