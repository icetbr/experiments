// class WORKS
{
    class A {
        /**
         *
         * The **Name**
         */
        name,

        /** The Age  */
        age,

        stats: [
            1, 2
            2, 3
            3, 4
            4, 5
        ]
    }

    class B extends A {
        /** The Surname */
        surname,
    }

    const x = new B();
    x.name;
}

// object WORKS
{
    const A = {
        /** The Name  */
        name,

        /** The Age  */
        age,
    }

    const B = {
        ...A,
        /** The Surname */
        surname,
    }

    B.name;
}

// factory WORKS
{
    const A = (name, age) => ({
        /** The Name  */
        name,

        /** The Age  */
        age,
    })

    const B = (name, age, surname) => ({
        ...A(name, age),
        /** The Surname */
        surname,
    })

    B().name;
}
