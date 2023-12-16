{
    const linkedEmployee =
        doc.employeeLink          ? await getAdmittedById(company, doc.employeeLink, { _id: 1 }) :
        doc.employeeRegisterLink  ? await getAdmittedByRegister(company, doc.employeeRegisterLink, { _id: 1 }) :
                                    null;

    if (linkedEmployee instanceof Error ) return new Error('not found')
}

{
    if (doc.employeeLink) linkedEmployee = getAdmittedById(company, doc.employeeLink, 'employeeLink')
}

{
    employeeLink = exists(getAdmittedById)
}
{
    employeeLink = getAdmittedById || error('')
}
{
    set(doc, 'employeeLink', getAdmittedById(company))
    getIfExists(doc, 'employeeLink', getAdmittedById(company))
}

{
    const valid1 = () => {
        const linkedEmployee = await this.getAdmittedById(company, doc.employeeLink, { _id: 1, [m.pis]: 1, [m.name]: 1 });
        if (!linkedEmployee) return { errors: [(notFound(doc, 'employeeLink'))] };

        const errors = [];
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        return linkedEmployee._id : { errors };
    }

    const valid2 = () => {
        const linkedEmployee =
            doc.employeeLink          ? getAdmittedById(company, doc.employeeLink) :
            doc.employeeRegisterLink  ? getAdmittedByRegister(company, doc.employeeRegisterLink) :
                                        null;

            if (instanceof Error) return errors{}

            const errors = [];
            if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
            if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
            return { errors };
    }

    const valid3 = () => {
        if (document.employeeLink) {
            const linkedEmployee = await this.getAdmittedById(company, doc.employeeLink, { _id: 1, [m.pis]: 1, [m.name]: 1 });
            if (!linkedEmployee) return { errors: [(notFound(doc, 'employeeLink'))] };

            const errors = [];
            if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
            if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
            return { errors };
        }


        const errors = [];
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        return { errors };
    }


    const valid1 = () => {
        const linkedEmployee = await this.getAdmittedById(company, doc.employeeLink, { _id: 1, [m.pis]: 1, [m.name]: 1 });
        if (!linkedEmployee) return { errors: [(notFound(doc, 'employeeLink'))] };

        const errors = [];
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        return { errors };
    }

}
{

    const valid1 = (id) => {
        const linkedEmployee = await fn(company, doc[field], { _id: 1, [m.pis]: 1, [m.name]: 1 });
        if (!linkedEmployee) return { errors: [(notFound(doc, field))] };

        const errors = [];
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        if (!linkedEmployee.name === document.name) errors.push(notFound(doc, 'employeeLink'));
        return { errors };
    }
    linkedEmployeeById = linkedEmplolyee(this.getAdmittedById, 'employeeLink')
    linkedEmployeeById = linkedEmplolyee(this.getAdmittedById(company, doc.employeeLink, {}), 'employeeLink')

employeeLink                            : ['dados.link_funcionario'               , objectId.external(linkedEmployeeById), '59667b5fbca8131700000005' , ''               ,                 ],
}

const linkedEmployee =
    doc.employeeLink          ? getAdmittedById(company, doc.employeeLink) :
    doc.employeeRegisterLink  ? getAdmittedByRegister(company, doc.employeeRegisterLink) :
                                null;
if (linkedEmployee instanceof Error ) return new Error(not found)

if (doc.employeeLink)         validDoc.employeeLink = (await getAdmittedById(company, doc.employeeLink, { _id: 1 }))?._id || throwNotFound(doc, 'employeeLink');
if (doc.employeeRegisterLink) validDoc.employeeLink = (await getAdmittedByRegister(company, doc.employeeRegisterLink, { _id: 1 }))?._id || throwNotFound(doc, 'employeeRegisterLink');



if (doc.employeeLink)         validDoc.employeeLink = (await this.getAdmittedById(company, doc.employeeLink, { _id: 1, [m.pis]: 1, [m.name]: 1 }))?._id               || throwNotFound(doc, 'employeeLink');
if (doc.employeeRegisterLink) validDoc.employeeLink = (await this.getAdmittedByRegister(company, doc.employeeRegisterLink, { _id: 1 }))?._id || throwNotFound(doc, 'employeeRegisterLink');


const validateLinkedEmplolyee =
    doc.employeeLink         ? await this.getAdmittedById(company, doc.employeeLink, { _id: 1, [m.pis]: 1, [m.name]: 1 })               || notFound(doc, 'employeeLink') :
    doc.employeeRegisterLink ? await this.getAdmittedByRegister(company, doc.employeeRegisterLink, { _id: 1, [m.pis]: 1, [m.name]: 1 }) || notFound(doc, 'employeeRegisterLink') :
                               null;
