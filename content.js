const container = document.createElement('div');
container.innerHTML = `
  <div id="custom-console">
    <textarea id="console-input" placeholder="JavaScriptを入力..."></textarea>
    <button id="console-run">▶</button>
    <pre id="console-output"></pre>
  </div>
`;
document.body.appendChild(container);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("console.css");
document.head.appendChild(link);

document.getElementById("console-run").onclick = () => {
  const code = document.getElementById("console-input").value;
  try {
    const result = eval(code);
    document.getElementById("console-output").textContent += "> " + result + "\n";
  } catch (e) {
    document.getElementById("console-output").textContent += "! " + e + "\n";
  }
};