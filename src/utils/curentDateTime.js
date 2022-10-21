const moment = require("moment");

//Returns current date and time in this format - October 20th 2022, 2:26:02 pm
const formattedDateTime = () => {
    return moment().format("MMMM Do YYYY, h:mm:ss a");
}

module.exports = formattedDateTime;
