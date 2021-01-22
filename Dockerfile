FROM caddy:2.3.0-alpine

RUN apk add --no-cache \
  gettext

ARG APP_NAME=thrift-rest-bridge-ui

COPY caddy /etc/caddy/
COPY dist/$APP_NAME /site

CMD /etc/caddy/init.sh ; caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
