# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Make sure you have [Node.js](https://nodejs.org/en/) LTS installed.

You need to create a `.env` file. Duplicate the `.env.example` file.

## Install packages

```sh
npm install
npx playwright install
```

## Storybook

```sh
npm run storybook
```

## Remix

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Icons

[FontAwesome](https://fontawesome.com/) is included. Feel free to swap out with whatever you want.

## i18n

[Remix-i18next](https://github.com/sergiodxa/remix-i18next) is included with some simple examples.

Storybook is also set up with i18n support.

## Testing

The test harness is set up with unit, integration and end-to-end tests.

### Unit and Integration Tests

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) running in [vitest](https://vitest.dev/)

```sh
  npm t
```

### E2E Tests

[PlayWright](https://playwright.dev/docs/intro)

```sh
npx playwright test
```

Interactive mode:

```sh
npx playwright test --ui
```
