#!/bin/bash

echo "Eecjutando scritp"

# Copiar archivos del contenedor al host
docker cp n8n:/home/node/temperatura.csv ./ 

echo "Archivos copiados"