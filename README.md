# Kicktube

TODO: Write project description.

## Code organization

The project is split into two separate Node packages: One for Firebase functions
in `functions`, and another for the Web app itself in `client`.  The `client` subdirectory is split into `dist` and `src`.  `dist` is where webpack will put
the final bundled app, and `src` is where the input files live.  You must run
webpack before running `firebase deploy` since `dist` starts empty.

TODO: Set up a build pipeline to automate the webpack step, and create a deploy step that depends on it.