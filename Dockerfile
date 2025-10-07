# Utilise une image Node.js officielle
FROM node:20-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port 3000
EXPOSE 3000

# Commande par défaut
CMD ["npm", "start"]