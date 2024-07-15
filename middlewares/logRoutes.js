/**
 * Middleware function to log all registered routes and their HTTP methods.
 * @param {Object} app - The Express application instance.
 */

const logRoutes = (app) => {
  // Iterate over all middleware and routes registered on the app
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      const route = middleware.route;
      const methods = Object.keys(route.methods).join(", ").toUpperCase();
      console.log(`${methods} ${route.path}`);
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          // If handler has a route property
          const methods = Object.keys(route.methods).join(", ").toUpperCase();
          console.log(`${methods}  ${route.path}`); // Log the  methods and route-path
        }
      });
    }
  });
};

module.exports = logRoutes;
