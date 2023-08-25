#!/bin/bash

# Nombre del contenedor
CONTAINER_NAME="n8n"

# Comando para ejecutar dentro del contenedor
COMMAND_TO_RUN="/bin/sh"

# Directorio de destino en el host para copiar los archivos
DESTINATION_DIR="./csv"

# Ejecutar el comando en el contenedor
docker exec -it "$CONTAINER_NAME" "$COMMAND_TO_RUN"

# Crear el directorio de destino en el host si no existe
mkdir -p "$DESTINATION_DIR"

# Copiar archivos del contenedor al host
docker cp "$CONTAINER_NAME:/home/node/temperatura" "$DESTINATION_DIR"
