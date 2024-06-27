# Thrift-Rest Bridge UI

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thrift-rest-bridge-ui&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thrift-rest-bridge-ui)
![Release](https://img.shields.io/github/v/release/artemy-osipov/thrift-rest-bridge-ui)

UI for [REST API](https://github.com/artemy-osipov/thrift-rest-bridge)

## Usage

Run UI via docker

```bash
export API_URL=http://bridge.server.com # url to bridge rest api
export BASE_HREF=/thrift-rest-bridge-ui # (optional) base url for reverse proxy
docker run --rm -p 80:80 -e API_URL ghcr.io/artemy-osipov/thrift-rest-bridge-ui:0.5.0
```

App will be accessible on `http://localhost:80`

![Image description](docs/screenshot.png)
