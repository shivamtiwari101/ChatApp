const path=require("path");
const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const port =process.env.PORT||3000;
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

 const io=require("socket.io")(httpServer);

const user={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
      //console.log(name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on("send",message=>{
        socket.broadcast.emit('receive',{message:message,name:user[socket.id]});
    })
  
    socket.on("disconnect",(message)=>{
      socket.broadcast.emit('left',user[socket.id]);
      delete user[socket.id];
  })
})
httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
 
 
 