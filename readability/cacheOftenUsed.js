async cacheOftenUsedData1: (configs, permissions) => _(
    [...permissions, ...configs],
    map(toDb, toProjection),
    toObject,
    find,
    keyBy(companyKey),
    map(
        deleteKey(companyKey),
        flatten,
        removeEmpty,
        fromDb,
    ),
    removeEmpty,

    // const projection = fromEntries([...permissions, ...configs].map(p => [toDb[p], 1]));
    // const companies = await this.db.find().project({ [this.companyKey]: 1, _id: 0, ...projection }).toArray();

    // const byCompany = mapValues(keyBy(companies, [this.companyKey]), v => {
    //     delete v[this.companyKey];
    //     const onlyTrue = filterValues(flatten(v), v1 => v1);
    //     return mapKeys(onlyTrue, v1 => fromDb[v1]);
    // });
    // return filterValues(byCompany, v => keys(v).length)
),
//// dados.hash, modulos.can_save => map split? nao preciso split
async cacheOftenUsedData(configs, permissions) { // refresh/throtle
    const projection = fromEntries(map([...permissions, ...configs], p => [toDb[p], 1]));
    const companiesDb = await this.db.find().project({ [this.companyKey]: 1, _id: 0, ...projection }).toArray();

    const dataByCompany = mapValues(
        keyBy(companiesDb, [this.companyKey]),
        v => {
            delete v[this.companyKey];
            const flattedNonEmpty = filterValues(flatten(v), v1 => v1);
            return unflatten(mapKeys(flattedNonEmpty, v1 => fromDb[v1]));
    });
    const nonEmpty = unflatten(filterValues(dataByCompany, v => keys(v).length));
    return nonEmpty;
},
