package main

import (
	"github.com/hguandl/dr-feeder/v2/notifier/wxmsgapp"
	"gorm.io/gorm"
)

type textMessage struct {
	Touser  string `json:"touser"`
	Msgtype string `json:"msgtype"`
	Agentid string `json:"agentid"`
	Text    struct {
		Content string `json:"content"`
	} `json:"text"`
}

// WxSubscriber is the model for Work Wechat apps.
type WxSubscriber struct {
	gorm.Model
	SubID  string
	Client wxmsgapp.WxAPIClient `gorm:"embedded"`
}
