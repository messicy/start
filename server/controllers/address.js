const { mysql } = require('../qcloud')

module.exports = {
  update: async ctx => {
    var id = 1;
    var name = ctx.request.query["name"];
    var phone = ctx.request.query["phone"];
    var detail = ctx.request.query["detail"];

    //search
    var res = await mysql("address").where({ id }).first()
    if (res == null)
    {
      var address = {
        name: name,
        phone: phone,
        detail: detail
      }
      await mysql("address").insert(address)
    }
    else
    {
      await mysql("address").update({
        name: name,
        phone: phone,
        detail: detail
      }).where({ id })
    }

    ctx.state.data = {
      msg: res
    }
  },

  load: async ctx => {
    //search
    var res = await mysql("address")
    
    ctx.state.data = {
      msg: res
    }
  },
}