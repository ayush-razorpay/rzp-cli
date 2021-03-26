import { Config } from "./config";
var unirest = require('unirest');

const localtunnel = require('localtunnel');

export class LocaltunnelClient{

    public startTunnel(){

        ( async () => {
            const tunnel = await localtunnel({
                host:Config.getLocalTunnelHost(),
            subdomain:Config.getLocalTunnelSubdomain(), 
            port: Config.getAppPort()});

            tunnel.url;
       
//register to rzp hook
let url = (tunnel.url)+"/webhook-listner";
console.log("---------",url);
var req = unirest('POST', 'https://floating-woodland-30144.herokuapp.com/Subscription')
  .headers({
    'Content-Type': 'application/json'
  })
  .send(JSON.stringify({
    "mid": "BFQ7uQEaa7j2z7",
    "url":  url
  }))
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });


            console.info('\nTunnel service started  '+tunnel.url+Config.webhookListnerUri)
          
            tunnel.on('close', () => {
              // tunnels are closed

              console.info('\nTunnel service Has Stopped');

            });
          })();

    }

}