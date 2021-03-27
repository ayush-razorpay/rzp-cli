import { CliConfig } from "../../../../../CliConfig";

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
      console.log("-------Starts----" + count + "--------------" + (JSON.parse(x).event) + "--------------------------");
      console.log(x);
      console.log("--------Ends-------" + (count++) + "--------" + (JSON.parse(x).event) + "--------------------------");
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