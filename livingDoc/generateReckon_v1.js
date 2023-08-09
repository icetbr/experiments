describe('gerar apuração', () => {
    const s = async (reckon, query, expected) => {
        await aBareMinimumDbWith(reckon);
        const actual = await generateReckons(aReckonQuery(query));
        expect(actual, expected);
    }

    const itGeneratesAReckon = (reckon, query, expected) => {
        it('com apuração válida no banco => carrega a apuração', s(a.validReckon(reckon), query, { loaded: 1, ...expected }));
        it('com apuração válida no banco => cria a apuração',    s(a.invalidReckon(reckon), query, { created: 1, ...expected }));
    };

    const s1 = async (reckon, query, expected) => {
        s([a.validReckon(reckon[0]), a.validReckon(reckon[1]), a.invalidReckon(reckon[2])], query, { loaded: 2, created: 1, ...expected }));
    };

    itGeneratesAReckon();

    it('com data no lugar de periodo => gera a apuração que contem a data', itGeneratesAReckon({ start: '2017-02-01' }                               , { hasDayInfo: '2017-02-01' }));
    it('com matrícula no lugar de id => gera apuração',                     itGeneratesAReckon({ employeeId: null, register: 1                                                    }));
    it('matrícula + data',                                                  itGeneratesAReckon({ employeeId: null, register: 1, start: '2017-02-01' }, { hasDayInfo: '2017-02-01' }));
    it('com intervalo => gera apurações entre início e fim',                s1([], { hasDayInfo: '2017-02-01' }));
    it('intervalo + matricula',                                             s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                               [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));
    it('intervalo + matricula + data',                                      s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                               [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));

    it('com data no lugar de periodo => gera a apuração que contem a data', itGeneratesAReckon({ start: '2017-02-01' }                               , { hasDayInfo: '2017-02-01' }));

    it('com matrícula no lugar de id => gera apuração',                     itGeneratesAReckon({ employeeId: null, register: 1                                                    }));

    it('matrícula + data',                                                  itGeneratesAReckon({ employeeId: null, register: 1, start: '2017-02-01' }, { hasDayInfo: '2017-02-01' }));

    it('com intervalo => gera apurações entre início e fim',                s1([], { hasDayInfo: '2017-02-01' }));

    it('intervalo + matricula',                                             s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                                [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));

    it('intervalo + matricula + data',                                      s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                                [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));

    it('com data no lugar de periodo => gera a apuração que contem a data',
        itGeneratesAReckon({ start: '2017-02-01' }                               , { hasDayInfo: '2017-02-01' }));

    it('com matrícula no lugar de id => gera apuração',
        itGeneratesAReckon({ employeeId: null, register: 1                                                    }));

    it('matrícula + data',
        itGeneratesAReckon({ employeeId: null, register: 1, start: '2017-02-01' }, { hasDayInfo: '2017-02-01' }));

    it('com intervalo => gera apurações entre início e fim',
        s1([], { hasDayInfo: '2017-02-01' }));

    it('intervalo + matricula',
        s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
         [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));

    it('intervalo + matricula + data',
        s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
           [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));

});

- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
    describe: generateReckons **inicio** **fim**
        describe: periodo
          given: apurações válidas no banco
          should: retorna as apurações entre inicio e fim

          given: apurações inválidas no banco
          should: cria as apurações entre inicio e fim

        describe: data
          given: apurações válidas no banco
          should: retorna as apurações entre inicio e fim que contem a data

          given: apurações inválidas no banco
          should: cria as apurações entre inicio e fim que contem a data

validReckon                         loaded: 1
invalidReckon                       created: 1
               start=2017-02-01
validReckon(start=2017-02-01)       loaded:  1, start=2017-02-01
invalidReckon                       created: 1, start=2017-02-01
               register=1
validReckon(register=1)                     loaded:  1, register=1
invalidReckon                               created: 1, register=1
validReckon(register=1, start=2017-02-01)   loaded:  1, register=1, start=2017-02-01
invalidReckon                               created: 1, register=1, start=2017-02-01
               start=2017-02, end=2017-04
validReckon(), invalidReckon(), validReckon()       loaded:  2, created:  1
x2 for date
x2 for register
                 employeeId=1,employeeId=2



- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
- **funcionário** pode ser seu **id** ou **matrícula**.
- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
- passando **mais de um funcionário** retorna apurações para cada um deles.
- suporta paginação baseada nos funcionários.