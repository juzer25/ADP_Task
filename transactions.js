const axios = require("axios");

/**
 * 
 * @returns {object} data - the data from the axios GET Request 
 * 
 */
async function getData(){
    //console.log(await axios.options('https://interview.adpeai.com/api/v2/get-task'));
    const { data } = await axios.get('https://interview.adpeai.com/api/v2/get-task');
   //console.log(data);
    return data;
}


/**
 * filter data by date
 * @param {object} obj - consists of all the transaction data 
 * @returns {object} obj - that has filtered records according to the year
 */
function dateHelper(obj){
    let dataYear = new Date(obj.timeStamp).getUTCFullYear();
    let currentYear = new Date().getFullYear();

    if((currentYear-1) == dataYear){
        return obj;
    }
}


/**
 * Return the Top Earner
 * @param {object} filteredByDate - records of employee transaction that were filtered by year 
 * @returns {string} id - the ID of an employee who is the Top Earner for that particular year
 */
function getTopEarner(filteredByDate){
    let amntMap = new Map();
    
    for(let emp of filteredByDate){
      
        if(!amntMap.get(emp.employee.id)){
            amntMap.set(emp.employee.id, emp.amount);
        }
        else{
            let amnt = emp.amount;
            amnt += amntMap.get(emp.employee.id);
            amntMap.set(emp.employee.id,amnt);
        }
    }

    let max = 0;
    let id = 0;
    for(let val of amntMap.keys()){
        if(max < amntMap.get(val)){
            id = val;
            max = amntMap.get(val);
        }
    }

    return id;
}

/**
 * 
 * @returns {object} - returns an id and array that consists of the Top Earner's transaction Ids that have type as "alpha"
 */
const getTransactions = async function getTransactions(){
    let data  = await getData();

    let filteredByDate = (data.transactions.filter(dateHelper));

    let topEarnerId = getTopEarner(filteredByDate);

    let transactions = filteredByDate.filter(obj => {
        return obj.employee.id === topEarnerId && obj.type === "alpha";
        
    }).map(obj => {
        return obj.transactionID;
    });

    return {"id" : data.id , "result":transactions};
}

/**
 * 
 * @param {object} payload - consists of an id and an array of TransactionId of the Top Earner 
 * @returns {object} - status of post request and statusText
 */
const submitTask = async function submitTask(payload){
    
    let res = await axios.post("https://interview.adpeai.com/api/v2/submit-task", payload);
   return {"status" : res.status, "statusText":res.statusText };
}

module.exports = {
    getTransactions,
    submitTask
}