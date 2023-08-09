describe('chamar /reckons (Reckon Lite)', () => {

    test('Jornada Diurna - flexivel - sem config da label - mantem funcionamento normal, não gera label separada', async (done) => ({
        populate: { ...fb.sumTotal(), punches: [{ '2017-02-01': ['0800', '1200', '1300', '2240'] }] },
        expectedSumTotal: {
            'Horas Trabalhadas (dias)': '1',
            'Horas Trabalhadas': '1340',
            'Horas Previstas': '0800',
            'Hora Extra 50%': '0545',
            'Adicional Noturno': '0045;timelineSources:6',
            'Expediente': '0800',
        }
    }));

    test('Jornada Diurna - flexivel - sem config da label - mantem funcionamento normal, não gera label separada', async (done) => ({
        ...fb.sumTotal(),

        punches: [{ '2017-02-01': ['0800', '1200', '1300', '2240'] }],

        expectedSumTotal: {
            'Horas Trabalhadas (dias)': '1',
            'Horas Trabalhadas': '1340',
            'Horas Previstas': '0800',
            'Hora Extra 50%': '0545',
            'Adicional Noturno': '0045;timelineSources:6',
            'Expediente': '0800',
        }
    }));

    it('Jornada Diurna - flexivel - sem config da label - mantem funcionamento normal, não gera label separada', fb.sumTotal, () => ({
        punches: [{ '2017-02-01': ['0800', '1200', '1300', '2240'] }],

        expectedSumTotal: {
            'Horas Trabalhadas (dias)': '1',
            'Horas Trabalhadas': '1340',
            'Horas Previstas': '0800',
            'Hora Extra 50%': '0545',
            'Adicional Noturno': '0045;timelineSources:6',
            'Expediente': '0800',
        }
    }));
});
