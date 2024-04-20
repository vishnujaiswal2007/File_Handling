module.exports = function (text, removals) {
    // Combine removal strings into a single regex pattern with OR operator (|)
    const removalRegex = new RegExp(removals.join("|"), "g");
    return text.replace(removalRegex, "");
}