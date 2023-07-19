const scheme = {

    "name": {
        // notEmpty: {
        //     errorMessage: "name of delicacy required"
        // },
        
        isLength: { options: {
            min: 3,
            max: 15
        }, errorMessage: "name must be 3 min or 15 max"}
    },

    "ethnic": {

        // notEmpty: {
        //     errorMessage: "ethnic is required. Attribute an ethnic to the delicacy"
        // },

        isLength: { options: {
            min: 3,
            max: 15
        }, errorMessage: "ethnic must be 3 min and 15 max letters"}

    
    },

   
    "country": {
        
        // notEmpty: {
        //     errorMessage: "country is required"
        // },

        isLength: { options: {
            min: 7,
            max: 7
        }, errorMessage: "country must be 7 letters"}

},

    "states": {
        // notEmpty: {
        //     errorMessage: "state is required. State of the ethnic "
        // },

        isLength: { options: {
            min: 3, 
            max: 15
        }, errorMessage: "states must be 3 min and 15 max letters"}
     

    },
     
    "region":{

        // notEmpty: {errorMessage: "region is required"},
        isLength: { options: {
            min: 5, max: 15
        }, errorMessage: "Region must be 4 min or 15 max letters"}
  
    },

    "language": {
    
        // notEmpty: {errorMessage: "Language is required"},

        isLength: {options: {
            min: 3, max: 20
        }, errorMessage: "Language has to be 3 min or 20 max letters"}
       
    },

    "delicacies": {
        
        // isLength: {options:{min:3, max: 20}, errorMessage: "delicacies must be 3 min or 20 max letters",}, 
        notEmpty: {errorMessage: "delicacies is empty"},
        
    },

    "image": {
        // notEmpty: {errorMessage: "image is empty"},
        
        isLength: {options:{min:2, max:3}, errorMessage: "image must be (YES / NO)"},
        
       
    }
}


module.exports ={
    scheme
}