# JWT based Auth Service
## Technologies
* Web Framework: Expressjs https://expressjs.com/
* DB: MongoDB through mongoose ORM https://mongoosejs.com/
* OAuth with Github OAuth and passportjs
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