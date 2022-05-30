var r = document.querySelector(':root'); // Root folder
const buttonArray = ['--button-home-color', '--button-about-color', '--button-ratings-color', '--button-games-color']; // All buttons in nav

const arrayLength = buttonArray.length; // Lengh of buttonArray

function deleteAllCookies() { // Delete all cookies
    var cookies = document.cookie.split(";"); // Split string of cookies and turn into a list for each cookie and value

    for (var i = 0; i < cookies.length; i++) { // Loop through all cookies
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Set expiry date before currect date 
    }
}

function getCookie(cname) { // Return value of a cookie
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function findSelectedButton() { // Find which button is selected and return button, or false if no button selected
  for (var i = 0; i < arrayLength; i++){
    if (getCookie(buttonArray[i]) == "true"){
      return buttonArray[i];
    }
  }
  return false;
}

function getColor(colorId) {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  alert("The value of button color is: " + rs.getPropertyValue(colorId));
}

function setButtonColors(){ // Find selected button, set all buttons darkcyan, then the selected button lightblue
  var selectedButton = findSelectedButton();

  buttonColorSet(selectedButton);
}

function buttonColorSet(colorID) { // Set all button colors to normal, then one button to different
  setColorAll();
  setColor(colorID);
}

function setColor(colorID) {
  // Set the color value of one buttons to lightblue
  r.style.setProperty(colorID, 'lightblue');
}

function setColorAll() {
  // Set the color value of all buttons to darkcyan
  
  for (var i = 0; i < arrayLength; i++) {
    r.style.setProperty(buttonArray[i], 'darkcyan');
  }
}

function resetButtonCookies() { // Reset all button cookies
  deleteAllCookies();
  
  for (let i = 0; i < arrayLength; i++) { // For each button
  document.cookie = buttonArray[i] + "=false"; // Create a cookie and say not active
  }
}

function setButtonCookieTrue(cname) { // Reset all button cookies and set one to true
  resetButtonCookies(); // Reset cookies

  document.cookie = cname + "=true"; // Create a cookie and say active
}

function buttonClicked(cname, gotoLink) { // Handle when button is clicked
  setButtonCookieTrue(cname);
  window.location.replace(gotoLink); // Goto new page
}

// ------------- Main -------------

setButtonColors();