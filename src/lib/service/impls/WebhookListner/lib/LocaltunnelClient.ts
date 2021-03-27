// import { CliConfig } from "../../../../../CliConfig";
// import { WebhookListnerimpl } from "../WebhookListnerImpl";
// var unirest = require('unirest');

// const localtunnel = require('localtunnel');

// export class LocaltunnelClient{

//   public startTunnel(){

//     ( async () => {
//         const tunnel = await localtunnel({
//             host:CliConfig.getLocalTunnelHost(),
//         subdomain:CliConfig.getLocalTunnelSubdomain(), 
//         port: CliConfig.getAppPort()});


//         console.log("----------tunnel.url",tunnel.url);
//        WebhookListnerimpl.setAssignedUrl( tunnel.url );

//             tunnel.on('close', () => {
//               // tunnels are closed
//               //todo: add logs here
//             });
//           })();
   
// }
// }