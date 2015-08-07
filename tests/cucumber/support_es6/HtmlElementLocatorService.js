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
     * Substitutes index to a string selector, who is looking for the elements of child elements (:nth-child) in the table
     * @param {string} selector A selector that includes a field for inserting an index
     * @param {number} index Cell index
     * @return {string} String with index for searching cells in a table
     */
    getCellLocator: function(selector, index) {
        return selector.replace(/\{index}/, ++index);
    }
};

module.exports = HtmlElementLocatorService;