function getEvenNumbers(array) {
  let evenNumbers = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      evenNumbers.push(array[i]);
    }
  }
  return evenNumbers;
}
function filterEvenNumbers(array) {
  let evenNumbers = array.filter((e) => e % 2 === 0);
  return evenNumbers;
}