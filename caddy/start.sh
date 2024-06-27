#!/bin/sh

escape_sed() {
  TEXT=$1
  echo $(echo $TEXT | sed 's/\//\\\//g')
}

# apply envs
sed -i "s/\(window\.env\['API_URL'\]\s*=\s*\)undefined/\1'"$(escape_sed $API_URL)"'/" /site/init.js

# change base root. hacky - should be better way
SITE_FILE=$(find /site -type f)
sed -i 's/<base href="\/" \/>/<base href="'$(escape_sed $BASE_HREF)'\/">/' /site/index.html
sed -i 's/\/__BASE_URL/'$(escape_sed $BASE_HREF)'/' $SITE_FILE

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
