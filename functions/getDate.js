
async function getDate (dateQ){
    const day = await dateQ.question("Please enter a day (please enter a number): ");
    const month = await dateQ.question("Please enter a month (please enter a number): ");
    const year = await dateQ.question("Please enter a year (please enter a number): ");

    if(year > 99)
    {
        console.log("Please write the year in 2 digit format");
        return await getDate(dateQ);
    }
    let unix = Date.parse(`${month}/${day}/${year}`);
    if(isNaN(unix)){
        console.log("Sorry this is not a valid date, please try again.");
        return await getDate(dateQ);
    }
    return {
        day:day,
        month:month,
        year:year,
        unix:unix
    };
};

module.exports.getDate = getDate;