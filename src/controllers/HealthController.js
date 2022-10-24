// If request can reach here, server is running send status 200
class HealthController {
  check (req, res, next) {
    res.status(200).json({ status: 'OK' })
  }
}

module.exports = new HealthController()
