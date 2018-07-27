const { mysql } = require('../qcloud')

module.exports = async ctx => {
  console.log('exeu sql')
  var id = 2
  //add
  var book = {
    id: id,
    name: "bingyuhuozhige",
    price: 88
  }
  await mysql("Book").insert(book)
  //search
  var res1 = await mysql("Book").where({ id }).first()
  console.log(res1)
  //update
  await mysql("Book").update({ price: 66 }).where({ id })
  //search
  var res = await mysql("Book").where({ id }).first()
  console.log(res)
  //delete
  await mysql("Book").del().where({ id })
  //search
  var res = await mysql("Book").where({ id }).first()
  console.log(res)

  ctx.state.data = {
    msg: res1
  }
}