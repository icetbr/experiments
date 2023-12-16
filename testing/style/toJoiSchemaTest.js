describe('' => {

    it('maps a SchemaTable to a Joi Schema', () => expect(
        toJoiSchema(i, {
            motivo: [, 'Quebrou o pé', string.required(), , 'A causa do afastamento', 'chave estrangeira'],
            inicio: [, '2019-01-21T09:01', date.required(), , '', ''],
            padrao_escala: [, true, boolean, , 'Padrão', ''],
        }).describe())
        .toEqual(
            object({
                motivo: string.required().example('Quebrou o pé 5').description('A causa do afastamento').note('chave estrangeira'),
                inicio: date.required().example('2019-01-21T09:01').description(EMPTY).note(EMPTY),
                padrao_escala: boolean.example(true).description('Padrão').note(EMPTY),
            }).describe()
        ));

    it('maps a SchemaTable to a Joi Schema', () => {
        const input = {
            motivo: [, 'Quebrou o pé', string.required(), , 'A causa do afastamento', 'chave estrangeira'],
            inicio: [, '2019-01-21T09:01', date.required(), , '', ''],
            padrao_escala: [, true, boolean, , 'Padrão', ''],
        };
        const expected = {
            motivo: string.required().example('Quebrou o pé 5').description('A causa do afastamento').note('chave estrangeira'),
            inicio: date.required().example('2019-01-21T09:01').description(EMPTY).note(EMPTY),
            padrao_escala: boolean.example(true).description('Padrão').note(EMPTY),
        };

        expect(toJoiSchema(i, input).describe()).toEqual(object(expected).describe());
    });

    it('maps a SchemaTable to a Joi Schema', () => {
        const actual = toJoiSchema(i, {
            motivo: [, 'Quebrou o pé', string.required(), , 'A causa do afastamento', 'chave estrangeira'],
            inicio: [, '2019-01-21T09:01', date.required(), , '', ''],
            padrao_escala: [, true, boolean, , 'Padrão', ''],
        }).describe();

        const expected = object({
            motivo: string.required().example('Quebrou o pé 5').description('A causa do afastamento').note('chave estrangeira'),
            inicio: date.required().example('2019-01-21T09:01').description(EMPTY).note(EMPTY),
            padrao_escala: boolean.example(true).description('Padrão').note(EMPTY),
        }).describe();

        expect(actual).toEqual(expected);
    });

    it('maps a SchemaTable to a Joi Schema', () => eq({
        actual: toJoiSchema(i, {
            motivo: [, 'Quebrou o pé', string.required(), , 'A causa do afastamento', 'chave estrangeira'],
            inicio: [, '2019-01-21T09:01', date.required(), , '', ''],
            padrao_escala: [, true, boolean, , 'Padrão', ''],
        }).describe(),

        expected: object({
            motivo: string.required().example('Quebrou o pé 5').description('A causa do afastamento').note('chave estrangeira'),
            inicio: date.required().example('2019-01-21T09:01').description(EMPTY).note(EMPTY),
            padrao_escala: boolean.example(true).description('Padrão').note(EMPTY),
        }).describe();
    }));
})
