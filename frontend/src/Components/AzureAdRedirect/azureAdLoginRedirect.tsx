import { useEffect } from "react";
import { useHistory } from "react-router";
import { backendURL } from "../../Constants/backendConfig";
import { loginRequest } from "../../Constants/authConfig";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";


export default function AzureAdLoginRedirect() {
    const history = useHistory()
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    async function sendUser(accessToken: string) {

        fetch(backendURL + "/user", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + accessToken,
            },
        })
            .then((response) => {
                console.log(response)
            })
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/azureAdLogoutRedirect')
        } else {
            instance.acquireTokenPopup(loginRequest).then((response) => {
                sendUser(response.accessToken);
            }).then(() => {
                history.push('/')
            })
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
        </div>
    )
}