require("dotenv").config();
require("../config/db.config");
const Route = require("../models/Route.model");
const faker = require("faker");


Route.deleteMany()
.then(() => {
  for (let i = 0; i < 30; i++) {
  Route.create({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(Math.floor(4 * Math.random()) + 1),
    author: faker.internet.userName(),
    image: faker.image.nature(),
    tags: getRandom(
      ["Forest", " Your Bag", "Camping", "Mountains", "Walking", "Controlled Areas"],
      Math.floor(Math.random() * 3) + 1
    ),
  }).then((p) => {
console.log(`created ${p.title} by ${p.author}`);
  })
}
});

//===================== Crear una cantidad aleatoria de Tags ========================
function getRandom(arr, n) {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

