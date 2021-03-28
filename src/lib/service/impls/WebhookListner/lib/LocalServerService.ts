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
      res.send('Serive up and running !')
    })

    let count = 1;
    this.app.post('/webhook-listner', (req:any, res:any) => {
      let x = JSON.stringify(req.body, null, " ");
      cli.info(x);
      res.send(req.body)
    })

    this.app.listen(this.port, () => {
      console.log(`Webhooks listening at http://localhost:${this.port}`)
    })
  }

  public stop(){
    this.app.close();
  }



}