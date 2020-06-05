# Github OAuth2.0 for JWT Bearer Auth
## Technologies
* Web Framework: Expressjs https://expressjs.com/
* DB: MongoDB through mongoose ORM https://mongoosejs.com/
* OAuth with Github OAuth2.0 apps and passportjs http://www.passportjs.org/packages/passport-github/
* JWT through jsonwebtoken
## Description
In progress.

Currently runs on `localhost:4000/api`

This backend is designed to login a user and pass them a JWT to access all other Cyber Challenge APIs.

Current Flow (Github OAuth):

1) Client clicks a login `<a></a>` and is directed to this backend (Challenge Auth Service) at `http://localhost:4000/api/auth/github`
2) Challenge Auth Service authenticates through `authorization-grant` OAuth flow with github.
3) Challenge Auth Service redirects the user back to Frontend, but with a 30-second expiring `refreshToken` JWT passed through the URL search params.
4) Frontend performs a POST to `http://localhost:4000/api/auth/exchangetoken` with the `refreshToken` in the `Authorization` header under the format `'Authorization': 'Token refreshToken`
5) Challenge Auth Service generates a long-lives (12-hour) `accessToken` JWT and returns it to the Frontend in a Json body:
```
{
    accessToken: <accesstoken>
    username: <username>
}
```
6) Frontend should save `accessToken` either in a cookie (can be vulnerable to CSRF), localStorage (can be vulnerable to XSS), or in memory (most secure).

## Environment Configurations
After cloning, a `.env` file should be create with the below sample configuration:
```
GITHUB_CLIENT_ID=<IDFromGithubOAuthApp>
GITHUB_CLIENT_SECRET=<SecretFromGithubOAuthApp>
GITHUB_CALLBACK_URL=<server-host>/api/auth/redirect
FRONTEND_SERVER=<frontend-host>
```

## Google Sign-In
https://developers.google.com/identity/sign-in/web/backend-auth