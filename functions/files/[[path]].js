export async function onRequest(context) {
  return new Response(HTML, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

const HTML = `<!DOCTYPE html>
<html>
<head>
<title>Download</title>
<style>
body {
  background-color: #bde6ff;
  color: black;
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 100px;
}
button {
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
</head>
<body>
<h1>Download Page</h1>
<button onclick="history.back()">Go Back</button>
<button id="downloadbut" onclick="goDownload()" style="background-color: rgb(0, 255, 0);">Download Loading...</button>
<script>
const fileName = decodeURIComponent(
  window.location.pathname.split("/files/")[1] || ""
);
const button = document.getElementById("downloadbut");
const downloadUrl =
  "https://pub-7c187bc0b63146cd9ed399c7cd9e6002.r2.dev/files/" +
  encodeURIComponent(fileName);

function init() {
  if (!fileName) {
    button.textContent = "No file specified";
    document.title = "No File"
    button.disabled = true;
    return;
  }
  button.textContent = "Download " + fileName;
  document.title = "Download " + fileName;
  window.goDownload = function () {
    window.location.href = downloadUrl;
  };
}
init();
<\/script>
</body>
</html>`;
