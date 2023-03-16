module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    cacheDirectory: '.tmp/jestCache',
    coveragePathIgnorePatterns: [
        "<rootDir>/lib/"
    ],
    modulePathIgnorePatterns: ["<rootDir>/lib/"],
    testTimeout: 50000
}