const express = require('express')
const router = express.Router();
const adminControllers = require('../../controllers/adminControllers')
const authenticateMidd = require('../../middleware/authenticate')

router.get("/AdminPage" , authenticateMidd ,(req,res,nxt) => {
  


}
 )


router.post("/addAdmin" , adminControllers.addAdmin)

router.post("/addTournament" , adminControllers.addTournament)



module.exports = router