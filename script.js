// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler (client-side only, no backend)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation (HTML5 validation already handles required fields)
            if (name && email && message) {
                // Show success message
                alert('Thank you for your message, ' + name + '! We will get back to you soon.\n\nNote: This is a demo form with no backend. In a real application, this would send your message to our support team.');
                
                // Reset form
                contactForm.reset();
            }
        });
    }

    // Quotes API functionality
    const quoteContainer = document.getElementById('quoteContainer');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    if (!quoteContainer || !newQuoteBtn) {
        console.error('Quote elements not found');
        return;
    }

    // Fallback quotes in case API fails
    const fallbackQuotes = [
        { text: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu" },
        { text: "The greatest healing therapy is friendship and love.", author: "Hubert H. Humphrey" },
        { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
        { text: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins" },
        { text: "Courage is not the absence of fear, but action in spite of it.", author: "Mark Twain" },
        { text: "Every day may not be good, but there's something good in every day.", author: "Alice Morse Earle" },
        { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
        { text: "The human spirit is stronger than anything that can happen to it.", author: "C.C. Scott" }
    ];

    // Function to fetch a quote from the API with multiple fallbacks
    async function fetchQuote() {
        try {
            // Show loading state
            quoteContainer.innerHTML = '<div class="quote-loading">Loading quote...</div>';
            newQuoteBtn.disabled = true;

            let quoteText, quoteAuthor;
            let success = false;

            // Try multiple methods to get a quote
            const methods = [
                // Method 1: Try direct API call (works if served from server)
                async () => {
                    const response = await fetch('https://api.quotable.io/random');
                    if (!response.ok) throw new Error();
                    const data = await response.json();
                    return { text: data.content, author: data.author };
                },
                // Method 2: Try with CORS proxy (allorigins)
                async () => {
                    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://api.quotable.io/random')}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error();
                    const proxyData = await response.json();
                    const data = JSON.parse(proxyData.contents);
                    return { text: data.content, author: data.author };
                },
                // Method 3: Try different CORS proxy
                async () => {
                    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent('https://api.quotable.io/random')}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error();
                    const data = await response.json();
                    return { text: data.content, author: data.author };
                },
                // Method 4: Use fallback local quotes
                async () => {
                    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                    return { text: randomQuote.text, author: randomQuote.author };
                }
            ];

            // Try each method until one succeeds
            for (let method of methods) {
                try {
                    const result = await method();
                    quoteText = result.text;
                    quoteAuthor = result.author;
                    success = true;
                    break;
                } catch (err) {
                    continue; // Try next method
                }
            }

            if (!success) {
                throw new Error('All methods failed');
            }
            
            // Display the quote
            quoteContainer.innerHTML = `
                <div>
                    <p class="quote-text">${quoteText}</p>
                    <p class="quote-author">${quoteAuthor}</p>
                </div>
            `;

            newQuoteBtn.disabled = false;
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Last resort: use a random fallback quote
            const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            quoteContainer.innerHTML = `
                <div>
                    <p class="quote-text">${randomQuote.text}</p>
                    <p class="quote-author">${randomQuote.author}</p>
                </div>
            `;
            newQuoteBtn.disabled = false;
        }
    }

    // Fetch initial quote when page loads
    fetchQuote();

    // Add event listener to the "Get New Quote" button
    newQuoteBtn.addEventListener('click', fetchQuote);
});

