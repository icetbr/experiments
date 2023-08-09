const t = value => {
    const add = n => t(value + n);
    
    return Object.assign(add, {
        toString: () => `t(${value})`,
        valueOf: () => value
    });
};

const x = 20;
const a = t(x)(t(0));
const b = t(x + 1);
//console.log(t(x)(1)(2).valueOf())

const event1 = {
    range: 10,
    name: 'a',
}
const event2 = {
    range: 20,
    name: 'b',
}
// event1.valueOf = function () { return this.range } ;
// event2.valueOf = function () { return this.range } ;
// console.log(event2 + event1)

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



