import { useIsAuthenticated } from "@azure/msal-react";
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
import { fetchFollowState, fetchFollowUser, fetchUserProfile } from "../../Services/UserServices";
import { AuthenticationContext, AuthenticationContextType } from "../AuthenticationProvider/authenticationProvider";
module.exports={UserProfile};


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
    followerList: string[];
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
      fetchFollowUser()
            .then((response) => {
                console.log(response);
            });
    }

    // Gets the follow state of the logged in user
    async function getFollowState() {
        const token = await getAccessToken();
        fetchFollowState()
               .then((respfollowdata) => {
            console.log(respfollowdata)
            setFollow(respfollowdata);
        });

       
    }

    // Gets the user profile data from the backend
    useEffect(
        () => {
          fetchUserProfile()
                .then((respup) => {
                    setUser(respup);
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
                    <CardHeader title={user?.name + "'s Profile"} subheader={user?.followerCount + " followers"} />
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