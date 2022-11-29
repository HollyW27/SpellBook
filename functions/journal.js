const readline = require('readline/promises');
const entrySchema = require('../Schema/entries');
const { getDate } = require('./getDate');
const { loginSystem } = require('./loginSystem');

async function journal(dateQ, username){
    const fullDate = await getDate(dateQ);
    var entryExists
    entryExists = await entrySchema.findOne({
        day:fullDate.day,
        month:fullDate.month,
        year:fullDate.year,
        unix:fullDate.unix,
        username:username
    });
                
    if(!(entryExists === null)){
        console.log(`An entry already exists for this date: ${entryExists.entry}`);
        const yesno = await dateQ.question("would you like to overwrite it? (yes or no): ");
        if(yesno === "yes" || yesno === "y"){
            entryExists.deleteOne({
            entry:entryExists.entry
            })
            const entry = await dateQ.question(`The date is ${fullDate.day}/${fullDate.month}/${fullDate.year} please write your journal entry here: `);
            entryExists = new entrySchema({
                day:fullDate.day,
                month:fullDate.month,
                year:fullDate.year,
                unix:fullDate.unix,
                entry:entry,
                username:username
            });
            entryExists.save().catch(console.error);  
        }
    }
    else{
        const entry = await dateQ.question(`The date is ${fullDate.day}/${fullDate.month}/${fullDate.year} please write your journal entry here: `)
        entryExists = new entrySchema({
            day:fullDate.day,
            month:fullDate.month,
            year:fullDate.year,
            unix:fullDate.unix,
            entry:entry,
            username:username
        });
        entryExists.save().catch(console.error);
                        
    }
};

module.exports.journal = journal;