const fetchFileBtn = document.getElementById("fetch-file");
const avatarLetterImgFull = document.getElementById("avatar-letter-img-full");
const avatarLetterImgLarge = document.getElementById("avatar-letter-img-large");
const avatarLetterImgBig = document.getElementById("avatar-letter-img-big");
const avatarLetterImgMed = document.getElementById("avatar-letter-img-med");
const avatarLetterImgSmall = document.getElementById("avatar-letter-img-small");
const avatarLetterImgTiny = document.getElementById("avatar-letter-img-tiny");
const avatarLetterImages = Array.from(
  document.getElementsByClassName("avatar-letter-img")
);
const letterInput = document.getElementById("letter-input");
const resetInput = document.getElementById("reset");

let letter = "a";

const changeLetter = (event) => {
  if (event.target.value.length >= 1) {
    event.target.disabled = true;
  }
  letter = event.target.value;
};

// https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

const getFiles = async () => {
  try {
    let promiseArray = ["full", "large", "big", "med", "small", "tiny"].map(
      async (el) => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/avatar-letter/file/${el}/${letter}/webp`
          );
          return res;
        } catch (err) {
          console.log(err);
        }
      }
    );
    const resultsArray = await Promise.all(promiseArray);
    resultsArray.map((el, index) => {
      // console.log(el);
      avatarLetterImages[index].setAttribute("src", el.url);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// reset letter input
const resetLetterInput = () => {
  letterInput.disabled = false;
  letter = "";
  letterInput.value = "";
  // letterInput.setAttribute("value", "");
  console.log(letterInput);
};

fetchFileBtn.addEventListener("click", getFiles);
letterInput.addEventListener("input", changeLetter);
resetInput.addEventListener("click", resetLetterInput);
