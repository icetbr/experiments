// abstract class WORKS
{
    abstract class A {
        /**
         * The Name
         */
        abstract name: string;

        /** The Age  */
        age!: number;

        /**
         * Must be a noun and plural.
         *
         * @example
         * fetch(`http://ahgoradev.com.br/companies/a000001/${name}`)
         */
        stats: [
            1,
            2,
            3,
            4,
        ]
    }

    class B extends A {
        /** The Surname */
        surname!: string;
    }

    const x = new B();
    x.name;
}

// abstract jsdoc DOESN'T WORK
{
    /**
     * @abstract
     */
    class A {
        /**
         * The Name
         * @abstract
         */
        name: string;

        /** The Age  */
        age!: number;

        stats: [
            1,
            2,
            3,
            4,
        ]
    }

    class B extends A {
        /** The Surname */
        surname!: string;
    }

    const x = new B();
    x.name;
}

// type DOESNT WORKS because it copies all the fields anyway
{
    type A = {
        name: string,
        age: number,
    };

    type B = A & {
        surname: string,
    };

    abstract const A: A = {

        /** The Age  */
        age: 0,
    }

    const B: B = {
        ...A,
        /** The Surname */
        surname: '',
    }

    B.name;
}

