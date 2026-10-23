FROM node:20-alpine

WORKDIR /app

# Primero solo las dependencias: si no cambia package.json, Docker reutiliza esta capa
# (el * hace que package-lock.json sea opcional; se genera al hacer npm install en tu equipo)
COPY package*.json ./
RUN npm install --omit=dev

# Después el resto del código
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

# Usuario sin privilegios que ya trae la imagen de Node
USER node

CMD ["node", "src/server.js"]
