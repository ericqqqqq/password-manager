module.exports = {
  generator: (digits, type) => {
    let [collections, part] = ["", ""];
    if (type === "number") {
      collections = "1234567890";
    } else if (type === "symbol") {
      collections = "!@$%^&*()_+<>,./?~`";
    } else if (type === "lowerCase") {
      collections = "qwertyuiopasdfghjklzxcvbnm";
    } else if (type === "upperCase") {
      collections = "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    for (let i = 0; i < parseInt(digits); i++) {
      const select = parseInt(Math.random() * collections.length);
      part += collections[select];
    }
    return part;
  },
  shuffle: str => {
    let ctr = str.length;
    let temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr = ctr - 1;
      temp = str[ctr];
      str = replaceAt(str, ctr, str[index]);
      str = replaceAt(str, index, temp);
    }
    return str;
  }
};

function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + 1, this.length)
  );
}
