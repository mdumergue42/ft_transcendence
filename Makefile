all: up

re: down up

logs: down
	docker compose up --build

up:
	docker compose up --build -d

down:
	docker compose down -v

fclean: down
	rm -f data/*
	rm -rf public/image/avatar/user/*

prune:
	docker system prune -a --volumes


.PHONY: all re up down fclean
