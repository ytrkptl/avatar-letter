const fetchBtn = document.getElementById("fetch-btn");
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

const getData = async () => {
  try {
    let promiseArray = ["full", "large", "big", "med", "small", "tiny"].map(
      async (el) => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/avatar-letter/${el}/${letter}`
          );
          return await res.json();
        } catch (err) {
          return console.log(err);
        }
      }
    );
    await Promise.all(promiseArray)
      .then(function (resultsArray) {
        // do something after the loop finishes
        resultsArray.map((el, index) => {
          // let imgData = arrayBufferToBase64(el[0].imageBlob.data.data);
          avatarLetterImages[index].setAttribute(
            "src",
            "data:image/png;base64, " + el
          );
        });
      })
      .catch(function (err) {
        // do something when any of the promises in array are rejected
        console.log(err.message);
      });

    // const data = await res.json();
    // // function to encode file data to base64 encoded string
    // let imgData = arrayBufferToBase64(data[0].imageBlob.data.data);
    // avatarLetterImgFull.setAttribute(
    // "src",
    // "data:image/png;base64, " + imgData
    // );
    // const res = await fetch(
    //   `http://localhost:5000/api/avatar-letter/large/${letter}`
    // );
    // const data = await res.json();
    // // function to encode file data to base64 encoded string
    // let imgData = arrayBufferToBase64(data[0].imageBlob.data.data);
    // avatarLetterImgLarge.setAttribute(
    //   "src",
    //   "data:image/png;base64, " + imgData
    // );
    // const res2 = await fetch(
    //   `http://localhost:5000/api/avatar-letter/large/${letter}`
    // );
    // const data2 = await res2.json();
    // avatarLetterImgLarge.setAttribute("src", data2);
    // const res3 = await fetch(
    //   `http://localhost:5000/api/avatar-letter/small/${letter}`
    // );
    // const data3 = await res3.json();
    // avatarLetterImgSmall.setAttribute("src", data3);
    // const res4 = await fetch(
    //   `http://localhost:5000/api/avatar-letter/all/${letter}`
    // );
    // const data4 = await res4.json();
    // imageElem.src = 'data:image/jpeg;base64,' + buf.toString('base64');

    // avatarLetterImg.setAttribute("src", data4);
  } catch (error) {
    console.log(error.message);
  }
};

const getFile = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/avatar-letter/file/full/${letter}/webp`
    );
    // const res = await fetch(`https://robohash.org/ds`);
    return await res.json();
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

fetchBtn.addEventListener("click", getData);
fetchFileBtn.addEventListener("click", getFile);
letterInput.addEventListener("input", changeLetter);
resetInput.addEventListener("click", resetLetterInput);
