const transactions = require("./transactions");

async function main(){

//calling my main logic here
    try{
        /**
         * To get the Top Earner's Transaction Ids
         */
        const res = await transactions.getTransactions();
        /**
         * To submit payload.
         */
        console.log(await transactions.submitTask(res));
    }
    catch(e){
        console.error(e);
    }

}

main();