// first build a string, then we have to concatenate other things in it.
let string = "";

// selected all buttons
let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", function (e) {
    if (e.target.innerHTML == "=") {
      try{
        string = evaluate(string);

      }
      catch{
        string = "Error";
      }
    
    } 
    else if(e.target.innerHTML == "C") {
      string = "" ;

    }
    else if (e.target.innerHTML == "X") {
      // Remove last character from the string when "x" is clicked
      string = string.slice(0, -1);
    }
    else {
      console.log(e.target); //user ne jo button press kiya wo console log pe dikhayega
      // now we will concetenate buttons
      string = string + e.target.innerHTML; //we are writing inner HTML because we want the button name not the whole button attribute
      // ab string ke value ko display par likhenge
    }
    document.querySelector("input").value = string;

    
  });
});

function evaluate(expression) {
  expression = expression.replace(/\^/g, "**");


  // calculate all the case for square root
  expression = expression.replace(/(\d+)√/g, '$1 * Math.sqrt(');  expression = expression.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');  expression = expression.replace(/√([^()]+)/g, 'Math.sqrt($1)');

  // Handle exponential function
  expression = expression.replace(/(?<!\w)e(?!\w)/g, "Math.E");

  // calculate log and ln 
  expression = expression.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
  expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");

  // calculate trigonometric fucntion
  expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin($1 * Math.PI / 180)"); // sin in degrees
  expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos($1 * Math.PI / 180)"); // cos in degrees
  expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan($1 * Math.PI / 180)"); // tan in degrees

  try{
    return eval(expression);

  }catch(err) {
    return "Error"

  }
}
