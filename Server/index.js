import express from "express";
import dotenv from "dotenv";
import { connect } from "./Config/mongoDBConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userAuthenticationRouter from "./Routes/userAuthenticationRouter.js";
import adminAuthenticationRouter from "./Routes/adminAuthenticationRouter.js";
import adminRouter from "./Routes/adminRouter.js";
import path from "path"
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)


dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("Public"));

app.use("/api/userAuthentication", userAuthenticationRouter);
app.use("/api/adminAuthentication", adminAuthenticationRouter);
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const enviornment = "production";

if (enviornment === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(parentDir, "/Client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(parentDir, "Client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`Backend server started sucessfully, http://localhost:${port}`);
});
