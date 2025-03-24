const axios = require('axios');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchDataByIsbn(baseUrl,isbn) {
    try {
      const url = `${baseUrl}/${isbn}`;
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchDataByAuthor(baseUrl,author) {
      try {
        const url = `${baseUrl}/${author}`;
        const response = await axios.get(url);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async function fetchDataByTitle(baseUrl,title) {
        try {
          const url = `${baseUrl}/${title}`;
          const response = await axios.get(url);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    

  


fetchDataByIsbn('https://nikolasricaz-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title',10);
fetchDataByAuthor('https://nikolasricaz-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title','Unknown');
fetchDataByTitle('https://nikolasricaz-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title','The Book Of Job');

fetchData('https://nikolasricaz-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');