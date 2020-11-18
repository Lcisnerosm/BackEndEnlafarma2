module.exports = function (res, error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: "Internal Server Error",
        data: [],
    });
};
