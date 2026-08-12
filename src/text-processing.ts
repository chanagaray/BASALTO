import { BASALT_CHAR_PER_UNICODE_CHAR, type BasaltCharacter } from "./basalt-types";

export const CHARACTERS_WIDE = 12;

const getLineFromCursor = (text: string, cursor: number): { line: string; newCursor: number } => {
    // final line may not be 10 Unicode chars long, as spaces are taken to be chars in Unicode but not in Basalt. So "Hi Bob" is 6 chars long in Unicode but 5 chars long in Basalt.
    let lineUnicodeLength = 0;
    let lineBasaltLength = 0;
    while (lineBasaltLength < CHARACTERS_WIDE) {
        const char = text[cursor + lineUnicodeLength];
        if (char !== " ") lineBasaltLength++;
        lineUnicodeLength++;
    }
    return {
        line: text.slice(cursor, cursor + lineUnicodeLength),
        newCursor: cursor + lineUnicodeLength
    }
}

const separateTextIntoLines = (text: string): string[] => {
    const lines = [];
    let cursor = 0;
    let reachedEnd = text.length === 0;
    while (!reachedEnd) {
        const { line, newCursor } = getLineFromCursor(text, cursor);
        lines.push(line);
        if (newCursor >= text.length) reachedEnd = true;
        cursor = newCursor;
    }
    return lines;
}

const convertUnicodeCharToBasaltChar = (char: string, nextChar?: string): BasaltCharacter | undefined => {
    if (char.length !== 1) throw new Error("Intento de convertir un texto entero en lugar de un caracter")
    const basaltChar = BASALT_CHAR_PER_UNICODE_CHAR[char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase()];
    if (!basaltChar) return;
    return { ...basaltChar, isEndOfWord: nextChar === " ", hasAccent: /[À-ÖØ-öø-ÿ]/i.test(char) };
}

const convertTextToBasaltChars = (text: string, nextLine?: string): BasaltCharacter[] => {
    const chars = text.split("")
    return chars.map((char, index) => convertUnicodeCharToBasaltChar(char, chars[index + 1] ?? nextLine?.[0])).filter(char => char !== undefined);
}

const convertLinesToBasalt = (lines: string[]): BasaltCharacter[][] =>
    lines.map((line, index) => convertTextToBasaltChars(line, lines[index + 1]))

export const convertTextToBasaltLines = (text: string) => convertLinesToBasalt(separateTextIntoLines(text))

