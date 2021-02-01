# Interview Scheduler
Interview Scheduler is a single-page that allows users to book an interview appointment through the app.

ReactJS, WebSocket and SASS were used to design front-end part of the website.

UseReducer,UseEffect and UseState hooks were used for state management.

WebSocket updates the website without refreshing.

Node js, Express js and POSTGRES for back-end part.

The app is currently deployed on Netlify with its POSTGRES database server on Heroku.
(https://5fdb4ff97aceef0007957bae--admiring-curran-a773c7.netlify.app/)

80% test coverage from JEST

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress Test

```sh
npm run cypress
```
## Screenshots 
 **Home page**
![](/screenshots/Home.png)
  **Reactive sidebar**
![](/screenshots/menu.png)
 **Forms and errors**
![](/screenshots/appointments.png)








## Dependencies
ClientSide
- axios
- classnames
- node-sass
- normalize
- react
- react-dom
- react-scripts
ServerSide
- body-parser
- cor
- dotenv
- express
- helment
- pg
- socket.io
- ws
