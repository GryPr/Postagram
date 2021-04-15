using System;
using System.Collections.Generic;
using System.IO;
using ImageStoreApi.Models;
namespace ImageStoreApi.Services
{
    public interface IImageService
    {
        Comment AddComment(string ImageId, string CommentContent, string userId, string userName);
        Image Create(Image image);
        Image Create(Stream fs, string ImageDescription, string userId, string userName, string fileName, string contentType);
        (List<Image>, List<string>) Get();
        (Image, MemoryStream) Get(int index);
        Image Get(string id);

        public (List<Image>, List<String>) GetUserImages(string CreatorUserId);
    }
}