# RideX API Docs

## `POST /users/register`

Register a new user and return an auth token.

### Request

- **Method**: `POST`
- **Path**: `/users/register`
- **Content-Type**: `application/json`

#### Required body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Field rules (current validation)

- **email**: must be a valid email
- **fullname.firstname**: minimum 3 characters
- **fullname.lastname**: required by service (if missing, user creation fails)
- **password**: minimum 6 characters

### Responses

#### `201 Created`

Returned when the user is created successfully.

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "<mongo_id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Notes:
- `token` is signed using `JWT_SECRET` and contains `{ "_id": "<userId>" }`.
- The stored password is hashed before saving.

#### `400 Bad Request`

Returned when request validation fails (from `express-validator`).

Example response:

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Emial",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `500 Internal Server Error` (possible)

These cases are not currently handled explicitly in the controller, and may surface as `500` depending on your global error handling:

- Missing required fields (service throws: `"All fields are required"`)
- Duplicate email (MongoDB unique index error)
- Database/JWT configuration issues (e.g. missing `DB_CONNECT` or `JWT_SECRET`)

