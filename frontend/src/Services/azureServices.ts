import { backendURL } from "../Constants/backendConfig";

export { fetchUser };

const fetchUser = async (token: string) => {
  await fetch(backendURL + "/user", {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });
};
