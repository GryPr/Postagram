import { render , screen} from '@testing-library/react'
import Box from "@material-ui/core";


it('it should render imageBox component', () => {
render(<Box></Box> );
const imageElement = screen.getByTestId("id-1");
expect(imageElement).toBeInTheDocument();
//expect(imageElement).toHaveTextContent('Comments placeholder')
})