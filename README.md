# Web-Project-Display-Data
Web project that focused on the development of a web application used for displaying data for an imaginary science conference.<br/>
Frontend developed using React.js.<br/>
The backend connects to the SQLite database using PHP.<br/>
Using OOP principles.<br/>
<br/>
Features of the API: <br/>
- Creation of an API that include the following human readable webpages (written in PHP, HTML5 and CSS):<br/>
¬ a documentation page that states each endpoint of the API, gives a brief description of what data the endpoint returns, states whether authentification is required, gives and example of a request<br/>
¬ an about page that states who developed the website and that it is not associated with the CHI conference or any of its sponsors.<br/>
¬ a main page<br/>
- The API outputs data about the conference presentations and schedule in JSON format
- The API supports JSON Web Tokens for authentidication:<br/>
¬ A valid token is returned upon successful login<br/>
¬ The token is checked for all endpoints that require authentification<br/>
- Users with admin status are able to update the title of a session
- The API is written in Object-Oriented PHP
- The API handles errors and exceptions approprietly
<br/>
Features of the client application: <br/>
- Displays the full schedule for the main conference:<br/>
¬ The details of the schedule are initially hidden. Users are able to expand information
according to what day of the conference they are interested in, what time slots, and which sessions<br/>
¬ It is possible to view the details of presentations in each session including the title, authors
and abstract. Information about any awards are also given<br/>
¬ For each session it is possible to see the type of session, the session title, the session chair and the location (room).<br/>
- On a separate page to the schedule, the client application is able to list all of the authors involved in the conference:<br/>
¬ There is the ability to search the authors by their name<br/>
¬ There is the ability to click on each author to see details of what presentations they are
involved in. <br/>
- There is also an admin page accessible to users who have authenticated with the API:<br/>
¬ If a user has not authenticated they will see a login form, otherwise they will see a logout option<br/>
¬ The JSON Web Token returned upon successful login is stored in a cookie<br/>
¬ For authenticated users, the admin page will list the title of each session in the conference, and
enable details to be viewed<br/>
¬ It is possible to update the title of any session.<br/>
¬ Any authenticated user is able to view the admin page, but only users with ‘admin’ set to true
are able to update the title of a session.<br/>
Screenshots:
¬[](Screenshots/Untitled.png)
