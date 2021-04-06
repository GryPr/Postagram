import { backendURL } from "../Constants/backendConfig";
const {UserProfile}=require('../Components/UserProfile/userProfile');

export{fetchFollowState};
export {fetchFollowUser};
export{fetchUserProfile};




const fetchFollowUser= async()=>{
const response = await   fetch(backendURL + "/follow?userId=" + UserProfile.userId, {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + UserProfile.token,
    },
})
}

const fetchFollowState= async()=>{
    const response = await  fetch(backendURL + "/follow/isfollowed?userId=" + UserProfile.userId, {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + UserProfile.token,

        },
    })
        const respfollowstate = await response.json();
        return respfollowstate;

       
}

const fetchUserProfile = async ()=>{
    const response = await   fetch(backendURL + "/user?userId=" + UserProfile.userId, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    })
        const respup = await response.json();
        return respup;
}