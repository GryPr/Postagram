import { backendURL } from "../Constants/backendConfig";

export { fetchFollowState };
export { fetchFollowUser };
export { fetchUserProfile };

const fetchFollowUser = async (token: string, userId: string) => {
  await fetch(backendURL + "/follow?userId=" + userId, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });
};

const fetchFollowState = async (token: string, userId: string) => {
  const response = await fetch(
    backendURL + "/follow/isfollowed?userId=" + userId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    }
  );
  const respfollowstate = await response.json();
  return respfollowstate;
};

const fetchUserProfile = async (userId: string) => {
  const response = await fetch(backendURL + "/user?userId=" + userId, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const respup = await response.json();
  return respup;
};
