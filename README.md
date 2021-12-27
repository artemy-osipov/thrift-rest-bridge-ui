# Thrift-Rest Bridge UI

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=artemy-osipov_thrift-rest-bridge-ui&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=artemy-osipov_thrift-rest-bridge-ui)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=artemy-osipov_thrift-rest-bridge-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=artemy-osipov_thrift-rest-bridge-ui)

UI for [REST API](https://github.com/artemy-osipov/thrift-rest-bridge)

## Usage

Run UI via docker

```bash
export API_URL=http://bridge.server.com # url to bridge rest api
export BASE_HREF=/thrift-rest-bridge-ui # base url
docker run --rm -p 80:80 -e API_URL -e BASE_HREF ir2sora/thrift-rest-bridge-ui:0.1.0
```

App will be accessible on `http://localhost:80/thrift-rest-bridge-ui`

![Image description](docs/screenshot.png)
