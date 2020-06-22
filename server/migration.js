const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
  console.log('1');
  db.run(`CREATE TABLE "Small1x1" (
	          "id"	INTEGER NOT NULL,
          	"schoolClass"	INTEGER NOT NULL,
            "difficulty" TEXT NOT NULL,
          	"type"	TEXT NOT NULL,
          	"maxValue"	INTEGER NOT NULL,
          	"task"	TEXT NOT NULL,
          	"result"	INTEGER NOT NULL,
          	PRIMARY KEY("id")
          );`, (err) => {
              console.log(err);
        });

  ////////////////////////////////////////   1.KLASSE
  // + Aufgaben für 1.Klasse
  for ( let i=1; i<=10; i++) {
    for ( let j=1; j<=10; j++) {
      let task = `${i} + ${j} =`;
      let result = i+j;
      let string = `INSERT INTO Small1x1 (schoolClass, difficulty, type, maxValue, task, result) VALUES (1, 'easy', 'plus', 10, '${task}', ${result});`;
      db.run(string, err => console.log(err) );
    }
  }
  // - Aufgaben für 1.Klasse
  for ( let i=1; i<=10; i++) {
    for ( let j=i; j<=10; j++) {
      let task = `${j} - ${i} =`;
      let result = j-i;
      let string = `INSERT INTO Small1x1 (schoolClass, difficulty, type, maxValue, task, result) VALUES (1, 'easy', 'minus', 10, '${task}', ${result});`;
      db.run(string, err => console.log(err) );
    }
  }

  ////////////////////////////////////////   2.KLASSE
  // + Aufgaben für 2.Klasse
  for ( let i=11; i<=20; i++) {
    for ( let j=1; j<=20; j++) {
      let task = `${i} + ${j} =`;
      let result = i+j;
      let string = `INSERT INTO Small1x1 (schoolClass, difficulty, type, maxValue, task, result) VALUES (2, 'easy', 'plus', 20, '${task}', ${result});`;
      db.run(string, err => console.log(err) );
    }
  }
  // - Aufgaben für 2.Klasse
  for ( let i=11; i<=20; i++) {
    for ( let j=i; j<=10; j++) {
      let task = `${j} - ${i} =`;
      let result = j-i;
      let string = `INSERT INTO Small1x1 (schoolClass, difficulty, type, maxValue, task, result) VALUES (2, 'easy', 'minus', 20, '${task}', ${result});`;
      db.run(string, err => console.log(err) );
    }
  }
});
