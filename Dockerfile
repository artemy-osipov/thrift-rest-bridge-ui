FROM caddy:2.0.0-alpine

RUN apk add --no-cache \
  gettext

ARG APP_NAME=thrift-rest-bridge-ui

COPY caddy/Caddyfile /etc/caddy/Caddyfile
COPY dist/$APP_NAME /site

CMD envsubst < /site/assets/env.template.js > /site/assets/env.js ; caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
