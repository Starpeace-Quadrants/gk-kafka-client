# client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Environment Variables

Copy `.env.example` to `.env` and fill in your Google OAuth credentials:

```
cp .env.example .env
```

Edit `.env` and set `VUE_APP_GOOGLE_CLIENT_ID` and `VUE_APP_GOOGLE_CLIENT_SECRET` with values obtained from the Google Developer Console.


## Development HTTPS Certificates

The development server runs over HTTPS using certificates stored in the
`certs` directory. If these files are missing you can generate them with
[mkcert](https://github.com/FiloSottile/mkcert):

```bash
# install mkcert if needed and create a local CA
mkcert -install

# generate certs/cert.pem and certs/key.pem for localhost usage
yarn mkcert
```

The Dockerfile copies `certs/cert.pem` into the image and sets
`NODE_EXTRA_CA_CERTS` so HTTPS requests trust the local development
certificate.
