import axios from "axios";
import * as cheerio from "cheerio";

export default async function getLyrics(url: string) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const lyricsElement = $('[class^="Lyrics-sc"]');

    if (lyricsElement.length > 0) {
      let lyrics = lyricsElement.html()!.trim();

      lyrics = lyrics.replace(/<br\s*\/?>/g, "\n");

      lyrics = lyrics.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
      lyrics = lyrics.replace(/<\/?span>/g, "");

      lyrics = cheerio.load(lyrics)("body").text().trim();

      return lyrics;
    } else {
      console.error("No se encontró el contenedor de letras.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las letras:", error);
    return null;
  }
}
