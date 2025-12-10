all: up

re: down up

logs: down
	docker compose up --build

up:
	docker compose up --build -d

down:
	docker compose down -v

fclean:
	#TODO sa clear pas la DB
	docker exec -i app sh -c "rm -f /app/db.sqlite"
	docker compose down -v
	rm -rf data/db.sqlite
	rm -rf public/image/avatar/user/*

prune:
	docker system prune -a --volumes


.PHONY: all re up down fclean
