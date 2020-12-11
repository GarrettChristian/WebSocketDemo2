package com.example.WebSocketDemo2;

import java.util.Date;

public class OutputMessage {

    private String from;
    private String text;
    private String time;
    private Date date;

    public OutputMessage(String from, String text, String time, Date date) {
        this.from = from;
        this.text = text;
        this.time = time;
        this.date = date;
    }

    public String getFrom() {
        return from;
    }

    public String getText() {
        return text;
    }

    public String getTime() {
        return time;
    }

    public Date getDate() {
        return date;
    }
}
