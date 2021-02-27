package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hguandl/dr-feeder/v2/common"
	"github.com/hguandl/dr-feeder/v2/notifier"
	"github.com/hguandl/dr-feeder/v2/notifier/wxmsgapp"
	"github.com/hguandl/rhodes-deliver/database"
	"github.com/lithammer/shortuuid"
)

func handleUnsubscribe(c *gin.Context) {
	subID := c.Param("id")

	var s []WxSubscriber
	database.DB.Find(&s, WxSubscriber{SubID: subID})
	if len(s) == 0 {
		c.Status(http.StatusNotFound)
		return
	}

	database.DB.Delete(&s)
	c.Status(http.StatusOK)
}

func handleSubscribe(c *gin.Context) {
	var client wxmsgapp.WxAPIClient
	err := c.ShouldBindJSON(&client)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	var s []WxSubscriber
	database.DB.Find(&s, wxmsgapp.WxAPIClient{
		AgentID:    client.AgentID,
		ToUser:     client.ToUser,
		CorpID:     client.CorpID,
		CorpSecret: client.CorpSecret,
	})
	if len(s) > 0 {
		c.Status(http.StatusConflict)
		return
	}

	subID := shortuuid.New()
	content := fmt.Sprintf("欢迎使用罗德外卖。您的订阅ID为：%s", subID)
	msg, err := json.Marshal(
		textMessage{
			Touser:  client.ToUser,
			Msgtype: "text",
			Agentid: client.AgentID,
			Text: struct {
				Content string "json:\"content\""
			}{
				Content: content,
			},
		},
	)
	if err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	err = client.SendMsg(msg)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	database.DB.Create(&WxSubscriber{
		SubID:  subID,
		Client: client,
	})

	c.Status(http.StatusOK)
}

func handleFeed(c *gin.Context) {
	title := c.PostForm("title")
	body := c.PostForm("body")
	url := c.PostForm("url")
	picURL := c.PostForm("picurl")

	if title == "" || body == "" || url == "" {
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusOK)

	payload := common.NotifyPayload{
		Title:  title,
		Body:   body,
		URL:    url,
		PicURL: picURL,
	}

	var subscribers []WxSubscriber
	database.DB.Find(&subscribers)
	for _, s := range subscribers {
		client := s.Client
		go notifier.FromWxAPIClient(&client).Push(payload)
	}
}
