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
    res.json({
        error: error.message
    })
}
