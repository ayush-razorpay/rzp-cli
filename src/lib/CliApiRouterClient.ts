var unirest = require('unirest');
import cli from "cli-ux";

export class CliApiRouterClient{



   public static async registerTempUrl(tempUrl : string, auth :string) {
  

        return new Promise((resolve, reject) => {
          
     unirest('POST', 'https://floating-woodland-30144.herokuapp.com/register').headers({
          'Content-Type': 'application/json',
          'Authorization':'Basic '+auth
        })
          .send(JSON.stringify({
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