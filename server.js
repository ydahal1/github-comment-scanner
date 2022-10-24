const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('-----------------------------')
  console.log(`App listining at port : ${PORT}`)
  console.log('-----------------------------')
})
