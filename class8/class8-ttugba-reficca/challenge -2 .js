// In the console, write a function that returns the number of users in a chatroom based on the following rules:

// If there is no one, return "no one online".
// If there 1 person, return "[user1] online".
// If there are 2 people, return [user 1] and [user 2] online".
// If there are n>2 people, return the first two names and add "and n-2 more online".

// For example, if there are 5 users, return:

// "[user1], [user2] and 3 more online"

function chatroomUsers(user) {
  if (user.length === 0) {
    console.log(`no one online`);
  }
  else if (user.length === 1) {
    console.log(`${user[0]} online`); 
  }
  else if (user.length === 2) {
    console.log(`${user[0]} and ${user[1]} online`)
  }
  else {
    let n = 0;
    for(let i = 0; i < user.length; i++) {
      n++;
    }
    console.log(`${user[0]}, ${user[1]} and ${n-2} more online`)
  }
}

chatroomUsers([])
chatroomUsers(["ref"])
chatroomUsers(["ref","hey","keh"])
  
  
  
  // if user < 1 => "no one online"
  // else if user = 1 => "[user1] online"
  // else if user = 2 => "[user1] and [user 2] online"
  // else => "[user1], [user2] and (n-2) online"