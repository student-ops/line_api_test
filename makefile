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
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):$(PORT) $(IMAGE_TAG)

.PHONY: down
down:
	docker rm -f $(CONTAINER_NAME)

.PHONY: rebuild_run
rebuild_run: down rebuild run
