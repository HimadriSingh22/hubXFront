export const signUpValidation = newUser => {
    var number = /[0-9]/g;
  
    var emailFormat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mobileFormat = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    var errors = [];
    var formIsValid = true;
    var passwordFormat = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    //console.log("passed values during regitration...", newUser);
  
    if (newUser.firstName === "") {
      formIsValid = false;
      errors["firstName"] = "Please enter your name! ";
    }
    if (newUser.firstName !== "") {
      if (!newUser.firstName.match(/^[a-zA-Z]+/)) {
        formIsValid = false;
        errors["firstName"] = "Please enter alphabets!";
      }
    }
  
    if (newUser.userName === "") {
      formIsValid = false;
      errors["userName"] = "Please provide a valid mobile number!";
    }
  
    if (newUser.userName !== "") {
      if (!newUser.userName.match(emailFormat)) {
        if (!newUser.userName.match(mobileFormat)) {
          formIsValid = false;
          errors["userName"] = "Please provide a mobile number!";
        }
      }
      if (
        newUser.userName.match(emailFormat) ||
        newUser.userName.match(mobileFormat)
      ) {
        formIsValid = true;
      }
    }
  
    
    if (newUser.password === "") {
      formIsValid = false;
      errors["password"] = "Please enter a password! ";
    }
  
    if (newUser.password !== "") {
      if (
        !newUser.password.match(passwordFormat) ||
        !(newUser.password.length > 7)
      ) {
        formIsValid = false;
        errors["password"] =
          "Must be 7 digits long and must contain a digit,an special character,a small alphabet ,a capital alphabet ";
      }
    }
    var response = {
      formIsValid,
      errors
    };
    
    return response;
  };
  
  export const loginValidation = userInput => {
    var formIsValid = true;
    var errors = [];
    var emailFormat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mobileFormat = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    //var passwordFormat = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    console.log(".....received input..........", userInput);
  
    if (userInput.password === "") {
      formIsValid = false;
      errors["password"] = "Cannot be empty ";
    }
  
    if (userInput.userName === "") {
      formIsValid = false;
      errors["userName"] = "Cannot be null";
    }
  
    if (userInput.userName !== "") {
      if (!userInput.userName.match(emailFormat)) {
        if (!userInput.userName.match(mobileFormat)) {
          formIsValid = false;
          errors["userName"] = "Incorrect Format";
        }
      }
      if (
        userInput.userName.match(emailFormat) ||
        userInput.userName.match(mobileFormat)
      ) {
        formIsValid = true;
      }
    }
    
  
    var response = {
      formIsValid,
      errors
    };
    console.log("Response", response);
    return response;
  };

  export const eventValidation =(eventData)=>{
    var emailFormat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var mobileFormat = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
  var alphabets = /[a-zA-Z]/g;
  var number = /[0-9]/g;
  var formIsValid = true;
  var error = [];
  if (
    typeof eventData.eventDate === "undefined" ||
    eventData.eventDate === "" ||
    typeof eventData.eventDate === null
  ) {
    formIsValid = false;
    error["eventDate"] = "Please provide a valid date!";
  }

  if (
    typeof eventData.eventTime === "undefined" ||
    eventData.eventTime === "" ||
    typeof eventData.eventTime === null
  ) {
    formIsValid = false;
    error["eventTime"] = "Please provide a valid time!";
  }
  if (
    typeof eventData.eventDescription === "undefined" ||
    eventData.eventDescription === "" ||
    typeof eventData.eventDescription === null ||
    !eventData.eventDescription.match(alphabets)
  ) {
    formIsValid = false;
    error["eventDescription"] = "Please describe your event!";
  }
  

var response = {
    formIsValid,
    error
  };
  //console.log("Response", response);
  return response;
  }