#!/bin/bash
echo "🛑 Stopping E-Commerce Microservices..."
for port in 8888 8761 8080 8081 8082
do
    pid=$(lsof -t -i:$port)
    if [ -n "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)..."
        kill -9 $pid
    else
        echo "No process running on port $port."
    fi
done
echo "🎉 All backend services stopped!"
