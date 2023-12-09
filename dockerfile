# Utiliza una imagen base de Node.js
FROM node:14

# Crea un directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Actualiza npm a la última versión
RUN npm install -g npm@latest

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto
COPY . .

# Expone el puerto que utiliza la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]