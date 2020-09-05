const f1 = require('express');
const app = f1();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(f1.json());


app.use(f1.static('./sr'));
app.post("/array",function(req,res)
{
        var msg  ="post is giving " + req.body.xyz+" and "+req.body.def;
        console.log(msg);

        var data = JSON.parse(req.body.xyz);
        var opt = JSON.parse(req.body.def);
        var result={};
        var num= [1,11,21,31,41,51,61,71,81,91];
        var status=0;
        switch(opt) {
            case 1:
              console.log("checking for number........"+data); 
              for (let x in num) {
                if(num[x]==data)
                    status=1;
              }
              break;
            case 2:
              console.log("adding element "+data);
              num.push(data);
              status=1;
              break;
            case 3:
                console.log("modify element "+data.k1+" to "+data.k2);// {"xyz":"{\"k1\":12,\"k2\":13}","def":"3"}
                for (let x in num) {
                    if(num[x]==data.k1){
                        num[x]=data.k2;
                        status=1;
                    }
                        
                  }
                break;  
            case 4:
                console.log("delete "+data);
                data=parseInt(data);
                var a = num.indexOf(data);
                num.splice(a, 1);
                status=1;  
                break;
            default:
              console.log(opt);
          }
        
       result.num=num;
       result.status=status;
       res.send(JSON.stringify(result));
});


app.listen(9010, function () {
    console.log("server listening at port 9010...");
});
