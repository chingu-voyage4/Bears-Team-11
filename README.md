# Project Match

## Running the Server
`npm run start-server` runs the express server on port `8080`.

Currently using [nodemon](https://github.com/remy/nodemon) to watch and restart server for changes. We are also currently not using babel for trancompilation for the servside code.

## API Calls
- Index:  `/`
- Home:  `/home`. ( only if already loged in otherwise redirects to `/`).
- Login: `/login?email=ram@hello.com&password=123`.
- Signup: `/signup?email=hello@hello.com&password=123&username=hello&firstName=yourFirstName&lastName=yourLastName`.
- SignOut: `/signout`.

Currently using [nodemon](https://github.com/remy/nodemon) to watch and restart server for changes. We are also currently not using babel for trancompilation for the servside code.

## Testing
To runs tests use the command `npm test`.

## Workflow
`npm run start-server` to start the server
Open Postman app or use your browser to reach `http://localhost:8080/`
Connect with the API calls above

## Project Bootstrap
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
