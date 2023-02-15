FROM golang:1.16-alpine

WORKDIR /app

COPY . .

RUN go mod init example.com/myapp && go build -o app

CMD ["./app"]
