// Date.prototype.toString = function () {
//     return this.toISOString().substring(0, 16);
// }


// Date.prototype.toString = function () {
//     // function dateToLocalISO(date) {
//         const off = this.getTimezoneOffset()
//         const absoff = Math.abs(off)
//         return (new Date(this.getTime() - off * 60 * 1000).toISOString().substr(0, 16) +
//             (off > 0 ? '-' : '+') +
//             (absoff / 60).toFixed(0).padStart(2, '0') + ':' +
//             (absoff % 60).toString().padStart(2, '0'))
//     // }

/********************/
        class Custom {
            constructor(foo, bar) {
                this.foo = foo;
                this.bar = bar;
            }

            [util.inspect.custom](depth, opts) {
                return this.foo + this.bar;
            }

            // toString() {
            //     return 'ddv'
            // }

            valueOf() {
                return 'ddv2'
            }
        }

        Custom.prototype.toString = function () {
        // // function dateToLocalISO(date) {
        //     const off = this.getTimezoneOffset()
        //     const absoff = Math.abs(off)
        //     return new Date(this.getTime() - off * 60 * 1000).toISOString().substr(0, 16)
        //         // (off > 0 ? '-' : '+') +
        //         // (absoff / 60).toFixed(0).padStart(2, '0') + ':'
        //         // (absoff % 60).toString().padStart(2, '0'))
        // // }

        return 'ddv3';
    }

    const n = new Custom(3, 5);
    const n1 = {
        n,
        k: 1
    }
        console.log(n); // Prints '8'

