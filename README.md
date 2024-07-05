
# Technical Documentation

![Flow drawio (1)](https://github.com/PyaePhyoKyaw61194/bloxk-address-be/assets/36658378/19917aed-6a4a-4a21-9d12-0431c3ef4cf0)


## Website Overview

- **API Documentation:** /api

### Infrastructure
- **Backend:** Nest.js
- **Database:** MongoDB
- **Deployment:** Railway (with CI/CD)

## Backend Implementation

### Workflow
1. **Request Handling:** 
   - Incoming requests pass through a middleware layer to check for an API key.
   - If the API key (`x-api-key`) is missing, the response returns with a warning.
   
2. **Throttling:**
   - The server checks for throttling based on the same IP, currently set to a maximum of 10 requests per minute.

3. **Validation:**
   - The request reaches the DTO (Data Transfer Object) layer where it undergoes validation (e.g., required fields, min/max length, uniqueness).

4. **Controller Layer:**
   - Each request is routed to the appropriate controller endpoint.

5. **Service Layer:**
   - Data is retrieved from MongoDB via the schema model.
   - Schemas are generated using the Mongoose tool.

6. **Response Handling:**
   - Successful requests are modified by an interceptor to ensure the response format is as needed.

7. **Exception Handling:**
   - All exceptions are managed by an exception filter in the `AppModule` to standardize the response structure.


## APIs

### Authentication
- All endpoints require an `x-api-key` header.
- API keys are currently hardcoded and stored in MongoDB. New keys can be added directly to MongoDB.

### Endpoints

1. **POST /address**
   - **Purpose:** Add a new address.
   - **Payload:** The address input from the user.
   - **Behavior:**
     - Stores the address, IP, and createdDate in MongoDB.
     - Responds with the address and createdDate if successful.
     - Responds with exception info if failed.

2. **GET /address**
   - **Purpose:** Retrieve all stored addresses.
   - **Parameters:** None.
   - **Behavior:**
     - Responds with an array of addresses, each containing an address and createdDate.

3. **GET /csv/generate**
   - **Purpose:** Download a CSV file containing all addresses.
   - **Behavior:**
     - Fetches all addresses (same as `GET /address`).
     - Adds them to a CSV file.
     - Returns the CSV file as the response.

> **Note:** Detailed API documentation can be found in the Swagger API documentation.




## MongoDB Database Documentation

### Collections

---

#### Collection: `addresses`

- **Document Structure:**
  - `name` (String)
    - Description: The blockchain address submitted by the user.
    - Example: `"0x57B7f4Da4Ff03e6287F761EEEf27e0A3dC82e021"`
  - `userIp` (String)
    - Description: The IP address of the user who submitted the blockchain address.
    - Example: `"223.206.215.37"`
  - `createdAt` (Date)
    - Description: The timestamp when the blockchain address was submitted.
    - Example: `"2024-07-04T13:55:51.545Z"`

- **Example Document:**
  ```json
  {
    "name": "0x57B7f4Da4Ff03e6287F761EEEf27e0A3dC82e021",
    "userIp": "223.206.215.37",
    "createdAt": "2024-07-04T13:55:51.545Z"
  }
  ```

---

#### Collection: `apiKey`

- **Document Structure:**
  - `data` (String)
    - Description: The API key used for authentication.
    - Example: `"12345-abcde-67890-fghij"`

- **Example Document:**
  ```json
  {
    "data": "12345-abcde-67890-fghij"
  }
  ```

---


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

