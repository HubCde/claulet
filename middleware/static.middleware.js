import express from "express";
import path from "path";

export const applyStaticMiddleware = (app, basePath) => {
    app.use(express.static(path.join(basePath, "public")));
};