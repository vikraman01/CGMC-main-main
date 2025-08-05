// Handles form submission; interacts with a local Node server
document.getElementById('staffForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/add-staff', { method: 'POST', body: formData });
  alert(await res.text());
  e.target.reset();
});
