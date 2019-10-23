import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import models, { sequelize } from "./models";
import bodyParser from "body-parser";

const app = express();
const eraseDatabaseOnSync = true;
app.use(cors());
app.use(bodyParser.json());
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("beeinger")
  };
  next();
});
app.use("/session", routes.session);
app.use("/user", routes.user);
app.use("/message", routes.message);
app.get("/hello", (req, res) => {
  return res.send("hello");
});

async function createUsersWithMessages() {
  await models.User.create(
    {
      username: "msulek",
      messages: [
        {
          text: "Published the Road to learn React"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      messages: [
        {
          text: "Happy to release ..."
        },
        {
          text: "Published a complete ..."
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "beeinger",
      messages: [
        {
          text: "heyyyyyyyyyy"
        },
        {
          text: "oh yeaaaahhhh"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
}

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
