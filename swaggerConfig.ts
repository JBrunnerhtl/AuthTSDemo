import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Demo API',
            version: '1.0.0',
            description: 'API for AuthTSDemo',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    // WICHTIG: Hier gibst du den Pfad zu deinen Routen-Dateien an
    apis: ['src/routers/*.ts', 'src/app.ts'],
};

export const specs = swaggerJsdoc(options);