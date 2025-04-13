# Injection Service

The Injection Service is a specialized microservice responsible for handling all database write operations within the system. It works alongside the Service Offering service which handles read operations.

## Purpose

This service provides a separation of concerns by handling all write operations to the database, such as:

- Creating new records
- Updating existing records
- Deleting records
- Bulk operations

This design allows for better scalability, performance optimization, and security by isolating write operations.

## Architecture

The Injection Service follows a modular architecture with the following components:

- **Controllers**: Handle incoming requests and delegate to services
- **Services**: Contain business logic for database operations
- **Routes**: Define API endpoints
- **Middlewares**: Handle authentication, validation, and logging
- **Models**: Prisma ORM client and model definitions
- **Utils**: Utility functions for error handling, logging, etc.
- **Queues**: Asynchronous message processing for write operations

## API Endpoints

### Generic Write Operations

- `POST /api/v1/write` - Create a record
- `PATCH /api/v1/write` - Update a record
- `DELETE /api/v1/write` - Delete a record
- `POST /api/v1/write/bulk` - Bulk create records

### Category Operations

- `POST /api/v1/categories` - Create a category
- `PATCH /api/v1/categories/:id` - Update a category
- `DELETE /api/v1/categories/:id` - Delete a category
- `POST /api/v1/categories/bulk` - Bulk create categories

### Type Operations

- `POST /api/v1/types` - Create a service type
- `PATCH /api/v1/types/:id` - Update a service type
- `DELETE /api/v1/types/:id` - Delete a service type
- `POST /api/v1/types/bulk` - Bulk create service types

## Setup and Running

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL or another compatible database
- RabbitMQ (optional, for queue processing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the required environment variables (see `.env.example`)
4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

### Running the Service

#### Development mode:
```
npm run start:dev
```

#### Production mode:
```
npm run start:prod
```

## Integration with Service Offering

The Service Offering service should call this Injection Service whenever a write operation is needed. This can be done using HTTP requests to the appropriate endpoints.

Example integration in Service Offering service:

```javascript
const axios = require('axios');

async function createCategory(categoryData) {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// Example for updating a category
async function updateCategory(id, categoryData) {
  try {
    const response = await axios.patch(`http://localhost:3001/api/v1/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

// Example for generic write operation
async function writeToDatabase(model, data) {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/write', {
      model,
      data
    });
    return response.data;
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
}
```

## Error Handling

The service uses a centralized error handling mechanism. All endpoints return standardized error responses with appropriate HTTP status codes and error messages.

## Logging

All operations are logged using Winston. Logs are stored in the `/logs` directory and categorized as:

- `error.log` - Error logs
- `combined.log` - All logs
- `http.log` - HTTP request logs

## API Access

The service APIs are accessible without authentication to facilitate easy integration with other services. This makes the APIs 'orphaned' so they can be called directly without any authentication barriers.