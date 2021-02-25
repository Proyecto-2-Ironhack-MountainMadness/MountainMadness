const faker = require("faker");
require("../config/db.config");
const Routes = require("../models/Route.model");
const User = require("../models/User.model");

Promise.all([Routes.deleteMany(), User.deleteMany()]).then(() => {
  // Create N users
  for (let i = 0; i < 100; i++) {
    User.create({
      email: faker.internet.email(),
      password: "Abcde1234",
    }).then((u) => {
      // For each user, create N products
      for (let j = 0; j < 3; j++) {
        Routes.create({
          name: faker.address.state(),
          routes:faker.random.locale(),
          description: faker.random.words(),
          image: faker.image.nature(),
        }).then((p) => console.log(`Created ${p.name} by ${u.email}`));
      }
    });
  }
})

// No lo lanzo haste que estemos seguros, no tengo muy claro lo que va a salir, lo dejo mas o menos configurado... pero no lo usamos
//En el video de Carol para usar Axios , crea antes los productos... y he pensado en crear rutas fake , pero no lo tengo claro , lo dejo aqui y si no lo borramos.