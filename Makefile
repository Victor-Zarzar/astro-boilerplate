# Makefile - Astro Boilerplate
PROJECT_NAME = astro-boilerplate
PROJECT_TAG = $(shell node -p "require('./package.json').version")

# Docker config
IMAGE_NAME = $(PROJECT_NAME)
CONTAINER_NAME = $(PROJECT_NAME)
DOCKER_PORT = 4321
HOST_PORT = 4321

install:
	pnpm i

dev: install
	pnpm dev

prod: install
	pnpm build && pnpm start

preview: install
	pnpm preview

run: docker-run

clean:
	rm -rf node_modules .astro dist >/dev/null 2>&1 || true

docker-build:
	docker build -t $(IMAGE_NAME):$(PROJECT_TAG) -t $(IMAGE_NAME):latest .

docker-run: docker-build
	docker run --rm -d \
		--name $(CONTAINER_NAME) \
		-p $(HOST_PORT):$(DOCKER_PORT) \
		$(IMAGE_NAME):latest

docker-stop:
	docker stop $(CONTAINER_NAME) >/dev/null 2>&1 || true

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-shell:
	docker exec -it $(CONTAINER_NAME) sh

docker-clean: docker-stop
	docker rmi $(IMAGE_NAME):$(PROJECT_TAG) $(IMAGE_NAME):latest >/dev/null 2>&1 || true

help:
	@echo ""
	@echo "$(PROJECT_NAME) v$(PROJECT_TAG)"
	@echo "──────────────────────────────────────────────"
	@echo ""
	@echo "Local Commands:"
	@echo "  make install            Install dependencies"
	@echo "  make dev                Run the app locally in development mode"
	@echo "  make preview            Run the app in preview mode"
	@echo ""
	@echo "Production Commands:"
	@echo "  make prod               Run the app in production mode (local, no docker)"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make docker-build       Build the docker image"
	@echo "  make docker-run         Build (if needed) and run the container"
	@echo "  make docker-stop        Stop the running container"
	@echo "  make docker-logs        Tail container logs"
	@echo "  make docker-shell       Open a shell inside the running container"
	@echo "  make docker-clean       Stop container and remove image(s)"
	@echo ""
