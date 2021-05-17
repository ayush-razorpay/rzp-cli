import { Command, flags } from "@oclif/command";

import cli from "cli-ux";

import { RzpAuthConfigModel } from "../lib/login/RzpAuthConfigModel";
import { RzpApiAuthUtil } from "../lib/RzpApiAuthUtil";

export default class Login extends Command {
  static description = "Login to Razorpay using key Id & secret";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  rzpApiAuthUtil = new RzpApiAuthUtil(this.config.configDir);

  /**
   * get user key & secret
   *
   * validate if valid key and secret
   *
   * set file .razopay
   *
   * alert user auth success
   */
  async run() {
    const { args, flags } = this.parse(Login);

    const key: string = await cli.prompt("\nEnter Razorpay Api key Id ");

    const secret: string = await cli.prompt("Enter Razorpay Api Key Secret", {
      type: "mask",
    });

    cli.action.start("Validating credentials");
    await RzpApiAuthUtil.validateKeys(key, secret)
      .then(function () {
        cli.action.stop(
          "Credentails validated successfully"
        );
      })
      .catch(function () {
        cli.error(
          "\nInvalid Credentials Entered \n\n" +
            "Need help generating api keys please visit - https://razorpay.com/docs/payment-gateway/dashboard-guide/settings/api-keys/"
        );
      });

    let toSaveKeys = new RzpAuthConfigModel(key, secret);


    cli.action.start("Updating credentials in conf");
    await this.rzpApiAuthUtil
      .updateApiKeysToConfFile(toSaveKeys)
      .then(function () {
        cli.action.stop("\nConf file updated successfully");
      })
      .catch(function (error) {
        cli.error('\nFailed to write to conf file path \n\nerror:' + error);
      });

  }
}
