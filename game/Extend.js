module.exports = function(childConstructor, parentConstructor) {
    childConstructor.prototype = Object.create(parentConstructor.prototype);
    childConstructor.super = parentConstructor;
}