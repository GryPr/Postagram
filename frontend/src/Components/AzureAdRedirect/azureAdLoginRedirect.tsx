import { useEffect } from "react";
import { useHistory } from "react-router";
import { backendURL } from "../../Constants/backendConfig";
import { loginRequest } from "../../Constants/authConfig";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { fetchUser } from "../../Services/azureServices";


export default function AzureAdLoginRedirect() {
    const history = useHistory()
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    async function sendUser(accessToken: string) {
            fetchUser()
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