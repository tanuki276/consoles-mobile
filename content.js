const container = document.createElement('div');
container.innerHTML = `
  <div id="custom-console" style="position:fixed;bottom:0;left:0;width:100%;background:#111;color:#0f0;font-family:monospace;z-index:99999;padding:8px;">
    <textarea id="console-input" placeholder="JavaScriptを入力..." style="width:80%;height:60px;background:#000;color:#0f0;"></textarea>
    <button id="console-run">▶</button>
    <pre id="console-output" style="max-height:200px;overflow:auto;background:#000;padding:5px;margin-top:5px;"></pre>
  </div>
`;
document.body.appendChild(container);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("console.css");
document.head.appendChild(link);

function isSafeCode(code) {
  const forbidden = [
    "chrome.runtime", "fetch(", "XMLHttpRequest", "eval(", "Function(", "while(true", "for(;;", "document.cookie", "window.location", "localStorage", "sessionStorage"
  ];
  return !forbidden.some(word => code.includes(word));
}

document.getElementById("console-run").onclick = () => {
  const code = document.getElementById("console-input").value;
  const output = document.getElementById("console-output");
  if (!isSafeCode(code)) {
    output.textContent += "! ⚠️ \n";
    return;
  }
  try {
    const result = Function('"use strict";return (' + code + ')')();
    output.textContent += "> " + result + "\n";
  } catch (e) {
    output.textContent += "! " + e + "\n";
  }
};