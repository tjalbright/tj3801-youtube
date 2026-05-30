export async function onRequest(context) {
  return new Response(HTML, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

const HTML = `<!DOCTYPE html>
<html>
<head>
<title>My Test Site</title>
<style>
body {
  background-color: #111;
  color: white;
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
<button id="downloadbut" onclick="goDownload()">Download Loading...</button>
<script>
const fileName = decodeURIComponent(
  window.location.pathname.split("/files/")[1] || ""
);
const button = document.getElementById("downloadbut");
const downloadUrl =
  "https://pub-7c187bc0b63146cd9ed399c7cd9e6002.r2.dev/files/" +
  encodeURIComponent(fileName);

async function checkExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function init() {
  if (!fileName) {
    button.textContent = "No file specified";
    button.disabled = true;
    return;
  }
  button.textContent = "Checking file...";
  const exists = await checkExists(downloadUrl);
  if (!exists) {
    button.textContent = "File not found";
    button.disabled = true;
    return;
  }
  button.textContent = "Download " + fileName;
  window.goDownload = function () {
    window.location.href = downloadUrl;
  };
}
init();
<\/script>
</body>
</html>`;