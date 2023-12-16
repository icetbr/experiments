
/**
 * Operations for pets.
 *
 * @namespace Pets
 */

/**
 * @typedef {object} Pets.Pet
 * @memberOf Pets
 * @property {string} name - The name of the pet.
 * @property {Pets.PetTypes} type - Is it a dog?
 * @property {Pets.PetBreeds} breed - Which breed of dog or cat is it?
 * @property {string} dateOfBirth - Date of birth of the pet.
 * @property {boolean} [neutered] - Whether the pet is neutered or not.
 */

/**
 * Operations for supporters.
 *
 * @namespace Supporters
 */

/**
 * @typedef {object} Supporters.Supporter
 * @memberOf Supporters
 * @property {string} firstName - Supporter's first name.
 * @property {string} lastName - Supporter's last name.
 * @property {string} dateOfBirth - Supporter's date of birth.
 * @property {Supporters.PaymentTiers} [paymentTier=BASIC] - How much is the supporter contributing every month?
 */

/**
 * Transaction types.
 *
 * @namespace Transactions
 */

/**
 * @typedef {object} Transactions.TransactionResponse
 * @memberOf Transactions
 * @property {boolean} success - Whether the transaction was successful or not.
 * @property {string} transactionId - Unique identifier of the transaction.
 * @property {Pets.Pet|Supporters.Supporter} data - Whatever entity was created in this transaction.
 */

export default {
    /**
     * @typedef {object} Pets.PetTypes
     * @memberOf Pets
     * @property {string} DOG - A dog.
     * @property {string} CAT - A cat.
     */
    PET_TYPES: Object.freeze({
        DOG: 'dog',
        CAT: 'cat'
    }),
    /**
     * @typedef {object} Pets.PetBreeds
     * @memberOf Pets
     * @property {string} FRENCH_BULLDOG - A funny looking frenchie.
     * @property {string} KOMONDOR - A dog with a beautiful hairdo.
     */
    PET_BREEDS: Object.freeze({
        FRENCH_BULLDOG: 'french_bulldog',
        KOMONDOR: 'komondor'
    }),
    /**
     * @typedef {object} Supporters.PaymentTiers
     * @memberOf Supporters
     * @property {number} BASIC - Basic payment tier.
     * @property {number} GOLD - Gold payment tier.
     */
    PAYMENT_TIERS: Object.freeze({
        BASIC: 100,
        GOLD: 200
    }),
    pets: {
        /**
         * Registers a new pet into the Pet Adoption Center.
         *
         * @memberOf Pets
         * @param {Pets.Pet} pet - The pet.
         * @returns {Promise<Transactions.TransactionResponse>} Details about the transaction.
         * @example
         * const sdk = require('pet-adoption-center');
         *
         * const transaction = sdk.pets.register({
         *     name: 'Atticus',
         *     type: sdk.PET_TYPES.DOG,
         *     breed: sdk.DOG_BREEDS.FRENCH_BULLDOG,
         *     dateOfBirth: '2010-03-10',
         *     neutered: false
         * });
         */
        register: async function (pet) {
            return {
                success: true,
                transactionId: '1234-5678-90',
                data: {
                    // Placeholder for the pet object
                }
            };
        },
        /**
         * Some lucky pet is getting adopted!
         *
         * @memberOf Pets
         * @param {object} options - Options object.
         * @param {Pets.Pet} options.pet - The pet being adopted.
         * @param {Supporters.Supporter} options.supporter - The supported who adopts the pet.
         * @returns {Transactions.TransactionResponse} Details about the transaction.
         * @example
         * const sdk = require('pet-adoption-center');
         *
         * // Register a pet
         * const registerTx = await sdk.pets.register({
         *     name: 'Atticus',
         *     type: sdk.PET_TYPES.DOG,
         *     breed: sdk.DOG_BREEDS.FRENCH_BULLDOG,
         *     dateOfBirth: '2010-03-10',
         *     neutered: false
         * });
         *
         * // Enroll a supporter
         * const enrollTx = await sdk.supporters.enroll({
         *     name: 'Atticus',
         *     type: sdk.PET_TYPES.DOG,
         *     breed: sdk.DOG_BREEDS.FRENCH_BULLDOG,
         *     dateOfBirth: '2010-03-10',
         *     neutered: false
         * });
         *
         * // It's a match!
         * const adoptTx = sdk.pets.adopt({ pet: registerTx.data, supporter: enrollTx.data });
         */
        adopt: function ({ pet, supporter }) {
            return {
                success: true,
                transactionId: '1234-5678-90',
                data: {
                    // Placeholder for the adoption object
                }
            };
        }
    },
    supporters: {
        /**
         * Enrolls a new supporter into our Pet Adoption Center database.
         *
         * @memberOf Supporters
         * @param {Supporters.Supporter} supporter - The supporter.
         * @returns {Transactions.TransactionResponse} Details about the transaction.
         * @example
         * const sdk = require('pet-adoption-center');
         *
         * const transaction = sdk.supporters.enroll({
         *     firstName: 'Atticus',
         *     lastName: sdk.PET_TYPES.DOG,
         *     dateOfBirth: '1983-01-01'
         * });
         */
        enroll: function (supporter) {
            return {
                success: true,
                transactionId: '1234-5678-90',
                data: {
                    // Placeholder for the supporter object
                }
            };
        }
    }
};
