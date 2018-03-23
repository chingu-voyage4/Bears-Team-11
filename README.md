![Image alt text](https://i.imgur.com/qD4SvyR.png "Main Page")

## Introduction
Project Match is a web app created with the MERN stack with typescript integration. It's primary function is to help programmers and designers match with projects they would be interested in. Project Match will then provide team collaboration tools to support new teams with features such as a dedicated platform for mockup reviews/redlines and group chat.

## Contributors
* [Francesca Sadikin (Co-PM and Designer)](https://github.com/serpient)
* [luoto (Co-PM)](https://github.com/luoto)
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

## Testing
To runs tests use the command `npm test`.

## Git Workflow
1. Work from each developer takes place in their own individual branch
2. Before pushing your work into development, merge development branch into your own branch first and work out any conflicts
3. Once there are no merge conflicts:
- push your commits to your dedicated Development-Staging branch (ex, `fsadikin-dev-staging`)
- from this branch, you can do a pull request to the development branch. 
- Do not merge the pull request by yourself. Assigned reviewers (at least 2 teammembers) to review the code.
4. If the reviewer request changes, make the necessary changes within your dedicated Development-Staging branch and commit it again. The existing pull request will update itself to show the new commits. This process is repeated until the reviewer approves the pull request. FYI, you can continue working within your own branch, but keep the dev-staging branch clean while you are waiting for the Pull Request review. The contents of the dev-staging branch should match the PR commits exactly. 
5. *Warning!* Do not use `git push --force`. If you are having troubles with merge conflicts, resolve them correctly with `git pull` or rebase your code with `git pull --rebase`. A forced push overwrites the structure and sequence of commits on the authoritative repository, throwing away other people's commits.

## Project Bootstrap
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## API Calls

| ENDPOINT                       | METHOD    | URL PARAMS      | PURPOSE       |
| ------------------------------ |:---------:|:---------------:|:-------------:|
| /api/home                      | GET       |                 |               |
| /api/login                     | POST      | email, password | Signs in user |
| /api/signup                    | POST      | firstName, lastName, username, email, password | Adds new user |
| /api/logout                    | GET       |                 | Signs out user |
| /api/forgot                    | POST      | email           | Sends an email you forget your password |
| /api/reset/:token              | POST      | token, password | Resets your password |
| /api/users                     | GET       |                 | Returns list of all users |
| /api/user/:username            | GET       | username        | Returns individual user data |
| /api/user/delete               | POST      | username, password | Deletes user |
| /api/user/deactivate           | POST      | username, password | Deactivates user |
| /api/user/activate             | POST      | username, password | Re-activates user |
| /api/user/update               | POST      | username        | Updates individual user data |
| /api/user/:username/settings   | GET       |                 | Return individual user settings |
| /api/user/:username/settings/update | POST |                 | Edit individual user settings |
| /api/projects                  | GET       | options         | Returns all projects |
| /api/projects/add              | POST      |                 | Adds new project |
| /api/projects/:id              | GET       | id              | Returns individual project filtered by id |
| /api/projects/update/:id       | POST      | id, updateKey, updateValue | Updates single project by id |
| /api/projects/delete/one/:id   | DELETE    | id              | Deletes single project by id |
| /api/projects/filter           | GET       | name, category, r ole, tags, sortBy, status | Returns list of projects filtered by params |
| /api/projects/tags             | GET       |                 | Returns all available tags |
| /api/projects/tags/add         | POST      | tagName         | Adds new project tag |
| /api/projects/categories       | GET       |                 | Returns all available categories |
| /api/projects/categories/add   | POST      | categoryName    | Adds new category |

