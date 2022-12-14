/* eslint-disable linebreak-style */


/** About message */
let aboutMessage = 'Issue Tracker API v1.0';


/** About message mutation resolver  */
const setAboutMessage = (_, { message }) => {
  aboutMessage = message;
  return aboutMessage;
};


const getAboutMessage = () => aboutMessage;


module.exports = { getAboutMessage, setAboutMessage };
