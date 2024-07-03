# React + Vite

# Glassdoor Clone Application

This Glassdoor Job Clone Application is a React.js and Redux-based platform allowing users to explore, save, and apply for jobs. The architecture employs Redux for state management, integrating Firebase for authentication, database operations, and storage. Tailwind CSS is utilized for styling, ensuring responsiveness and utility-first design principles. The application facilitates user interactions, managing saved and applied jobs efficiently. Components like job listings, detailed job views, and user profiles are structured for seamless navigation. Testing encompasses Jest and React Testing Library for unit and integration testing. The project structure follows a modular approach with components, pages, Redux logic, utilities, and main entry points clearly organized. Deployed on Render.com with environment variables provided. Overall, it's a comprehensive solution for job seekers offering an intuitive user experience and robust functionality.

## Features

1. **Job Listings**: View a list of available jobs with details like title, company name, location, salary, and job description.
2. **Job Details**: Click on a job card to view detailed information including job highlights, related links, and apply options.
3. **Authentication**: Users can sign up, log in, and log out to manage their profile and saved/applied jobs.
4. **Saved Jobs**: Save interesting jobs to view them later and manage saved jobs in the user profile.
5. **Apply for Jobs**: Apply for jobs directly from the job details page with an easy apply option.

## Architecture

- **Frontend**: Built using React.js for the user interface, component composition, and routing.
- **State Management**: Redux is used for global state management, with Redux Thunk middleware for asynchronous actions.
- **Backend**: Firebase is used as a Backend-as-a-Service (BaaS) for authentication, database management, and storage.
- **Database**: Firebase Firestore is used for storing job data, user profiles, saved jobs, and applied jobs.

## state Management

- **Redux Toolkit**: Manage Job information centrally in store.
- **Context Api**: Manage all firebase functionality.

## Data Flow

1. User interacts with the application through the UI components.
2. Redux manages the application state, including selected jobs, user authentication status, and saved/applied jobs.
3. Firebase handles user authentication (sign up, login, logout) and stores user-related data.
4. Job data is fetched from Firestore and displayed in the application.
5. Users can save jobs to their profile, apply for jobs, and manage their saved/applied jobs.

## Styling

- **Tailwind CSS**: Used for styling components, providing a utility-first approach to styling and responsive design.
- **Custom Styles**: Additional CSS and SCSS files are used for custom styles, layout adjustments, and component-specific styling.

## Project Structure

- `src/components`: Contains reusable UI components like cards, forms, buttons, header, footer, lists.
- `src/pages`: Contains main pages of the application like Home, Job Details, Profile, AppliedJob, companiesPage, CreateEditProfile,GetPersonalInfo
- `src/redux`: Redux-related files including reducers, actions, and slices.
- `src/utils`: Utility functions and helper files used across the application.
- `src/App.js`: Main entry point of the React application.
- `src/index.js`: File responsible for rendering the React app into the DOM.

## Project Description

- **Frontend Interface Development**: Frontend interface inspired by Glassdoor, the popular job search platform, with features such as job listings, job details, and filters for job search.
- **User Authentication and Job Management**: Integrated features for user signin, signup, and job management, including the ability to apply for jobs and bookmark them for later viewing, based on API documentation.
- **Browse Jobs Without Login/Signup**: Allowed users to browse job listings without requiring signin/signup, ensuring accessibility and ease of use for job seekers.
- **Data Management with Redux**: Utilize Redux toolkit, thunk for efficient data management, ensuring seamless handling of job-related data and state management throughout the application.
- **Authentication Redirect**: When a user attempts to apply for a job or bookmark a job, redirect them to the signin/signup page if they're not logged in, ensuring user authentication and security before accessing personalized features.
- **Authentication Methods**: Implemented Firebase authentication methods based on the provided API documentation, ensuring secure and reliable user authentication.
- **UI/UX Design**: Used Tailwinds, created a visually appealing, user-friendly frontend that promotes seamless navigation and interaction.
- **Search Functionality**: Implemented search functionality to enable users to search for jobs easily, enhancing user convenience and facilitating job discovery.
- **Thorough Testing**: Tested the application thoroughly to ensure all functionalities work as expected, providing a smooth and efficient job search experience for users.

## Version Control

Used Github for for version control of application

## Installation

1. Clone the repository: `https://github.com/sourabhsjadhav99/glassdoor_clone_frontend_project.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the browser and visit `http://localhost:5173` to view the application.

## Deployment

This application deployed on Render.com . Ensure to set up environment variables for Firebase configuration and API keys before deployment.

## Contributors

- Sourabh Jadhav
- 
## Images

### Login or register new user
![Login or register new user](/screenshots/signin.png)

### Create User's profile
![Create User's profile](/screenshots/createprofile.png)

### Search job according to location
![Search job according to location](/screenshots/searchlist.png)

### Save or bookmark job
![Save or bookmark job](/screenshots/savedjobs.png)

### Apply for any job
![Apply for any job](/screenshots/applyforjob.png)

### Successfully applied to job
![Apply for any job](/screenshots/appliedsuccessufully.png)

### Search companies
![Search companies](/screenshots/searchcompany.png)

### List of saved jobs with description
![List of saved jobs](/screenshots/savedjobs.png)

### List of applied jobs with description
![List of applied jobs](/screenshots/appliedjobs.png)
