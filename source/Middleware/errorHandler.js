export const errorrHandler =  (err , req, res, next) => {
    console.err(err.stack);
    res.status(err.status || 500).json({
        message : err.message || 'Internal Server Error'
    })
}