<a href="https://codeclimate.com/github/SwahiliBox/swahilibox-events-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/02fc20612d73a58fd81c/maintainability" /></a>

# Welcome to swahilibox events api

  An API that will provide a fucntionality for SwahiliBox  Admins to be able to
  create and manage events.
  On the other hand, other users of the system can be able to view and respond to the events. 
  This will aid for better communication between SwahiliBox and the community
  and hence better planing of activities going forward.


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

| EndPoint                            | Functionality                         |
| -------------------------           | ------------------------------        |
| POST     /api/v1/register           | Create a user account                 |
| POST     /api/v1/login              | login a user                          |
|                                     |                                       |
| POST     /api/v1/events             | Create an Event                       |
| GET      /api/v1/events             | Get All Events                        |
| GET      /api/v1/events/:id         | Get an Event                          |
| PUT      /api/v1/events/:id         | Update an Event                       |
| DELETE   /api/v1/events/id          | Delete an Event                       |
| POST     /api/v1/events/<id>/rsvp   | Register a user to an event(Rsvp)     |
| GET      /api/v1/events/<id>/rsvp   | Get all event guests                  |
|                                     |                                       |

### Technologies used to buildthe application

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

create a `.env` file and provide the necessary values as shown in the `.env.sample` file

Install dependencies

`yarn install` (prefered) or `npm install`

Then run the command below to start the application

`yarn run start:dev`

### Switch to the master branch for stable/working features

`git checkout master`

The application is under constant development. The `develop` branch has the latest changes added into the app

### Contributing to the application
You can [fork](https://help.github.com/en/articles/fork-a-repo) the repo and contribute features you want included
