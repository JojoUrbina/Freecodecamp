const input = document.getElementById("text-input");
const btn = document.getElementById("check-btn");
const result = document.getElementById("result");

btn.addEventListener("click", isPalindrome);

function isPalindrome() {
  const palindromo = input.value;
  const palindromoSinEspacios = palindromo
    .replace(/[,()-/._\s]/g, "")
    .toLocaleLowerCase();
  const palindromoSinEspaciosAlReves = palindromoSinEspacios
    .split("")
    .reverse()
    .join("");

  if (palindromo === "") {
    result.textContent = "Please input a value";
    return;
  }

  if (palindromoSinEspacios === palindromoSinEspaciosAlReves) {
    result.textContent = `${palindromo} is a palindrome`;
  } else {
    result.textContent = `${palindromo} is not a palindrome`;
  }
}
