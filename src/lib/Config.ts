var jsonConf = require('../../conf.json')

export class Config{
    public static webhookListnerUri = "/webhook-listner";
    
    public static getLocalTunnelSubdomain():string{return (jsonConf.localtunnel.subdomain + Config.getMid() );}
    public static getLocalTunnelHost():string{return jsonConf.localtunnel.host;}
    public static getAppPort():number{return jsonConf.app.port;}
    public static getMid():string{return jsonConf.razorpayConf.mid;}
    

}