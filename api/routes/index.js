const router = require('express').Router()
const { getSocket } = require('../socket');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

router.get('/', (req, res) => { res.send('Welcome to API') })
router.get('/success', (req, res) => { getSocket().emit('message', { status:'success', message:'Success', timestamp: Date.now()} ); res.send('Message Sent'); })
router.get('/warning', (req, res) => { getSocket().emit('message', { status:'warning', message:'Warning', timestamp: Date.now()} ); res.send('Message Sent'); })
router.get('/error', (req, res) => { getSocket().emit('message', { status:'error', message:'Error', timestamp: Date.now()} ); res.send('Message Sent'); })
router.get('/info', (req, res) => { getSocket().emit('message', { status:'info', message:'Info', timestamp: Date.now()} ); res.send('Message Sent'); })

module.exports = router;
