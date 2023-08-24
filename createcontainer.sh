#!/bin/sh
echo "👨 Create Container"

docker build -t simple-server .

# wait 5 seconds
sleep 5

echo "🎉 Container created"

echo "👨 Running container"

# wait 5 seconds
sleep 5

docker run -d -p 5000:5000 --name simpleserver simple-server

echo "🎉 Container Running" 