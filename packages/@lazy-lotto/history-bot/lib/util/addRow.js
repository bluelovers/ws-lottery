"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRow = addRow;
exports.getRow = getRow;
function addRow(id, data, row) {
    let old = getRow(id, data);
    let result = {
        ...old,
        ...row,
    };
    data[Number(id)] = result;
    return result;
}
function getRow(id, data) {
    return data[Number(id)];
}
//# sourceMappingURL=addRow.js.map