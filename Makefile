IS_RUNNUNG = 

all: up

re: down up

logs: down
	docker compose up --build

up:
	docker compose up --build -d

down:
	docker compose down -v

clean:
	@bash -c 'docker compose ls | grep ft_transcendence | grep running && docker exec -i app sh -c "rm -f /app/db.sqlite" || echo "nothing running"'
	@docker compose down -v

fclean: clean
	@rm -rf public/image/avatar/user/*
	@echo "CLEAR DATABASE?: sudo rm -rf data/db.sqlite"

prune:
	docker system prune -a --volumes


.PHONY: all re up down fclean
