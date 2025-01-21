## Project Report 📊

### Overview 🏫
This project is aimed at building a comprehensive university management system. The system will handle various aspects of university operations including student enrollment, course management, faculty management, and more.

### Features ✨
- **Student Management**: Enroll students, manage student records, track academic progress.
- **Course Management**: Create and manage courses, assign faculty, schedule classes.
- **Faculty Management**: Manage faculty records, assign courses, track performance.
- **Administrative Tools**: Reporting, analytics, and other administrative functions.

### Technology Stack 🛠️
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js (if applicable)
- **Other Tools**: Docker, Kubernetes (if applicable)

### ER Diagram 📈
[ER Diagram: 1](./ER_Diagram.png)

## Backend Documentation 🛠️

### Overview
The backend of this project is built using Node.js and Express.js. It provides RESTful APIs for managing the university system's data and operations.

### Project Structure
```
/src
  /controllers
  /models
  /routes
  /services
  /utils
  index.js
```

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd MIT-UNI-SERVER
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
To start the server, run:
```bash
npm start
```
The server will be running on `http://localhost:3000`.

### API Endpoints
- **Students**
  - `GET /students`: Get all students
  - `POST /students`: Create a new student
  - `GET /students/:id`: Get a student by ID
  - `PUT /students/:id`: Update a student by ID
  - `DELETE /students/:id`: Delete a student by ID

- **Courses**
  - `GET /courses`: Get all courses
  - `POST /courses`: Create a new course
  - `GET /courses/:id`: Get a course by ID
  - `PUT /courses/:id`: Update a course by ID
  - `DELETE /courses/:id`: Delete a course by ID

- **Faculty**
  - `GET /faculty`: Get all faculty members
  - `POST /faculty`: Create a new faculty member
  - `GET /faculty/:id`: Get a faculty member by ID
  - `PUT /faculty/:id`: Update a faculty member by ID
  - `DELETE /faculty/:id`: Delete a faculty member by ID

### Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

### Error Handling
The backend uses a centralized error handling mechanism. Errors are captured and formatted before being sent to the client.

### Logging
The backend uses a logging library to log important events and errors. Logs are stored in the `logs` directory.

### Testing
To run tests, use:
```bash
npm test
```

### Deployment
The backend can be deployed using Docker and Kubernetes. Ensure you have Docker and Kubernetes installed and configured.

```
docker build -t ph-uni-server .
docker run -p 3000:3000 ph-uni-server
```

For Kubernetes, create a deployment and service configuration and apply them using `kubectl`.

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
