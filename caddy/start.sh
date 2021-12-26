#!/bin/sh

escape_sed() {
  TEXT=$1
  echo $(echo $TEXT | sed 's/\//\\\//g')
}

# apply envs
sed -i "s/\(window\.env\['API_URL'\]=\)undefined/\1'"$(escape_sed $API_URL)"'/" /site/init.js

# change base root. hacky - should be better way
sed -i 's/<base href="\/" \/>/<base href="'$(escape_sed $BASE_HREF)'\/">/' /site/index.html
sed -i 's/\/_app\//'$(escape_sed $BASE_HREF)'\/_app\//' /site/index.html
sed -i 's/"base":""/"base":"'$(escape_sed $BASE_HREF)'"/' /site/index.html
JS_START_FILE=$(find /site -type f -name "start*.js")
sed -i 's/\/_app\//'$(escape_sed $BASE_HREF)'\/_app\//' $JS_START_FILE

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
