import { CliConfig } from "../../../../../CliConfig";
import cli from 'cli-ux'
const bodyparser = require('body-parser')
export class LocalServerService{

   express = require('express')
     app = this.express()
     port = CliConfig.getAppPort()
 

  public start() {
    this.app.use(require('body-parser').json());     
    this.app.get('/health', (req:any, res:any) => {
      res.send('Serive up and running !')
    })

    let count = 1;
    this.app.post('/webhook-listner', async (req:any, res:any) => {

      let y = req.body;
      delete y["payload"];
      let x = JSON.stringify(y);
      await cli.wait()
      cli.info( this.timeStamp()   +'--> '+x + "\n");
      res.send(req.body)
    })

    this.app.listen(this.port, () => {
      console.log(`Webhooks listening at http://localhost:${this.port}`)
    })
  }

  public stop(){
    this.app.close();
  }



   timeStamp() {
    // Create a date object with the current time
      var now = new Date();
    
    // Create an array with the current month, day and time
      var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    
    // Create an array with the current hour, minute and second
      var time : any = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    
    // Determine AM or PM suffix based on the hour
      var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    
    // Convert hour from military time
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    
    // If hour is 0, set it to 12
      time[0] = time[0] || 12;
    
    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }
    
    // Return the formatted string
      return date.join("/") + " " + time.join(":") + " " + suffix;
    }
}