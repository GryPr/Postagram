import { InteractionRequiredAuthError, SilentRequest } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import { createContext } from "react";
import { loginRequest } from "../../Constants/authConfig";

type AuthenticationProviderProps = {
    children: React.ReactNode;
};

export type AuthenticationContextType = {
    getAccessToken: () => Promise<string | undefined>;
}

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

export default function AuthenticationProvider(props: AuthenticationProviderProps) {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {})!;

    // Obtain the access token required
    async function getAccessToken() {
        const silentRequest: SilentRequest = {
            account: account,
            ...loginRequest,
        };
        try {
            const resp = await instance
                .acquireTokenSilent(silentRequest);
            if (resp.accessToken) {
                return resp.accessToken;
            }
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                await instance.acquireTokenPopup(silentRequest).then((response) => {
                    return response.accessToken
                });
            }
        }
    }

    return (
        <AuthenticationContext.Provider value={{ getAccessToken }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
