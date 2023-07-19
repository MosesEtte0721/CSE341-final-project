const axios = require("axios");
const hostUrl = "http://127.0.0.1:6060";

describe("Testing get GET requests of the CSE341-final-project ", ()=> {
    test('test the delicacies GET route', async ()=> {
        const res = await axios.get(`${hostUrl}/delicacies`);

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    });

    test("Test the ethnics GET route", async ()=> {
        const route = await axios.get(`${hostUrl}/ethnics`);
        expect(route).toBeTruthy();
        expect(route.status).toBe(200);
    })
    test("Test the ethnics GET route", async ()=> {
        const route = await axios.get(`${hostUrl}/delicacy/64ab5db6bb3dcc9943e37979`);
        expect(route).toBeTruthy();
        expect(route.status).toBe(200);
    });

    test("Test the ethnics GET route", async ()=> {
        const route = await axios.get(`${hostUrl}/ethnic/64ab5db6bb3dcc9943e37979`);
        expect(route).toBeTruthy();
        expect(route.status).toBe(200);
    });

    test("Test the log-reg GET route", async ()=> {
        const route = await axios.get(`${hostUrl}/allusers`);
        expect(route).toBeTruthy();
        expect(route.status).toBe(200);
    });

    
})

describe("Testing Post requests of CSE341-final-project", () => {
    test("Testing POST request on ethnic-post route ", async () => {

        const data = {
            name: "ATAMA",
            ethnic: "IBIBIO",
            country: "NIGERIA",
            delicacies: "EKPANG",
            image: "YEs",
            states: "AKWA-IBOM",
            region: "SOUTH-SOUTH",
            language: "EFIK"
        }
        const route =  await axios.post(`${hostUrl}/ethnic-post`, data)
        expect(route).toBeTruthy();
       
        
    });



    
        
})

