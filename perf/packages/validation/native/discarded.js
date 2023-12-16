const vMap = new Map();
vMap.set('number', number);
vMap.set('negNumber', number);
vMap.set('maxNumber', number);
vMap.set('string', string);
vMap.set('longString', string);
vMap.set('boolean', boolean);

const map = data => {
    for (const [key, value] of vMap) {
        if (!value(data[key])) throw Error('wrong');
    }
    return true;
};
