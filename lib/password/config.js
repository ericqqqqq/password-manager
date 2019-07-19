const reservedOptions = {
  numberInclude: "yes",
  upperCaseInclude: "yes",
  symbolInclude: "yes",
  numDigits: "4",
  upperCaseDigits: "2",
  symbolDigits: "2",
  totalDigits: "16"
};
const chalk = require("chalk");
let digits;

module.exports = {
  reservedOptions: {
    numberInclude: "yes",
    upperCaseInclude: "yes",
    symbolInclude: "yes",
    numDigits: "4",
    upperCaseDigits: "2",
    symbolDigits: "2",
    totalDigits: "16"
  },
  askPrompts: {
    service: {
      name: "service",
      type: "input",
      message: chalk.rgb(166, 226, 44)("Serverice? (enter service name): "),
      validate: function(value) {
        if (value === "") {
          return "Please enter name of service";
        }
        return true;
      }
    },
    totalDigits: {
      name: "totalDigits",
      type: "input",
      default: reservedOptions.totalDigits,
      message: chalk.rgb(166, 226, 44)(
        "How many digits will your password be? (enter any integer number): "
      ),
      validate: function(value) {
        const isValid = !isNaN(parseFloat(value)) && value >= 8;
        if (value === "") {
          digits = parseInt(reservedOptions.totalDigits);
          return true;
        }
        if (isValid) {
          digits = parseInt(value);
        }
        return isValid || "Please enter an integer number >= 8";
      }
    },
    numDigits: {
      name: "numDigits",
      type: "input",
      default: reservedOptions.numDigits,
      message: chalk.rgb(166, 226, 44)(
        "How many number do you want to include? (enter a number): "
      ),
      validate: function(value) {
        const isValid =
          !isNaN(parseFloat(value)) && parseInt(value) <= digits && value >= 0;
        if (value === "") {
          digits = parseInt(digits - reservedOptions.numDigits);
          return true;
        }
        if (isValid) {
          digits = digits - parseInt(value);
        }
        return isValid || `Please enter an integer below ${digits}`;
      }
    },
    upperCaseDigits: {
      name: "upperCaseDigits",
      type: "input",
      default: reservedOptions.upperCaseDigits,
      message: chalk.rgb(166, 226, 44)(
        "How many upper case do you want to include? (enter a number): "
      ),
      validate: function(value) {
        const isValid =
          !isNaN(parseFloat(value)) && parseInt(value) <= digits && value >= 0;
        if (value === "") {
          digits = parseInt(digits - reservedOptions.upperCaseDigits);
          return true;
        }
        if (isValid) {
          digits = digits - parseInt(value);
        }
        return isValid || `Please enter an integer number below ${digits}`;
      }
    },
    symbolDigits: {
      name: "symbolDigits",
      type: "input",
      default: reservedOptions.symbolDigits,
      message: chalk.rgb(166, 226, 44)(
        "How many symbols do you want include? (enter a number): "
      ),
      validate: function(value) {
        const isValid =
          !isNaN(parseFloat(value)) && parseInt(value) <= digits && value >= 0;
        if (value === "") {
          digits = parseInt(digits - reservedOptions.upperCaseDigits);
          return true;
        }
        if (isValid) {
          digits = digits - parseInt(value);
        }
        return isValid || `Please enter an integer number below ${digits}`;
      }
    },
    numInclude: {
      name: "numberInclude",
      type: "input",
      default: reservedOptions.numberInclude,
      message: chalk.rgb(166, 226, 44)(
        "Do you want to include numbers? (yes/no): "
      ),
      validate: function(value) {
        if (value === "yes" || value === "no" || value === "") {
          return true;
        } else {
          return "please enter yes/no";
        }
      }
    },
    upperCaseInclude: {
      name: "upperCaseInclude",
      type: "input",
      default: reservedOptions.upperCaseInclude,
      message: chalk.rgb(166, 226, 44)(
        "Do you want to include upper case letters? (yes/no): "
      ),
      validate: function(value) {
        if (value === "yes" || value === "no" || value === "") {
          return true;
        } else {
          return "please enter yes/no";
        }
      }
    },
    symbolInclude: {
      name: "symbolInclude",
      type: "input",
      default: reservedOptions.symbolInclude,
      message: chalk.rgb(166, 226, 44)(
        "Do you want to include symbols? (yes/no): "
      ),
      validate: function(value) {
        if (value === "yes" || value === "no" || value === "") {
          return true;
        } else {
          return "please enter yes/no";
        }
      }
    }
  }
};
