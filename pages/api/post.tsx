import axios from 'axios';

export async function getListings() {
  const result = await axios.get('http://localhost:8000/getItems');
  return result;
}
