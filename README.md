# Steps to setup project locally

## Install Node.js
You have to install node.js version >=20.11.1

## Install the packages
At first, we have to install all the packages to run the project. For that, please run the beloe code. 

```
npm run setup
```

## add the environment file in the backend.
Go to backend folder, and create an `.env` file and the below variables for backend to run. 

``` javascript
DB=mongodb+srv://mk1316a:manas1316@project-management.w2le01u.mongodb.net/
PORT=8000
SMPT_EMAIL=amr1313mk@gmail.com
SMPT_PASSWORD=mbbhxrquozvrwvqy
SECRETKEY=manas-project-management

AI_API_KEY=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
```

## Run the project
To run backend code, you have to run the following command

```
npm run start:frontend
```

To run the frontend code, you have to run the following command
```
npm run start:backend
```

## Developers Need
To review the API, and to test them out, you can go to http://localhost:8000/api-docs/#/ 


#### Now, your project is running, so you can go to http://localhost:3000/auth/signup to register yourself, and http://localhost:3000/auth/login to login. 
