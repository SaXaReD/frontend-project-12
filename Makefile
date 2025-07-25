lint-frontend:
	make -C frontend lint

install:
	npm ci && make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-frontend

build:
	rm -rf frontend/dist
	npm run build