#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const minimist = require("minimist");

const password = require("./lib/password/create");
const prompt = require("./lib/password/prompt");

const pwdPath = `${__dirname}/password.txt`;

const args = process.argv;

// TODO: easy to type mode
// TODO: password customizable
async function main(params) {
  console.log(chalk.rgb(250, 226, 44)("Running Password Manager..."));
  const { mode, m } = params;
  if (m && mode) {
    console.log(
      `${chalk.rgb(250, 0, 44)("ERROR::: please input")} ${chalk.rgb(
        166,
        226,
        44
      )("pm --mode MODE")} ${chalk.rgb(250, 0, 44)("or")} ${chalk.rgb(
        166,
        226,
        44
      )("pm -m MODE")}`
    );
    return;
  }

  if (mode === "create" || m === "create") {
    const { service, code } = await createPassword();
    write(service, code, pwdPath);
  } else if (mode === "read" || m === "read") {
    const { service } = await readPassword();
    read(service, pwdPath);
  } else {
    console.log(
      `${chalk.rgb(250, 0, 44)("ERROR::: please input")} ${chalk.rgb(
        166,
        226,
        44
      )("pm --mode MODE")} ${chalk.rgb(250, 0, 44)("or")} ${chalk.rgb(
        166,
        226,
        44
      )("pm -m MODE")}`
    );
  }
}

function toInt(input) {
  return (output = typeof input === "undefined" ? 0 : parseInt(input));
}

async function readPassword() {
  const options = await prompt.askReadOptions();
  return options;
}

async function createPassword() {
  const options = await prompt.askCreateOptions();
  let {
    service,
    numberInclude,
    upperCaseInclude,
    symbolInclude,
    numDigits,
    upperCaseDigits,
    symbolDigits,
    totalDigits
  } = options;

  numDigits = toInt(numDigits);
  upperCaseDigits = toInt(upperCaseDigits);
  symbolDigits = toInt(symbolDigits);
  totalDigits = toInt(totalDigits);

  const lowerCaseDigits =
    totalDigits - symbolDigits - upperCaseDigits - numDigits;
  let code = "";
  if (numberInclude === "yes") {
    code += password.generator(numDigits, "number");
  }
  if (upperCaseInclude === "yes") {
    code += password.generator(upperCaseDigits, "upperCase");
  }
  if (symbolInclude === "yes") {
    code += password.generator(symbolDigits, "symbol");
  }
  code += password.generator(lowerCaseDigits, "lowerCase");
  code = password.shuffle(code);

  return { service, code };
}

function read(service, path) {
  const s = service.toUpperCase();
  let r = "not found";
  fs.readFile(path, "utf-8", function(_, buf) {
    const result = buf.split("<#new>");
    const found = result.find(function(el) {
      return el.split(":")[0] === s;
    });
    if (found) {
      console.log(chalk.rgb(166, 226, 44)(found));
      return;
    }
    console.log(chalk.rgb(166, 226, 44)(r));
  });
}

function write(service, password, path) {
  const s = service.toUpperCase();
  if (!fs.existsSync(path)) {
    fs.writeFile(path, "");
  }
  fs.readFile(path, "utf-8", function(_, buf) {
    let result = buf;
    let data = `${result}<#new>${s}: ${password}`;
    result = buf.split("<#new>");
    const found = result.find(function(el) {
      return el.split(":")[0] === s;
    });
    if (found) {
      const index = result.indexOf(found);
      result[index] = `${s}: ${password}`;
      data = "";
      result.forEach(element => {
        if (element === "") {
          return;
        }
        data = data + "<#new>" + element;
      });
    }

    fs.writeFile(path, data, () => {
      console.log(chalk.rgb(250, 226, 44)("Created"));
    });
  });
}

main(minimist(args));
