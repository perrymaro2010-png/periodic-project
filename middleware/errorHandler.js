const errorHandler = (err, req, res, next) => {
    if(err.name == 'CastError') err = new AppError('Invalid ObjectId', 400);
    if(err.name == 'ValidationError'){
        const message = Object.values(err.errors)
            .map(e => e.message)
            .join(', ');

        err = new AppError(message, 400);
    }
    
    const statusCode = err.statusCode || 500;

    const body = {
        status: err.isOperational ? 'fail' : 'error',
        statusCode: err.isOperational ? statusCode : 500,
        message: err.isOperational
            ? err.message
            : 'Server Error. Try Again Later.',
        data: null
    };

    if (process.env.NODE_ENV === 'development') {
        body.stack = err.stack;
    }

    res.status(body.statusCode).json(body);
};

module.exports = errorHandler;