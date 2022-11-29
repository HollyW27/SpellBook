const entrySchema = require('../Schema/entries');
const { getDate } = require('./getDate');

async function dateRange(dateQ, username){
    console.log("Please enter a start date");
    const startDate = await getDate(dateQ);
    console.log("Please enter an end date");
    const endDate = await getDate(dateQ);

    var finalRange = await entrySchema.find({
        unix: {$gte : startDate.unix,
                $lte : endDate.unix},
                username:username
    });
    for(i = 0; i < finalRange.length; i++){ 
        console.log(`${finalRange[i].day}/${finalRange[i].month}/${finalRange[i].year}: ${finalRange[i].entry}\n`);
    }
    return
       
}

module.exports.dateRange = dateRange;