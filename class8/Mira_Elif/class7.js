function societyName(names){
  let groupName='';
 for(let i=0; i<names.length;i++){
  groupName = groupName + names[i].charAt(0); 
}
  let sorted=groupName.split('').sort().join('');
  console.log(sorted);
}
societyName(["Adam", "Sarah", "Malcolm"]);
societyName(["Harry", "Newt", "Luna", "Cho"]);
societyName(["Phoebe", "Chandler", "Rachel", "Ross", "Monica", "Joey"]);

function chatroomStatus(users){
  if (users.length==0){
    console.log(`no one online`);
  }
  else if(users.length==1){
    console.log(`${users[0]} online`);
  }
  else if(users.length==2){
    console.log(`${users[0]} and ${users[1]} online`);
  }
  else {
    let counter=0;
    for(let i=0; i<users.length;i++){
      counter++;
    }
    console.log(`${users[0]} and ${users[1]} and ${counter-2} more  online`);
  }
}
chatroomStatus([]);
chatroomStatus(["Liz"]);
chatroomStatus(["Liz", "Ammar"]);
chatroomStatus(["Liz", "Hakan", "Ammar", "Feras", "Jaime", "Derya"]);
