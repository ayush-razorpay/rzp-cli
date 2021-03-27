var jsonConf = require('../conf.json')

export class CliConfig{
  
    public static webhookListnerUri = "/webhook-listner";
    
    public static getLocalTunnelSubdomain():string{return (jsonConf.localtunnel.subdomain + CliConfig.getMid() );}
    public static getLocalTunnelHost():string{return jsonConf.localtunnel.host;}
    public static getAppPort():number{return jsonConf.app.port;}
    public static getMid():string{return jsonConf.razorpayConf.mid;}
    public static getApiRouterConfig(){return jsonConf.apiRouter;}
    

}