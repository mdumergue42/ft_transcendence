FROM node:20-alpine

WORKDIR /app

# pour tester la database en mode manuel
RUN apk add --no-cache sqlite

# Copier package files
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build en production
RUN npm run build

# Exposer le port
EXPOSE 3000

# Variable d'environnement
ENV NODE_ENV=production

# Lancer le serveur compilé
CMD ["npm", "start"]