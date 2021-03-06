[![Netlify Status](https://api.netlify.com/api/v1/badges/2a0d2d76-7544-4b31-83ed-d153e30a8afd/deploy-status)](https://app.netlify.com/sites/optimistic-banach-841463/deploys)

# tretton37-assignment

Live site: https://optimistic-banach-841463.netlify.app

Site is built with create-react-app and uses redux-toolkit for client state management.

## usage

### development

```
yarn install
yarn start
```

### production

```
yarn install
yarn build
serve -s build
```

Install [serve](https://www.npmjs.com/package/serve) with `npm i -g serve`

## environment variables

### REACT_APP_API_PATH

Base API Path without a trailing slash

### REACT_APP_API_KEY

API Key which is sent along a request to the API

### REACT_APP_API_FLAKINESS

To control the flakiness of the API. Good for testing special error cases.
A string value representing a floating number between 0 and 1 meaning. A value of 0.3 means the API will reject 30% of the time.

## features

### design/accessibility

- Keyboard only function
- Screen reader function(screen reader friendly)

### functional

- Filter by name and office
- Filter by contact links (such as Twitter or GitHub)
- Available on a free public url (such as Azure, Heroku)

## possible improvements

- implement a virtual list of items to increase performance when updating the employee list
- implement pagination client side, or better implement it in the api including filter and sorting to future proof
- ensure sure each avatar image is of the same size in the backend
- provide integrations testing with testing-library and e2e tests with cypress.
- add a CI step in GitHub actions
- use ui components to ensure same visuals in every browser instead of relying on the native styling
