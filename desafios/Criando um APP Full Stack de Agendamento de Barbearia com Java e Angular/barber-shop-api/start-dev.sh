#!/bin/bash

# Permissão de execução para o gradlew
chmod +x ./gradlew

echo "Aguardando a disponibilidade do PostgreSQL..."
while ! pg_isready -h db -U barber-shop-api > /dev/null 2> /dev/null; do
    echo "PostgreSQL indisponível - aguardando..."
    sleep 2
done
echo "PostgreSQL disponível!"

echo "Limpando o projeto..."
./gradlew clean

echo "Iniciando a aplicação..."
./gradlew bootRun