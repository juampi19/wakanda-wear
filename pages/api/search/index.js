export default function handler(req, res) {
  res.status(400).json({ mensaje: 'Se debe especificar el query de busqueda' });
}