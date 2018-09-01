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
      await mysql("cart").insert(good)
    }
    else
    {
      await mysql("cart").update({ num: Number(res["num"]) + Number(num) }).where({ id })
    }

    ctx.state.data = {
      msg: res
    }
  },

  reduce: async ctx => {
    ctx.state.data = {
      msg: 'PinTuan chenggong!'
    }
  },

  del: async ctx => {
    ctx.state.data = {
      msg: 'PinTuan chenggong!'
    }
  }
}