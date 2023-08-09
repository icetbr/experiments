const model = {
    insert: pipe(
        validate,
        normalize,
        save,
        saveHistory,
        emitEvent,
        transform,
    ),
    async insert: pipe(
        schema.validate,
        normalizations.toLegacy,
        db.insertOne,
        historyDb.insertOne,
        emitEvent,
        transform,
    ),

    async insert({ company, doc, user = 'system', options: { cache, asLegacy, validate = 'validate' } = {}, ...extraArgs }) { // extraArgs permite passar parâmetros como employeeConfigId
        doc = await this[validate]({ company, doc, action: 'insert', cache, ...extraArgs });

        const metadata = getMetadata(company, user, doc[this.stub.dscField], new ObjectId());
        let legacyDoc = this.normalizations.toLegacy({ ...metadata, ...doc }, cache);
        const { time } = await this.db.insertOne(legacyDoc);
        await this.historyDb.insertOne({ ...legacyDoc, _id: new ObjectId() });  // para histórico não ficar com mesmo _id; usar cod p/ chave estrangeira
        await this.emitEvent(company, legacyDoc);

        return this.transform({ asLegacy, legacyDoc, cache });

        const results = await this.collection.findOneAndUpdate(
            { status: { $in: ['awaiting', 'processing'] }, ...__.pick(doc, 'company', 'employeeId', 'start', 'end') },
            { $set: trackers, $setOnInsert: doc },
            { upsert: true, returnOriginal: false }, // retorna o valor salvo
        );

        const softDeleted = await this.checkUnique({ company, legacyDoc });

        if (softDeleted) {
            cache.oldLegacyDoc = softDeleted;
            metadata = getMetadata(company, user, doc[this.stub.dscField], softDeleted._id);
            legacyDoc = await this.normalizations.toLegacyUpdate({ ...metadata, ...doc }, cache);
            legacyDoc = __.merge(cache.oldLegacyDoc, legacyDoc); // merge pois pode ter campos auto gerados que não foram atualizados
            await this.doUpdate({ _id: softDeleted._id, company, legacyDoc });
        } else {
        }

    },
}

const doc = { name: 'ddv' };
model.insert(schema, doc);




