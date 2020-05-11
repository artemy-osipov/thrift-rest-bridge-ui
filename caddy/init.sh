#!/bin/sh

envsubst < /site/assets/env.template.js > /site/assets/env.js
sed -i 's/<base href="\/">/<base href="'$(echo $BASE_HREF | sed 's/\//\\\//g')'">/' /site/index.html
