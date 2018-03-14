![Image alt text](https://i.imgur.com/qD4SvyR.png "Main Page")

## Introduction
Project Match is a web app created with the MERN stack with typescript integration. It's primary function is to help programmers and designers match with projects they would be interested in. Project Match will then provide team collaboration tools to support new teams with features such as a dedicated platform for mockup reviews/redlines and group chat.

## Contributors
* [Francesca Sadikin (PM and Designer)](https://github.com/serpient)
* [luoto](https://github.com/luoto)
* [ram](https://github.com/ilvcs)
* [Eric Miller](https://github.com/ericmiller777)

## Setting up the project
```
git clone https://github.com/chingu-voyage4/Bears-Team-11.git
git remote add upstream https://github.com/chingu-voyage4/Bears-Team-11.git
npm install -g create-react-app
npm install
cd Bears-Team-11/
npm start
```
## Running the Server
- `npm run start-server` runs the express server on port `8080`.
- Open [Postman](https://www.getpostman.com/) app or use your browser to reach `http://localhost:8080/`
- Connect with the API calls above

Currently using [nodemon](https://github.com/remy/nodemon) to watch and restart server for changes. We are also currently not using babel for trancompilation for the servside code.

## API Calls
- Index:  `/`
- Home:  `/home` ( only if already loged in otherwise redirects to `/`).
- Login: `/login` (takes email and password params)
- Signup: `/signup` (takes first name, last name, username, email, and password params)
- SignOut: `/signout`

## Testing
To runs tests use the command `npm test`.

## Git Workflow
1. Work from each developer takes place in their own individual branch
2. Before pushing your work into development, merge development branch into your own branch first and work out any conflicts
3. Once there are no merge conflicts, do a pull request from your individual branch to the development branch. See below for authoritative figures per section:
- @serpient: Front End, Projects
- @luoto: Redux
- @ram: Back-end
- @eric-miller: Login / Register / User Settings
4. If the reviewer request changes, make the necessary changes and commit it again. The existing pull request will update itself to show the new commits. This process is repeated until the reviewer approves the pull request. 
5. Warning! Do not use `git push --force`. If you are having troubles with merge conflicts, resolve them correctly with `git pull` or rebase your code with `git pull --rebase`. A forced push overwrites the structure and sequence of commits on the authoritative repository, throwing away other people's commits.

## Project Bootstrap
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
