import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { RzpAuthConfigModel } from "../lib/RzpAuthConfigModel";
import { RzpApiAuthUtil } from "../lib/RzpApiAuthUtil";
import { LocalServer } from "../lib/LocalServer";

const validUrl = require("valid-url");

export default class WebhookListen extends Command {
  static description = "describe the command here";
  rzpApiAuthUtil = new RzpApiAuthUtil(this.config.configDir);
  //rzpApiAuthUtil = new RzpApiAuthUtil('dasdd');
  apiKeys : any;
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
     this.apiKeys = await this.rzpApiAuthUtil.readApiKeysFromConfFile()
    .then(function(data){
      cli.action.stop('api keys fetched');
       
      return new RzpAuthConfigModel(data.key,data.secret);
      
    }).catch(function(err){
      cli.error('\nfailed to read api keys from path \n\n error :' + err);
    })
    
    cli.action.start("Validating credentials");
    await RzpApiAuthUtil.validateKeys(this.apiKeys.key, this.apiKeys.secret)
      .then(function () {
        cli.action.stop("Credentails validated successfully");
      })
      .catch(function () {
        cli.error(
          "\n Outdate \ Invalid Credentials found inconfig file \n\n" +
            "\n to set new api keys run command - rzp-cli login"
        );
      });


      //start a local server 

      let server = new LocalServer(8654,url);

      await server.start();


    this.log(
      JSON.stringify(this.apiKeys)
    );
  }





}
