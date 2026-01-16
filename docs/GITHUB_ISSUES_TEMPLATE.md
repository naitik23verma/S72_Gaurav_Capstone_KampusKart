# GitHub Issues Template for 30-Day Sprint

Copy these issue templates to create your GitHub Project board entries.

---

## Day 2: Low-Fidelity Wireframes

**Title**: Day 2 - Create low-fidelity wireframes

**Description**:
Create wireframes using Excalidraw/Figma/pen & paper covering:
- User registration & login flow
- Dashboard/home page
- Lost & Found list view
- Lost & Found detail view
- Create item form

**Labels**: design, day-2
**Milestone**: Phase 1 - Setup & Design
**Assignee**: @yourself

---

## Day 3: Low-Fidelity Design Completion

**Title**: Day 3 - Complete low-fid design documentation

**Description**:
Finalize all wireframes and export to `designs/low-fid/` folder.
Create LOW_FID_FLOW.md explaining user journeys.

**Labels**: design, day-3
**Milestone**: Phase 1 - Setup & Design

---

## Day 4: High-Fidelity Design Start

**Title**: Day 4 - Start high-fidelity Figma designs

**Description**:
Create Figma mockups for:
- Login/Register pages
- Main dashboard
- Lost & Found list

**Labels**: design, day-4
**Milestone**: Phase 1 - Setup & Design

---

## Day 5: High-Fidelity Design Completion

**Title**: Day 5 - Complete hi-fid design system

**Description**:
Finish all Figma screens, create component library, define color scheme and typography.

**Labels**: design, day-5
**Milestone**: Phase 1 - Setup & Design

---

## Day 6: Database Schema - User Model

**Title**: Day 6 - Create User database schema

**Description**:
- Setup Node.js + Express
- Install dependencies (mongoose, dotenv, bcrypt, jwt)
- Create User model with schema
- Connect to MongoDB

**Labels**: backend, database, day-6
**Milestone**: Phase 2 - Backend

---

## Day 7: Database Read/Write Operations

**Title**: Day 7 - Implement User CRUD operations

**Description**:
Create userController with:
- createUser (with password hashing)
- getUserByEmail
- getUserById
Test with Postman

**Labels**: backend, database, day-7
**Milestone**: Phase 2 - Backend

---

## Day 8: GET API - Lost & Found

**Title**: Day 8 - Create Lost & Found model and GET endpoints

**Description**:
- Create LostFound schema
- Implement getAllLostFound()
- Implement getLostFoundById()
- Create routes: GET /api/lost-found

**Labels**: backend, api, day-8
**Milestone**: Phase 2 - Backend

---

## Day 9: POST API - Create Item

**Title**: Day 9 - Implement POST endpoint for Lost & Found

**Description**:
- Add createLostFound() controller
- Create POST /api/lost-found route
- Add validation middleware
- Test with Postman

**Labels**: backend, api, day-9
**Milestone**: Phase 2 - Backend

---

## Day 10: Entity Relationships

**Title**: Day 10 - Implement User-LostFound relationship

**Description**:
- Add createdBy reference in LostFound schema
- Populate user details in GET requests
- Update POST to auto-set createdBy

**Labels**: backend, database, day-10
**Milestone**: Phase 2 - Backend

---

## Day 11: PUT API - Update Item

**Title**: Day 11 - Implement PUT endpoint

**Description**:
- Add updateLostFound() controller
- Create PUT /api/lost-found/:id route
- Add ownership check middleware
- Test updates

**Labels**: backend, api, day-11
**Milestone**: Phase 2 - Backend

---

## Day 12: Authentication - JWT

**Title**: Day 12 - Implement JWT authentication

**Description**:
- Create auth routes (register, login)
- Implement JWT generation
- Create auth middleware
- Protect Lost & Found routes

**Labels**: backend, auth, day-12
**Milestone**: Phase 2 - Backend

---

## Day 13: Deploy Backend

**Title**: Day 13 - Deploy backend to Render

**Description**:
- Setup Render.com account
- Configure environment variables
- Deploy backend
- Test live endpoints

**Labels**: backend, deployment, day-13
**Milestone**: Phase 2 - Backend

---

## Day 14: Initialize React App

**Title**: Day 14 - Setup React frontend with Vite

**Description**:
- Create Vite + React app
- Install dependencies (react-router, axios, tailwind)
- Setup folder structure
- Create basic layout

**Labels**: frontend, setup, day-14
**Milestone**: Phase 3 - Frontend

---

## Day 15: Register Component

**Title**: Day 15 - Create registration page

**Description**:
- Build Register.jsx with form
- Implement form validation
- Connect to backend API
- Style with Tailwind

**Labels**: frontend, auth, day-15
**Milestone**: Phase 3 - Frontend

---

## Day 16: Login Component

**Title**: Day 16 - Create login page

**Description**:
- Build Login.jsx
- Implement JWT storage
- Create ProtectedRoute wrapper
- Match hi-fid design

**Labels**: frontend, auth, day-16
**Milestone**: Phase 3 - Frontend

---

## Day 17: Lost & Found List

**Title**: Day 17 - Create Lost & Found list page

**Description**:
- Build LostFoundList.jsx
- Fetch data from API
- Display as card grid
- Add search/filter UI

**Labels**: frontend, feature, day-17
**Milestone**: Phase 3 - Frontend

---

## Day 18: Detail & Create Forms

**Title**: Day 18 - Create detail and create item pages

**Description**:
- Build LostFoundDetail.jsx
- Build CreateLostFound.jsx
- Connect to backend APIs
- Style matching design

**Labels**: frontend, feature, day-18
**Milestone**: Phase 3 - Frontend

---

## Day 19: File Upload

**Title**: Day 19 - Implement image upload

**Description**:
- Setup Cloudinary account
- Add file upload to create form
- Store image URL in database
- Display images on detail page

**Labels**: frontend, backend, feature, day-19
**Milestone**: Phase 3 - Frontend

---

## Day 20: Google OAuth

**Title**: Day 20 - Implement Google OAuth

**Description**:
- Setup Google OAuth credentials
- Implement backend OAuth routes
- Add "Sign in with Google" button
- Test OAuth flow

**Labels**: backend, frontend, auth, day-20
**Milestone**: Phase 3 - Frontend

---

## Day 21: Update & Delete

**Title**: Day 21 - Implement edit and delete functionality

**Description**:
- Add edit button and form
- Implement PUT request
- Add delete button with confirmation
- Test full CRUD flow

**Labels**: frontend, feature, day-21
**Milestone**: Phase 3 - Frontend

---

## Day 22: Deploy Frontend

**Title**: Day 22 - Deploy frontend to Netlify/Vercel

**Description**:
- Setup deployment platform
- Configure environment variables
- Deploy frontend
- Test full app flow

**Labels**: frontend, deployment, day-22
**Milestone**: Phase 3 - Frontend

---

## Day 23: Design Polish

**Title**: Day 23 - Match design and polish UI

**Description**:
- Compare all pages to Figma
- Fix styling inconsistencies
- Ensure responsive design
- Test complete user journey

**Labels**: frontend, design, day-23
**Milestone**: Phase 3 - Frontend

---

## Day 24: API Documentation

**Title**: Day 24 - Create Bruno/Postman collection

**Description**:
- Export all endpoints to Bruno
- Organize by category
- Add descriptions and examples
- Commit to repo

**Labels**: documentation, day-24
**Milestone**: Phase 4 - Testing & Docs

---

## Day 25: Jest Testing

**Title**: Day 25 - Write 5+ unit tests with Jest

**Description**:
- Install Jest
- Write backend tests (user, lostFound, auth)
- Write frontend tests (Login, Card)
- Run test suite

**Labels**: testing, day-25
**Milestone**: Phase 4 - Testing & Docs

---

## Day 26: Docker Support

**Title**: Day 26 - Create Dockerfile and docker-compose

**Description**:
- Create backend Dockerfile
- Create docker-compose.yml
- Test local Docker deployment
- Document Docker usage

**Labels**: devops, day-26
**Milestone**: Phase 4 - Testing & Docs

---

## Day 27: User Acquisition

**Title**: Day 27 - Get 5+ active users

**Description**:
- Share app with friends/classmates
- Collect user signups
- Track usage in MongoDB
- Gather testimonials

**Labels**: launch, day-27
**Milestone**: Phase 5 - Launch

---

## Day 28-29: Optional Features

**Title**: Day 28-29 - LLM/AI features (optional)

**Description**:
- Integrate OpenAI API
- Add AI suggestions feature
- Test AI functionality
- Document implementation

**Labels**: feature, ai, day-28-29
**Milestone**: Phase 5 - Launch

---

## Day 30: Final Documentation

**Title**: Day 30 - Compile proof of work

**Description**:
- Create CAPSTONE_PROOF_OF_WORK.md
- List all concepts with PR links
- Verify all deployments
- Create final demo video

**Labels**: documentation, day-30
**Milestone**: Phase 5 - Launch

---

**Total Issues**: 30 (one per day)

Copy these to your GitHub Issues and organize them in your Project board!
