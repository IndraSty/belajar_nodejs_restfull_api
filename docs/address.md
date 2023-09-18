# Address API Spec

## Create Addres API

Endpoint : POST /api/contact/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Request Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Addres API

Endpoint : PUT /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Request Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Addres API

Endpoint : GET /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Request Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Addreses API

Endpoint : GET /api/contact/:contactId/addresses

Headers :

- Authorization : token

Request Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Request Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Addres API

Endpoint : DELETE /api/contact/:contactId/addresses/:addressId

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
  "errors": "Address is not found"
}
```