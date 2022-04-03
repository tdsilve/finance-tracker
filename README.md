# Personal Finance Tracker

This application helps to manage the income and expenses of the user. The transactions are saved on the backend using a HTTP restful API. 

## Info

![image](https://user-images.githubusercontent.com/92559600/161407445-943b8dc1-e45d-4106-b7fb-73c83b14a2b8.png)


- Fronend: 
    - React:

- Backend: 
    - ExpressJS
    - MongoDB (Mongoose)

 ## How to run this APP?
 1. Run `npm install` to install all dependencies.
 2. Run `npm start` to start the app.

    Note: In your browser, navigate to: http://localhost:3000/ 

 ## How to run the backend with nodemon?
 1. Run `npm run dev`.

 ## About the API
 ### API Reference
 The Personal Finance Tracker API is organized around REST. It has a resource-oriented URLs, accept form request body, return JSON response, and uses standard HTTP response to indicate the success or failure of an API request.
 
 ### Errors
This API raise exceptions for many reasons, such as missing required field, network unavailability, etc.
 
 For example: There are 4 required fields: type, categories, escription and value, if one of them is missing the response will be: 
 
 ```
 {
    "error": "transactions validation failed: value: Number field required, description: Description field required, category: Category field required, "NAME OF THE REQUIRED FIELD": Type field required"
}
```

### Parameters
This API has the following parameters:
```
{
    type:{
        type: String,
        required: [true, 'Type field required']
      },
      category:{
        type: String,
        required: [true, 'Category field required']
      },
      description:{
        type: String,
        required: [true, 'Description field required']
      },
      value:{
        type: Number,
        required: [true, 'Number field required']
      }

}
```
Those parameters are required in order to insert a new information. 

### Search 
The API has no required parameters and the user can request information by inputing the following fields:

```
     category:{
        type: String
      },
      description:{
        type: String
      },
      value:{
        type: Number
      }
      
```



 
