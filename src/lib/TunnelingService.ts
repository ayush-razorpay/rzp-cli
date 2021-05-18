const localtunnel = require("localtunnel");
import cli from "cli-ux";

export class TunnelingService {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  start(): void {
    (async () => {
      const tunnel = await localtunnel({
        port: this.port,
      });
      cli.log("\nTunnel started at :" + tunnel.url);

      tunnel.on("close", () => {
        // tunnels are closed
        //todo: add logs here
      });
    })();
  }

}
