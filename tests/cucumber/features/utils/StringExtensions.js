/**
 * Trims all white spaces from the start and the end of the string.
 * @method trim
 *
 * @memberOf String
 */
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}

/**
 * Function to format string, replace the "{}" values of the 'arguments'.
 * @method format
 * @memberOf String 
 * 
 * @param {string} string String that contains entries for replacement - "{}".
 * @return {string} Formatted string.
 */
if (typeof String.format !== 'function') {
	String.format = function(string) {
        var formatted = string;
		for(var i = 0; i < (arguments.length - 1); ++i) {
            var regexp = new RegExp('\\{' + i + '\}');
            formatted = string.replace(regexp, arguments[i + 1]);
        }
        return formatted;
	}
}