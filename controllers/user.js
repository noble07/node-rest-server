
const userGet = (req, res) => {
  // Para obtener argumentos de Query Params
  const {q, nombre = 'No name', apiKey, page = 1, limit} = req.query

  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apiKey,
    page,
    limit
  })
}

const userPost = (req, res) => {

  // Obtener el body de la petición
  const {nombre, edad} = req.body

  res.json({
    msg: 'post API - Controlador',
    nombre,
    edad
  })
}

const userPut = (req, res) => {
  // Se obtiene el segmento de ruta id
  const id = req.params.id

  res.json({
    msg: 'put API - Controlador',
    id
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