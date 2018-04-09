/**
 * 
 * @param {Number} x Horizontal coordinate.
 * @param {Number} y Vertical coordinate.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Returns the sum of the coordinates of two Points as a new Point.
 * 
 * @param {Point} pointA
 * @param {Point} pointB
 */
Point.sum = function(pointA, pointB) {
    return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
}

/**
 * Returns the distance between two Points.
 * 
 * @param {Point} pointA
 * @param {Point} pointB
 */
Point.distanceTo = function(pointA, pointB) {
    return Math.sqrt((pointA.x + pointB.x) * (pointA.x + pointB.x) + (pointA.y + pointB.y) * (pointA.y + pointB.y));
}

/**
 * Returns true if the two points have the exact same coordinates.
 * 
 * @param {Point} pointA 
 * @param {Point} pointB 
 */
Point.same = function(pointA, pointB) {
    return pointA.x === pointB.x && pointA.y === pointB.y;
}

Point.prototype.setTo = function(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Returns a new Point with proportional coordinates.
 * 
 * @param {Number} coef 
 */
Point.prototype.lerp = function(coef) {
    return new Point(this.x * coef, this.y * coef);
}

/**
 * Returns a new Point with proportional coordinates in the direction of another Point.
 * 
 * @param {Point} point 
 * @param {Number} coef 
 */
Point.prototype.lerpTo = function(point, coef) {
    return new Point(MathPlus.lerp(this.x, point.x, coef), MathPlus.lerp(this.y, point.y, coef));
}

/**
 * Returns a new Point with the same coordinates.
*/
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
}

/**
 * Add the coordinates of another Point.
 * 
 * @param {Point} point 
 */
Point.prototype.add = function(point) {
    this.x += point.x;
    this.y += point.y;
}

/**
 * Substracts the coordinates of another Point.
 * 
 * @param {Point} point 
 */
Point.prototype.sub = function(point) {
    this.x -= point.x;
    this.y -= point.y;
}

/**
 * Rotates the vector represented by the Point.
 * @param {Number} radAngle 
 */
Point.prototype.rotate = function(radAngle) {
    var newAngle = this.angle + radAngle;
    var length = this.length;
    
    this.x = length * Math.cos(newAngle);
    this.y = length * Math.sin(newAngle);
}

Object.defineProperties(Point.prototype, {
    length: {
        /**
         * Returns the length of this Point.
         */
        get: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    },

    angle: {
        /**
        * Returns the direction of this Point.
        */
        get: function() {
            return Math.atan2(this.y, this.x);
        },

        set: function(radAngle) {
            this.x = this.length * Math.cos(radAngle);
            this.y = this.length * Math.sin(radAngle);
        }
    }
});

module.exports = Point;