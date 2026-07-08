import fs from 'fs';

// Read VITE_MOUSER_API_KEY from .env
const env = fs.readFileSync('.env', 'utf-8');
const match = env.match(/VITE_MOUSER_API_KEY=([^\s]+)/);
const API_KEY = match ? match[1] : null;

if (!API_KEY) {
  console.log("No API key found in .env");
  process.exit(1);
}

const data = {
  SearchByKeywordRequest: {
    keyword: "L298N",
    records: 2,
    startingRecord: 0,
    searchOptions: "None",
    searchWithYourSignUpLanguage: "false"
  }
};

fetch(`https://api.mouser.com/api/v1/search/keyword?apiKey=${API_KEY}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => {
  console.log(JSON.stringify(json.SearchResults?.Parts, null, 2));
})
.catch(err => console.error(err));
