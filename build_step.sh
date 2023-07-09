#!/bin/bash

echo "Build script"

cd bloglist-frontend && npm install && cd  .. && npm i --production  && npm run build:ui