const { mysql } = require('../qcloud')

module.exports = {
  add: async ctx => {
    var id = ctx.request.query["id"];
    var num = ctx.request.query["num"];

    //search
    var res = await mysql("cart").where({ id }).first()
    if (res == null)
    {
      var good = {
        id: id,
        num: num
      }
      res = await mysql("cart").insert(good)
    }
    else
    {
      res = await mysql("cart").update({ num: Number(res["num"]) + Number(num) }).where({ id })
    }

    ctx.state.data = {
      msg: res
    }
  },

  reduce: async ctx => {
    var id = ctx.request.query["id"];

    //search
    var res = await mysql("cart").where({ id }).first()
    res = await mysql("cart").update({ num: Number(res["num"]) - 1 }).where({ id })

    ctx.state.data = {
      msg: res
    }
  },

  del: async ctx => {
    var id = ctx.request.query["id"];
    var res = await mysql("cart").del().where({ id })
    
    ctx.state.data = {
      msg: res
    }
  },

  load: async ctx => {
    //search
    var res = await mysql("cart")
    
    ctx.state.data = {
      msg: res
    }
  },
}