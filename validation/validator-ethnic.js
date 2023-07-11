const scheme = {

    "ethnic": {

        isEmpty: {
            errorMessage: "ethnic is empty"
        },

        isLength: { optins: {
                min: 3, max: 20, 
                errorMessage: "ethnic must be min 3 and max 20 characters"
            }
    }

    
    },

   
    "country": {

        isLength: {
            options: {
                min:7, max: 7, errorMessage: "Country must be 7 letters"
            }
            
        },

        notEmpty: {
            errorMessage: "country is empty"
        },

},

    "states": {
        notEmpty: {
            errorMessage: "state is empty"
        },
        isLength: { options: {
                min: 3, max: 10
            }, errorMessage: "state must be min 3 and max 20 characters"
            
    }, 

    },
     
    "region":{
        
        isLength: {options:{min:8, max:12},errorMessage: "less than 8 or more than 12 letters"},
        notEmpty: {errorMessage: "region is empty"},
        
    },

    "Language": {
        
        isLength: {options:{min:8, max:12}, errorMessage: " Language must be min 8 and max 12 letters"},
        isEmpty: {errorMessage: "Language is empty"},
       
    },

    "delicacies": {
        
        isLength: {options:{min:3, max: 20}, errorMessage: "delicacies must be 3 min"},
        isEmpty: {errorMessage: "delicacies is empty"},
        
    },

    "image": {
        
        isLength: {options:{min:2, max:3}, errorMessage: "image must be 2 min or 3 max"},
        notEmpty: {errorMessage: "image is empty"},
       
    }
}


module.exports ={
    scheme
}