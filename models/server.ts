import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import db from '../db/connection';

import * as AppPaths from '../routes';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        categorias: "/api/categorias",
        productos: "/api/productos",
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '9000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos en línea');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(express.static('public'));
        this.app.use(this.apiPaths.categorias, AppPaths.categoriasRoutes.default);
        this.app.use(this.apiPaths.productos, AppPaths.productosRoutes.default);
    }

    middlewares() {

        this.app.use(express.json({ limit: '80mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '80mb' }));// Setup a default catch-all route that sends back a welcome message in JSON format.


        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });


        // Cors
        this.app.use(cors());

        // this.app.use(fileUpload({
        //     createParentPath: true
        // }));

        // lectura y parseo del body
        this.app.use(express.json());

        this.app.use(fileUpload({
            createParentPath: true
        }));

        // lectura y parseo del body
        // this.app.use(express.json());

        // Carpeta publica

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor iniciado y corriendo en el puerto', this.port);
        });
    }
}

export default Server;