
function societyName(names) {
  names.sort();
  let str = "";
  for (let i=0; i< names.length;i++){
    str = str + names[i][0]
  }
  return str;
}

console.log(societyName(["Louis", "Yaman", "Bahaa", "Ammar", "Hakan"]));

function chatroomStatus(users) {
  if (users.length === 0) {
    return "no one online";
  }
  if (users.length === 1) {
    return users[0] + " online";
  }
  if (users.length === 2) {
    return users[0] + " and " + users[1] + " online";
  } else {
    return users[0] + " and " + users[1] + " and " + (users.length - 2) + " more online";
  }
}
let first = "louis";
let last = "li";
console.log("Hello " + first + " " + last + "!");
