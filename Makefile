SHELL := /bin/bash

MODULE=nichelia

### Environment ###
.PHONY: env
env:
	./scripts/helpers/environment.sh -f

.PHONY: env-docker
env-docker:
	./scripts/helpers/environment.sh -d

.PHONY: env-prod
env-prod:
	./scripts/helpers/environment.sh -p

.PHONY: env-update
env-update:
	./scripts/helpers/environment.sh -u

### Docker ###
.PHONY: build-docker-local
build-docker-local:
	./scripts/build_docker_image.sh -t

.PHONY: build-docker
build-docker:
	./scripts/build_docker_image.sh

### Run ###
.PHONY: run
run:
	./scripts/run.sh

.PHONY: run-docker
run-docker:
	./scripts/run.sh -d

.PHONY: run-prod
run-prod:
	./scripts/run.sh -p

### Lint ###
.PHONY: lint
lint:
	cd nichelia && ng lint

### Test ###
.PHONY: test
test:
	cd nichelia && ng test

.PHONY: test-coverage
test-coverage:
	cd nichelia && ng test --no-watch --code-coverage

### Util ###
.PHONY : clean
clean :
	./scripts/helpers/cleanup.sh -d
