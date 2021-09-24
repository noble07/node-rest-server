
const userGet = (req, res) => {
  res.json({
    msg: 'get API - Controlador'
  })
}

const userPost = (req, res) => {
  res.json({
    msg: 'post API - Controlador'
  })
}

const userPut = (req, res) => {
  res.json({
    msg: 'put API - Controlador'
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - Controlador'
  })
}

const userDelete = (req, res) => {
  res.json({
    msg: 'delete API - Controlador'
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
}