const express = require('express')
const {mergepdfs} = require('./merge')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static' , express.static('public'))
const port = 3001



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array('pdf', 3), async (req, res, next) => {
    console.log(req.files);
await mergepdfs(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path), path.join(__dirname,req.files[2].path))

res.redirect("http://localhost:3001/static/merged.pdf")
  })


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})