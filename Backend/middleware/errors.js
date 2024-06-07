export const errors = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(value => value.message);
        error = new Error(message);
    };

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new Error(message);
    };

    if (err.name === "CastError") {
        const message = `Resource not found, Invalid: ${err.path}`;
        error = new Error(message);
    };

    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token is Invalid, Try again!!!`;
        error = new Error(message);
    };

    if (err.name === 'TokenExpiredError') {
        const message = `Json Web Token is Expired, Try again!!!`;
        error = new Error(message);
    };

    res.json({
        success: false,
        message: error.message
    })
}
