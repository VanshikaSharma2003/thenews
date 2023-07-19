
// Replace 'YOUR_API_KEY' with your actual News API key
const apiKey = 'a2867ff1b507415ba1ba1690395f8b0a';
const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2023-06-16&sortBy=publishedAt&apiKey=a2867ff1b507415ba1ba1690395f8b0a`;

// Function to fetch and display news articles
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const articles = data.articles;

    // Display each article
    articles.forEach((article, index) => {
      console.log(`Article ${index + 1}:`);
      console.log('Title:', article.title);
      console.log('Source:', article.source.name);
      console.log('Description:', article.description);
      console.log('URL:', article.url);
      console.log('Published At:', article.publishedAt);
      console.log('------------------------');
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
}

// Call the fetchNews function to fetch and display news articles
fetchNews();


