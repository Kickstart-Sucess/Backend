## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Register Endpoint](##register-endpoint)**<br>
- **[Login Endpoint](##login-endpoint)**<br>
- **[Logout Endpoint](##logout-endpoint)**<br>
- **[Campaign Endpoints](##campaign-endpoint)**<br>
- **[Metrics Endpoints](##metrics-endpoints)**<br>

# backend-api
Back-end RESTful API

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Installing

A step by step series of examples that tell you how to get a development environment running
`cd` into `server` folder and install dependencies with:

```
yarn or npm install
```

Then launch the api with: 

```
yarn or npm run server
```

# Overview
- Creating campaigns and seeing predictions for how successful they will be.

# Back-end 

API's | RDBMS and Data Persistence | Authentication | Form Testing

# API Endpoints
Use Base URL: https://kickstarter-success-bw.herokuapp.com/

Register & Login 
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| POST   | /api/auth/register     | registers new users                              |
| POST   | /api/auth/login        | logins into user account                         |
| GET    | /api/auth/logout       | logs out of user account                         |

Campaigns
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /api/campaigns         | returns array of campaigns in database           |
| GET    | /api/campaigns/:id     | returns campaigns specified by :id  --NOT READY  |
| PUT    | /api/campaigns/:id     | updates campaign specified by :id                |
| POST   | /api/campaigns         | creates & returns new campaign                   |
| DELETE | /api/campaigns/:id     | deletes campaign specified by :id                |

<!-- 
Stories
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /api/stories           | returns array of stories                         |
| GET    | /api/stories/:id       | returns stories specified by :id                 |
| PUT    | /api/stories/:id       | updates stories specified by :id                 |
| DELETE | /api/stories/:id       | deletes stories specified by :id                 |

Photos
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /api/photos           | returns array of photos                         |
| GET    | /api/photos/:id       | returns photos specified by :id                 |
| POST   | /api/photos           | creates & returns new story                      |
| PUT    | /api/photos/:id       | updates photos specified by :id                 |
| DELETE | /api/photos/:id       | deletes photos specified by :id                 |
 -->

## Register Endpoint
```js
POST /api/auth/register
```
Expected Body 
```js
    {
    "username": "new_user", // string, unique, required
    "password": "password", // string, required
    "age": 18, // integer, required
    "email": "JaneDoe@gmail.com" // string, unique, required
    }
```

Expected Response
```js
    {
        "id": 4,
        "username": "new_user",
        "password": "$2a$08$Sp/WntMm7eAZnDn3tp40tOAp77T8CTMUel8bqZGD3CoJcuSrH.NZ6",
        "email": "JaneDoe@gmail.com",
        "age": 18
    }
```

## Login Endpoint
```js
POST /api/auth/login
```
Expected Body
```js
{
    "username": "test_user",
    "password": "password"
}
```
Expected Response
```js
{
    "message": "Welcome test_user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJuZXdfdXNlcjEyMTIxMiIsImlhdCI6MTU5ODQyMDg0NywiZXhwIjoxNTk4NDI4MDQ3fQ.YyR_rrRxYaDVTt3FPM155hPwbUAEFhyaDSOWqVOD8kM"
}
```

## Logout Endpoint
```js
GET /api/auth/logout
```
Expected Response 
```js
{
    "message": "successfully logged out"
}
```

## Campaign Endpoints
### GET All campaigns
```js
GET /api/campaigns

Expected Response: returns array of campaigns in database 

[
    {
        "id": 1,
        "name": "Project Z",
        "user_id": 1
    }
]
```

### POST campaign
```js
POST /api/campaigns

Expected Body: 
    {
        "name": "test 123",
        "user_id": 1
    }

Expected Response: returns object of created campaign in database 

    {
        "id": 3,
        "name": "test 123"
    }
```

### PUT Campaign By ID
```js
PUT /api/campaigns/:id

Expected Body:
    {
        "name": "test123" //updated field
    }

Expected Response: updates campaign specified by :id

    [
        {
            "updated": 1
        }
    ]
```

### DELETE campaign by ID
```js
DELETE /api/campaigns/:id

Expected Response: deletes campaign specified by :id

Expected Response: 
    {
        "deleted": 1
    }
```

<!-- ### GET Stories by user ID
```js
GET /api/users/:id/stories

Expected Response: returns stories created by user specified by :id

Expected Response:
    {
        "id": 1,
        "storyName": "Chinatown",
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "user_id": 1,
        "stories_id": 1
    }
```

### POST new story
```js
POST /api/users/:id/stories

Expected Body:

    {
        "storyName": "test",
        "storyCity": "test",
        "storyCountry": "test",
        "storyDesc": "test",
        "storyPhoto": "test link"
        "user_id": 3
    }

Expected Response:  creates & returns new story
Expected Response

    {
        "storyName": "test",
        "storyCity": "test",
        "storyCountry": "test",
        "storyDesc": "test",
        "storyDate": "2020-08-27 02:27:49",
        "storyPhoto": "test link",
        "user_id": 3
    }
```

## Stories Endpoints
### Get All Stories
```js
GET /api/stories

Expected Response: List of all stories in database

Expected Response:
[
    {
        "id": 1,
        "storyName": "Chinatown",
        "storyCity": "Bangkok",
        "storyCountry": "Thailand",
        "storyDate": "2020-08-25 05:38:15",
        "storyDesc": "Out on a nightly excursion looking for something to eat",
        "user_id": 1
    },
    {
        "id": 2,
        "storyName": "Sanctuary of Truth",
        "storyCity": "Pattaya City",
        "storyCountry": "Thailand",
        "storyDate": "2020-08-25 05:38:15",
        "storyDesc": "A daytime excursion visiting some local places.",
        "user_id": 2
    },
    {
        "id": 3,
        "storyName": "Beach in Pattaya",
        "storyCity": "Pattaya City",
        "storyCountry": "Thailand",
        "storyDate": "2020-08-25 05:38:15",
        "storyDesc": "Taking a must needed rest after a weekend of fun in Pattaya",
        "user_id": 3
    }
]
```

### Get All Stories by ID
```js
GET /api/stories/:id

Expected Response: Lists stories specified by :id

Expected Response:
    {
        "id": 1,
        "storyName": "Chinatown",
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "user_id": 1,
        "stories_id": 1
    }
```

### PUT Story by ID
```js
PUT /api/stories/:id

Expected Body:
    {
        "storyName": "Updated Story Name" //updated field
    }

Expected Response: updates story specified by :id

Expected Response:
"story": [
	        {
		        "id": 5,
		        "storyName": "Updated Story Name",
		        "storyCity": "test23",
		        "storyCountry": "Thailand",
		        "storyDate": "2020-08-28 03:12:34",
		        "storyPhoto": "test photo",
		        "storyDesc": "testDesc",
		        "user_id": 1
			    }
        ]
```

### DELETE Story by ID
```js
DELETE /api/stories/:id

Expected Response: deletes story specified by :id

Expected Response: 
    {
        "removed": 1
    }
```

## Photos Endpoints
### GET ALL Photos
```js
GET /api/photos

Expected Response: List of photos in database

Expected Response:
[
    {
        "id": 1,
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "photoDesc": "Out for dinner",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 1
    },
    {
        "id": 3,
        "photoLink": "https://i.ibb.co/RTZNzfX/20200821-093310.jpg",
        "photoDesc": "Enjoy a moment of relaxation in Pattaya",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 3
    }
]
```

### GET Photos By ID
```js
GET /api/photos/:id

### Expected Response: Photo that matches Users ID

Expected Response
    {
        "id": 1,
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "photoDesc": "Out for dinner",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 1
    }
```

### POST new photo
```js
POST /api/photos

Expected Body:

    {
        "photoLink": "test",
        "photoDesc": "test",
        "stories_id": 1
    }


Expected Response:  creates & returns new photo
Expected Response

[
    {
        "id": 4,
        "photoLink": "test",
        "photoDesc": "test",
        "photoDate": "2020-08-28T05:30:33.313Z",
        "stories_id": 1
    }
]
```

### PUT Photo by ID
```js
PUT /api/photos/:id

Expected Body:
    {
        "photoLink": "updates example" //updated field
    }

Expected Response: updates photo specified by :id

Expected Response:
"story": [
	        {
		        "id": 4,
                "photoLink": "updates example",
                "photoDesc": "test",
                "photoDate": "2020-08-28T05:30:33.313Z",
                "stories_id": 1
            }
        ]
```

### Delete
```js
DELETE /api/photos/:id

Expected Response: deletes photo specified by :id

Expected Response: 
    {
        "removed": 1
    }
``` -->
