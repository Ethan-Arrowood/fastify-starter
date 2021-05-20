/* eslint strict:"off" */
"use strict";

const fastify = require("fastify");
const Meta = require("html-metadata-parser");
const { get } = require("lodash");

function build(opts) {
  const app = fastify(opts);

  app.get("/", async (request, reply) => {
    const url =
      "https://etherscan.io/token/0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3";
    Meta.parser(url, function (error, result) {
      const description = get(result, "og.description");
      const string2 = get(description.split("holders "), "1");
      const holders = get(string2.split(" "), "0");
      console.log("zzz holders:", holders);
      if (error || !holders) {
        console.error(error || "no holder found.");
        reply
          .code(400)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: error || "no holder found." });
      }
      reply.code(200).send(holders);
    });
  });

  return app;
}

module.exports = {
  build
};
