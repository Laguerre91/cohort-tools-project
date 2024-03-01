module.exports = (app) => {

  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" })
  })

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      let statusCode = err.statusCode || 500;
      let message = err.message || "Internal server error. Check the server console";

      if (statusCode === 500) {
        message = "Internal server error. Check the server";
      }

      res.status(statusCode).json({ message });
    }
  })
}