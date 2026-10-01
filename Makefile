.PHONY: install dev test build lint up down seed
install:
	npm install

dev:
	npm run dev

test:
	npm test

build:
	npm run build

lint:
	npm run lint

up:
	docker compose up -d

down:
	docker compose down

seed:
	npm run seed --workspace backend
