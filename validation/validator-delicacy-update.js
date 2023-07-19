const scheme = {
    "name": {
        
        isLength: { 
            options: {min:3, max:20}, errorMessage: "name must not be less than 3 and not more than 20"
        },
      
    },
    
    "ethnics": {
        isLength: {
            options: {
                min: 3, max: 20
            }, errorMessage: " Ethnic name must not be less than 3 and not more than 20"
        }, 

     


    },

    "ingredients": {
       
        isLength: {
            options: {min: 3}, errorMessage: "Ingredients is too short"
        }
    },

    "states": {
       
        isLength: {
            options: {min:3, max: 15, errorMessage: "States must be min 3 and not more than 15 letters"}
        }
    }
}

module.exports = {
    scheme
}