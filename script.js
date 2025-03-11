// variables ko ek ek karke import karte hai as per need
const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-password-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*(){}[]=<>/,.|~";

// initial values

// set strength circle colour to gray

// possibel function
// copy password to clipboard
// hadle slider
// generate password
// set indicator
// getRandomInt min max
// get randowm uppercase
// get random lowercase
// get random number
// get random symbol
// calcute password strength

// flow
// first lenght of passwrod will be set
// then generate pasword will be clicked
// then check box will be checked
// random password will be generated
// password will be displayed
// password strength will be calculated
// password strength will be displayed
// copy button will be clicked
// password will be copied to clipboard
// copy message will be displayed

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

setIndicator("#ccc");

// // set password length ye funciotn password length ko ui par display karta hai
// jab bhi password length change hota hai to yha par password length ko ui par updae krta hai
function handleSlider() {
  inputSlider.value = passwordLength;
  lenghtDisplay.innerText = passwordLength;
  // ye code slider ko colour karne ke liye hai
  
  const min = inputSlider.min;
  const max = inputSlider.max;  
  inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}

// console.log(inputSlider);
// ye jo variabels hum ek element ek liy bulate hai wo objecta hota hai
// aur in objects me yesi kai properties hoti hai jaise ki value, innerText, innerHTML, etc
// inhi properties ko change karke hum apne need ke hisab se element ko change kar sakte hai
// jaise ki yaha humne inputSlider ki value ko passwordLength me set kiya
// aur lenghtDisplay element me passwordLength ko set kiya

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// max-min+1 yha par agar +1 kiya to last number bhi
// include hoga but agar nhi kya to last number include nhi hoga
// thus niche hameshsa last range +1 karte hai
// chahut to upar min-max+1 karke niche last range
// -1 kar sakta hu wo bhi shi hoga

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
// ascii of a-z is 97-122 small letters
// ascii of A-Z is 65-90 capital letters

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

// random symbol generate karne ke aur bhi bahut trike hote hai
function generateSymbol() {
  return symbols.charAt(getRndInteger(0, symbols.length));
}

function calcStrength() {
  // also consider password length
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (uppercaseCheck.checked) {
    hasUpper = true;
  }
  if (lowercaseCheck.checked) {
    hasLower = true;
  }
  if (numbersCheck.checked) {
    hasNum = true;
  }
  if (symbolsCheck.checked) {
    hasSym = true;
  }
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

//  navigator.clipboard.writeText(text) ye function ek promise return karta hai
// agar ye promise fulfill hua tabhi hume pata chalega ki password copy hua hai
// tab hum then ka use karenge aur copied ka message display karenge
// aur agar promise reject hua to catch me error display karenge
// ye ek asyn function hai isliye isme await ka use kiya hai
// aur async function ko call karne ke liye ek function me async ka use kiya hai
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied!";
  } catch (err) {
    copyMsg.innerText = "Failed to copy!";
  }
  // copy wale span ko visible karane ke liy
  copyMsg.classList.add("active");
  // agar mujhe do second ke baad copy message ko hide karna hai
  // to mai setTimeout ka use kar sakta hu
  // setTimeout(function, time) ye function ek function aur time leta hai
  // aur time ke baad function ko call karta hai
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

// event listeners
// slider change ke liy
// generate password ke liy click
// copy password ke liy click

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
// ye function slider ke change hone par password length ko change karta hai
// yesa karne ke liy inputSlider, joki ek element object hai, ke addEventListener method ka use kiya hai
// joki input me event kya hai aur ek function leta hai jo batata hai ki karna kya hai
// yha wo callback function hai jo event object ko input me leta hai aur
// passwordLength ki value ko event object me maujud target object ki value ke barabar kr deta hai
// aur handleSlider function ko call karta hai
// handleSlider function password length ui par display karta hai

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});
// yha par hum chahe to condition me password length > 0 bhi likh sakte the

// mujhe maintain krna pdega ki kinte check box checked hai
// iske liy mujhe event listener lagana pdega
// agar koi bhi box checked nhi hai to password generate nhi kar sakte hai

// mere pass allcheckboxes hai jisme saare check box hai
// mujhe in sab par event listener lagana hai
// isliye mai in par loop lagaunga
// aur har ek par event listener lagaunga

// basically hum kar kya rhe hai ki jab bhi koi bhi check box change hota hai
// to hum checkCount ko 0 kar dete hai
// aur phir saare check box par loop chalate hai
// aur har ek check box par check karte hai ki wo checked hai ya nhi
// agar checked hai to checkCount ko increment karte hai
// isse hume pata chal jayega ki kitne check box checked hai

// yha par website ki functionality dekhoge to ek aur case hai ki agar password ki
// slected length no of checked check box se kam hai to password no of checked check box
// ki lenght ka generate hoga aur password lenght increase hokar checkcoutn ke barabar hojayegi

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  // specialc condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider(); // ui me change dikhane ke liy
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) {
    return;
  }
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // lets start the password generation
  // agar new pssword find karne ja rha hu to old ko hta do
  password = "";
  // basically sbse phel hum check karenge kon se boxees chechek hai
  // then jo jo checek unka kam se kam ek character add karenge
  // jo charecters bach gay unme to kuch bhi daal dunga

  // if (uppercaseCheck.checked) {
  //   password += generateUpperCase();
  // }
  // if (lowercaseCheck.checked) {
  //   password += generateLowerCase();

  // }
  // if (numbersCheck.checked) {
  //   password += generateRandomNumber();

  // }
  // if (symbolsCheck.checked) {
  //   password += generateSymbol();
  // }
  // now mujh bache hua ko random fill karna hai
  // now mai ye random kaise slect karunga ki konsa char add karu
  // to iske liy ek arry honi chahiye jisme sare generate function honge
  // aur mai unmes random select karunga

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }
  //now compulsory addioton karet ahi
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  // now random fill karunga
  // remaining additon
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }
  // yha par sir kh rhe ki ek issue hai ki sure ek char jis order me
  // boxes checked hai usi order me aayenge thus pura password bnane ke bad
  // mujhe usko shuffle karna hoga, to tik hai shuffle karne ka trika sikh lete hai
  // lekin jo mere dimage me aaya ki mai chahu to directly passwrod length ke barabar
  // loop lagakar functArr me slect kar leta abhi dimag me aaya ki ye glt hota
  // kyuki tum gurantee nhi de sakte ki sare generator function call honge hi honge

  function shufflePassword(array) {
    // to shuffle kanre ki ek algorithm hoti hai
    // fisher-yates shuffle algorithm
    // ye algorithm ek array ko shuffle karta hai
    // to mai password ko array me convert karunga
    // fir usko shuffle karunga
    // aur fir usko string me convert karunga

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // swapping
      //[array[i], array[j]] creates a temporary array holding the values of array[j] and array[i].
// These values are then assigned back to array[i] and array[j] using destructuring.
    }
    let str = "";
    array.forEach((char) => {
      str += char;
    });
    return str;
  }

  password = shufflePassword(Array.from(password));

  passwordDisplay.value = password;
  // password nikalne ke bad uski strength calculate karenge
  calcStrength();
});
