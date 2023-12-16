const resource = {
    schema: {                        //NEXT_VERSION              EXAMPLE           , VALIDATION               ,  LABEL                                         DESCRIPTION  DEVNOTES
        motivo                     : ['reason'                , 'Quebrou o pé'     , _(string, required)        , 'Motivo'                                     , '' , 'chave estrangeira'                                                                      ],
        codigo_motivo              : ['reasonCode'            , '10'               , _(string, required)        , 'Código Contábil'                            , '' , ''                                                                                       ],
        funcionarios               : ['employeeRegisters'     , ['1']              , _(array, string, required)
                                                                                    arrayRequired(string)
         , 'Funcionários'                               , '' , 'Cuidado, o array pode conter milhares de entradas. Se não for usar, filtre esse campo.' ],
        inicio                     : ['start'                 , '2019-01-21T09:01' , _date(date.required()          , 'Data Inicial | Hora Inicial'                , '' , ''                                                                                       ],
        fim                        : ['end'                   , '2019-01-21T24:00' , date.default(fimDefault) , 'Data Final | Hora Final'                    , '' , 'fim do dia da data de início (00 : 00 do dia seguinte)'                                 ],
        cod_interno                : ['internalCode'          , '55544'            , string                   , 'Código Interno'                             , '' , ''                                                                                       ],
        tratamento                 : ['treatment'             , 'Banco de Horas 1' , string                   , 'Tratar batidas como'                        , '' , ''                                                                                       ],
        tratamento_noturno         : ['nightlyTreatment'      , 'Banco de Horas 2' , string                   , 'Tratar batidas noturnas como'               , '' , ''                                                                                       ],
        tratamento_periodo         : ['periodTreatment'       , 'Banco de Horas 3' , string                   , 'Tratar período não trabalhado como'         , '' , ''                                                                                       ],
        tratamento_periodo_noturno : ['nighlyPeriodTreatment' , 'Banco de Horas 4' , string                   , 'Tratar período noturno não trabalhado como' , '' , ''                                                                                       ],
        cod_origem                 : ['originCode'            , 'algumCodigo'      , string                   , ''                                           , '' , ''                                                                                       ],
        LIMITES_HORAS_ADICIONAIS   : ['additionalHoursLimits' , [AHL.example]      , array(AHL.schema)        , 'Limites e conversões'                       , '' , ''                                                                                       ],
        approvalProfiles           : [''                      , []                 , array(string)            , ''                                           , '' , ''                                                                                       ],

        // FLAGS                                                        // NEXT_VERSION      EXAMPLE/VALIDATION  LABEL                                      DESCRIPTION
        FL_SEM_HORARIO_NOTURNO                                        : ['hasNoNightlyHour', true, boolean, 'Período não trabalhado sem horário noturno', ''],
        padrao_escala                                                 : [''                , true, boolean, 'Utiliza tratamentos padrões para batidas'  , ''],
        nao_abonar_falta                                              : [''                , true, boolean, 'Não abonar horas de falta'                 , ''],
        aplica_desconto_dsr                                           : [''                , true, boolean, ''                                          , ''],
        nao_descontar_dsr                                             : [''                , true, boolean, ''                                          , ''],
        bloqueio_acesso                                               : [''                , true, boolean, ''                                          , ''],
        dayExport                                                     : [''                , true, boolean, ''                                          , ''],
        tratar_todo_periodo                                           : [''                , true, boolean, ''                                          , ''],
        hora_pela_jornada                                             : [''                , true, boolean, ''                                          , ''],
        alerta_notificacoes                                           : [''                , true, boolean, ''                                          , ''],
        compensa_tratamento_especial                                  : [''                , true, boolean, ''                                          , ''],
        tratado_como_horas_trabalhadas_em_dias_marcados_como_especial : [''                , true, boolean, ''                                          , ''],
        force_shift_limits                                            : [''                , true, boolean, ''                                          , ''],
        apenas_abonar_ausencia                                        : [''                , true, boolean, ''                                          , ''],
        ignorar_tratamento_padrao_jornada                             : [''                , true, boolean, ''                                          , ''],
        afastamento_completo_ignora_apuracao                          : [''                , true, boolean, ''                                          , ''],
        abonar_carga_horaria                                          : [''                , true, boolean, ''                                          , ''],
        exibir_rotulo_afastamento                                     : [''                , true, boolean, ''                                          , ''],
        sap                                                           : [''                , true, boolean, ''                                          , ''],
        rotulo_negativo                                               : [''                , true, boolean, ''                                          , ''],
        unico_dia                                                     : [''                , true, boolean, ''                                          , ''],
        afastamento_integral_desconta_rubrica_tecnica                 : [''                , true, boolean, ''                                          , ''],
        afastamento_integral_desconta_rubrica_tecnica2                : [''                , true, boolean, ''                                          , ''],
        afastamento_integral_desconta_rubrica_tecnica3                : [''                , true, boolean, ''                                          , ''],
        duplicity_offcycle                                            : [''                , true, boolean, ''                                          , ''],
        payroll_return                                                : [''                , true, boolean, ''                                          , ''],
        integrado                                                     : [''                , true, boolean, ''                                          , ''],
        forcar_integracao                                             : [''                , true, boolean, ''                                          , ''],
        resignation_auto                                              : [''                , true, boolean, ''                                          , ''],
        obrigatorio                                                   : [''                , true, boolean, ''                                          , ''],
    },

    metadata: {

    },

    uri: `/v1/companies/{company}/leaves`,

    validators: {
        queryMany: { ...queryMany, employeeRegisters: csv },
        dateRangeQuery: { ...queryMany, start: date.required(), end: date.required() },
    },
    routes: {
        getAllIntersectingPeriod: ['GET', `${uri}/intersectingPeriod`, [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]], // permission!
        getAllBetweenPeriod     : ['GET', `${uri}/betweenPeriod`     , [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]],
    },
};

const { urlValidators, bodyValidators, uri } = resource;

merge(resource, {
    urlValidators: {
        queryMany: { employeeRegisters: csv },
        dateRangeQuery: { ...urlValidators.queryMany, start: date.required(), end: date.required() },
    },
    routes: {
        getAllIntersectingPeriod: ['GET', `${uri}/intersectingPeriod`, [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]], // permission!
        getAllBetweenPeriod     : ['GET', `${uri}/betweenPeriod`     , [urlValidators.params, urlValidators.dateRangeQuery, bodyValidators.none]],
    },
});


    // name: 'leaves',
    // nsqName: 'afastamentos',
    // dscField: 'motivo',


