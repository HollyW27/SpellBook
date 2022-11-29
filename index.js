const readline = require('readline/promises');
const {mongo, connect} = require('mongoose');
const entrySchema = require('./Schema/entries');
const { journal } = require('./functions/journal');
const { dateRange } = require('./functions/dateRange');
const { loginSystem } = require('./functions/loginSystem');
var Writable = require('stream').Writable;
databaseToken = "mongodb+srv://Hollyw27:xsN4JN9Hu2x3dihr@cluster0.jxi4l39.mongodb.net/?retryWrites=true&w=majority";


async function asyncStuff(){
    await connect(databaseToken).catch(console.error);
    var mute = new Writable({
        write: function(chunk, encoding, callback) {
            if (!this.muted)
            process.stdout.write(chunk, encoding);
            callback();
        }
    });
    mute.muted = false;
    const dateQ = readline.createInterface({input: process.stdin, output: mute});
    const username = await loginSystem(dateQ, mute);
    await main(dateQ, username);
};
async function main(dateQ, username) {
    const rangeFind = await dateQ.question("Would you like to read a range of date entries? (yes or no): ");
    if(rangeFind === "no" || rangeFind === "n"){
        const entryCheck = await dateQ.question("Would you like to make an entry? (yes or no): ");
            if(entryCheck === "yes" || entryCheck === "y"){
                await journal(dateQ, username);
            }
            else if(entryCheck === "no" || entryCheck === "n"){
                console.log("Thank you for your time.")
            }
            else{
                console.log("Please answer yes or no to the questions. ")
                await main(dateQ, username);
            }
    }
    else if(rangeFind === "yes" || rangeFind === "y"){
        await dateRange(dateQ, username);
    }
    else{
        console.log("Please answer yes or no to the questions. ")
        main(dateQ, username);
    }
};
asyncStuff();