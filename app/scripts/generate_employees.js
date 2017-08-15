/* eslint-disable */

var db = new Mongo("localhost:27018").getDB('EMS');

var owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor', 'Violet'];
var statuses = ['Online', 'Offline'];

var i;
for (i = 0; i < 1000; i++) {
  var randomCreatedDate = new Date(
    (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24);
  var randomCompletionDate = new Date(
    (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24);
  var randomOwner = owners[Math.floor(Math.random() * 6)];
  var randomStatus = statuses[Math.floor(Math.random() * 2)];
  var randomEffort = Math.ceil(Math.random() * 20);
  var employee = {
    name: randomOwner,
    status: randomStatus,
    createdAt: randomCreatedDate,
  };
  db.employees.insert(employee);
}
