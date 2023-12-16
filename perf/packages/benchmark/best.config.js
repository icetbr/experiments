module.exports = {
// export default {
    projectName: 'my-benchmarks',
    runner: 'default',
    runners: [
        {
            runner: '@best/runner-headless',
            alias: 'default',
            config: {
                specs: 'node',
            },
        },
    ]
};
