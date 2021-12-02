# simple-crud-api

### Simple CRUD API using in-memory database.

## How to start:
```javascript
git clone git@github.com:AndreyKomov/simple-crud-api.git
cd simple-crud-api
npm install
```

#### 1. API path:
* GET `/person` or /person/${personId} return all persons or person with corresponding `personID`
* POST `/person` is used to create record about new person and store it in database
* PUT `/person/${personId}` is used to update record about existing person
* DELETE `/person/${personId}` is used to delete record about existing person from database

#### 2. Persons are stored as `objects` that have following properties:
* `id` — unique identifier (`string`, `uuid`) generated on server side
* `name` — person's name (`string`, **required**)
* `age` — person's age (`number`, **required**)
* `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

#### 3. Value of port on which application is running is stored in `.env` file.

#### 4. There is 2 modes of running application: **development** and **production**
* `npm run start:dev` running development mode
* `npm run start:prod` running production mode and start server
