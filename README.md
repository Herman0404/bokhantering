# BookApp

En responsiv CRUD-webbapplikation byggd med Angular 20 och .NET 10 C# API med JWT-autentisering.

## Tekniker

- **Frontend:** Angular 20, Bootstrap 5.3, Font Awesome 6
- **Backend:** .NET 10, C# Web API
- **Autentisering:** JWT (JSON Web Tokens)

## Funktioner

- Registrering och inlogg med JWT-autentisering
- CRUD-operationer för böcker och citat (lägg till, visa, redigera, radera)
- Varje användare ser bara sina egna böcker och citat + 5 förinlagda citat
- Darkmode & Lightmode toggle som sparas i localstorage
- Responsiv design för mobil, surfplatta och desktop, stylat med bootstrap

## Köra lokalt

### Krav

- [Node.js](https://nodejs.org) (LTS)
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Angular CLI](https://angular.dev/tools/cli) – `npm install -g @angular/cli`

### Backend

```bash
cd BookApp/BookApi
dotnet run
```

Lokal backend körs på `http://localhost:5019`

### Frontend

```bash
cd BookApp/book-app
ng serve
```

Lokal frontend körs på `http://localhost:4200`

## Projektstruktur

```
BookApp/
  BookApi/              .NET 10 backend
    Controllers/        API-endpoints (Books, Quotes, Auth)
    Models/             Datamodeller (Book, Quote, User)
    Services/           JWT TokenService
    Program.cs          App-konfiguration
  book-app/             Angular 20 frontend
    src/app/
      components/       Angular komponenter
      services/         API-tjänster
      models/           Datamodeller i TypeScript
      guards/           Route guards (skyddar inloggade sidor)
      interceptors/     JWT-interceptor
```

## Live Demo

- **Frontend:** https://bokhantering.vercel.app vercel free
- **Backend:** https://bookapi-hg1e.onrender.com render free

> **OBS:** Backend körs på Renders gratisplan och stängs ner efter 15 minuters inaktivitet.

> All data (användare, böcker, citat) återställs vid omstart eftersom ingen databas används.

> Första anropet efter inaktivitet kan ta 30-60 sekunder.
