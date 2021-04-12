import {Button} from "@material-ui/core";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

type ButtonProps = {
    userId: string;
  };

export default function GoToProfileButton(props: ButtonProps) {
    const history = useHistory();

    const goToCreator = useCallback(
        () => history.push("/user/" + props.userId),
        // eslint-disable-next-line
        [history]
      );

    return (
        <Button variant="outlined" id="profileButton" onClick={goToCreator}> Go to profile </Button>
    )
}