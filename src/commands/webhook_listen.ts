import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { RzpAuthConfigModel } from "../lib/RzpAuthConfigModel";
import { RzpApiAuthUtil } from "../lib/RzpApiAuthUtil";
import { LocalServer } from "../lib/LocalServer";
import { TunnelingService } from "../lib/TunnelingService";
const showBanner = require("node-banner");
const validUrl = require("valid-url");

export default class WebhookListen extends Command {
  static description = "describe the command here";

  rzpApiAuthUtil = new RzpApiAuthUtil(this.config.configDir);
  apiKeys: any;
  static flags = {
    help: flags.help({ char: "h" }),

    url: flags.string({
      char: "u",
      required: true,
      description: "App url for Webhook http request forwarding",
    }),
  };

  //logs for keys and validate
  //get a local tunnel url
  //register the url with apiCliRouter
  //start litening and forwarding request

  async run() {
    const { args, flags } = this.parse(WebhookListen);
    const url = flags.url;

    if (!validUrl.isUri(url)) {
      this.error("Not a valid app url :" + url);
    }

    cli.action.start("Fetching api keys conf ");
    this.apiKeys = await this.rzpApiAuthUtil
      .readApiKeysFromConfFile()
      .then(function (data) {
        cli.action.stop("api keys fetched");

        return new RzpAuthConfigModel(data.key, data.secret);
      })
      .catch(function (err) {
        cli.error("\nfailed to read api keys from path \n\n error :" + err);
      });

    cli.action.start("Validating credentials");
    await RzpApiAuthUtil.validateKeys(this.apiKeys.key, this.apiKeys.secret)
      .then(function () {
        cli.action.stop("Credentails validated successfully");
      })
      .catch(function () {
        cli.error(
          "\n Outdate / Invalid Credentials found in config file \n\n" +
            "\n to set new api keys run command - rzp-cli login"
        );
      });

    //start a local server
    cli.action.start("Starting Connection bridge");
    let tunnel = new TunnelingService(8654,Buffer.from(this.apiKeys.key+':'+this.apiKeys.secret).toString('base64'));
    await tunnel.start();
    cli.action.stop();

    let server = new LocalServer(8654, url, this.config.dataDir);
    await server.core();

    var refreshIntervalId = setInterval(function () {
      if (server.isSetup && tunnel.isSetup) {
        (async () => {
          await showBanner(
            "Razorpay",
            "Webhook bridge started.\n Forwaring requests to " + url
          );
          cli.action.start('listening ....')
        })();
        clearInterval(refreshIntervalId);
      }
      
    }, 2000);
  }

}
