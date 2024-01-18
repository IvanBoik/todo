#!/bin/bash

# Клонирование репозитория
git clone https://github.com/IvanBoik/todo.git

# Переход в каталог с проектом
cd todo || exit

# Сборка образов Docker
docker-compose build

# Запуск контейнеров
docker-compose up