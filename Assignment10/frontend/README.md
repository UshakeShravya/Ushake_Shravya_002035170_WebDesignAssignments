Job Portal Application

A modern, responsive job portal built with React and Material-UI that helps job seekers find their dream jobs and companies post job opportunities.

Features

- Advanced job search with filters
- User authentication (Login/Register)
- Job listings with detailed information
- Company showcase
- Responsive design for all devices
- Save favorite jobs
- Job application system
- Modern UI with Material-UI components

Tech Stack

- React.js
- Material-UI
- React Router
- Axios for API calls
- Emotion for styled components

Project Setup

1. Clone the repository:
git clone <repository-url>
cd job-portal

2. Install dependencies:
npm install

3. Start the development server:
npm start

The application will be available at http://localhost:3001

Folder Structure

job-portal/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   └── authAPI.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PageBackground.jsx
│   │   └── JobCard.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── Jobs/
│   │   ├── Companies/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Login/
│   │   └── Register/
│   ├── routes.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

Navigation

The application includes the following main pages:

1. Home (/)
   - Landing page with featured jobs
   - Quick search functionality
   - Featured companies

2. Jobs (/jobs)
   - Comprehensive job listings
   - Advanced search and filters
   - Job details and application

3. Companies (/companies)
   - Company profiles
   - Company job listings
   - Company information

4. About (/about)
   - Information about the platform
   - Mission and vision
   - Platform features

5. Contact (/contact)
   - Contact form
   - Support information
   - Office locations

6. Authentication
   - Login (/login)
   - Register (/register)

Key Functionalities

Job Search and Filtering
- Search by job title or company
- Filter by location
- Filter by job type (Full-time, Part-time, Contract, Internship)
- Filter by experience level
- Real-time search results

Job Listings
- Detailed job information
- Required skills
- Salary information
- Company details
- Application links
- Save favorite jobs

User Features
- User registration
- User login
- Profile management
- Saved jobs
- Job applications

Company Features
- Company profiles
- Job posting
- Company search
- Company reviews

API Integration

The application uses the following API endpoints:

- Authentication:
  - POST /api/users/register
  - POST /api/users/login
  - DELETE /api/users/:id

- Jobs:
  - GET /api/jobs
  - GET /api/jobs/:id
  - POST /api/jobs
  - PUT /api/jobs/:id
  - DELETE /api/jobs/:id

Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/job-portal 