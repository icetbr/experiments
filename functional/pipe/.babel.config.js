module.exports = {
    presets: [['@babel/preset-env',{targets: {node:
       'current',},loose:true,},],],
    plugins: ["@babel/plugin-proposal-pipeline-operator", { "topicToken": "^", "proposal": "hack" }]
 };
