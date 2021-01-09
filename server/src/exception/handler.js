const CustomError = require('./customError');

exports.Logger = (err, req, res, next) => {
  let meta = {
    path: req.originalUrl,
    method: req.method,
    'user-agent': req.headers['user-agent']
  };

  console.error('--------------------- EXCEPTION ---------------------');
  console.error('err.name : ', err.constructor.name);
  console.error('err.message : ', err.message);
  console.error('err.status : ', err.status);
  console.error('additional : ', meta);
  console.error('--------------------- EXCEPTION ---------------------');

  return next(err);
};

exports.ErrorHandler = (err, req, res, next) => {
  if(!err) {
    return next();
  }

  if(err instanceof CustomError) {
    return res.status(err.status).json(err.toResponseJSON());
  }

  return res.status(500).json({
    success: false,
    message: err.message
  });
};
