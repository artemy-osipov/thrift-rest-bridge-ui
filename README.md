# Thrift-Rest Bridge UI

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thrift-rest-bridge-ui&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thrift-rest-bridge-ui)
![Release](https://img.shields.io/github/v/release/artemy-osipov/thrift-rest-bridge-ui)

UI for [REST API](https://github.com/artemy-osipov/thrift-rest-bridge)

## Usage

Run UI via docker

```bash
export API_URL=http://bridge.server.com # url to bridge rest api
export BASE_HREF=/thrift-rest-bridge-ui # base url
docker run --rm -p 80:80 -e API_URL -e BASE_HREF ghcr.io/artemy-osipov/thrift-rest-bridge-ui:0.3.0
```

App will be accessible on `http://localhost:80/thrift-rest-bridge-ui`

![Image description](docs/screenshot.png)
