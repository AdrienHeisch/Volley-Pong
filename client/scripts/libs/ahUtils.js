class Utils {

	/**
	 * Returns an array from the properties of an object.
	 * 
	 * @param {Object} obj 
	 */
	static objectToArray(obj)
    {
        var array = [];
        var keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) array.push(obj[keys[i]]);
        return array;
    }
	
	
	/**
	 * Returns an object with all the values of an array as properties. Keys are equal to the indexes of the array.
	 * 
	 * @param {Array} array 
	 */
    static arrayToObject(array)
    {
        var object = {}
        for (let i = 0; i < array.length; i++) object[i] = array[i];
        return object;
    }


	/**
	 * Returns a random hexadecimal RGB color (e.g. #FF6600)
	*/
	static getRandomColor() {
		var color = "#";
		var chars = "0123456789ABCDEF"
		for (let i = 0; i < 6; i++) {
			color += chars[Math.floor(Math.random() * chars.length)];
		}
		return color;
	}


	/**
	 * Returns the value of a CSS property from a CSS class.
	 * 
	 * @param {String} className Name of the CSS class, with a "." or not.
	 * @param {String} propertyName Name of the CSS property.
	 * 
	 * @return {String} The value of the CSS property.
	 */
	static getCssClassProperty(className, propertyName) {
		if (className[0] !== ".") className = "." + className;
		var classes = document.styleSheets[0].cssRules;// || document.styleSheets[0].rules;
		for (var x = 0; x < classes.length; x++) {
			if (classes[x].selectorText == className) {
				return classes[x].style.getPropertyValue(propertyName);//(classes[x].cssText ? classes[x].cssText : classes[x].style.cssText);
			}
		}
	}

	/**
	 * Applies an array of parameters to an object, and another array of parameters that won't overwrite the first one.
	 * 
	 * @param {Array} parameters The parameters passed to the constructor.
	 * @param {Array} defaultParameters The default parameters defined in the constructor.
	 */
	static setParameters(parameters, defaultParameters) {
		if (parameters !== undefined) {
			let keys = Object.keys(parameters);
			for (let i = 0; i < keys.length; i++) {
				this[keys[i]] = parameters[keys[i]];
			}
		}
		
		if (defaultParameters !== undefined) {
			let keys = Object.keys(defaultParameters);
			for (let i = 0; i < keys.length; i++) if (this[keys[i]] === undefined) this[keys[i]] = defaultParameters[keys[i]];
		}
	}

	/**
	 * Apply a function once to every possible combination of an array.
	 * 
	 * @param {Array} array 
	 * @param {Function} functionToApply 
	 */
	static doAllCombinations(array, functionToApply) {
		var tempList = [];
        for (let i = 0; i < array.length; i++) tempList[i] = array[i];
        var objA, objB;
        for (let i = tempList.length - 1; i >= 0; i--) {
            objA = tempList[i];
            tempList.pop();
            for(let j = tempList.length - 1; j >= 0; j--) {
				functionToApply(objA, objB)
			}
        }
	}

	/**
	 * Returns true if every element of the given array has the same length.
	 * 
	 * @param {Array.<Array>} array 
	 */
	static checkLengthUniformity(array) {
		var length;
		for (let i = 0; i < array.length; i++) {
			if (i === 0) {
				length = array[i].length;
				continue;
			}
			if (array[i].length !== length) return false;
		}
		return true;
	}

}

class MathPlus {

	/**
	 * 
	 * @param {Number} valueA 
	 * @param {Number} valueB 
	 * @param {Number} coef 
	 */
	static lerp(valueA, valueB, coef) {
		return valueA + (valueB - valueA) * coef;
	}

	/**
	 * 
	 * @param {Number} number 
	 * @param {Number} min 
	 * @param {Number} max 
	 */
	static clamp(number, min, max) {
		if (number < min) number = min;
		else if (number > max) number = max;
		return number;
	}
	
}

class Point {

	/**
	 * Returns the sum of the coordinates of two Points as a new Point.
	 * 
	 * @param {Point} pointA
	 * @param {Point} pointB
	 */
	static sum(pointA, pointB) {
		return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
	}

	/**
	 * Returns the distance between two Points.
	 * 
	 * @param {Point} pointA
	 * @param {Point} pointB
	 */
	static distanceTo(pointA, pointB) {
		return Math.sqrt((pointA.x + pointB.x) * (pointA.x + pointB.x) + (pointA.y + pointB.y) * (pointA.y + pointB.y));
	}

	/**
	 * Returns true if the two points have the exact same coordinates.
	 * 
	 * @param {Point} pointA 
	 * @param {Point} pointB 
	 */
	static same(pointA, pointB) {
		return pointA.x === pointB.x && pointA.y === pointB.y;
	}

	/**
	 * 
	 * @param {Number} x Horizontal coordinate.
	 * @param {Number} y Vertical coordinate.
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Returns a new Point with proportional coordinates.
	 * 
	 * @param {Number} coef 
	 */
	lerp(coef) {
		return new Point(this.x * coef, this.y * coef);
	}

	/**
	 * Returns a new Point with proportional coordinates in the direction of another Point.
	 * 
	 * @param {Point} point 
	 * @param {Number} coef 
	 */
	lerpTo(point, coef) {
		return new Point(MathPlus.lerp(this.x, point.x, coef), MathPlus.lerp(this.y, point.y, coef));
	}

	/**
	 * Returns a new Point with the same coordinates.
	*/
	clone() {
		return new Point(this.x, this.y);
	}

	/**
	 * Add the coordinates of another Point.
	 * 
	 * @param {Point} point 
	 */
	add(point) {
		this.x += point.x;
		this.y += point.y;
	}

	/**
	 * Substracts the coordinates of another Point.
	 * 
	 * @param {Point} point 
	 */
	sub(point) {
		this.x -= point.x;
		this.y -= point.y;
	}

	/**
	 * Rotates the vector represented by the Point.
	 * @param {Number} radAngle 
	 */
	rotate(radAngle) {
		var newAngle = this.angle + radAngle;
		var length = this.length;
		
		this.x = length * Math.cos(newAngle);
		this.y = length * Math.sin(newAngle);
	}

	/**
	 * Returns the length of this Point.
	 */
	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * Returns the direction of this Point.
	 */
	get angle() {
		return Math.atan2(this.y, this.x);
	}

}