// routes/activities.js
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { v4: uuid }   = require('uuid');
const fs             = require('fs/promises');
const path           = require('path');

const router   = express.Router();
const DB_PATH  = path.join(__dirname, '..', 'data', 'activities.json');

const STATUS   = ['pending', 'in-progress', 'completed'];
const PRIORITY = ['low', 'medium', 'high'];

/* ───── helpers de BD JSON ───────────────────────────── */
const readDB  = async () => JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
const writeDB = async data  => fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

/* ───── reglas de validación ─────────────────────────── */
const activityRules = [
  body('title').isString().notEmpty(),
  body('description').optional({ nullable:true }).isString(),
  body('status').isIn(STATUS),
  body('priority').isIn(PRIORITY)
];

/* ───── Endpoints ────────────────────────────────────── */

/** GET /api/activities */
router.get('/', async (_req, res, next) => {
  try { res.json(await readDB()); } catch (e) { next(e); }
});

/** POST /api/activities */
router.post('/', activityRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const list = await readDB();
    const now  = Date.now();

    const activity = { id: uuid(), created_at: now, updated_at: now, ...req.body };
    list.push(activity);
    await writeDB(list);

    res.status(201).json(activity);
  } catch (e) { next(e); }
});

/** PUT /api/activities/:id */
router.put('/:id', activityRules, async (req, res, next) => {
  try {
    const list = await readDB();
    const idx  = list.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message:'No existe la actividad' });

    list[idx] = { ...list[idx], ...req.body, updated_at: Date.now() };
    await writeDB(list);

    res.json(list[idx]);
  } catch (e) { next(e); }
});

/** DELETE /api/activities/:id */
router.delete('/:id', async (req, res, next) => {
  try {
    const list    = await readDB();
    const newList = list.filter(a => a.id !== req.params.id);
    if (list.length === newList.length) return res.status(404).json({ message:'No existe la actividad' });

    await writeDB(newList);
    res.status(204).end();
  } catch (e) { next(e); }
});

/** GET /api/activities/status/:status */
router.get('/status/:status',
  param('status').isIn(STATUS),
  async (req, res, next) => {
    try {
      const list = await readDB();
      res.json(list.filter(a => a.status === req.params.status));
    } catch (e) { next(e); }
  });

module.exports = router;
