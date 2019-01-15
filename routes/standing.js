const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log('you are in /standing url')
    res.end();
})
module.exports = router;