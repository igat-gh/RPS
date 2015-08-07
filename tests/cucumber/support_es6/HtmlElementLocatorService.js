/**
 * @module
 * @type {{getLocator: Function}}
 */
var HtmlElementLocatorService = {
    /**
     * Gets valid HTML locator from human readable form. Transforms all parameters to lower case and replaces space
     * characters with specified delimiter (hyphen by default) to make them valid for use in HTML attributes,
     * then combines all parts into one string.
     * @param {string} name Human readable name of the element.
     * @param {string} prefix Human readable prefix of the element.
     * @param {string} postfix Human readable postfix of the element.
     * @param {string} delimiter Allows you to customize default delimiter with custom.
     * @return {string} Valid string to be used as a value within such HTML attributes as 'id' and 'class'.
     */
    getLocator: function(name, prefix, postfix, delimiter) {
        var prefix = prefix || '',
            postfix = postfix || '',
            delimiter = delimiter || '-',
            name = prefix + ' ' + name + ' ' + postfix;
        return name.trim().toLowerCase().replace(/\s+/g, delimiter);
    },
    /**
     * Function to format string, replace the "{}" values of the 'arguments'.
     * @param {string} string String that contains entries for replacement - "{}".
     * @return {string} Formatted string.
     */
    getFormattedString: function(string) {
        for(var i = 0; i < (arguments.length - 1); ++i) {
            var regexp = new RegExp('\\{' + i + '\}');
            var formatted = string.replace(regexp, arguments[i + 1]);
        }
        return formatted;
    }
};

module.exports = HtmlElementLocatorService;