import ReactDOM from 'react-dom';
import GoToProfileButton from '../goToProfileButton';

it("render go to profile button", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GoToProfileButton userId="" />, div)
})