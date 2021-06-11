const jp = require("jsonpath");
import cli from "cli-ux";
import { gettimeStamp } from "./CommonUtils";
const express = require("express");
const bodyparser = require("body-parser");
var fsPath = require("fs-path");
const fs = require("fs");
const path = require("path");
var unirest = require("unirest");

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
    this.app.use(express.static("."));

    let timeStamp = gettimeStamp();
    this.app.post("/", async (req: any, res: any) => {
      let x = {
        headers: req.headers,
        body: req.body,
        id: jp.query(req.body, "$..id")[0],
        event: req.body.event,
        created_at:jp.query(req.body, "$..created_at")[0],
        timeStamp : timeStamp
      };

      
      let eventid = jp.query(x, "$..id")[0];
      let event = req.body.event;
      cli.info(
        timeStamp + " -->  [ event : " + event + ", id : " + eventid + " ]"
      );

      let filename = req.body.event + "-" + eventid + ".json";
      this.writeFile(x, filename);

      let headersToSend;

      if (req.headers["x-razorpay-signature"]) {
        headersToSend = {
          "x-razorpay-signature": req.headers["x-razorpay-signature"],
          "content-type": "application/json",
          "x-razorpay-rzpcli": "forwarded",
        };
      } else {
        headersToSend = {
          "content-type": "application/json",
          "x-razorpay-rzpcli": "forwarded",
        };
      }
      let response = await LocalServer.post(
        req.body,
        headersToSend,
        this.forwardRequestUrl
      );
      res.send(response);
    });

    this.app.post("/replay/retrigger", async (req: any, res: any) => {
      let x = req.body.body;

      let timeStamp = gettimeStamp();
      let eventid = req.body.id;
      let event = req.body.event;
      cli.info(
        "locally retriggered  " +
          timeStamp +
          " -->  [ event  : " +
          event +
          ", id : " +
          eventid +
          " ]"
      );

      let toSendBody = JSON.parse(JSON.stringify(req.body.body));

      let headersToSend;
      if (req.body.headers["x-razorpay-signature"]) {
        headersToSend = {
          "x-razorpay-signature": req.body.headers["x-razorpay-signature"],
          "content-type": "application/json",
          "x-razorpay-rzpcli": "replayed",
        };
      } else {
        headersToSend = {
          "content-type": "application/json",
          "x-razorpay-rzpcli": "replayed",
        };
      }
      let response = await LocalServer.post(
        toSendBody,
        headersToSend,
        this.forwardRequestUrl
      );
      res.send(response);
    });

    this.app.get("/replay/data", async (req: any, res: any) => {
      await this.getAllPreviousJsonFiles().then((data) => {
        let toReturn = {
          count: data.length,
          data: data.reverse(),
        };

        res.send(toReturn);
      });
    });

    this.app.get("/replay", (req: any, res: any) => {
      res.sendFile("index.html", { root: __dirname });
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

  static async post(payload: string, headers: any, url: string) {
    return new Promise((resolve, reject) => {
      unirest
        .post(url)
        .headers(headers)
        .send(JSON.stringify(payload))
        .end(function (response: any) {
          if (response.error) {
            cli.warn(
              "Api Request failed with error :" + JSON.stringify(response)
            );
          }
          resolve(response);
        });
    });
  }
}
