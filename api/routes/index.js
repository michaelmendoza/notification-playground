const router = require('express').Router()
const { getSocket } = require('../socket');
const { getData } = require('./mock');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

router.get('/', (req, res) => { res.send('Welcome to API') })
router.get('/success', (req, res) => { getSocket().emit('message', { status:'success', message:req?.query?.message, timestamp: Date.now()} ); res.send('Message Sent'); });
router.get('/warning', (req, res) => { getSocket().emit('message', { status:'warning', message:req?.query?.message, timestamp: Date.now()} ); res.send('Message Sent'); });
router.get('/error', (req, res) => { getSocket().emit('message', { status:'error', message:req?.query?.message, timestamp: Date.now()} ); res.send('Message Sent'); });
router.get('/info', (req, res) => { getSocket().emit('message', { status:'info', message:req?.query?.message, timestamp: Date.now()} ); res.send('Message Sent'); });

router.get('/mock', (req, res) => { res.send(getData()) });


module.exports = router;
