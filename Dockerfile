FROM caddy:2.6.4-alpine

COPY caddy /etc/caddy/
COPY build /site
# TODO: exclude from production build
RUN rm -f /site/mockServiceWorker.js

CMD /etc/caddy/start.sh
