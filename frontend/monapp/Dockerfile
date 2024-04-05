# Utilisation de l'image officielle Node.js comme base
FROM node:18.2.0-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposition du port 3000 sur le conteneur (si nécessaire)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]

