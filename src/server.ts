
const bodyparser = require('body-parser')
export class SimpleServer{

    start(){
const express = require('express')
const app = express()
const port = 3000

// Body-parser middleware
app.use(require('body-parser').json()); 
//app.use(require('body-parser').urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let count = 1;
app.post('/', (req, res) => {
    let x = JSON.stringify(req.body,null," ");
    console.log("-------Starts----"+count+"--------------"+(JSON.parse(x).event)+"--------------------------");
    console.log(x);
    console.log("--------Ends-------"+(count++)+"--------"+(JSON.parse(x).event)+"--------------------------");
    res.send(req.body)
  })

app.listen(port, () => {
  console.log(`Webhooks listening at http://localhost:${port}`)
})
    }
}