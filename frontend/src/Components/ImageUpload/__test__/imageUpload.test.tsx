import ReactDOM from 'react-dom';
import * as TokenService from '../../../Services/TokenService';
import { AuthenticationContext } from '../../AuthenticationProvider/authenticationProvider';
import ImageUpload from '../imageUpload';

it("render image upload page", () => {
   let mockGetAccessToken = jest.spyOn(TokenService, 'GetAccessToken');
   mockGetAccessToken.mockReturnValue("")
   jest.mock('../../../Services/TokenService', () => ({ GetAccessToken: mockGetAccessToken }))
   const div = document.createElement("div");
   ReactDOM.render(<AuthenticationContext.Provider value={{ getAccessToken: mockToken }}>
      <ImageUpload />
   </AuthenticationContext.Provider>, div)
})

async function mockToken(): Promise<string | undefined> {
   return "";
}
