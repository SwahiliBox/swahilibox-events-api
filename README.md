[![CircleCI](https://circleci.com/gh/SwahiliBox/swahilibox-events-api.svg?style=svg)](https://circleci.com/gh/SwahiliBox/swahilibox-events-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/02fc20612d73a58fd81c/maintainability)](https://codeclimate.com/github/SwahiliBox/swahilibox-events-api/maintainability)
[![codecov](https://codecov.io/gh/SwahiliBox/swahilibox-events-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/SwahiliBox/swahilibox-events-api)

# Welcome to swahilibox events api

An API that will provide a fucntionality for SwahiliBox  Admins to be able to
create and manage events.
On the other hand, other users of the system can be able to view and respond to the events.
This will aid for better communication between SwahiliBox and the community and hence better planing of activities going forward.


## Application features

Appart from normal authentication the app will provide the following
functionality

* Creating Events
* Responding to Events

An Admin user can perform the following:

* create an events.
* view the events in the system.
* edit and update events.
* delete events.
* view RSVPs events in the system.

A normal user can perform the following:

* View a list of upcoming events.
* Respond to the events they want to attend.

The following endpoints should be available to use once the API is complete:

| EndPoint                          | Functionality                     |
| --------------------------------- | --------------------------------- |
| POST     /api/v1/register         | Create a user account             |
| POST     /api/v1/login            | login a user                      |
|                                   |                                   |
| POST     /api/v1/events           | Create an Event                   |
| GET      /api/v1/events           | Get All Events                    |
| GET      /api/v1/events/:id       | Get an Event                      |
| PUT      /api/v1/events/:id       | Update an Event                   |
| DELETE   /api/v1/events/id        | Delete an Event                   |
| POST     /api/v1/events/<id>/rsvp | Register a user to an event(Rsvp) |
| GET      /api/v1/events/<id>/rsvp | Get all event guests              |
|                                   |                                   |

### Technologies used to build the application

[Expressjs](https://expressjs.com/) Framework

[PostgreSQL](https://www.postgresql.org/) Database

[Jestjs](https://jestjs.io/) Testing Framework

[Sequelize](http://docs.sequelizejs.com/) ORM

#### Getting started with the application

Clone the repo [here](https://github.com/SwahiliBox/swahilibox-events-api) to your local machine

[download](https://nodejs.org/en/download/) and install nodejs.

[install](https://yarnpkg.com/en/docs/install) Yarn version for your operating system.

Install PostgreSQL and create a database to be used by the application
  - visit the official getting started [page](https://www.postgresql.org/docs/10/tutorial-start.html)
  - Here is also a [tutorial](https://www.youtube.com/watch?v=e1MwsT5FJRQ) to do so on windows

Create a `.env-cmdrc` file. Copy the contents of `.env-cmdrc.sample` file and paste them in your `.envcmdrc` file. Replace the value of `DATABASE` with the name of the database you just created above. Same with `DATABASE_PASSWORD` and `DATABASE_USER`. checkout how to use `env-cmd` [here](https://www.npmjs.com/package/env-cmd).

Install dependencies

```sh
yarn install
```

Note:
you will need to first export your env variables before running any of the following commands.
To do so, run `npx env-cmd -e environment` environment here could be any of the keys in your '.env-cmdrc' file. Sample command `npx
env-cmd -e development`.
For example to run migrations, use `npx env-cmd -e development yarn db:migrate`

Run database migrations to create the tables

```sh
yarn db:migrate
```

Then run the command below to start the application in development mode

```sh
yarn start:dev
```

**Run with Docker**

You should have docker install in your machine. If you have docker set up go
ahead and spin the server by:

* Build the image

    ```sh
    docker build -t swahilibox-events-api-docker .
    ```

* Run docker image

    ```sh
    docker run -it -p 9000:5000 swahilibox-events-api-docker
    ```

    NOTE: `5000` is the port at which the app is running.

* To docker in the background

    ```sh
    docker run -d -p 9000:5000 swahilibox-events-api-docker
    ```

* Access the API on port `9000`

     ```sh
     http://localhost:9000/
     ```

### Switch to the master branch for stable/working features

```sh
git checkout master
```

The application is under constant development. The `develop` branch has the latest changes added into the app

### Contributing to the application

 1. clone the repo

   ```sh
    git clone https://github.com/SwahiliBox/swahilibox-events-api
   ```

 2. Set up the app locally (Refer *Getting started with the application* above)
 3. Create a branch from develop

   ```sh
   git checkout -b feature/<name-of-the-feature> (e.g feature/implement-user-login)
   ```

 4. Work on the task and push your changes to github repo.

   ```sh
   git add .

   yarn commit



   git push origin feature/<name-of-the-feature> (e.g feature/implement-user-login)
   ```

 5. Open a Pull Request to develop and a provide a very detail description of your PR.

 For more info refer [Getting started with Git and Github](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6).

 ### Other Ways to contribute

  1. Review open PRs
  2. Open an [issue](https://help.github.com/en/articles/about-issues)
