import { it } from 'node:test';
import { deepEqual as eq } from 'node:assert';

export const testIsCpf = isCpf => {
    const t = cpf => eq(isCpf(cpf), true);
    const f = cpf => eq(isCpf(cpf), false);

    it('valid', () => {
        t('13768663663')
        t('83117383000')
        t('65009596393')
        t('93177985359')
    })
    it('valid starting with 0', () => {
        t('06325112733')
        t('03539780351')
    })
    it('valid first verifier = 0', () => {
        t('76381842202')
        t('70073091006')
        t('09276666001')
    })
    it('valid first verifier > 0', () => {
        t('12582810665')
        t('60380643030')
        t('64260066021')
    })
    it('valid second verifier = 0', () => {
        t('43378758830')
        t('10748142070')
        t('97713256040')
    })
    it('valid second verifier > 0', () => {
        t('85517802125')
        t('11722728086')
        t('67117402032')
    })
    it('invalid no value',    () => f(''));
    it('invalid less digits', () => f('1376866366'));
    it('invalid more digits', () => f('137686636631'));
    it('invalid with letter', () => f('a3768663663'));
    it('invalid repeating digits', () => {
        f('00000000000')
        f('11111111111')
        f('22222222222')
        f('33333333333')
        f('44444444444')
        f('55555555555')
        f('66666666666')
        f('77777777777')
        f('88888888888')
        f('99999999999')
    })
};
