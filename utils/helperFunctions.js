// used the following from StackOverflow to create an Array of alphabets
// https://stackoverflow.com/questions/24597634/how-to-generate-an-array-of-alphabet-in-jquery
// answered by Paul S.
function genCharArray(charA, charZ) {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}
// const array = genCharArray("a", "z"); // ["a", ..., "z"]
// console.log(array)

module.exports = {
  genCharArray,
};
