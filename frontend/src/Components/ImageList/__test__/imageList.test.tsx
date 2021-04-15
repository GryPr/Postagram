import ReactDOM from 'react-dom';
import * as ImageService from '../../../Services/ImageService';
import ImageList from '../imageList';

it("render image list", () => {
   let mockFetchMainPageImages = jest.spyOn(ImageService, 'fetchMainPageImages');
   mockFetchMainPageImages.mockReturnValue(mockJsonFn())
   jest.mock('../../../Services/ImageService', () => ({ fetchMainPageImages: mockFetchMainPageImages }))
   const div = document.createElement("div");
   ReactDOM.render(<ImageList />, div)
})


const mockJsonFn = async () => {

   return mockJson;
};

const mockJson = [
   {
      "fileName": "077d74a814ece32.png",
      "contentType": "image/png",
      "imageDescription": "1312313",
      "imageId": "60785ecdbe422d91aefa1137",
      "createdOn": "2021-04-15T15:42:05.885Z",
      "creatorName": "Kevin",
      "creatorId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
      "imageContent": "",
      "comments": [
         {
            "id": null,
            "creatorUserId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
            "creatorName": "Kevin",
            "createdOn": "2021-04-15T15:43:11.224Z",
            "commentContent": "123231"
         },
         {
            "id": null,
            "creatorUserId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
            "creatorName": "Kevin",
            "createdOn": "2021-04-15T15:43:12.991Z",
            "commentContent": "321231"
         }
      ]
   },
   {
      "fileName": "43b.png",
      "contentType": "image/png",
      "imageDescription": "1234",
      "imageId": "60785ec9be422d91aefa1134",
      "createdOn": "2021-04-15T15:42:01.232Z",
      "creatorName": "Kevin",
      "creatorId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
      "imageContent": "",
      "comments": [
         {
            "id": null,
            "creatorUserId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
            "creatorName": "Kevin",
            "createdOn": "2021-04-15T15:43:15.134Z",
            "commentContent": "21321313"
         },
         {
            "id": null,
            "creatorUserId": "4570db9a-72cb-48e0-aca3-5b3829aac032",
            "creatorName": "Kevin",
            "createdOn": "2021-04-15T15:43:16.553Z",
            "commentContent": "213213133123123123"
         }
      ]
   }
]