# Rhodes Deliver

An SaaS for pushing messages to Work WeChat Apps.

## Installation

### Pre-built docker package
 
TODO.

### Pre-built releases

Download the server program and web resources from <https://github.com/hguandl/rhodes-deliver/releases/latest>.

### Manually build from source

Requirements:

* Go 1.14+
* Node 14+

```bash
$ git clone https://github.com/hguandl/rhodes-deliver.git
$ cd rhodes-deliver

# Build the server:
$ export GOPROXY=https://goproxy.io,direct
$ go build

# Build the web front-end:
$ cd webapp
$ yarn build
```

## Usage

```bash
./rhodes-deliver -s localhost:8080 -w ./webapp/build -d ./data.db
```
