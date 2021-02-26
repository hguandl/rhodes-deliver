FROM golang:1-buster

ENV GOPROXY=https://goproxy.io,direct

WORKDIR /go/src/rhodes-deliver
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

ENTRYPOINT [ "/go/bin/rhodes-deliver" ]
