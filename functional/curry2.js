split(csvBuffer, '\n').map(l => l.split(';'));
csvBuffer.split('\n').map(l => l.split(';'));
split('\n')(csvBuffer).map(split(';'));
splitLines(csvBuffer).map(splitSemi);
csvBuffer.toString().split('/n').map(l => l.split(';'));

csvBuffer.map(split('\n')).map(l => l.split(';'));
reSplit(csvBuffer, '/n', ';');
split(csvBuffer, '\n').map(l => l.split(';'));
splitLines(csvBuffer).map(split(';'));

 const toArray2 = csvBuffer => split('\n')(csvBuffer).map(split(';'));
 const toArray4 = csvBuffer => splitLines(csvBuffer).map(splitSemi);
 const toArray5 = csvBuffer => csvBuffer.toString().split('/n').map(l => l.split(';'));
 const toArray6 = csvBuffer => reSplit(csvBuffer, '/n', ';');

 const split = separator => stringeable => stringeable.toString().split(separator);
 const csvToArray = csv => split('\n')(csv).map(split(';'));
 csvToArray(csvBuffer, ';');

const toArray1 = csvBuffer => split(csvBuffer, '\n').map(l => l.split(';'));
const toArray3 = csvBuffer => splitLines(csvBuffer).map(split(';'));

const splitLines1 = value => split(value, '\n');
const splitLines2 = value => split('\n');


const toArray2a = ({ company, csvBuffer }) =>
    csvBuffer.toString().split('\n').map(l => l.split(';'));
    csvBuffer.toString().split('\n').map(split(';'));
    splitLines(csvBuffer).map(split(';'));

const importFromCsv2 = async ({ company, doc: { csv:csvBuffer } }) => {
    csvToArray(csvBuffer, ';')
    .map(toSimpleEvent(company))
    .map(withEmployeeId) // async // need to load amm employees, this breaks the chain
    .map(withMatchingFcsEventsFromDb)
    .partition(hasMissingRegisters)
    .partition(hasIntersectingHours)
    .reduce(mergeWithLoaded, [])
    // .upsertChanged,
};