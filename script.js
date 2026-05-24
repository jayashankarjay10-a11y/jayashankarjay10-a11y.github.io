// Privacy Modal Logic
const privacyBtns = document.querySelectorAll(".open-privacy-modal");
const privacyModal = document.getElementById("privacyModal");
const closeBtn = document.querySelector(".close-btn");

privacyBtns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    privacyModal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", function() {
  privacyModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target === privacyModal) {
    privacyModal.style.display = "none";
  }
});

function copyEmail(e) {
  e.preventDefault();
  
  // We break the email apart so bots can't read it
  const user = "jayashankar.jay10";
  const domain = "gmail.com";
  const safeEmail = user + "@" + domain;

  // The function that changes the button text
  function showSuccess() {
    const btn = document.getElementById("contactBtn");
    btn.innerText = "Email Copied! ✅";
    setTimeout(() => btn.innerText = "Contact Me", 2500);
  }

  // Try the modern way first (works on live HTTPS websites)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(safeEmail).then(() => {
      showSuccess();
    });
  } else {
    // Fallback way (works when testing locally on your computer)
    const textArea = document.createElement("textarea");
    textArea.value = safeEmail;
    textArea.style.position = "fixed"; // Keep it hidden
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showSuccess();
    } catch (err) {
      console.error('Fallback failed', err);
    }
    document.body.removeChild(textArea);
  }
}

// RSS Feed Fetcher
async function fetchGamingNews() {
  const rssGrid = document.getElementById('rss-news-grid');
  // Using a free RSS to JSON API and GameSpot's RSS feed
  const rssUrl = 'https://www.gamespot.com/feeds/news/';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'ok') {
      rssGrid.innerHTML = ''; // Clear loading text
      
      // Get the top 8 articles
      const articles = data.items.slice(0, 8);
      
      articles.forEach(article => {
        // Format the date
        const pubDate = new Date(article.pubDate);
        const dateString = pubDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        const cardHtml = `<a href="${article.link}" class="rss-item" target="_blank"><div class="rss-date">${dateString}</div><div class="rss-title">${article.title}</div></a>`;
        rssGrid.innerHTML += cardHtml;
      });
    } else {
      rssGrid.innerHTML = '<p style="font-size: 0.8rem; color: #777; padding-left: 10px;">Failed to load news.</p>';
    }
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    rssGrid.innerHTML = '<p style="font-size: 0.8rem; color: #777; padding-left: 10px;">Failed to load news.</p>';
  }
}

// Call the function to fetch news
fetchGamingNews();

// Accordion Logic for Main Content Sections
const toggleTitles = document.querySelectorAll(".toggle-title");

toggleTitles.forEach(title => {
  title.addEventListener("click", function() {
    // Toggle active class on title to spin the arrow icon
    this.classList.toggle("active");
    
    // Find the next sibling which is the accordion-wrapper and toggle it
    const wrapper = this.nextElementSibling;
    if (wrapper && wrapper.classList.contains("accordion-wrapper")) {
      wrapper.classList.toggle("active");
    }
  });
});
