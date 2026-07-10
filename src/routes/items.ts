import { Router } from 'express';
import { db } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const priorities = ['low', 'medium', 'high'];
const statuses = ['pending', 'in progress', 'done'];

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Lista todas las tareas con paginación opcional.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 */
router.get('/', (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  db.all(
    'SELECT * FROM items LIMIT ? OFFSET ?',
    [limit, (page - 1) * limit],
    (_, rows) => res.json({ success: true, data: rows })
  );
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', (req, res) => {
  db.get(
    'SELECT * FROM items WHERE id=?',
    [req.params.id],
    (_, row) => {
      if (!row) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        data: row
      });
    }
  );
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', (req, res) => {
  const { title, priority, description } = req.body;

  if (!title || !priority) {
    return res.status(400).json({
      success: false,
      message: 'title and priority are required'
    });
  }

  if (!priorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid priority'
    });
  }

  const item = {
  id: uuidv4(),
  title,
  description,
  priority,
  status: 'pending',
  progreso: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
   };
  db.run(
  'INSERT INTO items VALUES (?,?,?,?,?,?,?,?)',
  [
    item.id,
    item.title,
    item.description,
    item.priority,
    item.status,
    item.progreso,
    item.createdAt,
    item.updatedAt
  ],
    () =>
      res.status(201).json({
        success: true,
        data: item
      })
  );
});

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Actualizar el estado de una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in progress
 *                   - done
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Tarea no encontrada
 */

router.patch('/:id', (req, res) => {
  const { status, priority, description } = req.body;

  if (status && !statuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  if (priority && !priorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid priority'
    });
  }

  let progreso;

  if (status === 'pending') progreso = 0;
  if (status === 'in progress') progreso = 50;
  if (status === 'done') progreso = 100;

  db.run(
    `UPDATE items SET
      status = COALESCE(?, status),
      priority = COALESCE(?, priority),
      description = COALESCE(?, description),
      progreso = COALESCE(?, progreso),
      updatedAt = ?
     WHERE id = ?`,
    [
      status,
      priority,
      description,
      progreso,
      new Date().toISOString(),
      req.params.id
    ],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        message: 'Updated'
      });
    }
  );
});
   
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM items WHERE id=?',
    [req.params.id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      res.json({
        success: true,
        message: 'Deleted successfully'
      });
    }
  );
});

export default router;


