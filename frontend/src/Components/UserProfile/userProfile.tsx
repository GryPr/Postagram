import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, createStyles, IconButton, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { FormatAlignLeft, FormatBold } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../../Constants/backendConfig";
import { CommentResponse } from "../ImageList/imageList";
import { sizing } from '@material-ui/system';

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
        avatar: {
        },
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

    useEffect(() => {
        fetch(backendURL + "/user?userId=" + userId, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setUser(response)
            });
    }, []);

    return (
        <Box width="50%">
            <Card className={classes.root} elevation={3}>
                <CardHeader
                    title={user?.name + "'s Profile"}
                    subheader=""
                />
                <Button variant="outlined" size="medium" color="primary" >
                    Follow {user?.name}
                </Button>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton aria-label="like">
                        {/* <FavoriteIcon /> */}
                    </IconButton>
                    <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}
