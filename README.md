# ArtGallery
ArtGallery is a project created for the project defense of the Agnular Softuni (July - August 2021) Course (https://softuni.bg/trainings/3473/angular-july-2021) as part of the JS Web Course (May - August 2021)

Project Requirements: [Angular Project Assignment.docx](https://github.com/TheStormWeaver/ArtGallery/files/6945894/Angular.Project.Assignment.docx)

## About project
ArtGallery "WaveArts" is an app that serves as an online art gallery. The site's main purpose is to collect all kinds of art including: literature (poetry, drama, story), the visual arts (paintings, drawings), the graphic arts (designs and other forms expressed on flat surfaces), the plastic arts (sculptures), the decorative arts (enamelwork, furniture design, mosaic), the performing arts (theatre, dance, music), and architecture. Visitors can publish their own art pieces. Once published, the art piece goes to the Firebase backend and is displayed in the "View Art" tab. The given user that created the art piece can edit it at any given time, whilst updating in the database or even delete it, removing it permanently from the database. Art pieces can also be liked by other users, giving the artist more exsposure.

## UI/UX
Unauthorized (not logged in) users have acess to:
- Home page
- About us page
- Register page
- Login page

Authorized (Logged in) users:
- Can view all art pieces posted by users including themselves
- Can Create art
- Can edit art that they have created
- Can delete art that they have created
- Can like other people's art
- Can access their own profile page
- Can edit their profile 

# The project is built with :
- Angular 8 - Front-end framework
- Node.js - JavaScript runtime environment
- Npm - Package manager
- Firebase - NoSQL database used to store data online
- Visual Studio Code - IDE

# You will need have installed before starting the project:
- NodeJS
- Angular CLI

# Running the project
1. Clone this repo or save it as a zip
2. Run "npm install"
3. Check if firebase and angularfire are installed 
4. Add configuration file "firebaseConfig" object to enviroments/enviroment.ts file or keep the currently used one. (Links for helping with the setup: https://codinglatte.com/posts/how-to/how-to-setup-firebase-for-angular/ or https://firebase.google.com/docs/web/setup)
5. Run "ng s"
6. Open http://localhost:4200 and use the app
