FROM node:13
# Utiliza la imagen de node 8 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
#no
ENV NODE_ENV=development 
#no
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /appNotify

# Copia el package.json package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 5000 donde corre la aplicación
EXPOSE 8081

# Copia los fuentes dentro del container
COPY . .

# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
#no
RUN chown node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
#no
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "npm", "start" ]

# LISTO!


# Para construir la imagen
# docker build -t <nombre_de_la_imagen> .

# Para correr el container
# docker run -p 5000:5000 --name <nombre_container> --user node <nombre_de_la_imagen>