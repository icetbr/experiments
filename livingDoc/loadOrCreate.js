    // estes testes poderiam ser duplicados p/ o mes final, mas devido a forma implementada, não é necessário
    // - com exceção do cenário B < C1 que tinha um bug, logo foi feito teste p/ mes final
    __.forEach([
        //     A     B          C                       E
        // [ start, end, NU_INICIO_MES, FL_INICIO_MES_ANTERIOR, expectedMonths ]

        //                                                       C1             C2
        // mesmo mes (C1, A)
        ['2017-02-02', '2017-02-02', '02', false, ['02']], // 2017-02-02 - 2017-03-01 C1 = A < C2
        ['2017-02-01', '2017-02-01', '02', false, ['01']], // 2017-02-02 - 2017-03-01 C1 > A < C2
        ['2017-02-03', '2017-02-03', '02', false, ['02']], // 2017-02-02 - 2017-03-01 C1 < A < C2
        ['2017-03-02', '2017-03-02', '02', false, ['03']], // 2017-03-02 - 2017-04-01 C1 < A > C2
        ['2017-02-28', '2017-02-28', '01', false, ['02']], // 2017-02-01 - 2017-02-28 C1 < A = C2

        // mesmo mes FL (C2, A): impossivel C1 >= A
        //                         C1 = A < C2
        //                         C1 > A < C2
        ['2017-02-01', '2017-02-01', '03', true, ['02']],  // 2017-01-03 - 2017-02-02 C1 < A < C2
        ['2017-02-02', '2017-02-02', '02', true, ['03']],  // 2017-01-02 - 2017-02-01 C1 < A > C2
        ['2017-02-01', '2017-02-01', '02', true, ['02']],  // 2017-01-02 - 2017-02-01 C1 < A = C2

        // mes diferente (C1, A): impossivel C1 >= A
        //                         C1 = A < C2
        //                         C1 > A < C2
        ['2017-03-01', '2017-03-01', '03', false, ['02']], // 2017-02-03 - 2017-03-02 C1 < A < C2
        ['2017-03-02', '2017-03-02', '02', false, ['03']], // 2017-02-02 - 2017-03-01 C1 < A > C2
        ['2017-03-01', '2017-03-01', '02', false, ['02']], // 2017-02-02 - 2017-03-01 C1 < A = C2

        // mes diferente FL (C2, A): impossivel, pois FL exige que mes C1 seja diferente de A

        // start !== end retorna intervalo de meses
        ['2017-02', '2017-04', '02', false, ['02', '03', '04']],   // 2017-02-02 - 2017-04-01
        ['2017-02-02', '2017-04-01', '02', false, ['02', '03']],   // 2017-02-02 - 2017-04-01

        // B < C1
        ['2017-02-01', '2017-02-02', '03', false, ['01']],       // 2017-02-03 - 2017-03-02
        ['2017-02-01', '2017-03-02', '03', false, ['01', '02']], // 2017-01-03 - 2017-03-02 (teste 'mes final')
        // TODO acho que nao precisa este teste!
        // ['only', '2017-02-20', '2017-02-20', '11', true, ['03']], // - 202003  2020-02-11 a 2020-03-10

        // TODO APAGAR
        // ['2017-02-01', '2017-05-02', '02', false, ['01', '02', '03', '04', '05']], // 2017-05-02 - 2017-06-01 C1 = B < C2
        // ['2017-02-02', '2017-05-01', '02', false, ['02', '03', '04']],             // 2017-05-02 - 2017-06-01 C1 > B < C2
        // ['2017-02-01', '2017-05-03', '02', false, ['01', '02', '03', '04', '05']], // 2017-05-02 - 2017-06-01 C1 < B < C2
        // ['2017-02-01', '2017-06-01', '02', false, ['01', '02', '03', '04', '05']], // 2017-05-02 - 2017-06-01 C1 < B = C2 (C2 != mes)
        // ['2017-02-01', '2017-05-31', '01', false, [      '02', '03', '04', '05']], // 2017-05-01 - 2017-05-31 C1 < B = C2 (C2 == mes)
        // falta exemplo mes 6

    ], (scenario) => u.runScenario('gera (cria/carrega?) a quantidade certa de apurações a partir de data física', scenario, async (done) => {
        await bulkFixture(scenario, done);
    }));

    test('pede meses 1 e 2, mês 2 reusa dados do mês 1 sem reprocessar ele', async () => {
        f = fb.simpleSumTotalMonthly();

        f.url = `/a000001/reckons/process?employeeId=59667b5fbca8131700000005&start=2017-01&end=2017-02`;

        await fb.execute(f, (result) => {
            expect(result[0].previousReckonStatus).to.equal(undefined);
            expect(result[1].previousReckonStatus).to.equal('reused');
        });
    });

    test('pede meses 1 e 2, encontra 2 e o 1 não deveria exitir, retorna erro do 1 e a apuração do 2', async () => {
        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01&end=2017-02`;

        f.callback = function (collections) {
            prepareDummyReckons(collections);
            collections[Reckons.collectionName].shift(); // remove a apuração 201701
            collections.funcionarios[0].dados.dt_admissao = '2017-02-01'; // logo, não leve ter apuração em janeiro
        };

        const dates = { from: '2017-01-01', to: '2017-01-31', admitted: '2017-02-01', dismissed: 'undefined' };
        let errorMsg = utils.employeeNotAdmittedMsg(dates);
        f.revertLog = u.mockWarnLog(u.employeeNotAdmitted('a000001', '59667b5fbca8131700000005', '2017-01', dates));
        f.expectedReckons = [`59667b5fbca8131700000005_201702_loaded`];
        errorMsg += ' matricula: 1'
        f.expected = { total: 2, count: 1, created: 0, loaded: 1, errors: [{ '59667b5fbca8131700000005': errorMsg }] };

        await fb.execute(f, verifyResults);
    });

    test('pede meses 1 e 2, encontra 2 e o 1 deveria exitir, processa 1 e carrega 2 (cenário não deve acontecer!)', async () => {
        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01&end=2017-02`;

        f.callback = function (collections) {
            prepareDummyReckons(collections);
            collections[Reckons.collectionName].shift(); // remove a apuração 201701
        };

        f.expectedReckons = [`59667b5fbca8131700000005_201701_created`, `59667b5fbca8131700000005_201702_loaded`];
        f.expected = { total: 2, count: 1, created: 1, loaded: 1 };

        await fb.execute(f, verifyResults);
    });

    test('pede meses 1 e 2 (FISICOS), encontra 2 e o 1 deveria exitir, processa 1 e carrega 2 (cenário não deve acontecer!)', async () => {
        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01-26&end=2017-02-04`;

        f.callback = function (collections) {
            prepareDummyReckons(collections);
            collections[Reckons.collectionName].shift(); // remove a apuração 201701
        };

        f.expectedReckons = [`59667b5fbca8131700000005_201701_created`, `59667b5fbca8131700000005_201702_loaded`];
        f.expected = { total: 2, count: 1, created: 1, loaded: 1 };

        await fb.execute(f, verifyResults);
    });

    test('usa configuração de funcionários', async () => {
        f.company.modulos.config_funcionarios = true;
        f.employee.departamento = 'Departamento 1';
        // f.company.dados.ENABLE_REFERENCE_PERIODS = true;

        f.url = `/a000001/reckons?employeeId=59667b5fbca8131700000005&start=2017-01-15`;

        // pelos dados empresa, 201701 = 2016-12-10 a 2017-01-09
        f.company.dados.NU_INICIO_MES = '10';
        f.company.dados.FL_INICIO_MES_ANTERIOR = '1';

        // pelos dados da config, 201701 = 2017-01-03 a 2017-02-02
        f.configsPerEmployee = [
            {
                NU_INICIO_MES: '3',
                FL_INICIO_MES_ANTERIOR: '0',
                filtros: {
                    departamento: ['Departamento 1'],
                },
            },
        ];

        f.expectedReckons = [`59667b5fbca8131700000005_201701_created`];
        f.expected = { total: 1, count: 1, created: 1, loaded: 0 };

        await fb.execute(f, verifyResults);
    });

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
        f.reckons = [{ ...getDummyReckons()[1], timeInLieu: {} }];
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
