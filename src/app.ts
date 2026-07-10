import express from 'express';
import './db';
import itemsRouter from './routes/items';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API REST',
      version: '1.0.0',
      description: 'API para gestión de tareas'
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/items', itemsRouter);

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}

export default app;
