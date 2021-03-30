import { Command, flags } from "@oclif/command";
import { string } from "@oclif/command/lib/flags";
import cli from "cli-ux";
import { CliConfig } from "../CliConfig";

export default class Get extends Command {
  static description = "Get Razorpay object id";
  rzp = CliConfig.getRazorpay();
  static flags = {
    help: flags.help({ char: "h" }),

    id: flags.string({
      char: "i",
      description:
        "Used when we have a specific record id of the Object. ex : (rzp-cli get -i=pay_GrJmRvJ2MPTgSZ / rzp-cli get --id=pay_GrJmRvJ2MPTgSZ)",
      exclusive: ["count", "from", "to", "skip", "expand"],
    }),

    count: flags.string({
      char: "c",
      description:
        "Number of records to be fetched. Default value is 10. Maximum value is 100. \nThis can be used for pagination, in combination with the skip parameter",
    }),
    from: flags.string({
      char: "f",
      description:
        "integer Timestamp, in seconds, from when payments are to be fetched.",
    }),
    to: flags.string({
      char: "t",
      description:
        "integer Timestamp, in seconds, till when payments are to be fetched.",
    }),
    skip: flags.string({
      char: "s",
      description:
        "integer Number of records to be skipped while fetching the payments.",
    }),
    expand: flags.string({
      char: "x",
      description:
        "Pass a comma seperated list Used to retrieve additional information about the payment, specifically the method used to make the payment. Using this parameter will cause a sub-entity to be added to the response.",
    }),
  };

  static args = [{name: 'recordType'}]

  async run() {
    const { args, flags } = this.parse(Get);

    if (flags.id) {
      let objId = flags.id;
      let rzpInstace = this.rzpInstanceFactory(objId);
      if (rzpInstace) this.getchRecordUisngId(objId,rzpInstace);
      else cli.log("Not a valid rzp ObjectId");
    } else {

      if(! args.recordType)
          cli.error("Please pass a valid record type . pay")

          let rzpInstace = this.rzpInstanceFactory(args.recordType);
          if (rzpInstace) this.getRecords(flags,rzpInstace);
          else cli.log("Not a valid rzp Record Type");
      
    }
  }

  private getchRecordUisngId(objId: string,rzpInstace:any) {
    cli.action.start("Get " + objId, "Fetching", { stdout: true });
    rzpInstace
      .fetch(objId)
      .then((data: any) => {
        cli.log(JSON.stringify(data, null, 2));
      })
      .catch((error: any) => {
        cli.error(error);
      });
  }

  private getRecords(flags: any,rzpInstace:any) {
    let flagsOverride = JSON.parse(JSON.stringify(flags));
    if (flags.expand) flagsOverride.expand = flags.expand.split(",");
    cli.action.start(
      "Get with params " + JSON.stringify(flagsOverride),
      "Fetching",
      { stdout: true }
    );

    rzpInstace
      .all(flagsOverride)
      .then((response: any) => {
        cli.log(JSON.stringify(response, null, 2));
      })
      .catch((error: any) => {
        cli.error(error);
      });
  }

  private rzpInstanceFactory(var1:string):any{

  let toreturn ;

  if(var1 == "payments" || var1.startsWith("pay"))
  toreturn =  this.rzp.payments;
  
  else if(var1 == "invoices" || var1.startsWith("inv"))
  toreturn =  this.rzp.invoices;

  else if(var1 == "orders" || var1.startsWith("order"))
  toreturn =  this.rzp.orders;

  else if(var1 == "refunds" || var1 == "refund"  || var1.startsWith("rfnd"))
  toreturn =  this.rzp.refunds;

  else if(var1 == "customers" || var1.startsWith("cust"))
  toreturn =  this.rzp.customers;

  else if(var1 == "token" || var1.startsWith("token"))
  toreturn =  this.rzp.fetchToken;

  if(!toreturn)  throw new Error("Invalid argument : "+var1+" not a suppported operatrion");

  return toreturn;


  }

}
