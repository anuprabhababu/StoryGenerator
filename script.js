const characters = [
  "a brave astronaut",
  "a talking dog",
  "a bored robot",
  "an evil banana",
  "a sleepy dragon",
  "Custom..."
];

const settings = [
  "in space",
  "inside a haunted forest",
  "on a flying island",
  "at the bottom of the ocean",
  "inside a volcano",
  "Custom..."
];

const objects = [
  "a magical spoon",
  "a time machine",
  "a singing stone",
  "a cursed phone",
  "a talking backpack",
  "Custom..."
];

// Populate dropdowns
function populateSelect(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = options.map(item => `<option value="${item}">${item}</option>`).join('');
}

populateSelect("character", characters);
populateSelect("setting", settings);
populateSelect("object", objects);

// Toggle input visibility when 'Custom...' is selected
function toggleInput(type) {
  const select = document.getElementById(type);
  const input = document.getElementById(`${type}Input`);

  if (select.value === "Custom...") {
    input.classList.remove("hidden");
  } else {
    input.classList.add("hidden");
  }
}

// Randomize button logic
function randomize(type) {
  const options = type === 'character' ? characters :
                  type === 'setting' ? settings : objects;

  let randomItem;
  do {
    randomItem = options[Math.floor(Math.random() * options.length)];
  } while (randomItem === "Custom...");

  document.getElementById(type).value = randomItem;
  toggleInput(type); // Hide custom input
}

// Generate story
document.getElementById("generateBtn").addEventListener("click", () => {
  const char = getFinalValue("character");
  const setting = getFinalValue("setting");
  const obj = getFinalValue("object");

  const templates = [
    `Once upon a time, ${char} ended up ${setting}. There, they discovered ${obj}, and their life was never the same again.`,
    `Deep ${setting}, ${char} was looking for adventure. Instead, they found ${obj}, and chaos unfolded.`,
    `It started as an ordinary day. But when ${char} stumbled upon ${obj} ${setting}, a wild journey began.`,
  ];

  const story = templates[Math.floor(Math.random() * templates.length)];
  document.getElementById("storyOutput").value = story;
});

// Use custom input if selected
function getFinalValue(type) {
  const select = document.getElementById(type);
  const input = document.getElementById(`${type}Input`);

  return select.value === "Custom..." && input.value.trim() !== ""
    ? input.value.trim()
    : select.value;
}

// Copy and clear functions
function copyStory() {
  const textarea = document.getElementById("storyOutput");
  textarea.select();
  document.execCommand("copy");
  alert("Story copied to clipboard!");
}

function clearStory() {
  document.getElementById("storyOutput").value = "";
}
