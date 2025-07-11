import bodyParser from "body-parser";

export const applyBodyParserMiddleware = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};