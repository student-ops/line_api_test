IMAGE_TAG ?= message_api
CONTAINER_NAME ?= message_api_container
PORT ?= 80

.PHONY: build
build:
	docker build -t $(IMAGE_TAG) .

.PHONY: rebuild
rebuild:
	docker build --no-cache -t $(IMAGE_TAG) .

.PHONY: run
run:
	docker run  --name $(CONTAINER_NAME) -p $(PORT):$(PORT) $(IMAGE_TAG)

.PHONY: run-d
run-d:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):$(PORT) $(IMAGE_TAG)

.PHONY: down
down:
	docker rm -f $(CONTAINER_NAME)

.PHONY: rebuild_run

.PHONY: rebuild_run
rebuild_run:
	git pull origin main
	make down
	make rebuild
	make run