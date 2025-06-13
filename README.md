Employee Feedback System

This project is a full-stack application for managing employee feedback. It consists of two parts:

employee-feedback-frontend (Frontend)

employee-feedback-backend (Backend)

Getting Started
Follow these steps to set up and run the project locally:

1. Clone the repository
```bash
git clone https://github.com/durgeshpd/employee-feedback.git
cd employee-feedback
```

2. Setup Frontend
```bash
cd client
npm install
npm run dev
```

This will start the frontend development server.

3. Setup Backend
```bash
cd server
npm install
```

Create a .env file inside server/:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Run the admin creation script (required for admin login):
```bash
node createAdmin.js
```

Start the backend server:
```bash
npm start
```

```

You can submit feedback, and if logged in as an admin, you can manage feedback entries.

Technologies Used:
Frontend: React, Tailwind CSS (or your frontend stack)

Backend: Node.js, Express, MongoDB (or your backend stack)

If you want, I can help you customize the README further with screenshots, environment variables, or contribution guidelines!
