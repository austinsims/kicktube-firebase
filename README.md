# Kicktube

TODO: Write project description.

## Code organization

The project is split into two separate Node packages: One containing a Firebase
functions in the `functions` directory, and a React app calling that function
in `client`.

## HOWTO

Install backend deps:
~~~~
cd functions
npm install
cd ..
~~~~

Install frontend deps and build a bundle:
~~~~
cd client
npm install
npm run build
cd ..
~~~~ 

Configure API keys:
~~~~
firebase functions:config:set songkick.key="0xDEADBEEF"
firebase functions:config:set youtube.key="0xBEEFDEAD"
~~~~

Configure additional settings (optional):
~~~~
firebase functions:config:set songkick.events_per_page=30
~~~~

Deploy:
~~~~
firebase deploy
~~~~
