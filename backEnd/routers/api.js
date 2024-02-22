const router = require('express').Router()
const regc = require('../controllers/regcontroller');
const productc = require('../controllers/productcontroller');
const verifyUser = require('../helper/JwtVerifyUser')
const upload = require('../helper/multer');

router.post('/reg', regc.register)
router.post('/login', regc.loginCheck)
router.get('/',(req,res)=>{
  res.send("hello")
}
)
router.get('/allData', verifyUser, productc.allData)
router.post('/addData', verifyUser, upload.single('image'), productc.addFormData)
router.post('/category', verifyUser, productc.category)
router.get('/singleData/:id', verifyUser, productc.updateSingleData)
router.put('/updateProducts/:id', verifyUser, upload.single('img'), productc.updateProducts)
router.post('/delete/:id', verifyUser, productc.deleteProducts)
router.get('/produstInStock', verifyUser, productc.produstInStock)
router.post('/sortingList', verifyUser, productc.sortingList)
router.post('/cart', verifyUser, productc.cart)
router.post('/cartData/:userName', verifyUser, productc.cartData)
router.get('/myorders/:userName', verifyUser, productc.myOrders)


module.exports = router


