const scheme = {
    "name": {
        
        isLength: { 
            options: {min:3, max:20}, errorMessage: "name must not be less than 3 and not more than 20"
        },
        notEmpty: {
            errorMessage: "delicacy name must not be empty"
        }
    },
    
    "ethnics": {
        isLength: {
            options: {
                min: 3, max: 20
            }, errorMessage: " Ethnic name must not be less than 3 and not more than 20"
        }, 

        notEmpty: {
            errorMessage: "Ethnic name is empty"
        },


    },

    "ingredients": {
        notEmpty: {errorMessage: "Ingredients is empty"},
        isLength: {
            options: {min: 3}, errorMessage: "Ingredients is too short"
        }
    },

    "states": {
        notEmpty: {errorMessage: "States is empty"},
        isLength: {
            options: {min:3, max: 15}, errorMessage: "States must be min 3 and not more than 15 letters"
        }
    }
}

module.exports = {
    scheme
}