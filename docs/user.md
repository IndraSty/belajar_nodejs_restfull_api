# User API Spec

## Register User API

Endpoint : POST/api/users

Request Body :

```json
{
  "username": "sty",
  "password": "secret",
  "name": "Indra"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "sty",
    "name": "Indra"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST/api/users/login

Request Body :

```json
{
  "username": "sty",
  "password": "secret"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Failed :

```json
{
  "errors": "Username or Password wrong"
}
```

## Update User API

Endpoint : PATCH/api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
  "name": "Indra",
  "password": "new password"
}
```

Response Body Success :

```json
{
  "data": {
    "name": "Indra",
    "password": "new password"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET/api/users/current

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "sty",
    "name": "Indra"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE/api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```