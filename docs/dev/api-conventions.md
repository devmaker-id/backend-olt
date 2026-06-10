# API CONVENTIONS

## REST Naming

Preferred:

GET

/api/endpoints

/api/endpoints/:id

POST

/api/endpoints

PUT

/api/endpoints/:id

DELETE

/api/endpoints/:id

---

Avoid:

/getEndpoint

/createEndpoint

/updateEndpoint

---

# Response Format

Success:

{
"success": true,
"data": {}
}

List:

{
"success": true,
"data": []
}

Error:

{
"success": false,
"message": "Error message"
}

---

# Controller Convention

Controller:

* Receive request
* Parse DTO
* Call service
* Return response

Example:

createEndpointController()

updateEndpointController()

deleteEndpointController()

---

# DTO Convention

Create:

CreateEndpointDto

Update:

UpdateEndpointDto

Delete:

DeleteEndpointDto

Query:

GetEndpointsQueryDto

---

# Frontend Convention

API Layer:

endpoint.api.ts

Hooks:

useEndpoints()

useEndpoint()

useCreateEndpoint()

useUpdateEndpoint()

useDeleteEndpoint()

---

# Mutation DTO Example

interface DeleteEndpointMutationDto {

id: string
}

Do not pass raw string when DTO exists.

---

# Type Safety

Avoid:

any

Preferred:

interface

type

DTO

Response Types

Request Types
