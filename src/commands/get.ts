import {Command, flags} from '@oclif/command'
import { string } from '@oclif/command/lib/flags'
import cli from 'cli-ux'
import { CliConfig } from '../CliConfig'

export default class Get extends Command {
  static description = 'Get Razorpay object id'

  static args = [{name: 'objectId'}]

  async run() {
    const {args, flags} = this.parse(Get)

    if(!(args && args.objectId))
    throw new Error("please pass objectId. (ex : rzp-cli get pay_GrJmRvJ2MPTgSZ	)");

    let objId = args.objectId;

    if(objId.startsWith("pay_")) this.fetchApiObjectAndLog(objId);

    else cli.log("Not a valid rzp ObjectId")
    

    


  }

  fetchApiObjectAndLog(objId:string){

    console.log("-----",objId);

    cli.action.start('Get '+objId, 'Fetching', {stdout: true})
    const rzp = CliConfig.getRazorpay();
   
    let var1 =  rzp.payments.fetch(objId).then((response:any) => {
      cli.log(response)
      // handle success
    }).catch((error:any) => {
      cli.error(error)
    });
    

  }
}
