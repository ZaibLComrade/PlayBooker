# PlayBooker

### Live Link: https://play-booker.vercel.app

## Introduction

### Overview

Playbooker is an Express.js server for a sports facility booking organization. Booking sports facilities and keeping track of them in an organized manner is made easy with PlayBooker sports facility booking server.

### Technologies

-   Typescript
-   Express.js
-   Mongoose
-   Zod

## Getting Started

### Installation

1. Clone the github repo to your local machiene.

```
git clone https://github.com/ZaibLComrade/PlayBooker.git
```

2. Navigate to project directory.

```
cd PlayBooker
```

3. Install dependencies with `npm`

```
npm i
```

### Configuration

The server needs to configure with the following environemt variables. **Note:** These configurations can be found in `.env.example` file. Configure as per your project needs

```
NODE_ENV=development
PORT=3000
DB_URI_LOCAL=mongodb://localhost:27017
DB_URI_PROD=
DB_USER=
DB_NAME=
DB_PASS=
HASH_SALT=
ACCESS_SECRET=
ACCESS_EXPIRES_IN=1h
REFRESH_SECRET=
REFRESH_EXPIRES_IN=30d
```

## Commands

`npm start`: Runs server in production mode.
`npm run dev`: Runs server in development mode with hot-reloading enabled.
`npm run build`: Build application for production deployment (`dist`).
`npm run build:watch`: Build application for production deployment in watch mode.
`npm run lint`: Checks for errors and code inconsistency with eslint.
`npm run lint:fix`: Solves fixable errors and inconsistencies with eslint,
npm run format: Formats code with prettier

## Project Structure

### Overview

PlayBooker is written in MVC (Model View Controller) structure

### File Descriptions

```
PlayBooker/
│
├── @types/
│   └── index.d.ts                 # Global type file for interfaces and types
│
├── config/
│   └── config.js                  # Configuration files (e.g., database, environment variables)
│
├── errorHandler/
│   ├── index.ts                   # Handlers for all different types of errors
│   ├── handleCastError.ts
│   └── ...
│
├── middleware/
│   ├── auth.ts                    # Varifies user role with jwt access token
│   ├── validateRequest.ts         # Validates HTTP request body with Zod Schemas
│   └── globalErrorHandler.ts      # Handles all error
│
├── modules/                       # Each module maintains a certain MVC pattern
│   ├── auth/
│   ├── booking/
│   │   ├── controller/            # Controllers for handling HTTP Requests
│   │   │   ├── index.ts
│   │   │   ├── postBooking.ts
│   │   │   └── ...
│   │   │
│   │   └── service/               # Business logics and data manipulations
│   │   │   ├── index.ts
│   │   │   ├── createBooking.ts
│   │   │   └── ...
│   │   │
│   │   ├── booking.constant.ts    # Centralizes constant values
│   │   ├── booking.interface.ts   # Interfaces for type definitions
│   │   ├── booking.model.ts       # Mongoose data models representing entities
│   │   ├── booking.route.ts       # Route organizes HTTP endpoints
│   │   ├── booking.utils.ts       # Utils define plain JavaScript functions
│   │   └── booking.validation.ts  # Zod validation Schemas for request handlers
│   │
│   └── ...
│
├── routes/
│   └── index.ts                   # Main router combining all route modules
│
├── Utils/
│   ├── ApiError.ts                # Handles custom thrown Error
│   ├── catchAsync.ts              # Wraps request handlers with try...catch blocks
│   └── getUri.ts                  # Returns valid database URI from raw URI, db username and pass
│
├── app.js                         # Entry point of the application
├── package.json                   # npm package configuration file
├── vercel.json                    # Vercel configurations
├── .env.example                   # Examples of .env configurations
└── tsconfig.json                  # Typescript configurations
```

## Usage

### Data Models

**User Model:**

-   `name`: The name of the user.
-   `email`: The contact email address.
-   `password`: The account password (must be hashed).
-   `phone`: The contact phone number.
-   `role`: The role of the user (can be 'admin' or 'user').
-   `address`: The physical address.

**Facility Model:**

-   `name`: The title of the facility.
-   `description`: A brief description of the facility.
-   `pricePerHour`: The cost of booking the facility per hour.
-   `location`: The physical location of the facility.
-   `isDeleted`: Boolean indicating if the facility is marked as deleted (false means not deleted).

**Booking Model:**

-   `date`: The date of the booking.
-   `startTime`: The start time of the booking.
-   `endTime`: The end time of the booking.
-   `user`: Reference to the user who made the booking.
-   `facility`: Reference to the booked facility.
-   `payableAmount`: The calculated amount payable for the booking.
-   `isBooked`: Status of the booking (confirmed, unconfirmed, or canceled).

### Api Endpoints

1. **User Sign Up**

-   **Route**: `POST /api/auth/signup`
-   **Request Body**:

```json
{
	"name": "Zaib Khan",
	"email": "kmjahanzaib@gmail.com",
	"password": "zaibkhan",
	"phone": "01322901105",
	"role": "admin", // or 'user'
	"address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

-   **Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "User registered successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c4",
		"name": "Zaib Khan",
		"email": "kmjahanzaib@gmail.com",
		"role": "admin",
		"phone": "01322901105",
		"address": "Level-4, 34, Awal Centre, Banani, Dhaka"
	}
}
```

2. **User Login**

-   **Route**: `POST /api/auth/login`
-   **Request Body**:

```json
{
	"email": "kmjahanzaib@gmail.com",
	"password": "zaibkhan"
}
```

-   **Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "User logged in successfully",
	"token": "JWT_TOKEN",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c4",
		"name": "Zaib Khan",
		"email": "kmjahanzaib@gmail.com",
		"role": "admin",
		"phone": "01322901105",
		"address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
	}
}
```

3. **Create a Facility (Admin Only)**

-   **Route**: `POST /api/facility`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
	"name": "Tennis Court",
	"description": "Outdoor tennis court with synthetic surface.",
	"pricePerHour": 30,
	"location": "456 Sports Ave, Springfield"
}
```

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Facility added successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c5",
		"name": "Tennis Court",
		"description": "Outdoor tennis court with synthetic surface.",
		"pricePerHour": 30,
		"location": "456 Sports Ave, Springfield",
		"isDeleted": false
	}
}
```

4. **Update a Facility (Admin Only)**

-   **Route**: `PUT /api/facility/:id`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
	"name": "Updated Tennis Court",
	"description": "Updated outdoor tennis court with synthetic surface.",
	"pricePerHour": 35,
	"location": "789 Sports Ave, Springfield"
}
```

-   **Response**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Facility updated successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c5",
		"name": "Updated Tennis Court",
		"description": "Updated outdoor tennis court with synthetic surface.",
		"pricePerHour": 35,
		"location": "789 Sports Ave, Springfield",
		"isDeleted": false
	}
}
```

5. **Delete a Facility - Soft Delete (Admin Only)**

-   **Route**: `DELETE /api/facility/:id`
-   **Headers**:

```plain
      Authorization: Bearer JWT_TOKEN
```

-   **Response**:

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Facility deleted successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c5",
		"name": "Updated Tennis Court",
		"description": "Updated outdoor tennis court with synthetic surface.",
		"pricePerHour": 35,
		"location": "789 Sports Ave, Springfield",
		"isDeleted": true
	}
}
```

**6\. Get All Facilities**

-   **Route**: `GET /api/facility`
-   **Response**:

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Facilities retrieved successfully",
	"data": [
		{
			"_id": "60d9c4e4f3b4b544b8b8d1c5",
			"name": "Tennis Court",
			"description": "Outdoor tennis court with synthetic surface.",
			"pricePerHour": 30,
			"location": "456 Sports Ave, Springfield",
			"isDeleted": false
		}
	]
}
```

#### Booking Routes

7. **Check Availability**

-   **Route**: `POST /api/auth/signup`

##### Query Parameters

**date** (string, optional): The date for which availability is to be checked. Format: YYYY-MM-DD. If not provided, today's date will be used by default.

##### Example Request

```
GET /api/check-availability?date=2024-06-15
```

-   **Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Availability checked successfully",
	"data": [
		{
			"startTime": "08:00",
			"endTime": "10:00"
		},
		{
			"startTime": "14:00",
			"endTime": "16:00"
		}
	]
}
```

**8\. Create a Booking (User Only)**

-   **Route**: `POST /api/bookings`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
	"facility": "60d9c4e4f3b4b544b8b8d1c5",
	"date": "2024-06-15",
	"startTime": "10:00",
	"endTime": "13:00"
}
```

-   **Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Booking created successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c6",
		"facility": "60d9c4e4f3b4b544b8b8d1c5",
		"date": "2024-06-15",
		"startTime": "10:00",
		"endTime": "13:00",
		"user": "60d9c4e4f3b4b544b8b8d1c4",
		"payableAmount": 90,
		"isBooked": "confirmed"
	}
}
```

`If the facility is unavailable during the requested time slot, an error response is returned.`

**9\. View All Bookings (Admin Only)**

-   **Route**: `GET /api/bookings`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

-   **Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Bookings retrieved successfully",
	"data": [
		{
			"_id": "60d9c4e4f3b4b544b8b8d1c6",
			"facility": {
				"_id": "60d9c4e4f3b4b544b8b8d1c5",
				"name": "Tennis Court",
				"description": "Outdoor tennis court with professional-grade surface.",
				"pricePerHour": 30,
				"location": "123 Main Street",
				"isDeleted": false
			},
			"date": "2024-06-15",
			"startTime": "10:00",
			"endTime": "13:00",
			"user": {
				"_id": "60d9c4e4f3b4b544b8b8d1c4",
				"name": "Zaib Khan",
				"email": "kmjahanzaib@gmail.com",
				"phone": "+1234567890",
				"role": "user",
				"address": "456 Elm Street"
			},
			"payableAmount": 90,
			"isBooked": " confirmed"
		}
	]
}
```

**10\. View Bookings by User (User Only)**

-   **Route**: `GET /api/bookings/user`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Bookings retrieved successfully",
	"data": [
		{
			"_id": "60d9c4e4f3b4b544b8b8d1c6",
			"facility": {
				"_id": "60d9c4e4f3b4b544b8b8d1c5",
				"name": "Tennis Court",
				"description": "Outdoor tennis court with professional-grade surface.",
				"pricePerHour": 30,
				"location": "123 Main Street",
				"isDeleted": false
			},
			"date": "2024-06-15",
			"startTime": "10:00",
			"endTime": "13:00",
			"user": "60d9c4e4f3b4b544b8b8d1c4",
			"payableAmount": 90,
			"isBooked": " confirmed"
		}
	]
}
```

**11\. Cancel a Booking (User Only)**

-   **Route**: `DELETE /api/bookings/:id`
-   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Booking cancelled successfully",
	"data": {
		"_id": "60d9c4e4f3b4b544b8b8d1c6",
		"facility": {
			"_id": "60d9c4e4f3b4b544b8b8d1c5",
			"name": "Tennis Court",
			"description": "Outdoor tennis court with professional-grade surface.",
			"pricePerHour": 30,
			"location": "123 Main Street",
			"isDeleted": false
		},
		"date": "2024-06-15",
		"startTime": "10:00",
		"endTime": "13:00",
		"user": "60d9c4e4f3b4b544b8b8d1c4",
		"payableAmount": 90,
		"isBooked": "canceled"
	}
}
```

### Middlewares

1. `validateRequest`

-   Description: Middleware to validate incoming requests using Zod validation schema.
    **Parameters: **
    `validationSchema`: Zod validation schema used to validate the request body or parameters.

2. `auth`

-   Description: Middleware to authenticate users based on role (admin or user).
    **Parameters: **
    `requiredRoles`: Roles required to access the endpoint (admin, user).
