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
