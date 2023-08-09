const timestampToHour = (timestampInSeconds) => {
    let isNegative = false;
    if (timestampInSeconds < 0) {
        timestampInSeconds *= -1;
        isNegative = true;
    }
    const sec_num = parseInt(timestampInSeconds, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return isNegative ? `-${hours}${minutes}` : `${hours}${minutes}`;
};

function duration1(value) {
    this.value = value;
}

duration1.prototype[util.inspect.custom] = function (depth, opts) {
    return timestampToHour(this.value);
};
duration1.prototype.toString = function (depth, opts) {
    return timestampToHour(this.value);
};

var duration1a = new duration1(3600);
console.log(duration1a);

const duration = value => ({
    toString: () => timestampToHour(value),
    valueOf: () => value,
    [util.inspect.custom]: () => 'ddv',
});

const x1 = duration(3600)
const x2 = duration(60)
console.log(x1)