/**
 * Cifra de Vigenère - Cifra Polialfabética
 * Um método de criptografia que usa uma série de diferentes cifras de César
 * baseadas nas letras de uma palavra-chave. É uma forma simples de substituição polialfabética.
 */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Aplica a cifra de Vigenère em um texto (Cifrar ou Decifrar)
 * @param {string} text - Texto a ser transformado
 * @param {string} key - A palavra-chave para o deslocamento
 * @param {boolean} [decrypt=false] - Se true, realiza a decifragem. Se false, cifra.
 * @returns {string} Texto transformado
 */
export function vigenere(text, key, decrypt = false) {
    // Limpa a chave para garantir que só tenha letras
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");

    if (!cleanKey) return text; // Se não houver chave válida, retorna o original

    let keyIndex = 0; // Índice independente para percorrer a chave

    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            const charIndex = ALPHABET.indexOf(char);

            // Mantém caracteres que não são letras (espaços, pontuação)
            if (charIndex === -1) {
                return char;
            }

            // Descobre a letra correspondente na chave (Efeito Carrossel)
            const keyChar = cleanKey[keyIndex % cleanKey.length];
            const keyShift = ALPHABET.indexOf(keyChar);

            let newIndex;

            if (decrypt) {
                // Matemática da Decifragem: (Texto - Chave + 26) % 26
                newIndex = (charIndex - keyShift + 26) % 26;
            } else {
                // Matemática da Cifragem: (Texto + Chave) % 26
                newIndex = (charIndex + keyShift) % 26;
            }

            // Só avança o índice da chave se o caractere atual for uma letra
            keyIndex++;

            return ALPHABET[newIndex];
        })
        .join("");
}

/**
 * Retorna o mapeamento (linha da Tabula Recta) para uma letra específica da chave.
 * Diferente do Atbash, o mapeamento muda dependendo da letra da chave.
 * * @param {string} keyChar - A letra da chave que define a linha da tabela
 * @returns {Array} Array de objetos com a letra original e a correspondente cifrada
 */
export function getMapping(keyChar) {
    const shift = ALPHABET.indexOf(keyChar.toUpperCase());

    if (shift === -1) return []; // Retorna vazio se não for letra válida

    return ALPHABET.split("").map((char, index) => ({
        original: char,
        // Simula uma Cifra de César com o deslocamento dessa letra da chave
        cipher: ALPHABET[(index + shift) % 26],
    }));
}
