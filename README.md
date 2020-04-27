# Node.js – JWT Authentication & Authorization with JSONWebToken & Sequelize using SQLite

Reference:

> [Node.js JWT Authentication & Authorization example](https://bezkoder.com/node-js-jwt-authentication-mysql/)

## Project setup
```
npm install
```

### Run
```
npm start
```

### API
#####  Sign Up

Example (POST) : http://127.0.0.1:4000/api/auth/signin
```json
{
	"username":"admin",
	"password":"admin"
}
```
#####  Sign In

Example (POST) : http://127.0.0.1:4000/api/auth/signup
```json
{
	"username":"admin",
	"password":"admin"
}
```
#####  Change Password

Example (POST) : http://127.0.0.1:4000/api/auth/changePassword
```json
{
	"username":"admin",
	"password":"admin",
	"newPassword" : "user"
}
```

#####  Confirm token validity

Example (POST) : http://127.0.0.1:4000/api/auth/auth
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg1MTIwNzg5LCJleHAiOjE1ODUyMDcxODl9.vRh2qorgcNvN7Tqnu5d1G167j22vwnrZIFxr2i0Xsj8"
}
```