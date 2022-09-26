module.exports = {
  _404(req, res) {
      res.status(404).send({ status: 'Not found' })
  },
  _404Html(req, res) {
    res.status(404).send({ status: 'Not found' })
  }
}