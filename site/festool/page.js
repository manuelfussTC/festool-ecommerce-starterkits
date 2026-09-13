const button=document.getElementById('copy-prompt');
const prompt=document.getElementById('prompt');
const status=document.getElementById('copy-status');
button.hidden=false;
button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(prompt.textContent.trim());status.textContent='Auftrag kopiert. Jetzt in Claude Code einfügen.';}
  catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(prompt);selection.removeAllRanges();selection.addRange(range);status.textContent='Der Auftrag ist markiert. Bitte mit Strg+C bzw. Cmd+C kopieren.';}
});
