#!/bin/bash

echo "Build script"

cd bloglist-frontend && npm install && cd  .. && npm i && npm run build:ui