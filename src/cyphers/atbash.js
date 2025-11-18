/**
 * Cifra Atbash - Substituição Inversa
 * Uma das cifras mais antigas, originária da antiguidade hebraica.
 * A primeira letra do alfabeto é substituída pela última, a segunda pela penúltima, etc.
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Aplica a cifra Atbash em um texto
 * @param {string} text - Texto a ser cifrado/decifrado
 * @returns {string} Texto transformado
 */
export function atbash(text) {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      const index = ALPHABET.indexOf(char);
      if (index === -1) {
        // Mantém caracteres que não são letras (espaços, números, etc.)
        return char;
      }
      // Substitui pela letra inversa
      return ALPHABET[ALPHABET.length - 1 - index];
    })
    .join('');
}

/**
 * Retorna o mapeamento completo do alfabeto
 * @returns {Array} Array de objetos com original e cifrado
 */
export function getMapping() {
  return ALPHABET.split('').map((char, index) => ({
    original: char,
    cipher: ALPHABET[ALPHABET.length - 1 - index]
  }));
}
