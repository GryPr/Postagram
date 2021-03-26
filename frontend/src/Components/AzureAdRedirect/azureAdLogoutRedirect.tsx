import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AzureAdLogoutRedirect() {
    const history = useHistory()
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal()

    useEffect(() => {
        if (isAuthenticated) {
            instance.logout().then(() => {
                history.push('/')
            })
        } else {
            history.push('/')
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
        </div>
    )
}