![Image alt text](https://i.imgur.com/qD4SvyR.png "Main Page")

## Introduction
Programmers and designers use Project Match to find teammates for budding ideas. Project Match will help find you projects and then provide team collaboration tools to support mockup reviews.

## Contributors
* [Francesca Sadikin (PM and Designer)](https://github.com/serpient)
* [luoto](https://github.com/luoto)
* [ram](https://github.com/ilvcs)
* [Eric Miller](https://github.com/ericmiller777)

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

## Git Workflow
1. Work from each developer takes place in their own individual branch
2. Before pushing your work into development, merge development branch into your own branch first and work out any conflicts
3. Once there are no merge conflicts, do a pull request from your individual branch to the development branch. See below for authoritative figures per section:
⋅⋅⋅ @serpient: Front End, Projects
⋅⋅⋅ @luoto: Redux
⋅⋅⋅ @ram: Back-end
⋅⋅⋅ @eric-miller: Login / Register / User Settings
4. Do not use `git push --force`. If you are having troubles with merge conflicts, resolve them correctly with `git pull` or rebase your code with `git pull --rebase`. A forced push overwrites the structure and sequence of commits on the authoritative repository, throwing away other people's commits.

## Project Bootstrap
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

