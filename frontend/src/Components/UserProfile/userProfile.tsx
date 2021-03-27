import { useIsAuthenticated } from "@azure/msal-react";
import Modal from 'react-modal'
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
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../../Constants/backendConfig";
import { AuthenticationContext, AuthenticationContextType } from "../AuthenticationProvider/authenticationProvider";

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

// Model of JSON response from /user
interface User {
    id: string;
    userId: string;
    name: string;
    email: string;
    followerCount: number;
}


export default function UserProfile() {
    const isAuthenticated = useIsAuthenticated();
    let { userId } = useParams<Record<string, string | undefined>>();
    const [user, setUser] = useState<User>(); // User profile data set as the state
    const classes = useStyles();
    const [follow, setFollow] = useState(false); // Whether the logged in user is following or not
    const { getAccessToken } = useContext(AuthenticationContext) as AuthenticationContextType

    // Sends to /follow that the logged in user wants to follow
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

    // Gets the follow state of the logged in user
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

    // modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Gets the user profile data from the backend
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
//Adding comments
    return (
        <Box width="50%">
            <Card className={classes.root} elevation={3}>
                <CardHeader title={user?.name + "'s Profile"} />
                <div><Button type="button" onClick={() => setModalIsOpen(true)}>{user?.followerCount + " followers"}</Button>
                </div>
                <div>
                    <Modal isOpen={modalIsOpen}>
                        <h2>Modal title</h2>
                        <p>Modal Body</p>
                    </Modal>
                </div>
                
                {isAuthenticated ? <div>
                    {follow ?
                        (<Button
                            id="followbtn"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setFollow(!follow);
                                followUser();
                            }}>
                            Unfollow {user?.name}
                        </Button>)
                        :
                        (<Button
                            id="followbtn"
                            variant="outlined"
                            onClick={() => {
                                setFollow(!follow);
                                followUser();
                            }}>
                            Follow {user?.name}
                        </Button>)}
                </div> : <div></div>}

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
