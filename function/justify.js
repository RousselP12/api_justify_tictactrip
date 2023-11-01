function justifyText(text="") {
    const maxLineLength = 80;
    let words = text.split(/\s+/);
    let currentLine = '';
    let justifiedLines = [];
  
    for (const word of words) {
      if (currentLine.length + word.length <= maxLineLength) {
        currentLine += word + ' ';
      } else {
        justifiedLines.push(justifyLine(currentLine.trim(), maxLineLength));
        currentLine = word + ' ';
      }
    }
  
    justifiedLines.push(justifyLine(currentLine.trim(), maxLineLength));
    return justifiedLines.join('\n');
  }
  
  function justifyLine(line, maxLength) {
    const words = line.split(' ');
  
    if (words.length === 1) {
      return line;
    }
  
    let espace = maxLength - line.length;
    let spacesToAdd = 0;
  
    while (espace > 0) {
      words[spacesToAdd % (words.length - 1)] += ' ';
      spacesToAdd++;
      espace--;
    }
    return words.join(' ');
  }

  module.exports = justifyText;