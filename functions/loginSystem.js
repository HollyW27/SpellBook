const usersSchema = require('../Schema/users');
const sha3_256 = require('js-sha3').sha3_256;

async function loginSystem(dateQ, mute){
    const newOld = await dateQ.question("Would you like to create a new account? (yes or no): ");
    if(newOld === "no" || newOld === "n"){
        const repeat = await dateQ.question("Do you have an existing account? (yes or no): ");
        if(repeat === "yes" || repeat === "y"){
            const username = await dateQ.question("Please enter your Username: ");
            console.log("Please enter your password: ")
            mute.muted = true;
            let password = await dateQ.question("");
            mute.muted = false;
            var findUser = await usersSchema.findOne({
                username: username,
            }); 
            nonce = findUser.nonce;
            password = `${password}${nonce}`;
            password = sha3_256(password);
            
            if (!(findUser.password === password)){
                console.log("Please try again could not find a Username with that password")
                return await loginSystem(dateQ, mute);
            }
            else{
                return username;
            }
        }
        else{
            console.log("Thank you for your time!")
            return await loginSystem(dateQ, mute);
        }
        
    }
    else if(newOld === "yes" || newOld === "y"){
        const username = await dateQ.question("Please enter your Username: ");
        var findUser = await usersSchema.findOne({
            username: username
        });
        if(!(findUser === null))
        {
            console.log("This Username already exists please try again");
            return await loginSystem(dateQ, mute);
        }
        else{
            console.log("Please enter your password: ")
            mute.muted = true;
            let password = await dateQ.question("");
            mute.muted = false;
            nonce = Math.floor(Math.random() * (10000) + 1);
            password = `${password}${nonce}`;
            password = sha3_256(password);
            login = new usersSchema ({
                username: username,
                password: password,
                nonce: nonce
            })
            login.save().catch(console.error);
            return username;
        }
    }
    else{
        console.log("Please answer the questions correctly: ")
        return await loginSystem(dateQ, mute);
    }
};

module.exports.loginSystem = loginSystem;