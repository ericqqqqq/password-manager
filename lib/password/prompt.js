const inquirer = require("inquirer");
const config = require("./config");
const prompt = config.askPrompts;
const serviceOption = [prompt.service];
const totalDigitOption = [prompt.totalDigits];
const numDigitsOption = [prompt.numDigits];
const upperCaseDigitsOption = [prompt.upperCaseDigits];
const symbolDigitsOption = [prompt.symbolDigits];
const generalOptions = [
  prompt.upperCaseInclude,
  prompt.numInclude,
  prompt.symbolInclude
];

module.exports = {
  askCreateOptions: async () => {
    let includes = {};
    let detailOptions = [];
    const detailFunc = {
      numberInclude: numDigitsOption,
      upperCaseInclude: upperCaseDigitsOption,
      symbolInclude: symbolDigitsOption
    };
    const service = await askQuestions(serviceOption);
    const totalDigits = await askQuestions(totalDigitOption);
    const generals = await askQuestions(generalOptions);

    let digit = totalDigits.totalDigits;
    const details = {};

    for (key in generals) {
      if (generals[key] === "" || generals[key] === "yes") {
        includes[key] = true;
      }
    }
    for (key in includes) {
      if (includes[key]) {
        detailOptions.push(detailFunc[key][0]);
      }
    }

    for (i = 0; i < detailOptions.length; i++) {
      if (digit > 0){
        const r = await askQuestions(detailOptions[i]);
        details[detailOptions[i].name] = r[detailOptions[i].name];
        digit = digit - r[detailOptions[i].name];
      }
    }

    const options = Object.assign(service, totalDigits, generals, details);
    return options;
  },
  askReadOptions: async () => {
    const service = await askQuestions(serviceOption);
    return service;
  }
};

function askQuestions(options) {
  return inquirer.prompt(options);
}
