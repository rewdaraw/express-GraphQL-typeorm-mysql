import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";

const main = async () => {
  // db接続設定
  await createConnection({
    type: "mysql",
    // MEMO: 「host」は、docker-composeを使っているためmysqlのサービス名でコンテナ間の通信を行う
    host: "mysql",
    port: 3306,
    username: "root",
    password: "root",
    database: "nodecrud",
    logging: true,
    synchronize: false,
    entities: [],
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.listen(4000, () => {
    console.log("SERVER RUNNING!");
  });
};

main().catch((error) => {
  console.log(error);
});
