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
},
{
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2019-01-18'),
  due: new Date('2019-02-01'),
  title: 'Missing bottom border on panel',
},
{
  id: 3,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2022-01-15'),
  due: undefined,
  title: 'Faulty nav bar',
}];


db.issues.remove({});

db.issues.insertMany(issuesDB);
const count = db.issues.count();
// eslint-disable-next-line no-restricted-globals
print('Inserted', count, 'issues');

//
db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
