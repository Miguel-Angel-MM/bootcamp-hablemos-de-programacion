const createError = require("http-errors");
const router = require("express").Router();
const Mascota = require("./schema");
const Usuario = require("../usuarios/schema");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  filtrarEntidades,
} = require("../genericos");



const listarHandler = listar({
  Modelo: Mascota,
  populate: [{ path: "dueno", select: "nombre apellido documento tipo email" }],
});
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Mascota });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Mascota });
router.post("/", async (req, res, next) => {
  const { dueno = null } = req.body;
  const existeDueno = await Usuario.exists({ _id: dueno, tipo: "dueno" });
  if (existeDueno) {
    return crearHandler(req, res);
  }
  const err = new createError[404]();
  next(err);
});

const editarHandler = actualizar({ Modelo: Mascota });
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete("/:_id", eliminarHandler);

module.exports = router;
