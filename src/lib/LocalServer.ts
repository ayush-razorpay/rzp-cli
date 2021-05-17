const jp = require("jsonpath");
import cli from "cli-ux";
import { gettimeStamp } from "./CommonUtils";

const bodyparser = require("body-parser");
export class LocalServer {
  express = require("express");
  app = this.express();
  port : number;
  forwardRequestUrl : string;

  constructor(port : number,forwardRequestUrl : string){
      this.forwardRequestUrl=forwardRequestUrl;
      this.port=port;
  }


  public start() {
    cli.action.start(`starting local server `);
    this.app.use(require("body-parser").json());

    this.app.post("/", async (req: any, res: any) => {
      let x = req.body;
      cli.info(
        gettimeStamp() +
          "-->  [ event : " +
          x.event +
          ", id : " +
          jp.query(x, "$..id")[0] +
          " ]"
      );
      res.redirect(307,this.forwardRequestUrl)
    });

    this.app.listen(this.port, async () => {
      cli.action.stop(
        `local server listening at http://localhost:${this.port}`
      );
    });
  }

  public stop() {
    this.app.close();
  }
}
