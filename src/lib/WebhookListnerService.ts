import { Config } from "./config";

const bodyparser = require('body-parser')
export class WebhookListnerService {

  public start() {
    const express = require('express')
    const app = express()
    const port = Config.getAppPort()


    app.use(require('body-parser').json());
    app.get('/health', (req, res) => {
      res.send('Serive up and running !')
    })

    let count = 1;
    app.post('/webhook-listner', (req, res) => {
      let x = JSON.stringify(req.body, null, " ");
      console.log("-------Starts----" + count + "--------------" + (JSON.parse(x).event) + "--------------------------");
      console.log(x);
      console.log("--------Ends-------" + (count++) + "--------" + (JSON.parse(x).event) + "--------------------------");
      res.send(req.body)
    })

    app.listen(port, () => {
      console.log(`Webhooks listening at http://localhost:${port}`)
    })
  }
}