import { readFile } from "node:fs";
import { CliConfig } from "../../../../CliConfig";
const jp = require('jsonpath');
const fs = require('fs')
var unirest = require('unirest');

export class WebhookEventPlayService{


    //check if pat available in config
    //fetch for path
    //post it to listening localhost
    replayEvent(query:string):void{

      let sampleJsons =   CliConfig.getSamplePayloadPaths();
     
      let var1 = jp.query(sampleJsons, query);
    

      if (typeof var1 === "string") 
                this.readTheFile(var1);

        else if(Array.isArray(var1) && typeof var1[0] === "string")
                this.readTheFile(var1[0]);


        else
             console.log(JSON.stringify(var1,null,2)) 


    }
    readTheFile(path:string){
        fs.readFile(path, 'utf8' , (err:any, data:any) => {
            if (err) {
              console.error(err)
              throw err;
            }
            console.log("###   Replaying payload : \n",JSON.stringify(JSON.parse(data),null,2));
          
            let appHostUrl = 'http://localhost:'+CliConfig.getAppPort()+'/webhook-listner';

            var req = unirest('POST', appHostUrl)
  .headers({
    'Content-Type': 'application/json'
  })
  .send(data)
  .end(function (res:any) { 
    if (res.error) throw new Error(res.error); 
   //console.log(res.raw_body);
  });



          })
        }
    }


