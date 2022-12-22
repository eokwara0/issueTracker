/* eslint-disable no-undef */


/**
 * Run using the mongo shell. For remote databases ensure that the
 * conenction string is supplied in the command lien . for Example
 * localhost
 *  mongo issuetracker scripts/init.mongo.js
 * Atlas:
 * mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker 
 scripts/init.mongo.js
 * MLab:
 * mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker 
 scripts/init.mongo.js
 */

/**
 * Array of issues
 * @type { Array }
 *
 */
const issuesDB = [{
  id: 1,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2019-01-15'),
  due: undefined,
  title: 'Error in console when clicking Add',
  description: 'Steps to recreate the problem:'
 + '\n1. Refresh the browser.'
 + '\n2. Select "New" in the filter'
 + '\n3. Refresh the browser again. Note the warning in the console:'
 + '\n Warning: Hash history cannot PUSH the same path; a new entry'
 + '\n will not be added to the history stack'
 + '\n4. Click on Add.'
 + '\n5. There is an error in console, and add doesn\'t work.',
},
{
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2019-01-18'),
  due: new Date('2019-02-01'),
  title: 'Missing bottom border on panel',
  description: 'There needs to be a border in the bottom in the panel'
 + ' that appears when clicking on Add',
},
{
  id: 3,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2022-01-15'),
  due: undefined,
  title: 'Faulty nav bar',
  description: 'There is another need for something else',
}];


db.issues.deleteMany({});

db.issues.insertMany(issuesDB);
const count = db.issues.countDocuments();
// eslint-disable-next-line no-restricted-globals
print('Inserted', count, 'issues');

//
db.counters.deleteMany({ _id: 'issues' });
db.counters.insertOne({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
