import { CliConfig } from "../../../../../CliConfig";
import cli from 'cli-ux'
const bodyparser = require('body-parser')
export class LocalServerService{

   express = require('express')
     app = this.express()
     port = CliConfig.getAppPort()
 

  public start() {
    this.app.use(require('body-parser').json());     
    this.app.get('/health', (req:any, res:any) => {
      res.send('Server up and running !')
    })

    this.app.post('/webhook-listner', async (req:any, res:any) => {
      let x = JSON.stringify(req.body, null, " ");
      // await cli.wait()
      cli.info(x);
      res.send(req.body)
    })

    this.app.listen(this.port, async () => {
      cli.action.start(`Webhooks listening at http://localhost:${this.port}`+' Not ready yet')
   })
  }

  public stop(){
    this.app.close();
  }



}