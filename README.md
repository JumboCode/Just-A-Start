# Just-A-Start YouthBuild

## Welcome 
This is the repository for Tufts JumboCode's Just-A-Start YouthBuild Project.

## Overview
Just-A-Start YouthBuild (JASYB) serves young people 16 to 24 years of age who have withdrawn from traditional high school. Enrolled students receive education services toward earning a high school equivalency (HiSET) credential and vocational training in retail industry fundamentals and construction to receive a pre-apprenticeship certification. The JAS YouthBuild team (hereinafter referred to as the “client”) is tasked with describing the impact their education and workforce training program has on the post-program placement of young people who complete their program. The system the client has in place as of now to achieve this task is suboptimal and takes too much manual labor. To resolve this issue, the JumboCode JASYB team will develop a web application that would allow the client to send out individual or group text messages to the program’s participants. After they get a notification, they would log in to the website and update their profile and/or fill out surveys the client has sent. The administrative account of the app would also include analytics on the use of the app.

## Team
- Naoki Okada (Project Manager)
- Brian Lin
- Emilio Encarnacion
- Katelyn Eustace
- Crystal Kwan
- Jason Xu
- Meguna Okawa
- Keisha Mukasa
- Kevin Li
- Theogene Micomyiza

## Architecture Overview
- Frontend: React
- Backend: Django
- Database: PostgresSQL

## How to Clone This Repo on Local Machine
1. `cd <local directry in which you want to keep this directory>`
2. `git clone https://github.com/JumboCode/Just-A-Start.git` --> Clones this repo
3. `git branch <name of branch>` --> Make sure you make your own branch before you start editing the source code

## How to Run Project on Local Machine
### To get the server running
1. `cd <local directry in which you keep this directory>`
2. `python3 manage.py runserver`
4. Go to `http://127.0.0.1:8000/admin/` to access the Django admin site

- Make sure you have a virtual environment running on your machine

### To get the frontend running
1. `cd <local directry in which you keep this directory>`
2. `npm install` if it is your first time running the application
3. `npm start`
4. Go to `http://localhost:3000/`

## Essential Git Commands
For all commands below, make sure to `cd <local directly in which you want to keep this directory>` first
### Making a branch
1. `git branch <name>`

### Moving to a branch
1. `git checkout <name>`

### How to commit changes
1. `git status` --> Check if you have made any changes first
2. `git add .` or `git add <filename>` --> `add .` will commit changes made to all files in that directory
3. `git commit -m "Commit message"`
4. `git push origin <name>`
5. Make a pull request once you are done!

### Updating a branch
1. `git checkout <branch you want to update>`
2. `git pull origin master` --> There may be conflicts so when that happens, please handle them accordingly.

## Some Rules
1. NEVER push to master
2. Google is your best friend! You can always ask me for guidance, but my answer will most likely be from Google as well!