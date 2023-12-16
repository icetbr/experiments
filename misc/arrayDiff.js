import patch from "micropatch";
import diff from "microdiff";
const obj1 = {
	originalProperty: true,
};
const obj2 = {
	originalProperty: false,
	newProperty: "new"
};
// console.log(patch(obj1,[{type: "CREATE", path: ["newProperty"], value: "new"}])); // using diffs from other sources


const obj1a = ['1', '2']
const obj2a = ['3']

console.log(diff(obj1a, obj2a)); // using diffs from other sources
