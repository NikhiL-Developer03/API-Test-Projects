# API Test Projects for Juniors

This repository contains two API projects: Library API and Bank API. Both use Node.js + Express with in-memory arrays (no database).

## Projects

### 1. Library API 📚

A small library system for managing books that tracks:
- Book title
- Author
- Availability (whether the book is available or borrowed)

#### Endpoints

- `POST /library` - Add new book
  ```json
  { "title": "The Alchemist", "author": "Paulo Coelho" }
  ```
- `GET /library` - Get all books
- `GET /library/available` - Get available books
- `PUT /library/borrow/:id` - Borrow book by ID
- `PUT /library/return/:id` - Return book by ID

#### Features

- Adding book → `{ id, title, author, available }`
- Borrowing → `available = false`, if already borrowed return error
- Returning → `available = true`

### 2. Bank API 🏦

A mock banking API for managing accounts with:
- Account holder name
- Balance

#### Endpoints

- `POST /bank/accounts` - Create account
  ```json
  { "name": "Ravi Kumar", "balance": 5000 }
  ```
- `GET /bank/accounts` - Get all accounts
- `PUT /bank/deposit/:id` - Deposit money
  ```json
  { "amount": 2000 }
  ```
- `PUT /bank/withdraw/:id` - Withdraw money
  ```json
  { "amount": 1000 }
  ```
- `PUT /bank/transfer` - Transfer money
  ```json
  { "fromId": 1, "toId": 2, "amount": 1500 }
  ```

#### Features

- Create account → `{ id, name, balance }`
- Deposit → increase balance
- Withdraw → decrease balance, return error if insufficient
- Transfer → deduct from one account, add to another, check balance first

## Installation and Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

## Testing with Postman

### Base URL
```
http://localhost:3000
```

### Main Endpoint
1. **Home Page**
   - Method: GET
   - URL: `/`
   - Description: Welcome page
   - Response: Text message "Welcome to the API Test Projects for Juniors"

### Library API Testing

1. **Add a New Book**
   - Method: POST
   - URL: `/library`
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "title": "The Great Gatsby",
       "author": "F. Scott Fitzgerald"
     }
     ```
   - Description: Adds a new book to the library
   - Response: 201 Created with the new book object

2. **Get All Books**
   - Method: GET
   - URL: `/library`
   - Description: Retrieves all books in the library
   - Response: Array of all books

3. **Get Available Books**
   - Method: GET
   - URL: `/library/available`
   - Description: Retrieves only books that are available for borrowing
   - Response: Array of available books

4. **Borrow a Book**
   - Method: PUT
   - URL: `/library/borrow/:id`
   - Description: Mark a book as borrowed
   - Example: `/library/borrow/1`
   - Response: Updated book object with available set to false

5. **Return a Book**
   - Method: PUT
   - URL: `/library/return/:id`
   - Description: Return a previously borrowed book
   - Example: `/library/return/1`
   - Response: Updated book object with available set to true

### Bank API Testing

1. **Create Bank Account**
   - Method: POST
   - URL: `/bank/accounts`
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "name": "John Doe",
       "balance": 1000
     }
     ```
   - Description: Creates a new bank account
   - Response: 201 Created with the new account object

2. **Get All Accounts**
   - Method: GET
   - URL: `/bank/accounts`
   - Description: Retrieves all bank accounts
   - Response: Array of all accounts

3. **Deposit Money**
   - Method: PUT
   - URL: `/bank/deposit/:id`
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "amount": 500
     }
     ```
   - Description: Deposits money into an account
   - Example: `/bank/deposit/1`
   - Response: Updated account object with new balance

4. **Withdraw Money**
   - Method: PUT
   - URL: `/bank/withdraw/:id`
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "amount": 200
     }
     ```
   - Description: Withdraws money from an account
   - Example: `/bank/withdraw/1`
   - Response: Updated account object with new balance

5. **Transfer Money**
   - Method: PUT
   - URL: `/bank/transfer`
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "fromId": 1,
       "toId": 2,
       "amount": 300
     }
     ```
   - Description: Transfers money between two accounts
   - Response: Object with updated source and destination account information

## Project Structure

```
myapi/
  index.js         - Main Express server
  models/
    library.js     - Library API logic
    bank.js        - Bank API logic
  routes/
    library.js     - Library API routes
    bank.js        - Bank API routes
  package.json     - Project dependencies
```