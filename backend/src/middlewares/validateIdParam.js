/**
 * Middleware de validation d'un paramètre d'URL de type ID.
 * Exemple : /api/artisans/:id
 *
 * - Vérifie que req.params[paramName] est un entier positif
 * - Convertit la valeur en Number et la réinjecte dans req.params
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