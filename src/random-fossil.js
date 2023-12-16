import axios from "axios";

// SECTION == Query Selectors ==

const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#namefield");
const randomFossilButton = document.querySelector("#get-random-fossil");
const randomFossilImageDiv = document.querySelector("#random-fossil-image");
const randomFossilName = document.querySelector("#random-fossil-name");

// !SECTION ==============

// SECTION == Event Listeners ==

// nameForm.addEventListener("submit", submitName);
randomFossilButton.addEventListener("click", getRandomFossil);

// !SECTION ==============

// SECTION == Functions ==

async function submitName(evt) {
  evt.preventDefault();
  const username = nameInput.value;
  console.log(username);

  const reqBody = {
    username: username,
  };

  console.log(reqBody);

  // axios
  //   .post("/get-name", reqBody)
  //   .then((response) => {
  //     console.log("hello");
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // await axios.post("/get-name", reqBody);

  try {
    const result = await axios.post(`/get-name`, reqBody);
    console.log("hello");
    console.log(result.data);
    // window.location.href("http://localhost:8080/top-fossils");
  } catch (err) {
    console.log(err);
  }
}

async function getRandomFossil() {
  try {
    const result = await axios.get("/random-fossil.json");
    console.log(result.data);
    const randomFossilImage = document.createElement("img");
    randomFossilImage.src = result.data.img;
    randomFossilImageDiv.appendChild(randomFossilImage);
    randomFossilName.innerText = result.data.name;
  } catch (err) {
    console.log(err);
  }
}

// !SECTION ==============
