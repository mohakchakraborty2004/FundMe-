
const { run } = require("hardhat") ; 

async function verify(contractaddress , args){
    console.log("verifying..")

    try{
    await run("verify:verify", {
       address : contractaddress,
       constructorArguments : args
    })

} catch(e){
    if(e.message.toLowerCase().includes("already verified")){
        console.log("already verified")
    } else{
        console.log(e);
    }
    
}
}

module.exports = verify