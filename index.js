const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const routerApi = require('./routes/index');
const { boomErrorHandler, errorHanlder, errroHablderDb, logError, boomErrorHandlerData, errorUploadFile } = require('./middleware/error.hanlder');

const app = express();
const PORT = 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ElectroShop API',
            version: '1.0.0',
            description: 'API necesariara para operar un pequeño eComerce'
        },
        servers: [
            {
                url: "https://electroshop-api.onrender.com/api/v1",
                description: "API a consumir",
            }
        ]
    },
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(cors({
    origin: '*', // Permitir solo solicitudes desde este origen
    // methods: 'GET,POST', // Permitir solo los métodos GET y POST
    // allowedHeaders: 'Content-Type,Authorization' // Permitir solo estos encabezados
    }));
app.use(express.json());
app.use('/images', express.static('./uploads'));
app.use(morgan('dev'));

require('./utils/auth');

//Router
routerApi(app);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//middleware
app.use(logError);
app.use(boomErrorHandler);
app.use(errroHablderDb);
app.use(boomErrorHandlerData);
app.use(errorUploadFile)
app.use(errorHanlder);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
});