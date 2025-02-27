Step 1 - Create the database using terminal 

createdb -U <postgresusername> task_db

Step 2 - Connect to the database

psql -U <postgresusername> -d task_db

Step 3 - It will take you inside the database (task_db=#) so create the tables by entering :

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT FALSE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

Step 4 - Verify the tables you created 

\dt

You should get :
            List of relations
 Schema |  Name  | Type  |     Owner      
--------+--------+-------+----------------
 public | tasks  | table | <postgresusername>
 public | users  | table | <postgresusername>
(2 rows)


Step 5 - Exit psql 

\q

You can connect DBeaver to the database by starting a new connection and connecting it to task_db. It will allow for easy management and checking of the database entries.

Now clone the repository and cd to the repository

Now coming to the setup of the .env files 
.env file for backend - It should be in the backend directory 

PORT=<port-of-your-choice> (I used 5001)
DATABASE_URL=postgres://<postgresusername>:<youruserpassword>@localhost:<dbport>/task_db
JWT_SECRET=<your-jwt-secret-key>

.env file for the frontend - It should be in the frontend directory

REACT_APP_API_URL=http://localhost:<backend-port> (I used 5001 for the backend so entered that here>

Once the .env files are setup, considering you are in the main repo directory, follow these steps:

1. cd backend
2. npm install
3. To start the backend, enter node src/server.js

4. cd ..
5. cd frontend
6. npm install
7. npm start

Now, the frontend and backend both are running and the database is also connected (Make sure you follow the database connection steps and ensure the postgresql service is active through your terminal).

Pay Expectations (Required to be stated)
As far as the pay is concerned, I am comfortable with the pay stated on the job posting, which is 20-30 per hour. I am doing this to gain further experience and exposure to software engineering and full stack development 

Video (Sorry for delay - I realised late that I had not uploaded the video link)
https://drive.google.com/file/d/10f-BETNStuWpGHRZQ_oqNLnp-gI6s_U1/view?usp=sharing
the working flow can be seen here
