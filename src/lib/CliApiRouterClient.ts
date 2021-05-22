var unirest = require('unirest');
import cli from "cli-ux";

export class CliApiRouterClient{



   public static async registerTempUrl(tempUrl : string) {
        // let auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
        // return new Promise((resolve, reject) => {
        //   unirest
        //     .get("https://api.razorpay.com/v1/payments/")
        //     .headers({
        //       "Content-Type": "application/json",
        //       Authorization: auth,
        //     })
        //     .send("")
        //     .end(function (response: any) {
        //       if (response.error) {
        //         reject(response);
        //       } else {
        //         resolve(response);
        //       }
        //     });
        // });

        return new Promise((resolve, reject) => {
     unirest('POST', 'https://floating-woodland-30144.herokuapp.com/Subscription').headers({
          'Content-Type': 'application/json'
        })
          .send(JSON.stringify({
            "mid": 'GRbBhTpWL3JxTW',
            "url": tempUrl
          }))
          .end(function (res: any) {
            if (res.error) 
            {
         
            cli.log('Unable to regesiter Tunnel with apiRouterService',res.raw_body);
            reject(res);
            }
            else{
              cli.log('Regsitered Tunnel public URL');
              resolve(res);
            }
           
           
          });

        });
      }


}