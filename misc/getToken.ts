/**
 * 1) creates token: assign default values and transform to expected format
 * 2) signs token
 *
 * - method signature: needs to know that if nothing passed, a default will be used
 * - booleans are optional by default
 * - can't have paramType = token because everything is optional?
 *
 * # x4 problems
 * - dependent value initialization
 */

const getToken = function (companyId = 'a000001', employeeId = 'system', isExternal = false, isAdmin = true) {}
getToken('a000002', 'system2', true, false)

const getToken = function (companyId = 'a000001', employeeId = 'system', { isExternal = false, isAdmin = true } = {}) { }
getToken('a000002', 'system2', { isExternal: true, isAdmin: false });

/**
 * ORIGINAL
 */
{
    const getToken = function (companyId = 'a000001', employeeId = 'system', isExternal = false, isAdmin = true) {
        const token = { user: { id: employeeId, admin: isAdmin, lastCompany: companyId, ext: isExternal }, exp: TOMORROW };
        return JWT.sign(token, etc.get('auth/security/jwt/rsaPrivateKey'), { algorithm: 'RS256' });
    }

    getToken('a000002', 'system2', true, false);
}

/**
 * PREFFERED
 */
{
    const getToken = function (companyId = 'a000001', employeeId = 'system', { isExternal = false, isAdmin = true } = {}) {
        const token = { user: { id: employeeId, admin: isAdmin, lastCompany: companyId, ext: isExternal }, exp: TOMORROW };
        return JWT.sign(token, etc.get('auth/security/jwt/rsaPrivateKey'), { algorithm: 'RS256' });
    }

    getToken('a000002', 'system2', { isExternal: true, isAdmin: false });
    // getToken(makeToken('a000002', 'system2', { isExternal: true, isAdmin: false }));
}
/**
 * WOKE
 */
{
    const getToken = ({
        companyId = 'a000001',
        employeeId = 'system',
        isExternal = false,
        isAdmin = true,
        privateKey,
    }) =>
        JWT.sign({
            exp: TOMORROW,
            user: {
                id: employeeId,
                admin: isAdmin,
                lastCompany: companyId,
                ext: isExternal,
            },
        },
            privateKey,
            { algorithm: 'RS256' });

    getToken({
        companyId = 'a000002',
        employeeId = 'system2',
        isExternal = true,
        isAdmin = false,
        privateKey: etc.get('auth/security/jwt/rsaPrivateKey'),
    });
}
/**
 * MIDDLE GROUND
 */
{
    const getToken = ({ companyId, employeeId, isExternal, isAdmin, privateKey }) =>
        JWT.sign({
            exp: TOMORROW,
            user: {
                id: employeeId || 'system',
                admin: isAdmin !== undefined ? isAdmin : true,
                lastCompany: companyId || 'a000001',
                ext: isExternal,
            },
        },
            privateKey,
            { algorithm: 'RS256' });
}

/**
 * OUT OF THE BOX 1
 */
{
    const aToken = {
        exp: TOMORROW,
        user: {
            id: 'system',
            admin: true,
            lastCompany: 'a000001',
            ext: true,
        },
    };

    const signToken = privateKey => token => JWT.sign(n(token, privateKey, { algorithm: 'RS256' }); // token = aToken?

    signToken(etc.get('auth/security/jwt/rsaPrivateKey'))(m(aToken, {
        user: {
            id: 'system',
            admin: true,
            lastCompany: 'a000001',
            ext: true,
        }
    }));
}



/**
 * OUT OF THE BOX 2
 */
{
    const signToken = privateKey => token => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?

    signToken(etc.get('auth/security/jwt/rsaPrivateKey'))({
        ...aToken,
        expireDate: TOMORROW,
        companyId = 'a000001',
        employeeId = 'system',
        isExternal = false,
        isAdmin = true,
    });
}

/**
 * OUT OF THE BOX 3
 */
{
    const signToken = privateKey => (...token) => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?

    signToken('a000002', 'system2', { isExternal: true, isAdmin: false });
}

/**
 * OUT OF THE BOX 4
 */
{
    const TOMORROW = 10;
    const PRIVATE_KEY = 'x',

    const Token = () => {
// PENSAR: quero hierarquia? Isso afetaria algo?
        const aToken = {
            expireDate: TOMORROW,
            companyId = 'a000001',
            employeeId = 'system',
            isExternal = false,
            isAdmin = true,
        };

        const n = o => ({
            exp: o.expireDate,
            user: {
                id: o.employeeId,
                admin: o.isAdmin,
                lastCompany: o.companyId,
                ext: o.isExternal,
            }
        })

        const signToken = token => JWT.sign(n(token), PRIVATE_KEY, { algorithm: 'RS256' });

        // export aqui!
        const baseToken = signToken(aToken)
    };
}

// type token = {
//     a: number,
//     b: number,
// }
{
    const aTokenFn = () => ({ a: 3, b: 4 });
    const aToken = { a: 3, b: 4 };
    const makeToken1 = ({ a = 1, b = 2 }) => ({ a, b })
    const makeToken2 = ({ a, b } = aToken) => ({ a, b })
    const makeToken3 = (token = aToken) => token
    const x1 = makeToken1({ a: 5, b: 6 })
    const x2 = makeToken2({ a: 5, b: 6 })
    const x3 = makeToken3({ a: 5, b: 6 })
    const x4 = { ...aToken, a: 5, b: 6 };
}


// const getJwtToken = privateKey => (...token) => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?
const getJwtToken = privateKey => token => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?
const buildJwtToken = privateKey => token => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?
const createJwtToken = privateKey => token => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?
const makeJwtToken = privateKey => token => JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?

const getJwtToken = privateKey => ({
    expireDate = TOMORROW,
    companyId = 'a000001',
    employeeId = 'system',
    isExternal = false,
    isAdmin = true,
}) =>
    JWT.sign(n(token), privateKey, { algorithm: 'RS256' }); // token = aToken?

const getJwtToken1 = ( token = aToken) => console.log(token);

getJwtToken(privateKey)('a000002', 'system2', { isExternal: true, isAdmin: false });
getJwtToken(privateKey)({
    companyId = 'a000002',
    employeeId = 'system2',
    isExternal = true,
    isAdmin = false,
});

{
    type JwtToken = {
        expireDate: number,
        companyId: string,
        employeeId: string,
        isExternal: boolean,
        isAdmin: boolean,
    }

    const aToken: JwtToken = {
        expireDate: 10,
        companyId = 'a000001',
        employeeId = 'system',
        isExternal = false,
        isAdmin = true,
    };

    function special2(options: JwtToken = aToken) {
        return (options.prop4 || 1001) + options.prop5;
    }

}
{
    /**
     * @typedef {object} JwtToken - creates a new type named 'SpecialType'
     * @property {number} expireDate - a string property of SpecialType
     * @property {string} companyId - a string property of SpecialType
     * @property {string} employeeId - a string property of SpecialType
     * @property {boolean} isExternal - a string property of SpecialType
     * @property {boolean} isAdmin - a string property of SpecialType
     */

    /** @type { JwtToken } */
    const aToken = {
        expireDate: TOMORROW,
        companyId = 'a000001',
        employeeId = 'system',
        isExternal = false,
        isAdmin = true,
    };


    /**
     * @param {JwtToken} options
     */
    function special1(options = aToken) {
        return (options.prop4 || 1001) + options.prop5;
    }

    special1()
}

/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {number} options.expireDate
 * @param {string} options.companyId
 * @param {string} options.employeeId
 * @param {boolean} options.isExternal
 * @param {boolean} options.isAdmin
 */
function special(options = aToken) {
    return (options.prop4 || 1001) + options.prop5;
}
//  nao quero ter que passar baseToken
// getJwtToken(privateKey)({ ...aToken}



// signToken(etc.get('auth/security/jwt/rsaPrivateKey'))({
//     ...aToken,
//     user: {
//         ...aToken.user,
//         id: 'system',
//         admin: true,
//         lastCompany: 'a000001',
//         ext: true,
//     }
// });


/*********************************************************/
/*********************************************************/
getToken(etc.get('auth/security/jwt/rsaPrivateKey'))('a000002', 'system2', true, false, etc.get('auth/security/jwt/rsaPrivateKey'))

interface Dog {
    name: string
    age: number
}

const dog: Dog = { name: 'a', age: 10 }
dog.