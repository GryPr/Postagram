import SiteLayout from "../SiteLayout";
import ReactDOM from "react-dom";

it("render site layout", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SiteLayout><div></div></SiteLayout>, div)
})