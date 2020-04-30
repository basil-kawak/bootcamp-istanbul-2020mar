/**
 * Converts an internal POS format to a rendered one.
 *
 * e.g., "[v]" => "verb"
 */
const INTERNAL_TO_RENDERED_POS = {
  v: "verb",
  n: "noun",
  a: "adjective",
};

const formatRenderedPos = (internalPos) => {
  // Breaking down this regex.
  // \[ and \] are brackets (we need to "escape" them).
  // | means OR.
  // g means all instances (exercise to the reader: what happens without g?)
  const noBrackets = internalPos.replace(/\[|\]/g, "");
  const rendered = INTERNAL_TO_RENDERED_POS[noBrackets];
  if (!rendered) {
    // This is a design choice. What is happening here is that we have to decide
    // how to handle parts of speech in story.txt that we don't have a specific
    // render text for; we can throw an error or "silently" default to simply
    // displaying it as-is.
    // throw new Error('Found an invalid POS in the story: ' + noBrackets');
    return noBrackets;
  }
  return rendered;
};

// We conventionally declare constants with all caps. Constant is not the same
// as const.
// https://www.reddit.com/r/learnjavascript/comments/5ns7hq/constants_can_be_declared_with_uppercase_or/
//
// This regex uses named groups to make the code more readable.
//
// Example string: Louis[v].
// Group 1: Louis
// Group 2: [v]
// Group 3: .
//
// (capturing only the v in [v] is quite tricky, not worth our time)
//
// Also, make sure not to use /g at the end of this, or we can't reuse it.
// https://stackoverflow.com/questions/2141974/javascript-regex-literal-with-g-used-multiple-times
const PARSING_REGEX = /(?<word>\w+)(?<pos>\[[vna]\])?(?<punctuation>[\.,])?/;

function parseStory(rawStory) {
  const rawWords = rawStory.split(" ");
  const results = [];
  for (let i = 0; i < rawWords.length; i++) {
    // Apply the regex to the raw word. Note that we use exec() for groups.
    const rawWord = rawWords[i];
    const groups = PARSING_REGEX.exec(rawWord).groups;

    results.push({
      word: groups.word,
      // Exercise for the reader: what happens if you set an object's value to
      // undefined?
      pos: groups.pos ? formatRenderedPos(groups.pos) : undefined,
    });

    // We handle punctuation by inserting an additional element in the array
    // if we see a period.
    if (groups.punctuation) {
      results.push({
        word: groups.punctuation,
      });
    }
  }
  return results;
}

const addSpaceSpan = (parent) => {
  const space = document.createElement("span");
  space.innerHTML = " ";
  parent.appendChild(space);
};

const PUNCTUATION = [",", "."];
const INPUT_RESIZE_BREAKPOINT_CHARS = 10;
const DEFAULT_INPUT_SIZE = "90px";
const ENTER_KEYCODE = 13;

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const editView = document.querySelector(".madLibsEdit");
    const previewView = document.querySelector(".madLibsPreview");

    for (let i = 0; i < processedStory.length; i++) {
      const { word, pos } = processedStory[i];
      if (pos) {
        // A part of speech is present, so we:
        // 1. Edit view: add an input and configure the event listener.
        // 2. Preview: add the part of speech (until the input changes).
        const posPreview = document.createElement("span");
        const posPlaceholder = `(${pos})`;
        posPreview.innerText = posPlaceholder;
        posPreview.classList.add("previewWord");

        const editInput = document.createElement("input");
        editInput.placeholder = posPlaceholder;
        editInput.maxLength = 20;
        editInput.style.width = DEFAULT_INPUT_SIZE;
        editInput.classList.add("emptyInput");

        // Implement syncing.
        editInput.addEventListener("input", (e) => {
          if (e.target.value.length > 0) {
            posPreview.innerText = e.target.value;
            editInput.classList.remove("emptyInput");
          } else {
            // Input is empty. Clear the preview back to the placeholder.
            posPreview.innerText = posPlaceholder;
            editInput.classList.add("emptyInput");
          }

          // Resizes the input based on the value.
          // https://stackoverflow.com/questions/3392493/adjust-width-of-input-field-to-its-input
          if (this.value.length > INPUT_RESIZE_BREAKPOINT_CHARS) {
            e.target.style.width = this.value.length + "ch";
          } else {
            e.target.style.width = DEFAULT_INPUT_SIZE;
          }
        });

        // Handle enter key with wraparound.
        editInput.addEventListener("keydown", (e) => {
          if (e.keyCode === ENTER_KEYCODE) {
            const inputs = document.querySelectorAll("input");
            // querySelectorAll doesn't normally have indexOf: look it up.
            const currentIndex = [].indexOf.call(inputs, e.target);
            const nextIndex =
              currentIndex + 1 >= inputs.length ? 0 : currentIndex + 1;
            inputs[nextIndex].focus();
          }
        });

        // Add everything to the page.
        previewView.appendChild(posPreview);
        editView.appendChild(editInput);
      } else {
        // This is just a "normal word."
        // 1. Edit view: add the word normally.
        // 2. Preview view: add the word normally.
        //
        // You can't reuse a created element so we need to create it twice.
        const previewSpan = document.createElement("span");
        previewSpan.innerText = word;
        previewView.appendChild(previewSpan);

        const editSpan = document.createElement("span");
        editSpan.innerText = word;
        editView.appendChild(editSpan);
      }

      // Note where we are in the for loop. Since this loop is long, it can be
      // confusing to tell what's in the loop or not.
      //
      // Handle spacing properly. All words should have a space after it UNLESS
      // the next word is punctuation (may be confusing -- think about it though).
      let shouldAddSpaceAfter = false;
      if (
        i + 1 < processedStory.length &&
        !PUNCTUATION.includes(processedStory[i + 1].word)
      ) {
        shouldAddSpaceAfter = true;
      }

      if (shouldAddSpaceAfter) {
        addSpaceSpan(editView);
        addSpaceSpan(previewView);
      }
    }
  });
