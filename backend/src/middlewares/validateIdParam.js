/**
 * Valide et convertit un paramètre d'URL (ex: :id) en entier positif.
 * Si invalide -> 400. Sinon remplace req.params[paramName] par un Number.
 *
 * @param {string} [paramName="id"]
 * @returns {import("express").RequestHandler}
 */
export function validateIdParam(paramName = "id") {
  return (req, res, next) => {
    const value = Number(req.params[paramName]);

    if (!Number.isInteger(value) || value <= 0) {
      return res.status(400).json({ error: `Invalid ${paramName}` });
    }

    // on remplace la string par un nombre pour les controllers
    req.params[paramName] = value;
    next();
  };
}