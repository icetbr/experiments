const fetchAndLoad = (method, url, doc) => {
    const id = 1;
    return {
        ...doc,
        _id: id,
        cod: id,
    };
};

const test = (dsc = 'expect adds metadata') => {
    const doc = { name: 'John', age: 25 };
    const saved = fetchAndLoad('POST', 'baseUrl', doc);

    const expected = {
        name: 'John',
        age: 25,
        _id: saved._id,
        cod: 1,
    };
    console.log(JSON.stringify(saved) === JSON.stringify(expected));
};

/*
    - adds _id, cod
    - _id, cod receives the id
*/
const test2 = (dsc = 'expect adds metadata') => {
    const doc = { name: 'John', age: 25 };
    const saved = fetchAndLoad('POST', 'baseUrl', doc);

    const expected = {
        ...doc,
        _id: saved._id,
        cod: saved._id,
    };
    console.log(JSON.stringify(saved) === JSON.stringify(expected));
};

test();