import { Config } from "./config";


const localtunnel = require('localtunnel');

export class LocaltunnelClient{

    public startTunnel(){

        ( async () => {
            const tunnel = await localtunnel({
                host:Config.getLocalTunnelHost(),
            subdomain:Config.getLocalTunnelSubdomain(), 
            port: Config.getAppPort()});

            tunnel.url;
       
            console.info('\nTunnel service started  '+tunnel.url+Config.webhookListnerUri)
          
            tunnel.on('close', () => {
              // tunnels are closed

              console.info('\nTunnel service Has Stopped');

            });
          })();

    }

}