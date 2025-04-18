//! SPDX-License-Identifier: MIT
/* 
 * © final 2025.
 * rse-text-decoder is under the MIT License, read the LICENSE file
 * for more information.
 */

'use strict';

import { languageToCharMapMap, reverseToCharMapMap } from "./types";

const japaneseMap = new Map([
    [0x0, "　"], 
    [0x1, "あ"], [0x2, "い"], [0x3, "う"], [0x4, "え"], [0x5, "お"], 
    [0x6, "か"], [0x7, "き"], [0x8, "く"], [0x9, "け"], [0xa, "こ"], 
    [0xb, "さ"], [0xc, "し"], [0xd, "す"], [0xe, "せ"], [0xf, "そ"], 
    [0x10, "た"], [0x11, "ち"], [0x12, "つ"], [0x13, "て"], [0x14, "と"], 
    [0x15, "な"], [0x16, "に"], [0x17, "ぬ"], [0x18, "ね"], [0x19, "の"], 
    [0x1a, "は"], [0x1b, "ひ"], [0x1c, "ふ"], [0x1d, "へ"], [0x1e, "ほ"], 
    [0x1f, "ま"], [0x20, "み"], [0x21, "む"], [0x22, "め"], [0x23, "も"], 
    [0x24, "や"], [0x25, "ゆ"], [0x26, "よ"], 
    [0x27, "ら"], [0x28, "り"], [0x29, "る"], [0x2a, "れ"], [0x2b, "ろ"], 
    [0x2c, "わ"], [0x2d, "を"], [0x2e, "ん"], 
    [0x2f, "ぁ"], [0x30, "ぃ"], [0x31, "ぅ"], [0x32, "ぇ"], [0x33, "ぉ"], 
    [0x34, "ゃ"], [0x35, "ゅ"], [0x36, "ょ"],
    [0x37, "が"], [0x38, "ぎ"], [0x39, "ぐ"], [0x3a, "げ"], [0x3b, "ご"],
    [0x3c, "ざ"], [0x3d, "じ"], [0x3e, "ず"], [0x3f, "ぜ"], [0x40, "ぞ"],
    [0x41, "だ"], [0x42, "ぢ"], [0x43, "づ"], [0x44, "で"], [0x45, "ど"],
    [0x46, "ば"], [0x47, "び"], [0x48, "ぶ"], [0x49, "べ"], [0x4a, "ぼ"],
    [0x4b, "ぱ"], [0x4c, "ぴ"], [0x4d, "ぷ"], [0x4e, "ぺ"], [0x4f, "ぽ"],
    [0x50, "っ"],
    [0x51, "ア"], [0x52, "イ"], [0x53, "ウ"], [0x54, "エ"], [0x55, "オ"],
    [0x56, "カ"], [0x57, "キ"], [0x58, "ク"], [0x59, "ケ"], [0x5a, "コ"],
    [0x5b, "サ"], [0x5c, "シ"], [0x5d, "ス"], [0x5e, "セ"], [0x5f, "ソ"],
    [0x60, "タ"], [0x61, "チ"], [0x62, "ツ"], [0x63, "テ"], [0x64, "ト"],
    [0x65, "ナ"], [0x66, "ニ"], [0x67, "ヌ"], [0x68, "ネ"], [0x69, "ノ"],
    [0x6a, "ハ"], [0x6b, "ヒ"], [0x6c, "フ"], [0x6d, "ヘ"], [0x6e, "ホ"],
    [0x6f, "マ"], [0x70, "ミ"], [0x71, "ム"], [0x72, "メ"], [0x73, "モ"],
    [0x74, "ヤ"], [0x75, "ユ"], [0x76, "ヨ"],
    [0x77, "ラ"], [0x78, "リ"], [0x79, "ル"], [0x7a, "レ"], [0x7b, "ロ"],
    [0x7c, "ワ"], [0x7d, "ヲ"], [0x7e, "ン"],
    [0x7f, "ァ"], [0x80, "ィ"], [0x81, "ゥ"], [0x82, "ェ"], [0x83, "ォ"],
    [0x84, "ャ"], [0x85, "ュ"], [0x86, "ョ"],
    [0x87, "ガ"], [0x88, "ギ"], [0x89, "グ"], [0x8a, "ゲ"], [0x8b, "ゴ"],
    [0x8c, "ザ"], [0x8d, "ジ"], [0x8e, "ズ"], [0x8f, "ゼ"], [0x90, "ゾ"],
    [0x91, "ダ"], [0x92, "ヂ"], [0x93, "ヅ"], [0x94, "デ"], [0x95, "ド"],
    [0x96, "バ"], [0x97, "ビ"], [0x98, "ブ"], [0x99, "ベ"], [0x9a, "ボ"],
    [0x9b, "パ"], [0x9c, "ピ"], [0x9d, "プ"], [0x9e, "ペ"], [0x9f, "ポ"],
    [0xa0, "ッ"],
    [0xa1, "０"],
    [0xa2, "１"], [0xa3, "２"], [0xa4, "３"],
    [0xa5, "４"], [0xa6, "５"], [0xa7, "６"],
    [0xa8, "７"], [0xa9, "８"], [0xaa, "９"],
    [0xab, "！"], [0xac, "？"],
    [0xad, "。"], [0xae, "ー"], [0xaf, "・"], [0xb0, "‥"],
    [0xb1, "『"], [0xb2, "』"], [0xb3, "「"], [0xb4, "」"],
    [0xb5, "♂"], [0xb6, "♀"],
    [0xb7, "円"], [0xb8, "．"], [0xb9, "×"],
    [0xba, "／"],
    [0xbb, "Ａ"], [0xbc, "Ｂ"], [0xbd, "Ｃ"], [0xbe, "Ｄ"], [0xbf, "Ｅ"],
    [0xc0, "Ｆ"], [0xc1, "Ｇ"], [0xc2, "Ｈ"], [0xc3, "Ｉ"], [0xc4, "Ｊ"],
    [0xc5, "Ｋ"], [0xc6, "Ｌ"], [0xc7, "Ｍ"], [0xc8, "Ｎ"], [0xc9, "Ｏ"],
    [0xca, "Ｐ"], [0xcb, "Ｑ"], [0xcc, "Ｒ"], [0xcd, "Ｓ"], [0xce, "Ｔ"],
    [0xcf, "Ｕ"], [0xd0, "Ｖ"], [0xd1, "Ｗ"], [0xd2, "Ｘ"], [0xd3, "Ｙ"],
    [0xd4, "Ｚ"],
    [0xd5, "ａ"], [0xd6, "ｂ"], [0xd7, "ｃ"], [0xd8, "ｄ"], [0xd9, "ｅ"],
    [0xda, "ｆ"], [0xdb, "ｇ"], [0xdc, "ｈ"], [0xdd, "ｉ"], [0xde, "ｊ"],
    [0xdf, "ｋ"], [0xe0, "ｌ"], [0xe1, "ｍ"], [0xe2, "ｎ"], [0xe3, "ｏ"],
    [0xe4, "ｐ"], [0xe5, "ｑ"], [0xe6, "ｒ"], [0xe7, "ｓ"], [0xe8, "ｔ"],
    [0xe9, "ｕ"], [0xea, "ｖ"], [0xeb, "ｗ"], [0xec, "ｘ"], [0xed, "ｙ"],
    [0xee, "ｚ"],
    [0xef, "►"], [0xf0, "："],
    [0xf1, "Ä"], [0xf2, "Ö"], [0xf3, "Ü"],
    [0xf4, "ä"], [0xf5, "ö"], [0xf6, "ü"],
    [0xf7, " "], [0xf8, " "], [0xf9, " "],
    [0xfa, "\0"], [0xfb, "\0"], [0xfc, " "], [0xfd, " "], [0xfe, "\0"],
    [0xff, "\0"]
]) as ReadonlyMap<number, string>

// All char indexes not present in the below maps are unused chars

const englishMap = new Map([
    [0x0, " "], [0x1, "À"], [0x2, "Á"], [0x3, "Â"], [0x4, "Ç"],
    [0x5, "È"], [0x6, "É"], [0x7, "Ê"], [0x8, "Ë"], [0x9, "Ì"],
    [0xb, "Î"], [0xc, "Ï"], [0xd, "Ò"], [0xe, "Ó"], [0xf, "Ô"],
    [0x10, "Œ"], [0x11, "Ù"], [0x12, "Ú"], [0x13, "Û"], [0x14, "Ñ"],
    [0x15, "ß"], [0x16, "à"], [0x17, "á"], [0x19, "ç"], [0x1a, "è"],
    [0x1b, "é"], [0x1c, "ê"], [0x1d, "ë"], [0x1e, "ì"], [0x20, "î"],
    [0x21, "ï"], [0x22, "ò"], [0x23, "ó"], [0x24, "ô"], [0x25, "œ"],
    [0x26, "ù"], [0x27, "ú"], [0x28, "û"], [0x29, "ñ"], [0x2a, "º"],
    [0x2b, "ª"], [0x2c, " "], [0x2d, "&"], [0x2e, "+"], [0x2f, " "],
    [0x34, " "], [0x35, "="], [0x36, ";"],
    [0x50, "▯"], [0x51, "¿"], [0x52, "¡"], [0x53, " "], [0x54, " "],
    [0x55, " "], [0x56, " "], [0x57, " "], [0x58, " "], [0x59, " "],
    [0x5a, "Í"], [0x5b, "%"], [0x5c, "("], [0x5d, ")"],
    [0x68, "â"], [0x6f, "í"], [0x79, "↑"],
    [0x7a, "↓"], [0x7b, "←"], [0x7c, "→"], [0x7d, "*"], [0x7e, "*"],
    [0x7f, "*"], [0x80, "*"], [0x81, "*"], [0x82, "*"], [0x83, "*"],
    [0x84, "ᵉ"], [0x85, "<"], [0x86, ">"],
    [0xa0, " "], [0xa1, "0"], [0xa2, "1"], [0xa3, "2"], [0xa4, "3"],
    [0xa5, "4"], [0xa6, "5"], [0xa7, "6"], [0xa8, "7"], [0xa9, "8"],
    [0xaa, "9"], [0xab, "!"], [0xac, "?"], [0xad, "."], [0xae, "-"],
    [0xaf, "・"], [0xb0, "…"], [0xb1, "“"], [0xb2, "”"], [0xb3, "‘"],
    [0xb4, "’"], [0xb5, "♂"], [0xb6, "♀"], [0xb7, "$"], [0xb8, ","],
    [0xb9, "×"], [0xba, "/"], [0xbb, "A"], [0xbc, "B"], [0xbd, "C"],
    [0xbe, "D"], [0xbf, "E"], [0xc0, "F"], [0xc1, "G"], [0xc2, "H"],
    [0xc3, "I"], [0xc4, "J"], [0xc5, "K"], [0xc6, "L"], [0xc7, "M"],
    [0xc8, "N"], [0xc9, "O"], [0xca, "P"], [0xcb, "Q"], [0xcc, "R"],
    [0xcd, "S"], [0xce, "T"], [0xcf, "U"], [0xd0, "V"], [0xd1, "W"],
    [0xd2, "X"], [0xd3, "Y"], [0xd4, "Z"], [0xd5, "a"], [0xd6, "b"],
    [0xd7, "c"], [0xd8, "d"], [0xd9, "e"], [0xda, "f"], [0xdb, "g"],
    [0xdc, "h"], [0xdd, "i"], [0xde, "j"], [0xdf, "k"], [0xe0, "l"],
    [0xe1, "m"], [0xe2, "n"], [0xe3, "o"], [0xe4, "p"], [0xe5, "q"],
    [0xe6, "r"], [0xe7, "s"], [0xe8, "t"], [0xe9, "u"], [0xea, "v"],
    [0xeb, "w"], [0xec, "x"], [0xed, "y"], [0xee, "z"], [0xef, "►"],
    [0xf0, ":"], [0xf1, "Ä"], [0xf2, "Ö"], [0xf3, "Ü"], [0xf4, "ä"],
    [0xf5, "ö"], [0xf6, "ü"], [0xf7, " "], [0xf8, " "], [0xf9, " "],
    [0xfa, "\0"], [0xfb, "\0"], [0xfc, " "], [0xfd, " "], [0xfe, "\0"],
    [0xff, "\0"]
]) as ReadonlyMap<number, string>;

const frenchMap = new Map([
    [0x0, " "], [0x1, "À"], [0x2, "Á"], [0x3, "Â"], [0x4, "Ç"],
    [0x5, "È"], [0x6, "É"], [0x7, "Ê"], [0x8, "Ë"], [0x9, "Ì"],
    [0xb, "Î"], [0xc, "Ï"], [0xd, "Ò"], [0xe, "Ó"], [0xf, "Ô"],
    [0x10, "Œ"], [0x11, "Ù"], [0x12, "Ú"], [0x13, "Û"], [0x14, "Ñ"],
    [0x15, "ß"], [0x16, "à"], [0x17, "á"], [0x19, "ç"], [0x1a, "è"],
    [0x1b, "é"], [0x1c, "ê"], [0x1d, "ë"], [0x1e, "ì"], [0x20, "î"],
    [0x21, "ï"], [0x22, "ò"], [0x23, "ó"], [0x24, "ô"], [0x25, "œ"],
    [0x26, "ù"], [0x27, "ú"], [0x28, "û"], [0x29, "ñ"], [0x2a, "º"],
    [0x2b, "ª"], [0x2c, " "], [0x2d, "&"], [0x2e, "+"], [0x2f, " "],
    [0x34, " "], [0x35, "="], [0x36, ";"],
    [0x50, "▯"], [0x51, "¿"], [0x52, "¡"], [0x53, " "], [0x54, " "],
    [0x55, " "], [0x56, " "], [0x57, " "], [0x58, " "], [0x59, " "],
    [0x5a, "Í"], [0x5b, "%"], [0x5c, "("], [0x5d, ")"],
    [0x64, " "], [0x68, "â"], [0x6f, "í"], [0x79, "↑"],
    [0x7a, "↓"], [0x7b, "←"], [0x7c, "→"], [0x7d, "*"], [0x7e, "*"],
    [0x7f, "*"], [0x80, "*"], [0x81, "*"], [0x82, "*"], [0x83, "*"],
    [0x84, "ᵉ"], [0x85, "<"], [0x86, ">"],
    [0xa0, " "], [0xa1, "0"], [0xa2, "1"], [0xa3, "2"], [0xa4, "3"],
    [0xa5, "4"], [0xa6, "5"], [0xa7, "6"], [0xa8, "7"], [0xa9, "8"],
    [0xaa, "9"], [0xab, "!"], [0xac, "?"], [0xad, "."], [0xae, "-"],
    [0xaf, "・"], [0xb0, "…"], [0xb1, "«"], [0xb2, "»"], [0xb3, "‘"],
    [0xb4, "’"], [0xb5, "♂"], [0xb6, "♀"], [0xb7, "$"], [0xb8, ","],
    [0xb9, "×"], [0xba, "/"], [0xbb, "A"], [0xbc, "B"], [0xbd, "C"],
    [0xbe, "D"], [0xbf, "E"], [0xc0, "F"], [0xc1, "G"], [0xc2, "H"],
    [0xc3, "I"], [0xc4, "J"], [0xc5, "K"], [0xc6, "L"], [0xc7, "M"],
    [0xc8, "N"], [0xc9, "O"], [0xca, "P"], [0xcb, "Q"], [0xcc, "R"],
    [0xcd, "S"], [0xce, "T"], [0xcf, "U"], [0xd0, "V"], [0xd1, "W"],
    [0xd2, "X"], [0xd3, "Y"], [0xd4, "Z"], [0xd5, "a"], [0xd6, "b"],
    [0xd7, "c"], [0xd8, "d"], [0xd9, "e"], [0xda, "f"], [0xdb, "g"],
    [0xdc, "h"], [0xdd, "i"], [0xde, "j"], [0xdf, "k"], [0xe0, "l"],
    [0xe1, "m"], [0xe2, "n"], [0xe3, "o"], [0xe4, "p"], [0xe5, "q"],
    [0xe6, "r"], [0xe7, "s"], [0xe8, "t"], [0xe9, "u"], [0xea, "v"],
    [0xeb, "w"], [0xec, "x"], [0xed, "y"], [0xee, "z"], [0xef, "►"],
    [0xf0, ":"], [0xf1, "Ä"], [0xf2, "Ö"], [0xf3, "Ü"], [0xf4, "ä"],
    [0xf5, "ö"], [0xf6, "ü"], [0xf7, " "], [0xf8, " "], [0xf9, " "],
    [0xfa, "\0"], [0xfb, "\0"], [0xfc, " "], [0xfd, " "], [0xfe, "\0"],
    [0xff, "\0"]
]) as ReadonlyMap<number, string>;

const germanMap = new Map([
    [0x0, " "], [0x1, "À"], [0x2, "Á"], [0x3, "Â"], [0x4, "Ç"],
    [0x5, "È"], [0x6, "É"], [0x7, "Ê"], [0x8, "Ë"], [0x9, "Ì"],
    [0xb, "Î"], [0xc, "Ï"], [0xd, "Ò"], [0xe, "Ó"], [0xf, "Ô"],
    [0x10, "Œ"], [0x11, "Ù"], [0x12, "Ú"], [0x13, "Û"], [0x14, "Ñ"],
    [0x15, "ß"], [0x16, "à"], [0x17, "á"], [0x19, "ç"], [0x1a, "è"],
    [0x1b, "é"], [0x1c, "ê"], [0x1d, "ë"], [0x1e, "ì"], [0x20, "î"],
    [0x21, "ï"], [0x22, "ò"], [0x23, "ó"], [0x24, "ô"], [0x25, "œ"],
    [0x26, "ù"], [0x27, "ú"], [0x28, "û"], [0x29, "ñ"], [0x2a, "º"],
    [0x2b, "ª"], [0x2c, " "], [0x2d, "&"], [0x2e, "+"], [0x2f, " "],
    [0x34, " "], [0x35, "="], [0x36, ";"],
    [0x50, "▯"], [0x51, "¿"], [0x52, "¡"], [0x53, " "], [0x54, " "],
    [0x55, " "], [0x56, " "], [0x57, " "], [0x58, " "], [0x59, " "],
    [0x5a, "Í"], [0x5b, "%"], [0x5c, "("], [0x5d, ")"],
    [0x68, "â"], [0x6f, "í"], [0x79, "↑"],
    [0x7a, "↓"], [0x7b, "←"], [0x7c, "→"], [0x7d, "*"], [0x7e, "*"],
    [0x7f, "*"], [0x80, "*"], [0x81, "*"], [0x82, "*"], [0x83, "*"],
    [0x84, "ᵉ"], [0x85, "<"], [0x86, ">"],
    [0xa0, " "], [0xa1, "0"], [0xa2, "1"], [0xa3, "2"], [0xa4, "3"],
    [0xa5, "4"], [0xa6, "5"], [0xa7, "6"], [0xa8, "7"], [0xa9, "8"],
    [0xaa, "9"], [0xab, "!"], [0xac, "?"], [0xad, "."], [0xae, "-"],
    [0xaf, "・"], [0xb0, "…"], [0xb1, "„"], [0xb2, "“"], [0xb3, "‘"],
    [0xb4, "’"], [0xb5, "♂"], [0xb6, "♀"], [0xb7, "$"], [0xb8, ","],
    [0xb9, "×"], [0xba, "/"], [0xbb, "A"], [0xbc, "B"], [0xbd, "C"],
    [0xbe, "D"], [0xbf, "E"], [0xc0, "F"], [0xc1, "G"], [0xc2, "H"],
    [0xc3, "I"], [0xc4, "J"], [0xc5, "K"], [0xc6, "L"], [0xc7, "M"],
    [0xc8, "N"], [0xc9, "O"], [0xca, "P"], [0xcb, "Q"], [0xcc, "R"],
    [0xcd, "S"], [0xce, "T"], [0xcf, "U"], [0xd0, "V"], [0xd1, "W"],
    [0xd2, "X"], [0xd3, "Y"], [0xd4, "Z"], [0xd5, "a"], [0xd6, "b"],
    [0xd7, "c"], [0xd8, "d"], [0xd9, "e"], [0xda, "f"], [0xdb, "g"],
    [0xdc, "h"], [0xdd, "i"], [0xde, "j"], [0xdf, "k"], [0xe0, "l"],
    [0xe1, "m"], [0xe2, "n"], [0xe3, "o"], [0xe4, "p"], [0xe5, "q"],
    [0xe6, "r"], [0xe7, "s"], [0xe8, "t"], [0xe9, "u"], [0xea, "v"],
    [0xeb, "w"], [0xec, "x"], [0xed, "y"], [0xee, "z"], [0xef, "►"],
    [0xf0, ":"], [0xf1, "Ä"], [0xf2, "Ö"], [0xf3, "Ü"], [0xf4, "ä"],
    [0xf5, "ö"], [0xf6, "ü"], [0xf7, " "], [0xf8, " "], [0xf9, " "],
    [0xfa, "\0"], [0xfb, "\0"], [0xfc, " "], [0xfd, " "], [0xfe, "\0"],
    [0xff, "\0"]
]) as ReadonlyMap<number, string>;

const italianMap = new Map([
    [0x0, " "], [0x1, "À"], [0x2, "Á"], [0x3, "Â"], [0x4, "Ç"],
    [0x5, "È"], [0x6, "É"], [0x7, "Ê"], [0x8, "Ë"], [0x9, "Ì"],
    [0xb, "Î"], [0xc, "Ï"], [0xd, "Ò"], [0xe, "Ó"], [0xf, "Ô"],
    [0x10, "Œ"], [0x11, "Ù"], [0x12, "Ú"], [0x13, "Û"], [0x14, "Ñ"],
    [0x15, "ß"], [0x16, "à"], [0x17, "á"], [0x19, "ç"], [0x1a, "è"],
    [0x1b, "é"], [0x1c, "ê"], [0x1d, "ë"], [0x1e, "ì"], [0x20, "î"],
    [0x21, "ï"], [0x22, "ò"], [0x23, "ó"], [0x24, "ô"], [0x25, "œ"],
    [0x26, "ù"], [0x27, "ú"], [0x28, "û"], [0x29, "ñ"], [0x2a, "º"],
    [0x2b, "ª"], [0x2c, " "], [0x2d, "&"], [0x2e, "+"], [0x2f, " "],
    [0x34, " "], [0x35, "="], [0x36, ";"],
    [0x50, "▯"], [0x51, "¿"], [0x52, "¡"], [0x53, " "], [0x54, " "],
    [0x55, " "], [0x56, " "], [0x57, " "], [0x58, " "], [0x59, " "],
    [0x5a, "Í"], [0x5b, "%"], [0x5c, "("], [0x5d, ")"], [0x5e, " "],
    [0x5f, " "], [0x60, " "], [0x61, " "], [0x62, " "], [0x63, " "],
    [0x68, "â"], [0x6f, "í"], [0x79, "↑"],
    [0x7a, "↓"], [0x7b, "←"], [0x7c, "→"], [0x7d, "*"], [0x7e, "*"],
    [0x7f, "*"], [0x80, "*"], [0x81, "*"], [0x82, "*"], [0x83, "*"],
    [0x84, "ᵉ"], [0x85, "<"], [0x86, ">"],
    [0xa0, " "], [0xa1, "0"], [0xa2, "1"], [0xa3, "2"], [0xa4, "3"],
    [0xa5, "4"], [0xa6, "5"], [0xa7, "6"], [0xa8, "7"], [0xa9, "8"],
    [0xaa, "9"], [0xab, "!"], [0xac, "?"], [0xad, "."], [0xae, "-"],
    [0xaf, "・"], [0xb0, "…"], [0xb1, "“"], [0xb2, "”"], [0xb3, "‘"],
    [0xb4, "’"], [0xb5, "♂"], [0xb6, "♀"], [0xb7, "$"], [0xb8, ","],
    [0xb9, "×"], [0xba, "/"], [0xbb, "A"], [0xbc, "B"], [0xbd, "C"],
    [0xbe, "D"], [0xbf, "E"], [0xc0, "F"], [0xc1, "G"], [0xc2, "H"],
    [0xc3, "I"], [0xc4, "J"], [0xc5, "K"], [0xc6, "L"], [0xc7, "M"],
    [0xc8, "N"], [0xc9, "O"], [0xca, "P"], [0xcb, "Q"], [0xcc, "R"],
    [0xcd, "S"], [0xce, "T"], [0xcf, "U"], [0xd0, "V"], [0xd1, "W"],
    [0xd2, "X"], [0xd3, "Y"], [0xd4, "Z"], [0xd5, "a"], [0xd6, "b"],
    [0xd7, "c"], [0xd8, "d"], [0xd9, "e"], [0xda, "f"], [0xdb, "g"],
    [0xdc, "h"], [0xdd, "i"], [0xde, "j"], [0xdf, "k"], [0xe0, "l"],
    [0xe1, "m"], [0xe2, "n"], [0xe3, "o"], [0xe4, "p"], [0xe5, "q"],
    [0xe6, "r"], [0xe7, "s"], [0xe8, "t"], [0xe9, "u"], [0xea, "v"],
    [0xeb, "w"], [0xec, "x"], [0xed, "y"], [0xee, "z"], [0xef, "►"],
    [0xf0, ":"], [0xf1, "Ä"], [0xf2, "Ö"], [0xf3, "Ü"], [0xf4, "ä"],
    [0xf5, "ö"], [0xf6, "ü"], [0xf7, " "], [0xf8, " "], [0xf9, " "],
    [0xfa, "\0"], [0xfb, "\0"], [0xfc, " "], [0xfd, " "], [0xfe, "\0"],
    [0xff, "\0"]
]) as ReadonlyMap<number, string>;

export const characterMaps: languageToCharMapMap = {
    "JPN": japaneseMap,
    "ENG": englishMap,
    "FRA": frenchMap,
    "ITA": italianMap,
    "GER": germanMap,
    "SPA": englishMap
}

const reverseJapaneseMap = new Map([
    ["　", 0x0], 
    ["あ", 0x1], ["い", 0x2], ["う", 0x3], ["え", 0x4], ["お", 0x5], 
    ["か", 0x6], ["き", 0x7], ["く", 0x8], ["け", 0x9], ["こ", 0xa], 
    ["さ", 0xb], ["し", 0xc], ["す", 0xd], ["せ", 0xe], ["そ", 0xf], 
    ["た", 0x10], ["ち", 0x11], ["つ", 0x12], ["て", 0x13], ["と", 0x14], 
    ["な", 0x15], ["に", 0x16], ["ぬ", 0x17], ["ね", 0x18], ["の", 0x19], 
    ["は", 0x1a], ["ひ", 0x1b], ["ふ", 0x1c], ["へ", 0x1d], ["ほ", 0x1e], 
    ["ま", 0x1f], ["み", 0x20], ["む", 0x21], ["め", 0x22], ["も", 0x23], 
    ["や", 0x24], ["ゆ", 0x25], ["よ", 0x26], 
    ["ら", 0x27], ["り", 0x28], ["る", 0x29], ["れ", 0x2a], ["ろ", 0x2b], 
    ["わ", 0x2c], ["を", 0x2d], ["ん", 0x2e], 
    ["ぁ", 0x2f], ["ぃ", 0x30], ["ぅ", 0x31], ["ぇ", 0x32], ["ぉ", 0x33], 
    ["ゃ", 0x34], ["ゅ", 0x35], ["ょ", 0x36],
    ["が", 0x37], ["ぎ", 0x38], ["ぐ", 0x39], ["げ", 0x3a], ["ご", 0x3b],
    ["ざ", 0x3c], ["じ", 0x3d], ["ず", 0x3e], ["ぜ", 0x3f], ["ぞ", 0x40],
    ["だ", 0x41], ["ぢ", 0x42], ["づ", 0x43], ["で", 0x44], ["ど", 0x45],
    ["ば", 0x46], ["び", 0x47], ["ぶ", 0x48], ["べ", 0x49], ["ぼ", 0x4a],
    ["ぱ", 0x4b], ["ぴ", 0x4c], ["ぷ", 0x4d], ["ぺ", 0x4e], ["ぽ", 0x4f],
    ["っ", 0x50],
    ["ア", 0x51], ["イ", 0x52], ["ウ", 0x53], ["エ", 0x54], ["オ", 0x55],
    ["カ", 0x56], ["キ", 0x57], ["ク", 0x58], ["ケ", 0x59], ["コ", 0x5a],
    ["サ", 0x5b], ["シ", 0x5c], ["ス", 0x5d], ["セ", 0x5e], ["ソ", 0x5f],
    ["タ", 0x60], ["チ", 0x61], ["ツ", 0x62], ["テ", 0x63], ["ト", 0x64],
    ["ナ", 0x65], ["ニ", 0x66], ["ヌ", 0x67], ["ネ", 0x68], ["ノ", 0x69],
    ["ハ", 0x6a], ["ヒ", 0x6b], ["フ", 0x6c], ["ヘ", 0x6d], ["ホ", 0x6e],
    ["マ", 0x6f], ["ミ", 0x70], ["ム", 0x71], ["メ", 0x72], ["モ", 0x73],
    ["ヤ", 0x74], ["ユ", 0x75], ["ヨ", 0x76],
    ["ラ", 0x77], ["リ", 0x78], ["ル", 0x79], ["レ", 0x7a], ["ロ", 0x7b],
    ["ワ", 0x7c], ["ヲ", 0x7d], ["ン", 0x7e],
    ["ァ", 0x7f], ["ィ", 0x80], ["ゥ", 0x81], ["ェ", 0x82], ["ォ", 0x83],
    ["ャ", 0x84], ["ュ", 0x85], ["ョ", 0x86],
    ["ガ", 0x87], ["ギ", 0x88], ["グ", 0x89], ["ゲ", 0x8a], ["ゴ", 0x8b],
    ["ザ", 0x8c], ["ジ", 0x8d], ["ズ", 0x8e], ["ゼ", 0x8f], ["ゾ", 0x90],
    ["ダ", 0x91], ["ヂ", 0x92], ["ヅ", 0x93], ["デ", 0x94], ["ド", 0x95],
    ["バ", 0x96], ["ビ", 0x97], ["ブ", 0x98], ["ベ", 0x99], ["ボ", 0x9a],
    ["パ", 0x9b], ["ピ", 0x9c], ["プ", 0x9d], ["ペ", 0x9e], ["ポ", 0x9f],
    ["ッ", 0xa0],
    ["０", 0xa1], ["１", 0xa2], ["２", 0xa3],
    ["３", 0xa4], ["４", 0xa5], ["５", 0xa6],
    ["６", 0xa7], ["７", 0xa8], ["８", 0xa9],
    ["９", 0xaa],
    ["！", 0xab], ["？", 0xac],
    ["。", 0xad], ["ー", 0xae], ["・", 0xaf], ["‥", 0xb0],
    ["『", 0xb1], ["』", 0xb2], ["「", 0xb3], ["」", 0xb4],
    ["♂", 0xb5], ["♀", 0xb6],
    ["円", 0xb7], ["．", 0xb8], ["×", 0xb9],
    ["／", 0xba],
    ["Ａ", 0xbb], ["Ｂ", 0xbc], ["Ｃ", 0xbd], ["Ｄ", 0xbe], ["Ｅ", 0xbf],
    ["Ｆ", 0xc0], ["Ｇ", 0xc1], ["Ｈ", 0xc2], ["Ｉ", 0xc3], ["Ｊ", 0xc4],
    ["Ｋ", 0xc5], ["Ｌ", 0xc6], ["Ｍ", 0xc7], ["Ｎ", 0xc8], ["Ｏ", 0xc9],
    ["Ｐ", 0xca], ["Ｑ", 0xcb], ["Ｒ", 0xcc], ["Ｓ", 0xcd], ["Ｔ", 0xce],
    ["Ｕ", 0xcf], ["Ｖ", 0xd0], ["Ｗ", 0xd1], ["Ｘ", 0xd2], ["Ｙ", 0xd3],
    ["Ｚ", 0xd4],
    ["ａ", 0xd5], ["ｂ", 0xd6], ["ｃ", 0xd7], ["ｄ", 0xd8], ["ｅ", 0xd9],
    ["ｆ", 0xda], ["ｇ", 0xdb], ["ｈ", 0xdc], ["ｉ", 0xdd], ["ｊ", 0xde],
    ["ｋ", 0xdf], ["ｌ", 0xe0], ["ｍ", 0xe1], ["ｎ", 0xe2], ["ｏ", 0xe3],
    ["ｐ", 0xe4], ["ｑ", 0xe5], ["ｒ", 0xe6], ["ｓ", 0xe7], ["ｔ", 0xe8],
    ["ｕ", 0xe9], ["ｖ", 0xea], ["ｗ", 0xeb], ["ｘ", 0xec], ["ｙ", 0xed],
    ["ｚ", 0xee],
    ["►", 0xef], ["：", 0xf0],
    ["Ä", 0xf1], ["Ö", 0xf2], ["Ü", 0xf3],
    ["ä", 0xf4], ["ö", 0xf5], ["ü", 0xf6],
    ["\0", 0xff],
    [" ", 0x0],
    ["0", 0xA1], ["1", 0xA2], ["2", 0xA3], ["3", 0xA4], ["4", 0xA5],
    ["5", 0xA6], ["6", 0xA7], ["7", 0xA8], ["8", 0xA9], ["9", 0xAA],
    ["!", 0xAB], ["?", 0xAC], ["¥", 0xB7],
    ["-", 0xAE], ["–", 0xAE], ["…", 0xB0], [".", 0xB8],
    ["A", 0xBB], ["B", 0xBC], ["C", 0xBD], ["D", 0xBE], ["E", 0xBF],
    ["F", 0xC0], ["G", 0xC1], ["H", 0xC2], ["I", 0xC3], ["J", 0xC4],
    ["K", 0xC5], ["L", 0xC6], ["M", 0xC7], ["N", 0xC8], ["O", 0xC9],
    ["P", 0xCA], ["Q", 0xCB], ["R", 0xCC], ["S", 0xCD], ["T", 0xCE],
    ["U", 0xCF], ["V", 0xD0], ["W", 0xD1], ["X", 0xD2], ["Y", 0xD3],
    ["Z", 0xD4], 
    ["a", 0xD5], ["b", 0xD6], ["c", 0xD7], ["d", 0xD8], ["e", 0xD9],
    ["f", 0xDA], ["g", 0xDB], ["h", 0xDC], ["i", 0xDD], ["j", 0xDE],
    ["k", 0xDF], ["l", 0xE0], ["m", 0xE1], ["n", 0xE2], ["o", 0xE3],
    ["p", 0xE4], ["q", 0xE5], ["r", 0xE6], ["s", 0xE7], ["t", 0xE8],
    ["u", 0xE9], ["v", 0xEA], ["w", 0xEB], ["x", 0xEC], ["y", 0xED],
    ["z", 0xEE], [":", 0xF0]

]) as ReadonlyMap<string, number>;

const reverseEnglishMap = new Map([
    [" ", 0x0], ["À", 0x1], ["Á", 0x2], ["Â", 0x3], ["Ç", 0x4],
    ["È", 0x5], ["É", 0x6], ["Ê", 0x7], ["Ë", 0x8], ["Ì", 0x9],
    ["Î", 0xB], ["Ï", 0xC], ["Ò", 0xD], ["Ó", 0xE], ["Ô", 0xF],
    ["Œ", 0x10], ["Ù", 0x11], ["Ú", 0x12], ["Û", 0x13], ["Ñ", 0x14],
    ["ß", 0x15], ["à", 0x16], ["á", 0x17], ["ç", 0x19], ["è", 0x1A],
    ["é", 0x1B], ["ê", 0x1C], ["ë", 0x1D], ["ì", 0x1E], ["î", 0x20],
    ["ï", 0x21], ["ò", 0x22], ["ó", 0x23], ["ô", 0x24], ["œ", 0x25],
    ["ù", 0x26], ["ú", 0x27], ["û", 0x28], ["ñ", 0x29], ["º", 0x2A],
    ["ª", 0x2B], ["&", 0x2D], ["+", 0x2E], ["=", 0x35], [";", 0x36],
    ["▯", 0x50], ["¿", 0x51], ["¡", 0x52], ["Í", 0x5A], ["%", 0x5B],
    ["(", 0x5C], [")", 0x5D], ["â", 0x68], ["í", 0x6F], ["↑", 0x79],
    ["↓", 0x7A], ["←", 0x7B], ["→", 0x7C], ["*", 0x7D], ["ᵉ", 0x84],
    ["<", 0x85], [">", 0x86], ["0", 0xA1], ["1", 0xA2], ["2", 0xA3],
    ["3", 0xA4], ["4", 0xA5], ["5", 0xA6], ["6", 0xA7], ["7", 0xA8],
    ["8", 0xA9], ["9", 0xAA], ["!", 0xAB], ["?", 0xAC], [".", 0xAD],
    ["-", 0xAE], ["・", 0xAF], ["…", 0xB0], ["“", 0xB1], ["”", 0xB2],
    ["‘", 0xB3], ["’", 0xB4], ["♂", 0xB5], ["♀", 0xB6], ["$", 0xB7],
    [",", 0xB8], ["×", 0xB9], ["/", 0xBA], ["A", 0xBB], ["B", 0xBC],
    ["C", 0xBD], ["D", 0xBE], ["E", 0xBF], ["F", 0xC0], ["G", 0xC1],
    ["H", 0xC2], ["I", 0xC3], ["J", 0xC4], ["K", 0xC5], ["L", 0xC6],
    ["M", 0xC7], ["N", 0xC8], ["O", 0xC9], ["P", 0xCA], ["Q", 0xCB],
    ["R", 0xCC], ["S", 0xCD], ["T", 0xCE], ["U", 0xCF], ["V", 0xD0],
    ["W", 0xD1], ["X", 0xD2], ["Y", 0xD3], ["Z", 0xD4], ["a", 0xD5],
    ["b", 0xD6], ["c", 0xD7], ["d", 0xD8], ["e", 0xD9], ["f", 0xDA],
    ["g", 0xDB], ["h", 0xDC], ["i", 0xDD], ["j", 0xDE], ["k", 0xDF],
    ["l", 0xE0], ["m", 0xE1], ["n", 0xE2], ["o", 0xE3], ["p", 0xE4],
    ["q", 0xE5], ["r", 0xE6], ["s", 0xE7], ["t", 0xE8], ["u", 0xE9],
    ["v", 0xEA], ["w", 0xEB], ["x", 0xEC], ["y", 0xED], ["z", 0xEE],
    ["►", 0xEF], [":", 0xF0], ["Ä", 0xF1], ["Ö", 0xF2], ["Ü", 0xF3],
    ["ä", 0xF4], ["ö", 0xF5], ["ü", 0xF6],
    ["\0", 0xff],
    ["‥", 0xB0], ["–", 0xAE],
]) as ReadonlyMap<string, number>;

const reverseFrenchMap = new Map([
    [" ", 0x0], ["À", 0x1], ["Á", 0x2], ["Â", 0x3], ["Ç", 0x4],
    ["È", 0x5], ["É", 0x6], ["Ê", 0x7], ["Ë", 0x8], ["Ì", 0x9],
    ["Î", 0xB], ["Ï", 0xC], ["Ò", 0xD], ["Ó", 0xE], ["Ô", 0xF],
    ["Œ", 0x10], ["Ù", 0x11], ["Ú", 0x12], ["Û", 0x13], ["Ñ", 0x14],
    ["ß", 0x15], ["à", 0x16], ["á", 0x17], ["ç", 0x19], ["è", 0x1A],
    ["é", 0x1B], ["ê", 0x1C], ["ë", 0x1D], ["ì", 0x1E], ["î", 0x20],
    ["ï", 0x21], ["ò", 0x22], ["ó", 0x23], ["ô", 0x24], ["œ", 0x25],
    ["ù", 0x26], ["ú", 0x27], ["û", 0x28], ["ñ", 0x29], ["º", 0x2A],
    ["ª", 0x2B], ["&", 0x2D], ["+", 0x2E], ["=", 0x35], [";", 0x36],
    ["▯", 0x50], ["¿", 0x51], ["¡", 0x52], ["Í", 0x5A], ["%", 0x5B],
    ["(", 0x5C], [")", 0x5D], ["â", 0x68], ["í", 0x6F], ["↑", 0x79],
    ["↓", 0x7A], ["←", 0x7B], ["→", 0x7C], ["*", 0x7D], ["ᵉ", 0x84],
    ["<", 0x85], [">", 0x86], ["0", 0xA1], ["1", 0xA2], ["2", 0xA3],
    ["3", 0xA4], ["4", 0xA5], ["5", 0xA6], ["6", 0xA7], ["7", 0xA8],
    ["8", 0xA9], ["9", 0xAA], ["!", 0xAB], ["?", 0xAC], [".", 0xAD],
    ["-", 0xAE], ["・", 0xAF], ["…", 0xB0], ["«", 0xB1], ["»", 0xB2],
    ["‘", 0xB3], ["’", 0xB4], ["♂", 0xB5], ["♀", 0xB6], ["$", 0xB7],
    [",", 0xB8], ["×", 0xB9], ["/", 0xBA], ["A", 0xBB], ["B", 0xBC],
    ["C", 0xBD], ["D", 0xBE], ["E", 0xBF], ["F", 0xC0], ["G", 0xC1],
    ["H", 0xC2], ["I", 0xC3], ["J", 0xC4], ["K", 0xC5], ["L", 0xC6],
    ["M", 0xC7], ["N", 0xC8], ["O", 0xC9], ["P", 0xCA], ["Q", 0xCB],
    ["R", 0xCC], ["S", 0xCD], ["T", 0xCE], ["U", 0xCF], ["V", 0xD0],
    ["W", 0xD1], ["X", 0xD2], ["Y", 0xD3], ["Z", 0xD4], ["a", 0xD5],
    ["b", 0xD6], ["c", 0xD7], ["d", 0xD8], ["e", 0xD9], ["f", 0xDA],
    ["g", 0xDB], ["h", 0xDC], ["i", 0xDD], ["j", 0xDE], ["k", 0xDF],
    ["l", 0xE0], ["m", 0xE1], ["n", 0xE2], ["o", 0xE3], ["p", 0xE4],
    ["q", 0xE5], ["r", 0xE6], ["s", 0xE7], ["t", 0xE8], ["u", 0xE9],
    ["v", 0xEA], ["w", 0xEB], ["x", 0xEC], ["y", 0xED], ["z", 0xEE],
    ["►", 0xEF], [":", 0xF0], ["Ä", 0xF1], ["Ö", 0xF2], ["Ü", 0xF3],
    ["ä", 0xF4], ["ö", 0xF5], ["ü", 0xF6],
    ["\0", 0xff],
    ["‥", 0xB0], ["–", 0xAE],
]) as ReadonlyMap<string, number>;

const reverseGermanMap = new Map([
    [" ", 0x0], ["À", 0x1], ["Á", 0x2], ["Â", 0x3], ["Ç", 0x4],
    ["È", 0x5], ["É", 0x6], ["Ê", 0x7], ["Ë", 0x8], ["Ì", 0x9],
    ["Î", 0xB], ["Ï", 0xC], ["Ò", 0xD], ["Ó", 0xE], ["Ô", 0xF],
    ["Œ", 0x10], ["Ù", 0x11], ["Ú", 0x12], ["Û", 0x13], ["Ñ", 0x14],
    ["ß", 0x15], ["à", 0x16], ["á", 0x17], ["ç", 0x19], ["è", 0x1A],
    ["é", 0x1B], ["ê", 0x1C], ["ë", 0x1D], ["ì", 0x1E], ["î", 0x20],
    ["ï", 0x21], ["ò", 0x22], ["ó", 0x23], ["ô", 0x24], ["œ", 0x25],
    ["ù", 0x26], ["ú", 0x27], ["û", 0x28], ["ñ", 0x29], ["º", 0x2A],
    ["ª", 0x2B], ["&", 0x2D], ["+", 0x2E], ["=", 0x35], [";", 0x36],
    ["▯", 0x50], ["¿", 0x51], ["¡", 0x52], ["Í", 0x5A], ["%", 0x5B],
    ["(", 0x5C], [")", 0x5D], ["â", 0x68], ["í", 0x6F], ["↑", 0x79],
    ["↓", 0x7A], ["←", 0x7B], ["→", 0x7C], ["*", 0x7D], ["ᵉ", 0x84],
    ["<", 0x85], [">", 0x86], ["0", 0xA1], ["1", 0xA2], ["2", 0xA3],
    ["3", 0xA4], ["4", 0xA5], ["5", 0xA6], ["6", 0xA7], ["7", 0xA8],
    ["8", 0xA9], ["9", 0xAA], ["!", 0xAB], ["?", 0xAC], [".", 0xAD],
    ["-", 0xAE], ["・", 0xAF], ["…", 0xB0], ["„", 0xB1], ["“", 0xB2],
    ["‘", 0xB3], ["’", 0xB4], ["♂", 0xB5], ["♀", 0xB6], ["$", 0xB7],
    [",", 0xB8], ["×", 0xB9], ["/", 0xBA], ["A", 0xBB], ["B", 0xBC],
    ["C", 0xBD], ["D", 0xBE], ["E", 0xBF], ["F", 0xC0], ["G", 0xC1],
    ["H", 0xC2], ["I", 0xC3], ["J", 0xC4], ["K", 0xC5], ["L", 0xC6],
    ["M", 0xC7], ["N", 0xC8], ["O", 0xC9], ["P", 0xCA], ["Q", 0xCB],
    ["R", 0xCC], ["S", 0xCD], ["T", 0xCE], ["U", 0xCF], ["V", 0xD0],
    ["W", 0xD1], ["X", 0xD2], ["Y", 0xD3], ["Z", 0xD4], ["a", 0xD5],
    ["b", 0xD6], ["c", 0xD7], ["d", 0xD8], ["e", 0xD9], ["f", 0xDA],
    ["g", 0xDB], ["h", 0xDC], ["i", 0xDD], ["j", 0xDE], ["k", 0xDF],
    ["l", 0xE0], ["m", 0xE1], ["n", 0xE2], ["o", 0xE3], ["p", 0xE4],
    ["q", 0xE5], ["r", 0xE6], ["s", 0xE7], ["t", 0xE8], ["u", 0xE9],
    ["v", 0xEA], ["w", 0xEB], ["x", 0xEC], ["y", 0xED], ["z", 0xEE],
    ["►", 0xEF], [":", 0xF0], ["Ä", 0xF1], ["Ö", 0xF2], ["Ü", 0xF3],
    ["ä", 0xF4], ["ö", 0xF5], ["ü", 0xF6],
    ["\0", 0xff],
    ["‥", 0xB0], ["–", 0xAE],
]) as ReadonlyMap<string, number>;

export const reverseCharacterMaps: reverseToCharMapMap = {
    "JPN": reverseJapaneseMap,
    "ENG": reverseEnglishMap,
    "FRA": reverseFrenchMap,
    "ITA": reverseEnglishMap,
    "GER": reverseGermanMap,
    "SPA": reverseEnglishMap
}
