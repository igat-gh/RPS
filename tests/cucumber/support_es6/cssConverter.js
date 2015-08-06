var cssConverter = {
    getCssString: function(filterName) {
        return filterName.trim().toLowerCase().replace(/\s+/g,'-');
    }
};

module.exports = cssConverter;