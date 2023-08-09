const a1 = () => () => 'b'

const a2 = a1();

a2()

// # analysis of type inference support in object creation

{
    // every property is optional
    const employee1 = ({
        _id = '59667b5fbca8131700000005',
        company = 'a000001',
        register = '1',
        admissionDate = '2017-01-25',
        email = 'dude@gmail.com',
    } = {}) => ({
        _id,
        company,
        register,
        admissionDate,
        email,
    });

    const employee1a = employee1();


    // every property is required
    const employee2 = (props = {
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        email: 'dude@gmail.com',
    }) => props;

    const employee2a = employee2();


    // type inference works with composition as well
    const baseEmployee = () => ({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
    });

    const employee3 = ({
        admissionDate = '2017-01-25',
        email = 'dude@gmail.com',
    } = {}) => ({
        ...baseEmployee(),
        admissionDate,
        email,
    });

    const employee3a = employee3();


    // pre defined object
    const employee4 = () => ({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        email: 'dude@gmail.com',
    });

    const employee4a = employee4();


    // wrapper BREAKS type inference
    const create = props => props;

    const employee5 = create({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        email: 'dude@gmail.com',
    });

    const employee5a = employee5();


    // property concatenation BREAKS type inference
    const employee6 = props => ({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        email: 'dude@gmail.com',
        ...props,
    });

    const employee6a = employee6({});

    const employee6b = (a) => {}

    const employee6c = {
        // ...employee6b()(),
        employee6b: employee6b([{}]),
        b: 1,
    }
}






interface Employee {
    _id?: string,
    company?: string,
    register: string,
    admissionDate?: string,
    pis?: string,
}

const create = (state, type = 'employee') => (props: Employee) =>
    Object.defineProperty({ ...state, ...props }, "type", {
        enumerable: false,
        writable: true,
        value: type,
    });

const create2 = (props, state) => ({ ...state, ...props, type: 'employee' });

const employee = create({
    _id: '59667b5fbca8131700000005',
    company: 'a000001',
    register: '1',
    admissionDate: '2017-01-25',
    // firstPunchDate: '2017-01-25',
});

const b = () => ({ x: 1 })

const employeeB = () => ({
    ...b(),
    _id: '59667b5fbca8131700000005',
    company: 'a000001',
    register: '1',
    admissionDate: '2017-01-25',
    pis: '017110378819',
    // firstPunchDate: '2017-01-25',
});

const employeeA = (props: Employee) => create2(props, {
    _id: '59667b5fbca8131700000005',
    company: 'a000001',
    register: '1',
    admissionDate: '2017-01-25',
    pis: '017110378819',
    // firstPunchDate: '2017-01-25',
});

const employee1 = (props: Employee) => ({
    _id: '59667b5fbca8131700000005',
    company: 'a000001',
    register: '1',
    admissionDate: '2017-01-25',
    pis: '017110378819',
    // firstPunchDate: '2017-01-25',
});

const employee1a = () => ({
    _id: '59667b5fbca8131700000005',
    company: 'a000001',
    register: '1',
    admissionDate: '2017-01-25',
    pis: '017110378819',
    // firstPunchDate: '2017-01-25',
});



const employee2b = employee2({  })

console.log(employee({ register: '1'  }))
console.log(employeeA({ register: '1'  }))
console.log(employee1({}))
console.log(employee1a())
console.log(employee2({   }))

// const x = a.employee({ pis: 'ddv' });
// console.log(JSON.stringify(x))

const a = {
    employee: () => ({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        pis: '017110378819',
        // firstPunchDate: '2017-01-25',
    }),

    employee1: create('employee', {
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        pis: '017110378819',
        // firstPunchDate: '2017-01-25',
    }),

    employee2: create({
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        pis: '017110378819',
        // firstPunchDate: '2017-01-25',
    }),

    employee3: props => create('employee', props, {
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        pis: '017110378819',
        // firstPunchDate: '2017-01-25',
    }),

    employee4: props => ({
        type: 'employee',
        _id: '59667b5fbca8131700000005',
        company: 'a000001',
        register: '1',
        admissionDate: '2017-01-25',
        pis: '017110378819',
        ...props,
        // firstPunchDate: '2017-01-25',
    }),
}


