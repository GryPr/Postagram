import { InteractionRequiredAuthError, SilentRequest } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loginRequest } from "../../Constants/authConfig";
import { backendURL } from "../../Constants/backendConfig";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: "100%",
            minHeight: 750,
            margin: 15,
            alignSelf: "flex-start",
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        avatar: {},
    })
);

interface User {
    id: string;
    userId: string;
    name: string;
    email: string;
    followerCount: number;
}

export default function UserProfile() {
    let { userId } = useParams<Record<string, string | undefined>>();
    const [user, setUser] = useState<User>();
    const classes = useStyles();
    const [follow, setFollow] = useState(false);
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {})!;

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
                instance.acquireTokenPopup(silentRequest).then((response) => {
                    return response.accessToken
                });
            }
        }
    }

    async function followUser() {
        const token = await getAccessToken();
        fetch(backendURL + "/follow?userId=" + userId, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'Bearer ' + token,
            },
        })
            .then((response) => {
                console.log(response);
            });
    }

    async function getFollowState() {
        const token = await getAccessToken();

        fetch(backendURL + "/follow/isfollowed?userId=" + userId, {
            method: "GET",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'Bearer ' + token,

            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setFollow(response);
            });
    }

    useEffect(
        () => {
            fetch(backendURL + "/user?userId=" + userId, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    setUser(response);
                });
            getFollowState();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <Box width="50%">
            <Card className={classes.root} elevation={3}>
                <CardHeader title={user?.name + "'s Profile"} subheader="" />
                <div>
                    {follow ? (
                        <Button
                            id="followbtn"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setFollow(!follow);
                                followUser();
                            }}
                        >
                            Unfollow {user?.name}
                        </Button>
                    ) : (
                        <Button
                            id="followbtn"
                            variant="outlined"
                            onClick={() => {
                                setFollow(!follow);
                                followUser();
                            }}
                        >
                            Follow {user?.name}
                        </Button>
                    )}
                </div>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    ></Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
