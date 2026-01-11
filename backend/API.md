# API Docs (v1)

Base URL: `/api/v1`

## Auth

### POST `/user/signup`
Body:
```json
{ "fname": "John", "lname": "Doe", "email": "john@example.com", "password": "password123" }
```
Response:
```json
{ "token": "<jwt>", "user": { "id": "...", "fname": "John", "lname": "Doe", "email": "john@example.com" } }
```

### POST `/user/login`
Body:
```json
{ "email": "john@example.com", "password": "password123" }
```

### POST `/user/logout`
Headers: `Authorization: Bearer <jwt>`
Note: JWT logout is client-side (delete token); endpoint exists for future revocation.

## Profile

### GET `/user/me`
Headers: `Authorization: Bearer <jwt>`
Response:
```json
{ "user": { "id": "...", "fname": "John", "lname": "Doe", "email": "john@example.com" } }
```

### PUT `/user/me`
Headers: `Authorization: Bearer <jwt>`
Body:
```json
{ "fname": "New", "lname": "Name" }
```

## Tasks (Protected)

### GET `/task`
Headers: `Authorization: Bearer <jwt>`
Query params:
- `q` (search by name)
- `completed` (`true` or `false`)

### POST `/task`
Headers: `Authorization: Bearer <jwt>`
Body:
```json
{ "taskName": "Buy groceries" }
```

### PATCH `/task/:id`
Headers: `Authorization: Bearer <jwt>`
Body (any):
```json
{ "taskName": "New name", "completed": true }
```

### DELETE `/task/:id`
Headers: `Authorization: Bearer <jwt>`

