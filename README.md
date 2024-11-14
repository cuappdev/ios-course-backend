# ios-course-backend

Backend for L7: Networking II and A3

## About This Backend

The database is hosted on MongoDB Atlas. There are two collections:

1. posts (A3: ChatDev)
2. members (L7: Networking II)

A CI/CD script has been created - simply merge a PR to `main` to deploy, after all checks have passed. If needed, the SSH key is pinned in our Slack.

## Getting Started

1. Duplicate the `.envtemplate` file and rename it to `.env`. Set `MONGO_URI` to the database URI.
2. Run `yarn` to install dependencies. If you don't have yarn installed, run `npm install --global yarn`.
3. Start the development server by running `yarn dev`. To run the production build instead, use `yarn build` followed by `yarn start`.
4. API documentation can be found in the `/api/docs` route.

## Testing

### Jest

1. Make sure dependencies are installed with `yarn`.
2. To run the test suite, use `yarn test`.

## Styling

- If using VSCode, install the Prettier extension and configure your settings to use it.
