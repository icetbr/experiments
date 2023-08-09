## abreviado
- **funcionário** pode ser seu **id** ou **matrícula**.
  - gerar uma apuração com **matrícula** do funcionário no lugar de id => retorna a apuração
      - carrega
      - cria

## tabela
- can't know if I'll need all until I start coding it

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


validReckon(), validReckon(), validReckon()         loaded:  3
invalidReckon, invalidReckon(), invalidReckon()     created: 3

# Geração de apurações

- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`.
- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
- **funcionário** pode ser seu **id** ou **matrícula**.
- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
- passando **mais de um funcionário** retorna apurações para cada um deles.
- suporta paginação baseada nos funcionários.


- com start dia lógico, retorna uma apuração
- com start dia fisico, retorna uma apuração

- com start e end dias lógicos, retorna as apurações entre start e end
- com start e end dias físicos, retorna as apurações que contém start até end

- com employeeIds retorna as apurações dos funcionários especificados
- com registers retorna as apurações dos funcionários especificados

- limit=3 retorna as apurações dos 3 primeiros funcionários
- offset=3 retorna as apurações que não são dos 3 primeiros funcionários
- offset=2 e limit=2 retornas as apurações dos funcionários 3 e 4


- com start dia lógico e employeeId, retorna uma apuração
- com start e end dias lógicos, retorna as apurações entre start e end
- com start e end dias físicos, retorna as apurações que contém start até end
- com employeeIds retorna as apurações dos funcionários especificados
- com registers retorna as apurações dos funcionários especificados
- limit=3 retorna as apurações dos 3 primeiros funcionários
- offset=3 retorna as apurações que não são dos 3 primeiros funcionários
- offset=2 e limit=2 retornas as apurações dos funcionários 3 e 4


**arquivo proprio**
- gera (cria/carrega?) a quantidade certa de apurações a partir de data física

- pede meses 1 e 2, mês 2 reusa dados do mês 1 sem reprocessar ele
- pede meses 1 e 2, encontra 2 e o 1 não deveria exitir, retorna erro do 1 e a apuração do 2
- pede meses 1 e 2, encontra 2 e o 1 deveria exitir, processa 1 e carrega 2 (cenário não deve acontecer!)
- pede meses 1 e 2 (FISICOS), encontra 2 e o 1 deveria exitir, processa 1 e carrega 2 (cenário não deve acontecer!)
- usa configuração de funcionários
-
```js

    /**
     * configs
     * mes 1 ini 03               2017-01-03 2017-02-02
     * mes 2 ini 10 INI ANTERIOR  2017-01-10 2017-02-09

     * consulta: 2017-01-15
     * chuta mes 1: 2017-01-03 a 2017-02-02  identifica como mes 1, mas era mes 2
     * chuta mes 2: 2017-01-10 a 2017-02-09
     */
    // TODO consertar isto exige um grande refactoring
    test.skip('usa histórico de configurações', async () => { // PAREI
        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01-15`;
        f.company.dados.NU_INICIO_MES = '10';
        f.company.dados.FL_INICIO_MES_ANTERIOR = '1';
        f.company.dados.ENABLE_REFERENCE_PERIODS = true; // TODO com e sem

        f.configHistories = [
            {
                config: "FL_INICIO_MES_ANTERIOR",
                history: [{ until: "2017-01", value: "0" }],
            },
            {
                config: "NU_INICIO_MES",
                history: [{ until: "2017-01", value: "3" }],
            },
        ];

        f.expectedReckons = [`59667b5fbca8131700000005_201702_created`];
        f.expected = { total: 1, count: 1, created: 1, loaded: 0 };

        await fb.execute(f, verifyResults);
    });

    // cenário semelhante ao acima
    // TODO consertar isto exige um grande refactoring
    test.skip('usa histórico de configurações de funcionário', async () => {
        f.company.modulos.config_funcionarios = true;
        f.employee.departamento = 'Departamento 1';
        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01-15`;
        f.company.dados.NU_INICIO_MES = '10';
        f.company.dados.FL_INICIO_MES_ANTERIOR = '1';
        f.company.dados.ENABLE_REFERENCE_PERIODS = true;

        // pelos dados da config, 201701 = 2017-01-03 a 2017-02-02
        f.configHistories = [
            {
                config: "FL_INICIO_MES_ANTERIOR_POR_FUNCIONARIO",
                history: [{ until: "2017-01", value: "0" }],
                company: 'a000001',
                userConfigId: new ObjectId('59667b5fbca8131700000005'),
            },
            {
                config: "NU_INICIO_MES_POR_FUNCIONARIO",
                history: [{ until: "2017-01", value: "3" }],
                company: 'a000001',
                userConfigId: new ObjectId('59667b5fbca8131700000005'),
            },
        ];

        f.configsPerEmployee = [
            {
                NU_INICIO_MES: '15',
                FL_INICIO_MES_ANTERIOR: '1',
                filtros: {
                    departamento: ['Departamento 1'],
                },
                _id: new ObjectId('59667b5fbca8131700000005'),
            },
        ];

        f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];
        f.expected = { total: 1, count: 1, created: 1, loaded: 0 };

        await fb.execute(f, verifyResults);
    });

    experiment('data fisica', () => {

        test('e competência variável', async () => {
            f.company.dados.ENABLE_REFERENCE_PERIODS = true;
            f.url = `/a000001/reckons?start=2017-01-26`;
            f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];

            await fb.execute(f, verify);
        });

        test('e todos os funcionarios', async () => {
            f.secondEmployee = true;
            f.url = `/a000001/reckons?start=2017-01-26`;
            f.expectedReckons = [`59667b5fbca8131700000004_201701_created`, `59667b5fbca8131700000005_201701_created`];

            await fb.execute(f, verify);
        });

        test('e funcionarios por matricula', async () => {
            f.secondEmployee = true;
            f.url = `/a000001/reckons?registers=1&start=2017-01-26`;
            f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];

            await fb.execute(f, verify);
        });

        test('e um funcionario nao encontrado retorna erro e o funcionario encontrado', async () => {
            f.url = `/a000001/reckons/process?employeeIds=59667b5fbca8131700000005,59667b5fbca8131700000006&start=2017-01-26`;
            f.revertLog = u.mockWarnLog(u.EMPLOYEE_NOT_FOUND);

            f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];
            f.expected = { total: 2, count: 2, created: 1, loaded: 0, errors: [{ '59667b5fbca8131700000006': u.EMPLOYEE_NOT_FOUND + ' matricula: undefined' }] };

            await fb.execute(f, verifyResults);
        });

    });

    // TODO este teste é útil? Não foi substituido por 'pede meses 1 e 2, encontra 2 e o 1 não deveria exitir, retorna erro do 1 e a apuração do 2' ?
    test('retorna erros quando encontrados', async () => {
        f.secondEmployee = true;
        f.url = '/a000001/reckons/process?start=2017-02&limit=3';

        const dates = { from: '2017-02-01', to: '2017-02-28', admitted: '2017-03-01', dismissed: 'undefined' };
        let errorMsg = utils.employeeNotAdmittedMsg(dates);
        f.revertLog = u.mockWarnLog(u.employeeNotAdmitted('a000001', '59667b5fbca8131700000004', '2017-02', dates));

        f.expectedReckons = [`59667b5fbca8131700000005_201702_created`];
        errorMsg += ' matricula: 0';
        f.expected = { total: 2, count: 2, created: 1, loaded: 0, errors: [{ '59667b5fbca8131700000004': errorMsg }] };

        f.callback = function (collections) {
            collections.funcionarios[0].dados.dt_admissao = '2017-03-01';
        };

        await fb.execute(f, verifyResults);
    });

    test('retorna erros quando um funcionário encontrado mas outro não', async () => {
        f.url = `/a000001/reckons/process?employeeIds=59667b5fbca8131700000005,59667b5fbca8131700000006&start=2017-02`;
        f.revertLog = u.mockWarnLog(u.EMPLOYEE_NOT_FOUND);

        f.expectedReckons = [`59667b5fbca8131700000005_201702_created`];
        f.expected = { total: 2, count: 2, created: 1, loaded: 0, errors: [{ '59667b5fbca8131700000006': u.EMPLOYEE_NOT_FOUND + ' matricula: undefined' }] };

        await fb.execute(f, verifyResults);
    });

    test('normaliza delays quando carerregando apuração com timeInLieu antiga', async () => {
        f.reckons = [{...getDummyReckons()[1], timeInLieu: {} }];
        await fb.execute(f, (result) => {
            expect(result.timeInLieu).to.equal({ delays: [] })
        });
    });

    experiment('allNonBlocked', () => {

        test('processa todos os meses não bloqueados até o período solicitado', async () => {
            MockDate.set('2017-03-01');
            f.url = `/a000001/reckons/process?employeeId=59667b5fbca8131700000005&allNonBlocked=true&start=2017-03`;
            f.expectedReckons = [`59667b5fbca8131700000005_201703_created`];

            await fb.execute(f, verify);
            MockDate.reset();
        });

        // para o dayEnded gerar apuração na troca de mes
        test('processa mês atual se não encontra ele já bloqueado', async () => {
            MockDate.set('2017-03-01');
            f.url = `/a000001/reckons/process?employeeId=59667b5fbca8131700000005&allNonBlocked=true&start=2017-03`;
            f.expectedReckons = [`59667b5fbca8131700000005_201703_created`];

            await fb.execute(f, verify);
            MockDate.reset();
        });

        test('não processa nada se mês atual já bloqueado', async () => {
            f.reckons = [{ blocked: true, company: 'a000001', period: '201703', employee: { _id: new ObjectId('59667b5fbca8131700000005') } }];
            MockDate.set('2017-03-01');
            f.url = `/a000001/reckons/process?employeeId=59667b5fbca8131700000005&allNonBlocked=true&start=2017-03`;
            f.expectedReckons = [`59667b5fbca8131700000005_201703_loaded`];







            await fb.execute(f, verify);
            MockDate.reset();
        });

    });

    // test('data fisica e competência variável com inicio do mes pertencendo', async () => {
    //     f.company.dados.ENABLE_REFERENCE_PERIODS = true;
    //     f.url = `/a000001/reckons?start=2017-01-26`;
    //     f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];

    //     await fb.execute(f, verify);
    // });

});
```


- para gerar uma apuração é preciso passar a **empresa**, **funcionário** e **período** para o endpoint `/reckons`
  - Ex: /a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-02 => a.reckonsResult(company: 'a000001',
                  employee: { _id: '59667b5fbca8131700000005' },
                  period: '201702',
              }
- se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
- passando uma **data** no lugar de **período** retorna a apuração que contém a data.
- **funcionário** pode ser seu **id** ou **matrícula**.
- passando um **intervalo** retorna todas as apurações entre o **início** e **fim**.
- passando **mais de um funcionário** retorna apurações para cada um deles.
- suporta paginação baseada nos funcionários.


com apuração válida no banco => carrega a apuração
    com data no lugar de periodo => gera a apuração que contem a data
    com matrícula no lugar de id => gera apuração
    matrícula + data
com apuração inválida no banco => cria a apuração
    com data no lugar de periodo => gera a apuração que contem a data
    com matrícula no lugar de id => gera apuração
    matrícula + data

com data no lugar de periodo => gera a apuração que contem a data
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração
com matrícula no lugar de id => gera apuração
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração
matrícula + data
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração


se a apuração já existir no banco de dados e for **recente** ou estiver **bloqueada**, ela é apenas carregada. Senão ela é criada.
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração

passando uma **data** no lugar de **período** retorna a apuração que contém a data
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração

**funcionário** pode ser seu **id** ou **matrícula**.
    com apuração válida no banco => carrega a apuração
    com apuração inválida no banco => cria a apuração

    matrícula + data
        com apuração válida no banco => carrega a apuração
        com apuração inválida no banco => cria a apuração

passando um **intervalo** retorna todas as apurações entre o **início** e **fim**



    it('com data no lugar de periodo => gera a apuração que contem a data', itGeneratesAReckon({ start: '2017-02-01' }                               , { hasDayInfo: '2017-02-01' }));
    it('com matrícula no lugar de id => gera apuração',                     itGeneratesAReckon({ employeeId: null, register: 1                                                    }));
    it('matrícula + data',                                                  itGeneratesAReckon({ employeeId: null, register: 1, start: '2017-02-01' }, { hasDayInfo: '2017-02-01' }));
    it('com intervalo => gera apurações entre início e fim',                s1([], { hasDayInfo: '2017-02-01' }));
    it('intervalo + matricula',                                             s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                               [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));
    it('intervalo + matricula + data',                                      s1([{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }],
                                                                               [{ employeeId: null, register: 1 }, { employeeId: null, register: 2 }, { employeeId: null, register: 3 }]));




itGeneratesAReckon();


reckonIsValid


    describe('apuração é válida se', () => {
        const s = (reckon, createdAfter, expected) => expect(reckonIsValid(a.reckon(reckon), createdAfter), expected);

                                                                    // reckon                                    | createdAfter      | expected
                                                                    // ----------------------------------------- | ----------------- | --------
        it('recente: data da última atualização > data desejada'  , s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T00:59', true    ));
        it('bloqueada'                                            , s({ dti: '2017-02-01T01:00', blocked: true  }, '2017-02-01T01:01', true    ));
        it('inexistente'                                          , s(null                                       , null              , false   ));
        it('velha (=): data da última atualização = data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:00', false   ));
        it('velha (>): data da última atualização > data desejada', s({ dti: '2017-02-01T01:00'                 }, '2017-02-01T01:01', false   ));
        it('não bloqueada'                                        , s({ dti: '2017-02-01T01:00', blocked: false }, '2017-02-01T01:01', false   ));
    });






