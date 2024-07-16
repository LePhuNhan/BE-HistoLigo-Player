export function tryCatch(fnc) {
  return async (req, res, next) => {
    try {
      await fnc(req, res, next);
    } catch (error) {
      return res
        .status(error.status || 500)
        .send(error.message || "Internal Server Error !!!");
    }
  };
}
