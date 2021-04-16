import React from "react";
import { render, screen } from "@testing-library/react";
import SiteLayout from "../Components/SiteLayout/SiteLayout";

test("Site Layout Renders", () => {
    render(<SiteLayout><div></div></SiteLayout>)
})