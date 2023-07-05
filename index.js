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

app.use(cors());
app.use(express.json());
app.use('/images', express.static('./uploads'));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    // next();
    });


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