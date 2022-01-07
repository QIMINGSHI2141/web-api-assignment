# Web -API ASSIGNMENT2.

Name: Qiming Shi

## Features.

 
 + Feature 1 - Get upcoming movies from TMDB
 + Feature 2 - Get toprated/popular/nowplaying movies from TMDB 
 + Feature 3 - Get popular actors and parameterise
 + Feature 4 - The login from Assignment 1 becomes a user login using the API
 + Feature 5 - Users can register before logging in
 + Feature 6 - Some pages cannot be accessed without login


## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://Shiqiming:Sqm12345@cluster0.ykksk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
SEED_DB=True
SECRET=****
TMDB_KEY=****
HEROKU_API_KEY=****
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/tmdb/upcoming/ | Get upcoming movies| N/A | N/A | N/A  
| /api/movies/tmdb/top_rated/ | Get top-rated movies| N/A | N/A | N/A  
| /api/movies/tmdb/popular/ | Get popular movies| N/A | N/A | N/A  
| /api/movies/tmdb/nowplaying/ | Get nowplaying movies| N/A | N/A | N/A  
| /api/actors/ | Get popular actors| N/A | N/A | N/A  
| /api/actors/{id} | Get popular actors by id| N/A | N/A | N/A  
| /api/genres | Get the genres| N/A | N/A | N/A 
| /api/user | Get all users| Verify login or registration | Update a user | N/A 




## Security and Authentication
The user who logged in in the original design only needs to be a TMDB user, but now it needs to be a user already stored in the database, and some pages are not visible in the non-logged state.

## Integrating with React App
Some changes in React App

~~~Javascript
  export const getUpcomingMovies = () => {
    return fetch(
      `/api/movies/tmdb/upcoming`,{headers: {
                'Authorization': window.localStorage.getItem('token')
              }
            }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

      export const getPopularActor = () => {
      return fetch(
        `/api/actors`,{headers: {
                  'Authorization': window.localStorage.getItem('token')
                }
              }
      ).then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
         throw error
      });
    };
~~~

Login and Register part 
~~~Javascript
    export const login = (username, password) => {
      return fetch('/api/users', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({ username: username, password: password })
      }).then(res => res.json())
  };
  
  export const signup = (username, password) => {
      return fetch('/api/users?action=register', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({ username: username, password: password })
      }).then(res => res.json())
  };
~~~





