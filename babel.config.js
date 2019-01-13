module.exports = {
    ignore: [
        "/node_modules/"
    ],
    presets: [
        ["@babel/preset-env", {
            modules: false,
            useBuiltIns: "entry",
            targets: {
                browsers: [
                    ">0.25%",
                    "not ie 11",
                    "not op_mini all"
                ]
            }
        }],
        "@babel/preset-react"
    ],
    plugins: [
        "react-hot-loader/babel",
        "@babel/plugin-proposal-class-properties",
        "babel-plugin-syntax-dynamic-import"
    ]
};
