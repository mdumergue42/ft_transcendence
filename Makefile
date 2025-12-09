all: up

re: down up

logs: down
	docker compose up --build

up:
	docker compose up --build -d

down:
	docker compose down -v

fclean: down
	docker system prune -a --volumes
	rm -rf ./data/*
	rm -rf ./public/image/avatar/user/*

.PHONY: all re up down fclean
