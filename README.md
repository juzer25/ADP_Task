# ADP Innovation Labs Pre-Interview Assignment
## Table of Contents
- [How to Setup the Project](#How-to-Setup-the-Project)
- [Project Task](#Project-Task)

## How to Setup the Project
1. Clone this repository by using the command
```
git clone https://github.com/juzer25/ADP_Task.git
```
2. From the root folder of the project run the command
```
npm install
```
3. To run the project use the command
```
npm start
```

You should be able to see the outputs on the `console`

## Project Task
A simple JavaScript(nodejs) application that makes an HTTP GET request to 
```
https://interview.adpeai.com/api/v2/get-task
```
This endpoint will provide you with an id and an array of transactions data.
```
{
  "id":"81728ed3-25ff-473c-9491-4a2026dadd8c",
  "transactions": [
    // This will be an array of transactions
  ]
}
```
Each transaction object within the array has the following shape (details may be different):
```
{
  "transactionID": "TX_691",
  "timeStamp": "2021-05-25T17:35:19.460Z",
  "amount": 1060,
  "type": "alpha",
  "location": {
    "name": "New York, New York",
    "id": "L027145"
  },
  "employee": {
    "name": "Abram W Choi",
    "id": "SED133",
    "categoryCode": "red"
  }
}
```
With this data:

Get all the transactions of last year's top earner. This means find the employee with the highest sum total of amount within the prior calendar year. Prior calendar year means, if it is currently 2022, we want only to consider transactions in 2021.
With last year's top earner's transactions get the transactionIDs where the type is alpha.
Once you have an id and an array of transactionIDs (should be an array of strings), make an HTTP POST request to
```
https://interview.adpeai.com/api/v2/submit-task
```
with a JSON POST body including the properties id and result.

Body example:
```
{
  "id": "81728ed3-25ff-473c-9491-4a2026dadd8c",
  "result": ["TX_002", "TX_003"]
}
```

The submit-task endpoint will return as follows:

Status Code	  Description  
`200`	          Success  
`400`	          Incorrect value in result; no ID specified; value is invalid  
`404`	          Value not found for specified ID  
`503`	          Error communicating with database  
