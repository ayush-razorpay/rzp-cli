
var unirest = require('unirest');


function postToLocalUrl(url:string,json:string){
    var req = unirest('POST', url)
    .headers({
      'Content-Type': 'application/json'
    })
    .send(json)
    .end(function (res:any) { 
      if (res.error) throw new Error(res.error); 
     //console.log(res.raw_body);
    });
  
}