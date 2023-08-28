# Utiliza una imagen base con Node.js
FROM node:14

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto (asegúrate de tener un archivo package.json y package-lock.json)
COPY path-to-frontend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente del front-end al contenedor
COPY package*.json ./
COPY . .

# Expone el puerto en el que el servidor del front-end estará escuchando
EXPOSE 3000

# Comando para iniciar la aplicación del front-end
CMD ["npm", "start"]