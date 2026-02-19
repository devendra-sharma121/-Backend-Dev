const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};


const validationPost = (req, res, next) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            message: "Name, Email and Role are required"
        });
    }

    next();
};

module.exports={logger,validationPost};
