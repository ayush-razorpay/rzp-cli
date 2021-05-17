import { RzpAuthConfigModel } from "./login/RzpAuthConfigModel";

var unirest = require("unirest");
const fs = require("fs");

export class RzpApiAuthUtil {
  confFilePath: string;

  constructor(confFilePath: string) {
    this.confFilePath = confFilePath;
  }

  static async validateKeys(key: string, secret: string) {
    let auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

    return new Promise((resolve, reject) => {
      unirest
        .get("https://api.razorpay.com/v1/payments/")
        .headers({
          "Content-Type": "application/json",
          Authorization: auth,
        })
        .send("")
        .end(function (response: any) {
          if (response.error) {
            reject(response);
          } else {
            resolve(response);
          }
        });
    });
  }

  async updateApiKeysToConfFile(toSave: RzpAuthConfigModel) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.confFilePath, JSON.stringify(toSave), (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve("file saved");
        }
      });
    });
  }
}
