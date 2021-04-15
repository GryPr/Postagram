import ReactDOM from 'react-dom';
import UserProfile from '../userProfile';
import * as TokenService from '../../../Services/TokenService';
import { AuthenticationContext } from '../../AuthenticationProvider/authenticationProvider';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        userId: '1234',
    }),
    useRouteMatch: () => ({ url: '/user/1234' }),
}));

it("render user profile page", () => {
    let mockGetAccessToken = jest.spyOn(TokenService, 'GetAccessToken');
    mockGetAccessToken.mockReturnValue("")
    jest.mock('../../../Services/TokenService', () => ({ GetAccessToken: mockGetAccessToken }))
    const div = document.createElement("div");
    ReactDOM.render(<AuthenticationContext.Provider value={{ getAccessToken: mockToken }}>
        <UserProfile />
    </AuthenticationContext.Provider>, div)
})

async function mockToken(): Promise<string | undefined> {
    return "";
}
