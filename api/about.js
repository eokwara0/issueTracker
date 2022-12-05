/* eslint-disable linebreak-style */


/** About message */
let aboutMessage = 'Issue Tracker API v1.0';


/** About message mutation resolver  */
function setAboutMessage(_, { message }) {
  aboutMessage = message;
  return aboutMessage;
}


function getAboutMessage() {
  return aboutMessage;
}


module.exports = { getAboutMessage, setAboutMessage };
