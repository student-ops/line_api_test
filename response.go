package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

const ChannelAccessToken string = "rJAnqwHJew/uQchJOsNEEe+t4QsqDkb4EkVU6Ou3GjgalVTGV+7UddkHWwPAa+4kxucfVYkY/1+oWTuFvwWafrcjvPhqvIkOt0xnECugzMp230tiNUXeTmOpM/oZsuK/8GYo4i22DUGwwgOctfbvfwdB04t89/1O/w1cDnyilFU="

func sendMessage(replyToken string, message string) error {
	url := "https://api.line.me/v2/bot/message/reply"
	accessToken := ChannelAccessToken
	headers := http.Header{}
	headers.Set("Content-Type", "application/json")
	headers.Set("Authorization", "Bearer "+accessToken)

	payload := map[string]interface{}{
		"replyToken": replyToken,
		"messages": []map[string]interface{}{
			{
				"type": "text",
				"text": "replying message",
			},
			{
				"type": "text",
				"text": message,
			},
		},
	}
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewReader(data))
	if err != nil {
		return err
	}
	req.Header = headers

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}
