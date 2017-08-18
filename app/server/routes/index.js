import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
  console.log('route to no where');
  res.sendFile(path.resolve('static/index.html'));
});

module.exports = router;
