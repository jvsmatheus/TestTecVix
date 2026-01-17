import cors from "cors";
import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import { logs } from "./middlewares/logs";
import { notImplemented } from "./middlewares/notImplemented";
import { routes } from "./routes/_index";
import { setupSwagger } from "./swagger";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(express.static("public"));
app.use("/api/v1/uploads", express.static(path.resolve("uploads"))); // Mapeia a rota de /api/v1/uploads para buscar arquivos estáticos na pasta de uploads
app.use(logs);
app.use(routes);
setupSwagger(app);
app.use(notImplemented);
app.use(errorHandler as unknown as ErrorRequestHandler);

export { app };
