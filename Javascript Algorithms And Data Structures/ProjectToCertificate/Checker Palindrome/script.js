const input = document.getElementById("text-input");
const btn = document.getElementById("check-btn");
const result = document.getElementById("result");

btn.addEventListener("click", isPalindrome);

function isPalindrome() {
    const inputValue = input.value.toUpperCase();
    const inputValueWithoutSpace = inputValue
    .replace(/[,()-/._\s]/g, "")
  const inputValueWithoutSpaceBackwards = inputValueWithoutSpace
    .split("")
    .reverse()
    .join("");

  if (inputValueWithoutSpace ==="" ) {
    alert("Please input a value");
    return;
  }

  if (inputValueWithoutSpace === inputValueWithoutSpaceBackwards) {
    result.textContent = `${inputValue} IS A PALINDROME`;
  } else {
    result.textContent = `${inputValue} IS NOT A PALINDROME`;
  }
}
