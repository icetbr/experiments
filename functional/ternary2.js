schema.statics.get = function ({ company, start, end, employeeId, employeeIds, registers, createdAfter }) {
    // period melhor que start/end!?
    const query = {
        company,
        $or: [
            { blocked: true },
            { dti: { $gte: createdAfter } },
        ],
    };

    if (start.length === 7 && start === end) {
        query.period = start.replace(/-/g, '');
    } else if (start.length === 7) {
        query.period = { $gte: start.replace(/-/g, ''), $lte: end.replace(/-/g, '') };
    } else if (start === end) {
        query['daysInfos.dia'] = start;
    } else {
        query['daysInfos.dia'] = { $gte: start, $lte: end };
    }

    if (employeeId) {
        query['employee._id'] = ObjectId(employeeId);
    } else if (employeeIds) {
        query['employee._id'] = { $in: employeeIds.map(employeeId => ObjectId(employeeId)) };
    } else {
        query['employee.matricula'] = { $in: registers };
    }

    return this.find(query).lean().exec();
};
/**************************************************************************************** */
/**
 * Too many combinations: 3 x 4 = 12 extra functions!
 */

const getBaseReckonQuery = (company) => {
    return {
        company,
        $or: [
            { blocked: true },
            { dti: { $gte: createdAfter } },
        ];
    };
};

schema.statics.getLogicalDateSingleEmployee = function ({ company, start, end, employeeId, employeeIds, registers, createdAfter }) {
    const query = {
        ...getBaseReckonQuery(company, createdAfter),
        period: start.replace(/-/g, ''),
        'employee._id': ObjectId(employeeId),
    };
    return this.find(query).lean().exec();
};

/**************************************************************************************** */
const get = (queryParams, createdAfter) => {
    const query = {
        company,
        $or: [
            { blocked: true },
            { dti: { $gte: createdAfter } },
        ],
        ...queryParams
    };

    return this.find(query).lean().exec();
};

schema.statics.getLogicalDateSingleEmployee = function ({ company, start, end, employeeId, employeeIds, registers, createdAfter }) {
    return get({
        period: start.replace(/-/g, ''),
        'employee._id': ObjectId(employeeId),
    }, createdAfter)
};

/**************************************************************************************** */
const dateStrategies = {
    logicalDate: ({ start }) => ({ period : start.replace(/-/g, '') }),
    logicalDateRange: ({ start, end }) => ({ period : { $gte: start.replace(/-/g, ''), $lte: end.replace(/-/g, '') } }),
    physicalDate: ({ start }) => ({ 'daysInfos.dia': start }),
    physicalDateRange: ({ start, end }) => ({ 'daysInfos.dia': { $gte: start, $lte: end } }),
};

const employeeStrategies = {
    oneEmployeeId: ({ employeeId }) => { 'employee._id': ObjectId(employeeId) },
    manyEmployeeIds: ({ employeeIds }) => { 'employee._id': { $in: employeeIds.map(employeeId => ObjectId(employeeId)) } },
    registers: ({ registers }) => { 'employee.matricula': { $in: registers } },
};

schema.statics.getLogicalDateSingleEmployee = function ({ company, start, end, employeeId, employeeIds, registers, createdAfter, dateStrategy, employeeStrategy }) {
    const query = {
        company,
        $or: [
            { blocked: true },
            { dti: { $gte: createdAfter } },
        ],
        ...dateStrategies[dateStrategy]({start, end}),
        ...employeeStrategies[employeeStrategy](employeeId, employeeIds, registers),
    };

    return this.find(query).lean().exec();
};


// v1
schema.statics.getLogicalDateSingleEmployee = function ({ company, start, end, employeeId, employeeIds, registers, createdAfter, dateStrategy, employeeStrategy }) {
        dateStrategies[startPeriod && endPeriod ? 'periodRange' : 'period']),
        ...employeeStrategies[employeeStrategy](employeeId, employeeIds, registers),
    };

    return this.find(query).lean().exec();
};

/**************************************************************************************** */
/**
 * - date vs dateRange: can be treated the same, differentiate them for optimization in the database
 * - employeeId vs employeeIds: can be treated the same, differentiate them for optimization in the database
 *
 * Ideals
 * - db logic must be kept in the db
 */

const configs = {
    date: dateStrategies.logicalDate,
    employee: employeeStrategies.registers,
};

const employee = (employeeId, employeeIds, registers) => {
    getQuery() {
        // BAD: db logic must be kept in the db
        // return employeeId ? '' : employeeIds ? '' : '';
        return employeeStrategies.registers;
    }
};

const employee = (employeeId, employeeIds, registers) => {
    return {
        query: employeeId ? employeeStrategies.oneEmployeeId : employeeIds ? employeeStrategies.manyEmployeeIds : employeeStrategies.registers,
        keys: employeeId ? [employeeId] : employeeIds || registers,
    }
};

getEmployeeIdString: params => {
    const employeeId =
        params.employeeId ? params.employeeId.toString() :
        params.employeeIds ? `${params.employeeIds[0].toString()}...` :
        params.registers ? `${params.registers[0]}...` :
        'all';
    const isMultiple = !params.employeeId || params.employeeIds || params.registers;
    return isMultiple && params.currentEmployeeId ? `${params.currentEmployeeId} of ${employeeId}` : employeeId;
},

loadReckons
  start
  end
  periodStart
  periodEnd
  employeeId
  employeeIds
  register
  registers



  loadReckons
  for ${params.employeeKeys.length} employees

const existingReckonsByEmployeeKey = __.groupBy(existingReckons, reckon => reckon.employee[reckonEmployeeKey]);

minimizing is branching logic
- Strategy Pattern
  - Code that inverts control to the caller is generally easier to understand
- use hash
- polymorphysm
- functional
  - maybe, cond, ifVar


Parei refactor1, pensando
- if branching
- explicit params
- value object, lambda function, parameter object


