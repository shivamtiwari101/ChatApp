
const socket=io();
 
/* Time Function */
const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
 
const form=document.getElementById("msg-form");
const input=document.getElementById("input");
const msgBox=document.querySelector(".main-box");
 
var sendBox=document.querySelector("#send-box");
input.addEventListener('keyup',(e)=>{
  if(input.value==""){
    sendBox.style.display="none";
  }else{
  sendBox.style.display="inline-block";
  }
});

const name=prompt("Hey whats your name!");
var sender=new Audio('sender.mp3');
var rev=new Audio('reciver.mp3');

//mp3.play();
const append=(message,position)=>{
     
    const messageElement=document.createElement('div');
     
    messageElement.innerHTML=`${message} <div class="userTime">${formatAMPM(new Date())}</div>`; 
    
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    msgBox.append(messageElement);
    if(position=="left"){
    sender.play();
    }else{
        rev.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendBox.style.display="none";
    const message=input.value;
    append(`<span class="userName">You</span><div  class="userMsg">${message}</div>`,'right');
    socket.emit('send',message);
    input.value="";
})
 
socket.emit('new-user-joined',name);
//socket.emit("message",msg);
socket.on('user-joined',name=>{
     
  append(`${name} join`,'right');
})
socket.on('receive',data=>{
     
    append(`<span class="userName">${data.name}</span><div  class="userMsg">${data.message}</div>`,'left');
  })
  socket.on('left',name=>{
     
    append(`${name} left the chat`,'left');
  })
 