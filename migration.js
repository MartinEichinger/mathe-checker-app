const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
  console.log('1');
  db.run(`CREATE TABLE "Small1x1" (
	          "id"	INTEGER NOT NULL,
          	"schoolClass"	INTEGER NOT NULL,
          	"type"	TEXT NOT NULL,
          	"maxValue"	INTEGER NOT NULL,
          	"task"	TEXT NOT NULL,
          	"result"	INTEGER NOT NULL,
          	PRIMARY KEY("id")
          );`, (err) => {
              console.log(err);
        });
  console.log('2');

  for ( let i=11; i<=20; i++) {
    for ( let j=1; j<=i; j++) {
      let task = `${i} - ${j} =`;
      let result = i-j;
      let string = `INSERT INTO Small1x1 (schoolClass, type, maxValue, task, result) VALUES (2, 'minus', 20, '${task}', ${result});`;
      console.log('0', string);
      db.run(string, err => console.log(err) );
    }
  }
});
