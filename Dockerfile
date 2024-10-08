FROM caddy:2.8.4-alpine

COPY caddy /etc/caddy/
COPY build /site
RUN chown -R guest /etc/caddy /site /config/caddy /data/caddy
RUN chown root:root /usr/bin/caddy

# TODO: exclude from production build
RUN rm -f /site/mockServiceWorker.js

CMD /etc/caddy/start.sh
