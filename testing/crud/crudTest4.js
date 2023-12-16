const model = {
    async insert({ company, doc, user = 'system', checkUnique, options: { cache, asLegacy, validate = 'validate' }, ...extraArgs }) { // args permite passar parâmetros como extras como employeeConfigId
        doc = await this[validate]({ company, doc, action: 'insert', cache, ...extraArgs });

        const _id = new ObjectId();
        let metadata = getMetadata(company, user, doc[this.stub.dscField], _id);
        let legacyDoc = await this.normalizations.toLegacy(metadata, doc, cache);

        const softDeleted = await checkUnique({ company, legacyDoc });

        if (softDeleted) {
            cache.oldLegacyDoc = softDeleted;
            metadata = getMetadata(company, user, doc[this.stub.dscField], softDeleted._id);
            legacyDoc = await this.normalizations.toLegacyUpdate(metadata, doc, cache);
            legacyDoc = __.merge(cache.oldLegacyDoc, legacyDoc); // merge pois pode ter campos auto gerados que não foram atualizados
            await this.doUpdate({ _id: softDeleted._id, company, legacyDoc });
        } else {
            await this.db.insertOne(legacyDoc);
        }

        await this.historyDb.insertOne({ ...legacyDoc, _id: new ObjectId() });  // para histórico não ficar com mesmo _id; usar cod p/ chave estrangeira
        await this.emitEvent(company, legacyDoc);

        return this.transform({ asLegacy, legacyDoc, cache });
    },
}