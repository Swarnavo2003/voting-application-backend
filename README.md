# Voting Applicaion Backend

This is a simple web application for conducting online voting. Users can sign up, log in, view a list of candidates, vote for a candidate, change their password, and view the live vote counts of candidates. Additionally, there is an admin interface for managing the candidates.

## Routes

### User Authentication

* POST /signup: Create a new user account.
* POST /login: Log in to an existing account using Aadhar card number and password.

### Voting

* GET /candidates: Get the list of candidates.
* POST /vote/:candidateId: Vote for a specific candidate.

### Vote Counts

* GET /vote/counts: Get the number of candidates sorted by their vote counts.

### User Profile
* GET /profile: Get the user's profile information.
* PUT /profile/password: Change the user's password.
* Admin Candidate Management
* POST /candidates: Create a new candidate.
* PUT /candidates/:candidateId: Update an existing candidate.
* DELETE /candidates/:candidateId: Delete a candidate.

## Functionality
* Users can sign up using their Aadhar card number and password.
* Users can log in using their Aadhar card number and password.
* Users can view the list of candidates.
* Users can vote for a specific candidate.
* Users can change their password.
* Users' data includes their unique government ID proof, i.e., 
* Aadhar card number.
* Admin maintains the table of candidates but cannot vote.
* Admins cannot vote.
* Live vote counts of candidates are available sorted by their vote counts.

## Usage
To use this application, follow these steps:

* Sign up for a new account using /signup.
* Log in to your account using /login.
* View the list of candidates using /candidates.
* Vote for a candidate using /vote/:candidateId.
* Change your password using /profile/password.
* Admins can manage candidates using /candidates routes.
