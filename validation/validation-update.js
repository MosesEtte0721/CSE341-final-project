const valid = require("express-validator").checkSchema;

const schema = {

  username: {
      isLength: { options: {
        errorMessage: "username should contain at least 6 characters",
        min: 6
      }
      }
 
    },

  phone: {
   
    isInt: {errorMessage: "Phone number must be digits"},
    isLength: {options: {min: 8, max: 11, errorMessage: "must not be less than six (6) and not more than fifteen(15)"}}
  },

  last_name: {
    notEmpty: {errorMessage:"last name required"}
  }, 

  // 
  first_name: {
    notEmpty: {errorMessage:"first name is require"}
  },

  profession: {
    notEmpty: {errorMessage:" profession must is required"}
  },

  country: {
    notEmpty: {errorMessage:"country is required"}
  },
  
  email: {
    errorMessage: "Email must be more than 9 characters",
    isEmail: {errorMessage: "NOT a valid Email"},
    isLength: { options: { min: 13, errorMessage: "invalid email" }},
    notEmpty: {errorMessage: "email is required"}
  },

  password: {
      isLength: { options: {min: 8 , max: 15, errorMessage: "password must be more than 8 characters and must contain symbol(S)"}},

      matches: { options: /[-_$#]/ },
      notEmpty: {errorMessage: "password is required"}
    }

  };


const validate = (next)=> {
  valid(schema);
 
}


module.exports = {
 
  schema
}