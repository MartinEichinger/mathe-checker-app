const { Calc1x1 } = require("./models/calc1x1");
const mongoose = require("mongoose");
const config = require("config");

const data = [];
////////////////////////////////////////   1.KLASSE ///
const dataObj = {
  schoolClass: 1,
  difficulty: "easy",
  type: "plus",
  maxValue: 10,
  task: "",
  result: "",
};
// + Aufgaben für 1.Klasse
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    let data2 = dataObj;
    let task = `${i} + ${j} =`;
    let result = i + j;
    data2.task = task;
    data2.result = result;
    data.push(JSON.parse(JSON.stringify(data2)));
  }
}
// - Aufgaben für 1.Klasse
for (let i = 1; i <= 10; i++) {
  for (let j = i; j <= 10; j++) {
    let data2 = dataObj;
    let task = `${j} - ${i} =`;
    let result = j - i;
    data2.type = "minus";
    data2.task = task;
    data2.result = result;
    data.push(JSON.parse(JSON.stringify(data2)));
  }
}
////////////////////////////////////////   2.KLASSE
// + Aufgaben für 2.Klasse
for (let i = 11; i <= 20; i++) {
  for (let j = 1; j <= 20; j++) {
    let data2 = dataObj;
    let task = `${i} + ${j} =`;
    let result = i + j;
    data2.schoolClass = 2;
    data2.type = "plus";
    data2.task = task;
    data2.result = result;
    data.push(JSON.parse(JSON.stringify(data2)));
  }
}
// - Aufgaben für 2.Klasse
for (let i = 11; i <= 20; i++) {
  for (let j = i; j <= 10; j++) {
    let data2 = dataObj;
    let task = `${j} - ${i} =`;
    let result = j - i;
    data2.schoolClass = 2;
    data2.type = "minus";
    data2.task = task;
    data2.result = result;
    data.push(JSON.parse(JSON.stringify(data2)));
  }
}

async function seed() {
  console.log("S4: ", data.length);
  await mongoose.connect(config.get("db"));

  await Calc1x1.deleteMany({});

  await Calc1x1.insertMany(data);

  mongoose.disconnect();

  console.info("Done!");
}

seed();
