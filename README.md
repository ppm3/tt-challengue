
This project is a Nestjs project that uses MongoDB as a database.

  

**Installation**

To install the project, run the following command:

  
```bash
npm install
```



**Environment variables**

The project uses the following environment variables:

```bash
 - PORT
 - ENV_VAR
 - MONGO_DB_USER
 - MONGO_DB_PASS
 - MONGO_DB_DB
 - MONGO_DB_PORT
```
  

To set the environment variables, create a *.env* file in the root of the project, for a local environment, some variables have been created and are located in the `src/config` folder.

**Execution**

To run the project locally, run the following command in the terminal:

```bash
npm run start
```

*Note:* The database is decoupled from the project, so you must have a MongoDB instance running


**Test**
The project currently has several unit and integration tests.

Take into consideration that the services are mocked, as well as dummy data exists to validate the logic of the project.

Make sure to run the following command:

```bash
npm run test
```



# Postman collection

The project includes a Postman collection that can be used to test the API. To import the collection, open Postman and click the Import button. Select the *postman_collection.json* file and click the Import button again, the collection can be found in the `documentation/postman` folder.

  

## Local migration
In order to run the API locally, it is necessary to be able to add products, a list of 10 products is found in the `documenation/mongoDB` folder

  

Starting the application

To start the application, run the following command:

  
````bash
npm start
````

The application will be running on port `8080`.

  

# Usage

To use the API, you can use Postman or another HTTP client. 


The following are some examples of how to use the API:

### Endpoints to control

```bash
#ping
GET localhost:8080/ping

#health check
GET localhost:8080/healthcheck
```

Please, considerate the versioning of the API, for access to all endpoints, use a `v1` segment in the URL

```bash
# create CART
POST localhost:8080/v1/cart

# Add products to the cart
POST localhost:8080/v1/cart/:cartId/products

# Update quantity product to the previous product in the list cart 
PUT localhost:8080/v1/cart/:cartId/products/:productId

# Create order
POST localhost:8080/v1/order/:cartId
```


# Contributions
If you would like to contribute to this project, please fork the repository and create a pull request.