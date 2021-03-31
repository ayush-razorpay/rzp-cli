var jsonConf = require('../conf.json')
const Razorpay = require('razorpay')
export class CliConfig{
  
    public static webhookListnerUri = "/webhook-listner";
    
    public static getLocalTunnelHost():string{return jsonConf.localtunnel.host;}
    public static getAppPort():number{return jsonConf.app.port;}
    public static getMid():string{return jsonConf.razorpayConf.mid;}
    public static getApiRouterConfig(){return jsonConf.apiRouter;}
    public static getSamplePayloadPaths(){return jsonConf.samplePayloads;};
    public static getRazorpay(){return new Razorpay(jsonConf.razorpayConf.apiKey);};
    

}