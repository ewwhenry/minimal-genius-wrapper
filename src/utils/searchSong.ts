import axios from "axios";
import * as cheerio from "cheerio";

const Lyrics_URI = "https://api.genius.com";

export default async function searchSong(
  query: string,
  token: string,
): Promise<any> {
  try {
    const { data } = await axios.get(
      `${Lyrics_URI}/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    let res = data.response.hits[0].result;

    if (!res) {
      console.log("No se encontraron resultados.");
      return null;
    }

    return res;
  } catch (error) {
    console.error("Error al buscar la canción:", error);
    return null;
  }
}
