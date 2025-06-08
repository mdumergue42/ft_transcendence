const path = require('path');
const fastify = require('fastify')();
const fastifyStatic = require('@fastify/static');

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', // sert les fichiers statiques à la racine
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Serveur lancé sur ${address}`);
});
