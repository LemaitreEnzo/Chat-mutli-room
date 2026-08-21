import "dotenv/config";
import app from "./app";
import { sequelize } from "./config/db";
import { setupSocket } from "./socket/socket";
import getEnv from "./utils/envHelper";

const PORT = Number(getEnv("PORT"));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
    return sequelize.sync();
  })
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`App lancée sur le port ${PORT}`);
    });
    setupSocket(server);
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1);
  });
