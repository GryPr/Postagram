FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
COPY myapp app/
WORKDIR /app
COPY published/aspnetapp.dll ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]