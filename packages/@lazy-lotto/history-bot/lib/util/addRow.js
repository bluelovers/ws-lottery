"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRow = exports.addRow = void 0;
function addRow(id, data, row) {
    let old = getRow(id, data);
    let result = {
        ...old,
        ...row,
    };
    data[Number(id)] = result;
    return result;
}
exports.addRow = addRow;
function getRow(id, data) {
    return data[Number(id)];
}
exports.getRow = getRow;
//# sourceMappingURL=addRow.js.map