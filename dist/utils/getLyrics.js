var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import * as cheerio from "cheerio";
export default function getLyrics(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(url);
            const $ = cheerio.load(data);
            const lyricsElement = $('[class^="Lyrics-sc"]');
            if (lyricsElement.length > 0) {
                let lyrics = lyricsElement.html().trim();
                lyrics = lyrics.replace(/<br\s*\/?>/g, "\n");
                lyrics = lyrics.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
                lyrics = lyrics.replace(/<\/?span>/g, "");
                lyrics = cheerio.load(lyrics)("body").text().trim();
                return lyrics;
            }
            else {
                console.error("No se encontró el contenedor de letras.");
                return null;
            }
        }
        catch (error) {
            console.error("Error al obtener las letras:", error);
            return null;
        }
    });
}
