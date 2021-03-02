FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
COPY myapp App/
WORKDIR /App
ENTRYPOINT ["dotnet", "aspnetapp.dll"]