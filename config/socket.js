const {Server, Socket}=require("socket.io");
const Chat = require("../models/Chat");
const Fare =require("../models/Fare")
// module.exports=function (io) {
//     // const io= new Server(server,{
//     //     cors: {
//     //       origin: "http://localhost:3000",
//     //     },
//     //   })
    
//     io.on("connection", (socket) => {
        
        
//         socket.on("join",(event)=>{
         
//           socket.join(event.user)
//           console.log(io.sockets.adapter.rooms)
          
//         })
      
//       });
     
// }

let io 


if (io === undefined) {
  io = new Server(global.server,{
        cors: {
          origin: "http://localhost:3000",
        },
      })
      io.on("connection", (socket) => {
        
        
                socket.on("join",(event)=>{
                 
                  socket.join(event.user)
                  console.log(io.sockets.adapter.rooms)
                  
                })
                socket.on("reject",(event)=>{
            
                  console.log(event)
                  console.log(io.sockets.adapter.rooms)
                  
                })
                socket.on("chat",(event)=>{
                  console.log(event)
                  socket.broadcast.to(event.room).emit("chat",event.chat)
                  Chat.create({
                    "sender":event.sender,
                    "fare":event.room,
                    "message":event.chat
                  })
                })

                socket.on("accept",async(event)=>{
                  fareid=event.fareId
                  console.log("event",event)
                  if(socket.rooms.has(fareid)){
                    console.log("correct")
                    conf=await Fare.updateOne({_id:fareid},{
                      driver:event.driverId
                    })
                    console.log("accept",conf)
                  }
                 
                  // console.log(io.sockets.adapter.rooms)
                  
                })
              
              });
              
} else {
  io = io;
}

module.exports=io