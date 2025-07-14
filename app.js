import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { applyStaticMiddleware } from "./middleware/static.middleware.js";
import { applyBodyParserMiddleware } from "./middleware/bodyParser.middleware.js";
import authRoutes from './routes/auth.routes.js';
import eventosRoutes from './routes/eventos.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import invitadosRoutes from "./routes/invitados.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
applyStaticMiddleware(app, __dirname);
applyBodyParserMiddleware(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/', authRoutes);
app.use('/', eventosRoutes);
app.use('/', dashboardRoutes);
app.use("/api/invitados", invitadosRoutes);

export default app;
