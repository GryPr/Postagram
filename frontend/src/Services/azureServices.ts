import { backendURL } from "../Constants/backendConfig";
const sendUser = require("../Components/AzureAdRedirect/azureAdLoginRedirect");

export{fetchUser};

const fetchUser = async()=>{
    const response = await fetch(backendURL + "/user", {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + sendUser.accessToken,
        },
    })
}