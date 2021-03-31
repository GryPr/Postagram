import { render , screen , cleanup} from '@testing-library/react'
import ImageBox from '../imageBox'


it('it should render imageBox component', () => {
render(<ImageBox/>);
const imageElement = screen.getByTestId("id-1");
expect(imageElement).toBeInTheDocument();
//expect(imageElement).toHaveTextContent('Comments placeholder')
})