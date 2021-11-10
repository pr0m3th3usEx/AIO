default: up

up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

install:
	docker-compose run --rm --no-deps dash_back yarn --silent
	docker-compose run --rm --no-deps dash_front yarn --silent
	docker-compose run --rm dash_back sh -c "yarn prisma migrate && yarn prisma generate"

dash_db:
	docker-compose up dash_db

dash_back:
	docker-compose up dash_back

dash_studio:
	sh -c 'sleep 2 && xdg-open http://localhost:8888'&
	docker-compose run -p 8888:8888 --rm dash_back yarn prisma studio -p 8888

dash_studiod:
	sh -c 'sleep 2 && xdg-open http://localhost:8888'&
	docker-compose run -d -p 8888:8888 --rm dash_back yarn prisma studio -p 8888

dash_migrate:
	docker-compose run --rm dash_back sh -c 'yarn prisma migrate && yarn prisma generate'

dash_generate:
	docker-compose run --rm dash_back yarn prisma generate

dash_test:
	docker-compose run --rm dash_back yarn run jest

# dash_seed:


