# Balance and Transactions API

Balance and Transactions API is a RESTful API for fetching historical balances based on bank account transactions. This API provides daily balance information to help assess the creditworthiness of borrowers.

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- Git

### Installation
- Clone this repository to your local machine:
   ```shell
   git clone git@github.com:nat-laz/panther-ci-balances-and-transactions-api.git

### Running the Server
To build and start the server, follow these steps:

1. Install project dependencies:
   ```shell
   npm install

2. Start the server:
   ```shell
   npm start
   ```

You should see the following message if everything works:
   ```shell
   > balances-and-transactions-api@1.0.0 start
   > tsx src/server.ts --watch

   info: Starting server...
  🚀 Server started on port 3333!
  📚 API docs are available on: http://localhost:3333/api-docs
```

### Testing
```shell
npm test
```