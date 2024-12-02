import express from "express";
import morgan from "morgan";
import cors from "cors";
import placaRoute from "./routes/placa.routes.js";
import authRoute from "./routes/auth.routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.text());

// routes
app.use(placaRoute);
app.use(authRoute);

// not fund

app.use((_, res) => {
  res.json({ message: "Not Found" });
});

export default app;
