package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

type WebhookRequest struct {
    Destination string `json:"destination"`
    Events      []struct {
        Type           string `json:"type"`
        Message        MessageRequest `json:"message"`
        ReplyToken     string `json:"replyToken"`
        Source         SourceRequest `json:"source"`
    } `json:"events"`
}

type MessageRequest struct {
    ID   string `json:"id"`
    Text string `json:"text"`
    Type string `json:"type"`
}

type SourceRequest struct {
    Type   string `json:"type"`
    UserID string `json:"userId"`
}

func main() {
    http.HandleFunc("/", handleRequest)
    log.Fatal(http.ListenAndServe(":80", nil))
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusMethodNotAllowed)
        return
    }

    var req WebhookRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        log.Printf("Error decoding request body: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    for _, event := range req.Events {
        replyToken := event.ReplyToken
        messageText := event.Message.Text
        fmt.Printf("Received reply token: %s\n", replyToken)
        fmt.Printf("Received message text: %s\n", messageText)
    }
}

