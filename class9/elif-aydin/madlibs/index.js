//- Start with this index.html, which has several input elements and a button:

//- Link index.html to index.js using `script` tag.

// - Add an event listener to the button so that it calls a makeMadLib function when clicked.

// - In the makeMadLib function, retrieve the current values of the form input elements, make a story from them, and output that in the story div (like "Pamela really likes pink cucumbers.")
document.addEventListener('DOMContentLoaded', () => {
  let noun = document.getElementById('noun');
  let adj = document.getElementById('adjective');
  let name = document.getElementById('person');
  let btn = document.getElementById('lib-button');
  let story = document.getElementById('story');
  btn.addEventListener('click', (e) => {
    // Pamela really likes pink cucumbers.

    let string = `${name.value} went  ${adj.value} And one man finds hair in his ${noun.value} `;

    story.innerText = string;
    console.log(string);
  });
});

//All man kind went bald. And one man finds hair in his soup.
