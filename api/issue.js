const { UserInputError } = require('apollo-server-express');
const { getDB , getNextSequence } = require('./db.js');




/**
 *
 * @param {issue to be validated } issue
 * Validates issue request coming from the client .
 */

function validate(issue) {
  // error list
  const errors = [];

  // validates the length of the issue title
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }

  /** validates if the issue has been assigned and if it has an owner */
  if (issue.status === 'Assinged' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assinged"');
  }

  /** checks if there are any errors
   * if True throw a userInputError containing the errors list
   */
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


/** IssueList resolver */
/** query's the database and returns a list of issues  */
async function list() {
  const db = getDB();
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}


/** resolver for issueAdd mutation */
async function add(_, { issue }) {
  const db = getDB();
  /** Validate issue */
  validate(issue);

  /** Creates a copy of the original issue */
  /** modifies the issue  */
  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');

  /** inserts the issue inside of the database if valid issue */
  const result = await db.collection('issues').insertOne(newIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;

}

module.exports = { list, add }