const utils = {
    isDataValid: data => {
        let isValid = false;
        if (data !== undefined && data !== null) isValid = true;
        return isValid;
    },
    isStringNonEmpty: data => {
        let isNonEmpty = false;
        if (utils.isDataValid(data)) {
            if (data !== '') isNonEmpty = true;
        }
        return isNonEmpty;
    },
    isDate: (date) => {
        return (new Date(date) !== 'Invalid Date') && !isNaN(new Date(date));
    }
};

module.exports = utils;
