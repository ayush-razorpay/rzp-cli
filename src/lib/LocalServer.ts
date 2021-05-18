const jp = require("jsonpath");
import cli from "cli-ux";
import { gettimeStamp } from "./CommonUtils";
const express = require("express");


const bodyparser = require("body-parser");
export class LocalServer {

  port: number;
  forwardRequestUrl: string;
  app: any;
  constructor(port: number, forwardRequestUrl: string) {
    this.forwardRequestUrl = forwardRequestUrl;
    this.port = port;
    this.app = express();
  }


  async core() {
   
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
      res.redirect(307, this.forwardRequestUrl)
    });
    this.app.listen(this.port, async () => {
      cli.log(
        `local server listening at http://localhost:${this.port}`
      );
    });
  }

}
