/* eslint-disable */

var db = new Mongo("localhost:27018").getDB('EMS');

var manager = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor', 'Violet'];
var location = ["Sydney", "Melbourne", "Canberra"];
var statuses = ['Online', 'Offline'];

var i;
for (i = 0; i < 10; i++) {
  var randomOwner = manager[Math.floor(Math.random() * 6)];
  var randomStatus = location[Math.floor(Math.random() * 2)];
  var randomEffort = Math.ceil(Math.random() * 20);
  var department = {
    name: randomOwner,
    status: randomStatus,
    manager:randomOwner,
    createdAt: randomCreatedDate,
  };
  db.employees.insert(employee);
}
