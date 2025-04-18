import { GameVersion, GameLanguage } from "./types";
import { characterMaps, reverseCharacterMaps } from "./character-maps";

export class BoxNames {
    // Initialised with EOF (0xFF) terminators at the end
    bytes = Object.seal([
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
        0, 0, 0, 0, 0, 0, 0, 0, 0xFF,
    ]);

    getStringNames(gameVersion: GameVersion, language: GameLanguage) {
        // The character maps are based on what is found in Emerald version
        // As a result, modifications must be made for R/S and FR/LG
        const characterMap = new Map(characterMaps[language]);
        switch (gameVersion) {
            case "RS":
                characterMap.set(0xB0, "‥");
                characterMap.set(0xF7, "↑");
                characterMap.set(0xF8, "↓");
                characterMap.set(0xF9, "←");
                if (language !== "JPN") {
                    characterMap.delete(0x50);
                    characterMap.delete(0x7D);
                    characterMap.delete(0x7E);
                    characterMap.delete(0x7F);
                    characterMap.delete(0x80);
                    characterMap.delete(0x81);
                    characterMap.delete(0x82);
                    characterMap.delete(0x83);
                    for (let i = 0xA; i <= 0x9F; i++) {
                        if (!characterMap.has(i)) {
                            // Fill with Japanese characters
                            characterMap.set(
                                i, characterMaps["JPN"].get(i) ?? " "
                            );
                        }
                    }
                }
                break;
            case "FRLG":
                if (language === "JPN") {
                    characterMap.set(0xb0, "…");
                }
                if (language !== "JPN") {
                    characterMap.delete(0x50);
                    characterMap.delete(0x7D);
                    characterMap.delete(0x7E);
                    characterMap.delete(0x7F);
                    characterMap.delete(0x80);
                    characterMap.delete(0x81);
                    characterMap.delete(0x82);
                    characterMap.delete(0x83);
                }
                break;
            case "E":
                break;
        }
        const sBoxNames: string[] = [];
        for (let i = 0; i < 14; i++) {
            sBoxNames.push(
                this.bytes.slice((i * 9), ((i + 1) * 9)).map(
                    b => characterMap.get(b) ?? " "
                ).join("").split("\0")[0]
            );
        }
        return sBoxNames;
    }

    setNameFromString(
        boxIndex: number,
        sName: string,
        version: GameVersion,
        language: GameLanguage
    ) {
        const referenceMap = new Map(characterMaps[language]);
        const reverseCharMap = new Map(reverseCharacterMaps[language]);
        if (version === "RS") {
            reverseCharMap.set("↑", 0xF7);
            reverseCharMap.set("↓", 0xF8);
            reverseCharMap.set("←", 0xF9);
            if (language !== "JPN") {
                reverseCharMap.delete("▯");
                reverseCharMap.delete("*");
                referenceMap.delete(0x50);
                referenceMap.delete(0x7D);
                referenceMap.delete(0x7E);
                referenceMap.delete(0x7F);
                referenceMap.delete(0x80);
                referenceMap.delete(0x81);
                referenceMap.delete(0x82);
                referenceMap.delete(0x83);
                for (let i = 0xA; i <= 0x9F; i++) {
                    if (!referenceMap.has(i)) {
                        reverseCharMap.set(characterMaps["JPN"].get(i), i);
                    }
                }
            }
        }
        if (version === "FRLG") {
            if (language !== "JPN") {
                reverseCharMap.delete("▯");
                reverseCharMap.delete("*");
            }
        }
        // Length of the box name is always 9
        for (let i = 0; i < 9; i++) {
            const c = sName.charAt(i);
            if (c === "") {
                this.bytes[(boxIndex * 9) + i] = 0xFF;
            } else if (reverseCharMap.has(c)) {
                this.bytes[(boxIndex * 9) + i] = reverseCharMap.get(c);
            } else {
                throw new Error("Invalid character");
            }
        }
    }

    setNamesFromBytes(bytes: number[]) {
        if (bytes.length !== (14 * 9)) {
            throw new Error("Malformed bytearray");
        }
        for (let i = 0; i < this.bytes.length; i++) {
            this.bytes[i] = bytes[i];
        }
    }
}