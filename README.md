<!-- # project1-tg1632-zds238-cz1529-kz1005-jjz282 -->
# Project 1 (Introduction to Computer Science) :thumbsup:</br>
## Team Name
- The Shinning Lists
## Web development project for Introduction to CS at NYU Tandon
- This project is an online to-do list application using HTML, CSS, and Javascript for the front end interface and Flask, PyMySQL and MySQL for backend development. The application is hosted on a server using Amazon web services as well as NGINX and Gunicorn.
## Web URL 
- http://ec2-18-222-54-217.us-east-2.compute.amazonaws.com/
## How to run the project
- Use the public key to sign in the EC2 Ubuntu server, and go to the project1 directory (all the files, as well as keypem are in the directory). We already use the command: gunicorn app:app& to let the server run "forever".
## Group members:
- [tg1632][Taimur Ghani]
- [zds238][Zubin Srivastava] (https://github.com/zsrivastava)
- [jjz282][Jack Zheng] (https://github.com/JZ987)
- [cz1529][Connie Zhou] (https://github.com/soy-sauce)
- [kz1005][Kaixuan Zhou] (https://github.com/ZhouJoseph)
## Project Map
README.md -this file </br>
app.py -contains all app routes and starts server </br>
ipadd.txt -IP address key for AWS</br>
jkzctKeyPair.pem -Key Pair for AWS</br>
static/ -contains static css, js, and image files</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JS/</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;main.js -js making requests to back end</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;images/</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img.jpeg -background image</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styles/</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bootstrap.css -BootStrap library for styling</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style.css -css stylesheet</br>
templates/</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;home.html -home page</br>
