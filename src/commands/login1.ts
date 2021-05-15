// import { Command, flags } from "@oclif/command";
// import cli from "cli-ux";
// var unirest = require("unirest");
// const fs = require('fs')


// export default class Login extends Command {
//   static description = "Login to Razorpay using key Id & secret";

//   static flags = {
//     help: flags.help({ char: "h" }),
//   };

//   /**
//    * get user key & secret
//    *
//    * validate if valid key and secret
//    *
//    * set file .razopay
//    *
//    * alert user auth success
//    */
//   async run() {
//     const { args, flags } = this.parse(Login);

//     const key: string = await cli.prompt("\nEnter Razorpay Api key Id ");

//     const secret: string = await cli.prompt("Enter Razorpay Api Key Secret", {
//       type: "mask",
//     });

//     //this.log(`You entered: ${key}, ${secret}`)

//     cli.action.start("Validating credentials");
//     await this.validateKeys(key, secret);
//     cli.action.start("Credentails validated successfully. Creating config file");

//    let toSaveKeys = new RzpConfig(key,secret);
//    this.createConfigFile(toSaveKeys);

//   }

// async validateKeys(key: string, secret: string) {
//     let auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

//     let req = unirest("GET", "https://api.razorpay.com/v1/payments/")
//       .headers({
//         Authorization: auth,
//       })
//       .send("")
//       .end(function (res: any) {
//         if (res.error) 
//         {
//           cli.action.stop('\nInvalid Credentials Entered \n\n' + 
//           'Need help generating api keys please visit - https://razorpay.com/docs/payment-gateway/dashboard-guide/settings/api-keys/')
//         }
//       });
//     return true;
//   }

//   async createConfigFile(data:RzpConfig){
 
//    await fs.writeFile(this.config.configDir, JSON.stringify(data), (err: any) => {
//       if (err) {
//         cli.action.stop("\nFailed tp update config");
//         throw err;
        
//       }else{
//         cli.action.stop("\nConf file updated successfully");
//       }
//       //file written successfully
//     })
   
//   }
  
// }

// export class RzpConfig{

//   key :  string;
//   secret : string;

//   constructor(key:string,secret:string){
//     this.key=key;
//     this.secret=secret;
//   }
// }
