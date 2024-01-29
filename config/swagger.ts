import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const options: SwaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Reference Library API',
      version: '0.0.1',
      description:
        'A second-long spark of creativity rises to centuries of routine work. Cognition is stroboscopic.',
      contact: {
        name: 'Egor Bulgakov',
        email: 'pleasedont@egorushque.space',
        url: 'https://egorushque.space',
      },
    },
  },
  apis: ['./**/*.ts'],
};

export const spec = swaggerJSDoc(options);
