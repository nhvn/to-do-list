To-Do List App
The To-Do List app allows users to create, edit, and delete tasks with due dates and priorities, as well as mark tasks as complete or incomplete. Users can register, log in, and log out, and their tasks are stored securely in a PostgreSQL database.

Setup
1. Create a PostgreSQL database to connect to. Save the database credentials for the next step.
2. Create a .env file inside the backend folder. It should contain the following environment variables (replace the values for the database with your own):
DATABASE_URL=postgres://your_database_username:your_database_password@localhost:5432/your_database_name?sslmode=disable
3. From the command line, navigate to the backend folder and run npm install to install the necessary dependencies for the API.
4. From the command line, navigate to the frontend folder and run npm install to install the necessary dependencies for the React app.
5. In separate terminals, run npm start in each folder so that the API and React app are running at the same time.

API
Base URL
http://localhost:8000

Endpoints
| Method | Path                             | Purpose                                  |
|--------|----------------------------------|------------------------------------------|
| GET    | /                                | Home page                                |
| GET    | /tasks                           | Task index page                          |
| POST   | /tasks                           | Create new task                          |
| GET    | /tasks/:task_id                  | Details about a particular task          |
| PUT    | /tasks/:task_id                  | Update a particular task                 |
| PUT    | /tasks/:task_id/complete         | Mark a task as complete                  |
| PUT    | /tasks/:task_id/incomplete       | Mark a task as incomplete                |
| DELETE | /tasks/:task_id                  | Delete a particular task                 |
| POST   | /register                        | Register a new user                      |
| POST   | /login                           | Login a user                             |
| POST   | /logout                          | Logout the current user                  |

React App
Base URL
http://localhost:3000

Routes
| Path               | Component      | Purpose                                  |
|--------------------|----------------|------------------------------------------|
| /                  | Home.js        | Home page                                |
| /register          | SignUpForm.js  | Form for creating a new user             |
| /tasks             | TaskIndex.js   | List of tasks                            |
| /tasks/new         | NewTaskForm.js | Form for creating a new task             |
| /tasks/:task_id    | TaskDetails.js | Details of a task, including its comments, and a form to create a new comment |
| /tasks/:task_id/edit | EditTaskForm.js | Form for editing a task                 |

Database Tables

Tasks
| Column      | Type          | Constraints                                        |
|-------------|---------------|----------------------------------------------------|
| task_id     | SERIAL        | PRIMARY KEY                                        |
| user_id     | INTEGER       | NOT NULL REFERENCES users(user_id) ON DELETE CASCADE |
| title       | VARCHAR(255)  | NOT NULL                                           |
| description | TEXT          |                                                    |
| due_date    | TIMESTAMP     | NOT NULL                                           |
| priority    | INTEGER       | NOT NULL                                           |
| completed   | BOOLEAN       | NOT NULL                                           |
| created_at  | TIMESTAMP     | DEFAULT NOW()                                      |
| type        | VARCHAR(20)   | NOT NULL                                           |

Users
| Column     | Type         | Constraints                          |
|------------|--------------|--------------------------------------|
| user_id    | SERIAL       | PRIMARY KEY                          |
| name       | VARCHAR(100) | NOT NULL                             |
| email      | VARCHAR(100) | NOT NULL UNIQUE                      |
| password   | VARCHAR(255) | NOT NULL                             |
| created_at | TIMESTAMP    | DEFAULT NOW()                        |


