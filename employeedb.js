var mysql = require('mysql');
const f1 = require('express');
const app = f1();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(f1.json());


app.use(f1.static('./sr'));
app.post("/emp",function(req,res)
{
        var msg  ="post is giving  "+req.body.def;
        console.log(msg);

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database:"awp"
          });

        var data = JSON.parse(req.body.xyz);
        var opt = JSON.parse(req.body.def);
        var result={};
        result.status=0;
        result.content="";

        con.connect(function(err) 
        {   if (err)
            { result.status=0;
              result.content="Db problem";}
         else
        {
          let x=data.k1;
          let y=data.k2;   //{"xyz":"{\"k1\":12,\"k2\":13}","def":"3"}
          let z=data.k3; 
        switch(opt) {
            
            case 1:
              console.log("adding element "+data);// {"xyz":"{\"k1\":12,\"k2\":13,\"k3\":\"up\"}","def":"1"}
              con.query("INSERT INTO emp (empno, mobile, location) VALUES (?, ?, ?)", [x,y,z], function (err, res1, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                console.log(res1);
                if(res1.affectedRows==1)
                  result.status=1;
              res.send(JSON.stringify(result));// {"status":1,"content":""}
              });
              break;
            case 2:
                console.log("check element "+data); // {"xyz":"{\"k1\":12,\"k2\":13,\"k3\":\"up\"}","def":"2"}
                con.query(' select * from emp where empno=?',[x], function (err, res1, fields) {
                  if (err) throw err;
                  else if(res1.length) {
                     result.status=1;
                     result.content=res1;// { "status": 1,"content": [  {"empno": 12, "mobile": "231", "location": "agra"}]}
                     console.log(res1);
                  }
                  else {
                    var content={};
                    content.empno=x;
                    content.mobile=0;
                    content.location="";//"{empno:"+ x+", mobile: 0, location: '' }"
                    result.content=content;
                  }
                  // {  "status": 1,"content": "[{\"empno\":101,\"mobile\":\"1\",\"location\":\"\"}]"}
                  res.send(result);
                });
                break; 
            case 3:
                 console.log("modify data........"+JSON.stringify(data)); //{"xyz":"{\"k1\":12,\"k2\":13,\"k3\":\"up\"}","def":"3"}
                 
                  con.query('update emp set mobile = ?  where empno = ?', [y,x], (err, res1) => {
                     if (err) {
                        result.status=-1;//my logic
                        result.content = err;
                
                     } else {
                         result.status=1,
                        result.content=res1.affectedRows;
                     };
                     console.log("in the function" + JSON.stringify(result));
                     res.send(JSON.stringify(result)); //{"status":1,"content":1}
    
                    });
                  break;
             
            case 4:
                console.log("delete "+data); // {"xyz":"{\"k1\":12,\"k2\":13,\"k3\":\"up\"}","def":"4"}
                con.query('delete from emp where empno = ?', [x], (err, res1) => {
                  if (err) {
                      result.status=-1;//my logic
                      result.content = err;
                  
                  } else {
                      result.status=1,
                      result.content=res1.affectedRows
                  };
                  console.log("in the function" + JSON.stringify(result));
                  res.send(JSON.stringify(result)); // {"status":1,"content":1}
                });
                break;
            default: // view all
              console.log(opt);
              con.query("SELECT * FROM emp", function (err, res1, fields) {
                if (err) throw err;
                console.log(res1);
                res.send(res1);
              });
          }
        
        }
    });
     //  res.send(JSON.stringify(result));
});


app.listen(9000, function () {
    console.log("server listening at port 9000...");
});
