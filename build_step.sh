#!/bin/bash

echo "Build script"

npm install --production && cd bloglist-frontend && npm install --production && cd .. && npm run build:ui