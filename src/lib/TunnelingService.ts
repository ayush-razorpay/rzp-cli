const localtunnel = require("localtunnel");
import cli from "cli-ux";
import { CliApiRouterClient } from "./CliApiRouterClient";

export class TunnelingService {
  port: number;
  isSetup = false;

  constructor(port: number) {
    this.port = port;
  }

  start(): void {
    (async () => {
      const tunnel = await localtunnel({
        port: this.port,
      });
      cli.log("Tunnel started at :" + tunnel.url);
      
      if(tunnel.url  != null ){
    await CliApiRouterClient.registerTempUrl(tunnel.url);
      this.isSetup=true;
      }
      else
      {
        throw new Error('Temporary public url not found in response from tunneling service');
      }

    

      tunnel.on("close", () => {
        // tunnels are closed
        //todo: add logs here
      });
    })();
  }

}
