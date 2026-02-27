/**
 * validateIdParam
 *
 * Valide et convertit un paramètre d'URL (ex: :id) en entier positif.
 * - Si invalide : renvoie 400
 * - Si valide : remplace req.params[paramName] (string) par un Number
 *
 * Utile pour centraliser la validation et simplifier les controllers.
 *
 * @param {string} [paramName="id"] Nom du paramètre à valider
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