const logger = (req, res, next) => {
    const startTime = process.hrtime();
    const { method, url } = req;
    
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = process.hrtime(startTime);
      const durationInMs = duration[0] * 1000 + duration[1] / 1e6;
      const contentLength = res.getHeader('content-length');
      const logMessage = `Logger : ${method} ${url} ${statusCode} ${durationInMs.toFixed(2)}ms ${contentLength}bytes\n`;
  
      console.log(logMessage); 

    });
  
    next();
  };
  module.exports = logger;
  