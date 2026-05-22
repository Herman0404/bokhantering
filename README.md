# BookApp

En responsiv CRUD-webbapplikation byggd med Angular 20 och .NET 9 C# API med JWT-autentisering.

## Tekniker

- **Frontend:** Angular 20, Bootstrap 5.3, Font Awesome 6
- **Backend:** .NET 10, C# Web API
- **Autentisering:** JWT (JSON Web Tokens)

## Funktioner

- Registrera och logga in med JWT-autentisering
- CRUD-operationer för böcker och citat (lägg till, visa, redigera, radera)
- Varje användare ser bara sina egna böcker och citat + 5 hårdkodade citat
- Dark mode / light mode toggle som sparas mellan besök
- Responsiv design för mobil, surfplatta och desktop

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

Backend körs på `http://localhost:5019`

### Frontend

```bash
cd BookApp/book-app
ng serve
```

Frontend körs på `http://localhost:4200`

## Projektstruktur

```
BookApp/
  BookApi/              .NET 9 backend
    Controllers/        API-endpoints (Books, Quotes, Auth)
    Models/             Datamodeller (Book, Quote, User)
    Services/           JWT TokenService
    Program.cs          App-konfiguration
  book-app/             Angular 20 frontend
    src/app/
      components/       Angular komponenter
      services/         API-tjänster
      models/           Dataodeller i typescript
      guards/           Route guards (för login/register)
      interceptors/     JWT-interceptor
```

## Live Demo

- **Frontend:** [länk till Netlify] (lägger till när deployad)
- **Backend:** [länk till Render] (lägger till när deployad)

> **OBS:** Backend körs på Renders gratisplan och kan ta 30-60 sekunder att starta efter inaktivitet.
