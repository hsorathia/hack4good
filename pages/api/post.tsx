import axios from 'axios';

export async function getListings() {
  const result = await axios.get('http://localhost:8000/getItems', );
  return result;
}

export async function getItems(query) {
  const result = await axios.get('http://localhost:8000/getItems', query);
  console.log(result.data)
  return result;
}

export async function getUserListings(query) {
  const result = await axios.post('http://localhost:8000/getUserItems', query);
  return result;
}

export async function createListing(query) {
  const result = await axios.post('http://localhost:8000/postItem', query);
  return result;
}

export async function updateClaim(query) {
  const result = await axios.post('http://localhost:8000/claimItem', query);
  return result;
}
