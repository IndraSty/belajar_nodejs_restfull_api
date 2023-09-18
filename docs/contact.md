# Contact API Spec

## Create Contact Api

Endpoint: POST api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Indra",
  "last_name": "Styawan",
  "email": "indrastyawan@gmail.com",
  "phone": "0812467847"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Indra",
    "last_name": "Styawan",
    "email": "indrastyawan@gmail.com",
    "phone": "0812467847"
  }
}
```

Request Body Error :

```json
{
  "errors": "Email is not valid"
}
```

## Update Contact Api

Endpoint : PUT api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Indra",
  "last_name": "Styawan",
  "email": "indrastyawan@gmail.com",
  "phone": "0812467847"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Indra",
    "last_name": "Styawan",
    "email": "indrastyawan@gmail.com",
    "phone": "0812467847"
  }
}
```

Request Body Error :

```json
{
  "errors": "Email already used"
}
```

## Get Contact Api

Endpoint : GET api/contacts/:id

Headers :

- Authorization : token

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Indra",
    "last_name": "Styawan",
    "email": "indrastyawan@gmail.com",
    "phone": "0812467847"
  }
}
```

Request Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact Api

Endpoint : GET api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : Number of page, default 1
- size : size per page, default 10

Request Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Indra",
      "last_name": "Styawan",
      "email": "indrastyawan@gmail.com",
      "phone": "0812467847"
    },
    {
      "id": 2,
      "first_name": "Indra",
      "last_name": "Styawan",
      "email": "indrastyawan@gmail.com",
      "phone": "0812467847"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Request Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Contact Api

Endpoint : DELETE/api/contact/:id

Headers :

- Authorization : token

Request Body Success :

```json
{
  "data": "Ok"
}
```

Request Body Error :

```json
{
  "errors": "Contact is not found"
}
```
