const jp = require("jsonpath");
import cli from "cli-ux";
import { gettimeStamp } from "./CommonUtils";
const express = require("express");
const bodyparser = require("body-parser");
var fsPath = require("fs-path");
const fs = require("fs");
const path = require("path");

export class LocalServer {
  public isSetup = false;

  port: number;
  forwardRequestUrl: string;
  app: any;
  dataFilePath: string;
  constructor(port: number, forwardRequestUrl: string, dataFilePath: string) {
    this.forwardRequestUrl = forwardRequestUrl;
    this.port = port;
    this.dataFilePath = dataFilePath;
    this.app = express();
  }
  async core() {
    this.app.use(require("body-parser").json());

    this.app.post("/", async (req: any, res: any) => {
      let x = req.body;
      let timeStamp = gettimeStamp();
      let eventid = jp.query(x, "$..id")[0];
      let event = x.event;
      cli.info(
        timeStamp + "-->  [ event : " + event + ", id : " + eventid + " ]"
      );

      let filename = x.event + "-" + eventid + ".json";
      this.writeFile(x, filename);
      res.redirect(307, this.forwardRequestUrl);
    });

    this.app.get("/replay/data", async (req: any, res: any) => {
      await this.getAllPreviousJsonFiles().then((data) => {
        res.send(data);
      });
    });

    this.app.listen(this.port, () => {
      cli.log(`local server listening at http://localhost:${this.port}`);
      this.isSetup = true;
    });
  }

  writeFile(toSave: any, filename: string) {
    let path = this.dataFilePath + "/" + filename;
    fsPath.writeFile(path, JSON.stringify(toSave), function (err: any) {
      if (err) {
        cli.error("Failed to write path for Replay on path :" + path);
      } else {
        return;
      }
    });
  }

  async getAllPreviousJsonFiles() {
    return fs
      .readdirSync(this.dataFilePath + "/")
      .filter((name: any) => path.extname(name) === ".json")
      .map((name: any) => require(path.join(this.dataFilePath + "/", name)));
  }
}
