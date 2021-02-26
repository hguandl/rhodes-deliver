package main

import (
	"flag"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/hguandl/rhodes-deliver/database"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Version is current `git describe --tags` infomation.
var Version string = "v1.0.1"

func setupDb(dbPath string) {
	var err error = nil
	database.DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	database.DB.AutoMigrate(&WxSubscriber{})
}

func main() {
	prtVerPtr := flag.Bool("V", false, "Print current version")
	dbPathPtr := flag.String("d", "data.db", "Database path")
	lsAddrPtr := flag.String("s", ":8080", "Listen address")
	uiPathPtr := flag.String("w", "webapp-build", "Listen address")
	flag.Parse()

	if *prtVerPtr {
		fmt.Printf("rhodes-deliver %s\n", Version)
		return
	}

	setupDb(*dbPathPtr)
	router := gin.Default()

	actV1 := router.Group("/api/v1")
	actV1.POST("/subscribe", handleSubscribe)
	actV1.POST("/feed", handleFeed)

	subV1 := router.Group("/api/v1/subscriptions")
	subV1.DELETE("/:id", handleUnsubscribe)

	router.Static("/", *uiPathPtr)

	router.Run(*lsAddrPtr)
}
