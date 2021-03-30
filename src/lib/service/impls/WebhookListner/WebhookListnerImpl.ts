import { CliConfig } from "../../../../CliConfig";
import { RzpCliService } from "../../RzpCliService";
import { LocalServerService } from "./lib/LocalServerService";
const localtunnel = require('localtunnel');
const log4js = require("log4js");
const log = log4js.getLogger();
var unirest = require('unirest');
import cli from 'cli-ux'

export class WebhookListnerimpl implements RzpCliService {

  private static assignedUrl: string;

  private lts: LocalServerService = new LocalServerService();

  /**
   * Request for a new url to LocalTunner
   * Do not register with ApiRequestRouter yet
   */
  init(): void {
    ( async () => {
      const tunnel = await localtunnel({
          host:CliConfig.getLocalTunnelHost(),
      subdomain:CliConfig.getLocalTunnelSubdomain(), 
      port: CliConfig.getAppPort()});
     WebhookListnerimpl.setAssignedUrl( tunnel.url );
     
     this.start();
     
     tunnel.on('close', () => {
            // tunnels are closed
            //todo: add logs here
          });
        })();
  }

  /**
   * Starts listening local server (Check of ports avilable)
   * Register with ApiRequestRouter
   */

  start(): void {
    this.lts.start();

console.log("--------",CliConfig.getMid());

    let url = WebhookListnerimpl.assignedUrl + "/webhook-listner";

    var req = unirest('POST', (CliConfig.getApiRouterConfig().host)).headers({
      'Content-Type': 'application/json'
    })
      .send(JSON.stringify({
        "mid": "acc_GRbBhTpWL3JxTW",
        "url": url
      }))
      .end(function (res: any) {
        if (res.error) 
        {
        console.log("failed to register with apiRouterService", res.raw_body);
        throw new Error(res.error);
        }
        console.log("Registered with apiRouterService", res.raw_body+"\n");
        cli.action.start("Listening to webhook posts on localhost:8881");
      });

  }
  /**
   * de-register form ApiRequestRouter
   * Stop listneing localserver 
   */
  stop(): void {
    var req = unirest('POST', (CliConfig.getApiRouterConfig().host).headers({
      'Content-Type': 'application/json'
    })
      .send(JSON.stringify({
        "mid": CliConfig.getMid(),
        "url": ''
      }))
      .end(function (res: any) {
        if (res.error) 
        {
        console.log("failed to de-register with apiRouterService", res.raw_body);
        throw new Error(res.error);
        }
        console.log("De-registered with apiRouterService", res.raw_body);
      }));

 
    this.lts.stop();

  }


  /**
   * Fall back after init .
   * 
   * no impl required in this case 
   */
  terminate(): void { }


  /**
   * Tunnel url assigned
   */

  public static setAssignedUrl(url: string) {
    WebhookListnerimpl.assignedUrl = url;
  }

}





