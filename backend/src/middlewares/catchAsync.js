/**
 * Wrap un handler async Express pour propager automatiquement les erreurs via next(err).
 * Évite de répéter des try/catch dans les controllers.
 *
 * @param {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<any>} fn
 * @returns {import("express").RequestHandler}
 */
export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};