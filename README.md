# KoffBot-UI

Web portal for a Slack bot that promotes Koff beer.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deploying the UI

When a commit is done to `master` branch in version control, the build will be handled by a GitHub action. The action also transfers the build to an Azure storage account that has been configured for hosting a static website. The files must be located in the root folder of the autogenerated `$web` folder, where they are deployed by the action.
