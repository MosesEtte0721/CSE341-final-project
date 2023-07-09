const scheme = {

    "name": {

        isEmpty: {
            errorMessage: "name is empty"
        },

        isLength: { optins: {
                min: 3, max: 20
            }, 
            errorMessage: "name must be min 3 and max 20 characters"
    }, 

    isString: {
        errorMessage: "name must be string"
    }
    },

    "tribes": {
        isEmpty: {
            errorMessage: "name is empty"
        },

        isLength: { optins: {
                min: 3, max: 20
            }, 
            errorMessage: "tribe must be min 3 and max 20 characters"
    }, 

        isString: {
            errorMessage: "tribe must be string"
        }
    },

    "country": {
        toUpperCase: true,

        isLength: {
            options: {
                min:7, max: 7
            },
            errorMessage: "Country must be 7 letters"
        },

        isEmpty: {
            errorMessage: "country is empty"
        },

    isString: {
        errorMessage: "country must be string"
    }

    },

    "state": {
        isEmpty: {
            errorMessage: "state is empty"
        },
        isLength: { optins: {
                min: 3, max: 10
            }, 
            errorMessage: "state must be min 3 and max 20 characters"
    }, 

    isString: {
        errorMessage: "state must be string"
    }
    },
     
    "region":{
        isString: {errorMessage: "region is empty"},
        isLength: {options:{min:8, max:12}},
        isEmpty: {errorMessage: "region is empty"}
    },

    "Language": {
        isString: {errorMessage: "Language is empty"},
        isLength: {options:{min:8, max:12}, errorMessage: "must be min 8 and max 12 letters"},
        isEmpty: {errorMessage: "Language is empty"}
    },

    "delicacies": {
        isString: {errorMessage: "region is empty"},
        isLength: {options:{min:3, max: 20}},
        isEmpty: {errorMessage: "region is empty"}
    },

    "image": {
        isString: {errorMessage: "region is empty"},
        isLength: {options:{min:2, max:3}},
        isEmpty: {errorMessage: "region is empty"}
    }
}


module.exports ={
    scheme
}