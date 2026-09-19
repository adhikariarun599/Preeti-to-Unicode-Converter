// १. प्रितीबाट युनिकोड म्यापिङ तालिका
const preetiToUniMap = {
  '1': '१', '2': '२', '3': '३', '4': '४', '5': '५',
  '6': '६', '7': '७', '8': '८', '9': '९', '0': '०',
  '-': '(', '=': '.',
  '!': 'ज्ञ', '@': 'द्द', '#': 'घ', '$': 'द्ध', '%': 'छ',
  '^': 'ट', '&': 'ठ', '*': 'ड', '(': 'ढ', ')': 'ण',
  '_': ')', '+': 'ं',
  'a': 'ब', 'b': 'द', 'c': 'अ', 'd': 'म', 'e': 'भ', 'f': 'ा',
  'g': 'न', 'h': 'ज', 'i': 'ष', 'j': 'व', 'k': 'प', 'l': 'ि',
  'm': 'ु', 'n': 'ल', 'o': 'य', 'p': 'उ', 'q': 'त्र', 'r': 'च',
  's': 'क', 't': 'त', 'u': 'ग', 'v': 'ख', 'w': 'ध', 'x': 'ह',
  'y': 'थ', 'z': 'श',
  'A': 'ब्', 'B': 'द्य', 'C': 'ऋ', 'D': 'म्', 'E': 'भ्', 'F': 'ँ',
  'G': 'न्', 'H': 'झ', 'I': 'क्ष', 'J': 'व्', 'K': 'फ्', 'L': 'ी',
  'M': 'ू', 'N': 'ल्', 'O': 'इ', 'P': 'ए', 'Q': 'त्त', 'R': 'द्ध',
  'S': 'क्', 'T': 'त्', 'U': 'ग्', 'V': 'ख्', 'W': 'ध्', 'X': 'ह्',
  'Y': 'थ्', 'Z': 'श्',
  '[': 'ृ', '{': 'ईं', ']': 'े', '}': 'ै',
  ';': 'स', ':': 'स्', "'": 'ु', '"': 'ू',
  ',': ',', '<': '?', '.': '।', '>': 'श्र',
  '/': 'र', '?': 'रु', '\\': '्', '|': '्र'
};

// २. युनिकोडबाट प्रिती म्यापिङ तालिका
const uniToPreetiMap = {
  '१': '1', '२': '2', '३': '3', '४': '4', '५': '5',
  '६': '6', '७': '7', '८': '8', '९': '9', '०': '0',
  'ज्ञ': '!', 'द्द': '@', 'द्ध': '$', 'छ': '%',
  'ट': '^', 'ठ': '&', 'ड': '*', 'ढ': '(', 'ण': ')',
  'क': 's', 'ख': 'v', 'ग': 'u', 'घ': '#', 'ङ': 'ª',
  'च': 'r', 'ज': 'h', 'झ': 'H', 'ञ': 'T', 'त': 't',
  'थ': 'y', 'द': 'b', 'ध': 'w', 'न': 'g', 'प': 'k',
  'फ': 'K', 'ब': 'a', 'भ': 'e', 'म': 'd', 'य': 'o',
  'र': '/', 'ल': 'n', 'व': 'j', 'श': 'z', 'ष': 'i',
  'स': ';', 'ह': 'x', 'ा': 'f', 'ि': 'l', 'ी': 'L',
  'ु': "'", 'ू': '"', 'े': ']', 'ै': '}', 'ं': '+',
  'ँ': 'F', 'ः': 'H', '्': '\\', '।': '.', 'अ': 'c',
  'इ': 'O', 'उ': 'p', 'ए': 'P', 'ऋ': 'C', 'त्र': 'q',
  'क्ष': 'I', 'श्र': '>', 'ईं': '{'
};

let currentMode = 'preetiToUni'; 

const inputField = document.getElementById("inputText");
const outputField = document.getElementById("outputText");
const inputLabel = document.getElementById("inputLabel");
const outputLabel = document.getElementById("outputLabel");
const modeHint = document.getElementById("modeHint");
const tabPreetiToUni = document.getElementById("tabPreetiToUni");
const tabUniToPreeti = document.getElementById("tabUniToPreeti");

function setMode(mode) {
  currentMode = mode;
  clearAll();
  
  if (mode === 'preetiToUni') {
    tabPreetiToUni.classList.add('active');
    tabUniToPreeti.classList.remove('active');
    inputLabel.innerHTML = '<strong>प्रीति टाइपिङ / इनपुट बक्स :</strong>';
    outputLabel.innerHTML = '<strong>तयार भएको युनिकोड :</strong>';
    inputField.placeholder = "यहाँ प्रिती अनुसार टाइप गर्नुहोस् वा प्रिती फन्टको टेक्स्ट पेस्ट गर्नुहोस्...";
    modeHint.innerText = "Preeti ➔ Unicode मोड सक्रिय छ";
  } else {
    tabUniToPreeti.classList.add('active');
    tabPreetiToUni.classList.remove('active');
    inputLabel.innerHTML = '<strong>युनिकोड इनपुट बक्स :</strong>';
    outputLabel.innerHTML = '<strong>तयार भएको प्रिती फन्ट :</strong>';
    inputField.placeholder = "यहाँ नेपाली युनिकोड पेस्ट गर्नुहोस् वा लेख्नुहोस्...";
    modeHint.innerText = "Unicode ➔ Preeti मोड सक्रिय छ";
  }
}

function toggleMode() {
  setMode(currentMode === 'preetiToUni' ? 'uniToPreeti' : 'preetiToUni');
}

function convertPreetiToUnicode(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    res += preetiToUniMap[ch] !== undefined ? preetiToUniMap[ch] : ch;
  }

  let chars = res.split('');
  for (let i = 0; i < chars.length - 1; i++) {
    if (chars[i + 1] === 'ि') {
      let temp = chars[i];
      chars[i] = 'ि';
      chars[i + 1] = temp;
      i++;
    }
  }
  res = chars.join('');

  res = res.replace(/ाे/g, 'ो');
  res = res.replace(/ाै/g, 'ौ');
  
  return res;
}

function convertUnicodeToPreeti(str) {
  let modified = str.replace(/([क-ह])ि/g, 'l$1');
  modified = modified.replace(/([क-ह]्[क-ह])ि/g, 'l$1');
  
  modified = modified.replace(/ो/g, 'ाे');
  modified = modified.replace(/ौ/g, 'ाै');

  let res = "";
  for (let i = 0; i < modified.length; i++) {
    let ch = modified[i];
    res += uniToPreetiMap[ch] !== undefined ? uniToPreetiMap[ch] : ch;
  }
  return res;
}

inputField.addEventListener("input", function() {
  let text = inputField.value;
  if (currentMode === 'preetiToUni') {
    outputField.value = convertPreetiToUnicode(text);
  } else {
    outputField.value = convertUnicodeToPreeti(text);
  }
});

function clearAll() {
  inputField.value = "";
  outputField.value = "";
}

function copyInput() {
  if (!inputField.value) return;
  navigator.clipboard.writeText(inputField.value);
  alert("इनपुट बक्सको टेक्स्ट कपि भयो!");
}

// आउटपुट बक्सको टेक्स्ट एकैचोटि कपी गर्ने फङ्सन
function copyOutput() {
  if (!outputField.value) return;
  navigator.clipboard.writeText(outputField.value);
  alert("नतिजा सफलतापूर्वक कपी भयो!");
}
