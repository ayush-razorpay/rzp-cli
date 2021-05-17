export class RzpAuthConfigModel{
    
    key :  string;
    secret : string;
  
    constructor(key:string,secret:string){
      this.key=key;
      this.secret=secret;
    }
}