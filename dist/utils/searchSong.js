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
const Lyrics_URI = "https://api.genius.com";
export default function searchSong(query, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(`${Lyrics_URI}/search?q=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let res = data.response.hits[0].result;
            if (!res) {
                console.log("No se encontraron resultados.");
                return null;
            }
            return res;
        }
        catch (error) {
            console.error("Error al buscar la canción:", error);
            return null;
        }
    });
}
