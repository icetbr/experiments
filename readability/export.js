export const
    kibanaLogName = 'ahpi',
    logLevel = env.logLevel,
    loadConfigs = pipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs);

export const kibanaLogName = 'ahpi';
export const logLevel = env.logLevel;
export const loadConfigs = ppipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs);

export default {
    kibanaLogName: 'ahpi',
    logLevel: env.logLevel,
    loadConfigs: pipe(loadConfigsEtcd2(env, etcdKeys), toUsedFormat, enhanceConfigs),
};
