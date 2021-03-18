import React from 'react';
import ReactDOM from 'react-dom';
import ImageBoxComment from '../imageBoxComment';
import { CommentResponse } from '../../ImageList/imageList'

it("render image box comment", () => {
    let comment: CommentResponse = {
        creatorUserId: "",
        creatorName: "",
        createdOn: "",
        commentContent: "",
    }
    const div = document.createElement("div");
    ReactDOM.render(<ImageBoxComment comment={comment} />, div)
})