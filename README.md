# Single Page Server

A simple development http server for serving single-page web apps.

Serves static files from a specified directory. If a file doesn't exist, serves a particular file. This is usually index.html for your single-page web app.

## Install

```bash
npm install single-page-server
```

## How to start

```bash

Usage: single-page-server [options]

Options:

  -p, --port     port to listen on (default: 8000)
  -b, --base     static files directory
  -f, --file     main page of the site

Example:

  $ single-page-server -p=3000 -b=app -f=app/index.html
```
