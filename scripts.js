// Get referral info from URL (for Person A's link)
const urlParams = new URLSearchParams(window.location.search);
const referrer = urlParams.get('ref');

if (referrer) {
  // Store referral info in localStorage (Person A's ID or Name)
  localStorage.setItem('referrer', referrer);
}

// Handle form submission
document.getElementById('matchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const partnerName = document.getElementById('partnerName').value;
  const partnerAge = document.getElementById('partnerAge').value;
  const partnerBirthday = document.getElementById('partnerBirthday').value;
  
  // Generate random match percentage between 30% and 90%
  const matchPercentage = Math.floor(Math.random() * (90 - 30 + 1)) + 30;

  // Store Person B's data in localStorage
  localStorage.setItem('bName', name);
  localStorage.setItem('bPartnerName', partnerName);
  localStorage.setItem('bPartnerAge', partnerAge);
  localStorage.setItem('bPartnerBirthday', partnerBirthday);
  localStorage.setItem('matchPercentage', matchPercentage);

  // Show the match percentage and message
  document.getElementById('matchPercentage').textContent = matchPercentage + '%';
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('sentMessage').textContent = `Your details have been sent to your friend: ${referrer}.`;
  document.getElementById('sentMessage').classList.remove('hidden');

  // Show the share and delete buttons
  document.getElementById('deleteBtn').classList.remove('hidden');
  document.getElementById('shareBtn').classList.remove('hidden');

  // Set the delete button to remove stored details
  document.getElementById('deleteBtn').onclick = function() {
    localStorage.removeItem('bName');
    localStorage.removeItem('bPartnerName');
    localStorage.removeItem('bPartnerAge');
    localStorage.removeItem('bPartnerBirthday');
    localStorage.removeItem('matchPercentage');
    alert('Your details have been deleted.');
    window.location.reload();
  };

  // Generate referral link for sharing
  const referralLink = `https://your-username.github.io/match-your-gf-bf/?ref=${name}`;

  document.getElementById('shareBtn').onclick = function() {
    alert('Share this link: ' + referralLink);
  };

  // Clear form
  document.getElementById('matchForm').reset();
});

// Display Person B's details on Person A's page
if (localStorage.getItem('referrer')) {
  const referrer = localStorage.getItem('referrer');
  const bName = localStorage.getItem('bName');
  const bPartnerName = localStorage.getItem('bPartnerName');
  const bPartnerAge = localStorage.getItem('bPartnerAge');
  const bPartnerBirthday = localStorage.getItem('bPartnerBirthday');
  const matchPercentage = localStorage.getItem('matchPercentage');

  if (referrer && bName && bPartnerName) {
    document.body.innerHTML = `
      <h1>Person A's Match Details</h1>
      <p>Referrer: ${referrer}</p>
      <p>Person B: ${bName}</p>
      <p>Partner's Name: ${bPartnerName}</p>
      <p>Partner's Age: ${bPartnerAge}</p>
      <p>Partner's Birthday: ${bPartnerBirthday}</p>
      <p>Match Percentage: ${matchPercentage}%</p>
    `;
  }
}
