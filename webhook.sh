#!/bin/bash

WEB_PATH='/root/hanggi/koa2-build'

echo "Start deployment!"
cd $WEB_PATH
echo "Pulling source code"

git clean -f
git pull

echo "ffff"