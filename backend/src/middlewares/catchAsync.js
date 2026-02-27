/**
 * catchAsync
 *
 * Wrap un handler async Express pour que toute erreur soit transmise à next(err).
 * Permet d'éviter de répéter des try/catch dans chaque controller.
 *
 * @param {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<any>} fn
 * @returns {import("express").RequestHandler}
 */
export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};