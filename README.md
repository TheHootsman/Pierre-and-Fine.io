# Intro

This is a website for our wedding, implemented in a classic HTML/CSS/Javascript stack.
Website is hosted via GitHub pages: https://thehootsman.github.io/Pierre-and-Fine.io/

# Webpage features

- Nice slick design, using bootstrap and homebrew CSS.
- Core frontend features (navigation, event-handling...) powered by JQuery.
- Works in all resolutions, responsive navigation kicks in for mobile/tablet.
  - Bootstrap columns are stacked into rows on narrower screens (native bootstrap feature). See "col" elements in index.html.
  - Margins, padding etc... change dynamically. See css/queries.css.
- Sober animations (fade-ins...). See waypoints in js/scripts.js
- Integration with Google Maps and YouTube

# Password protection
- Webpage is protected by a SHA-256 encoded password (Case UN-sensitive).
- Password input is done in a modal that is superinposed over the webpage when the index is first rendered. Modal is impossible to close and scrolling is disabled until successful password is sent. See js/auth.js.
  
# RSVP feature

- People can submit RSVPs for themselves and +1s. User can dynamically add/remove guests in the form. RSVP form collects contact details (of the "main" guest) and people's potential dietary restrictions
- Upon submission of the HTML form, a POST request is sent to the backend with the form content for storage.
- "Backend" is a Google sheet, with an appScript doPost() function. See [doc from Google](https://developers.google.com/apps-script/guides/web) for detailed concepts, and gs/rsvp.gs for the homebrew script to be deployed. (tl;dr; doPost() function must be deployed as a web app. This in turns provides an url to be used as the end-point in the front end to send the POST request.)
- Upon receiving the RSVP, content of the POST request is parsed and saved in the Spreadsheet.
- Until POST request is successfully delivered (and OK 200 response is received), a loading modal is displayed.
- When successful, another modal is displayed with a dynamic success message and the option to save the data in a google/iOS/outlook calendar.
