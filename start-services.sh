#!/bin/bash

# Create logs directory if it doesn't exist
mkdir -p logs

echo "🚀 Starting E-Commerce Microservices Ecosystem (Phase 2 with Neon Postgres)..."

# 1. Start Config Server
echo "1. Starting Config Server on port 8888..."
nohup ./mvnw spring-boot:run -pl config-server > logs/config-server.log 2>&1 &
echo "Waiting 8 seconds for Config Server to initialize..."
sleep 8

# 2. Start Discovery Server (Eureka)
echo "2. Starting Discovery Server on port 8761..."
nohup ./mvnw spring-boot:run -pl discovery-server > logs/discovery-server.log 2>&1 &
echo "Waiting 8 seconds for Discovery Server to initialize..."
sleep 8

# 3. Start API Gateway
echo "3. Starting API Gateway on port 8080..."
nohup ./mvnw spring-boot:run -pl api-gateway > logs/api-gateway.log 2>&1 &
echo "Waiting 5 seconds for API Gateway..."
sleep 5

# 4. Start User Service (with postgres profile)
echo "4. Starting User Service on port 8081 (Neon Postgres)..."
nohup ./mvnw spring-boot:run -pl user-service -Dspring-boot.run.arguments="--spring.profiles.active=postgres" > logs/user-service.log 2>&1 &
echo "Waiting 5 seconds..."
sleep 5

# 5. Start Product Service (with postgres profile)
echo "5. Starting Product Service on port 8082 (Neon Postgres)..."
nohup ./mvnw spring-boot:run -pl product-service -Dspring-boot.run.arguments="--spring.profiles.active=postgres" > logs/product-service.log 2>&1 &

echo "🎉 All backend services launched in the background!"
echo "--------------------------------------------------------"
echo "Port Map:"
echo " - Config Server:    http://localhost:8888"
echo " - Discovery Server: http://localhost:8761"
echo " - API Gateway:      http://localhost:8080"
echo " - User Service:     http://localhost:8081"
echo " - Product Service:  http://localhost:8082"
echo "--------------------------------------------------------"
echo "Logs are available in the 'logs/' folder:"
echo " - tail -f logs/user-service.log"
echo " - tail -f logs/product-service.log"
echo " - tail -f logs/api-gateway.log"
echo "--------------------------------------------------------"
echo "To stop all services later, run: ./stop-services.sh"
