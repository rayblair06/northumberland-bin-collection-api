# QoL commands

build:
	@docker-compose -f docker-compose.yml build

upgrade:
	@yarn upgrade

lint:
	@yarn run lint

lint-fix:
	@yarn run lint:fix

start:
	@docker-compose up -d --build app

stop:
	@docker-compose down
