/**
 * Cifra Playfair - Substituição Poligráfica
 * Cifra que opera sobre pares de letras (digramas) usando uma matriz 5x5
 * baseada em uma palavra-chave.
 * Trata 'I' e 'J' como a mesma letra ('I').
 */

const ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 25 letras, excluindo J

/**
 * 1. Gera a matriz 5x5 Playfair e o dicionário de posições.
 * @param {string} chave - Palavra-chave para a matriz.
 * @returns {Object} {matriz, posicoes}
 */
function gerarMatrizChave(chave) {
  let chaveLimpa = '';
  const letrasUsadas = new Set();

  // Processa a chave
  for (const char of chave.toUpperCase()) {
    if (ALPHABET.includes(char) || char === 'J') {
      const charProcessado = char === 'J' ? 'I' : char;
      if (!letrasUsadas.has(charProcessado)) {
        chaveLimpa += charProcessado;
        letrasUsadas.add(charProcessado);
      }
    }
  }

  // Adiciona o restante do alfabeto
  for (const char of ALPHABET) {
    if (!letrasUsadas.has(char)) {
      chaveLimpa += char;
      letrasUsadas.add(char);
    }
  }

  // Constrói a matriz e as posições
  const matriz = [];
  const posicoes = {};
  for (let r = 0; r < 5; r++) {
    const linha = chaveLimpa.slice(r * 5, (r * 5) + 5).split('');
    matriz.push(linha);
    for (let c = 0; c < 5; c++) {
      posicoes[linha[c]] = [r, c];
    }
  }

  return { matriz, posicoes };
}

function limparTexto(texto) {
  let textoLimpo = ''
  for (const char of texto.toUpperCase()) {
    if (ALPHABET.includes(char) || char === 'J') {
      textoLimpo += char === 'J' ? 'I' : char
    }
  }
  return textoLimpo
}

/**
 * 2. Prepara o texto para a cifragem, dividindo em digramas.
 * @param {string} texto - Texto original.
 * @returns {Array<string>} Array de digramas.
 */
function prepararTexto(texto) {
  const textoLimpo = limparTexto(texto)

  const digramas = []
  let i = 0
  while (i < textoLimpo.length) {
    const l1 = textoLimpo[i]

    if (i + 1 < textoLimpo.length) {
      const l2 = textoLimpo[i + 1]
      if (l1 === l2) {
        // Regra 1: Letras duplicadas (insere 'X')
        digramas.push(l1 + 'X')
        i += 1
      } else {
        // Regra 2: Digrama normal
        digramas.push(l1 + l2)
        i += 2
      }
    } else {
      // Regra 3: Letra ímpar no final (preenche com 'X')
      digramas.push(l1 + 'X')
      i += 1
    }
  }
  
  return digramas
}

/**
 * 2.1. Retorna os passos de preparação para fins ilustrativos.
 * @param {string} texto - Texto original.
 * @returns {Object}
 */
export function getDigramSteps(texto) {
  const textoLimpo = limparTexto(texto)
  const passos = []

  const digramas = []
  let i = 0
  while (i < textoLimpo.length) {
    const l1 = textoLimpo[i]

    if (i + 1 < textoLimpo.length) {
      const l2 = textoLimpo[i + 1]
      if (l1 === l2) {
        const digrama = l1 + 'X'
        digramas.push(digrama)
        passos.push({
          digrama,
          regra: 'Regra 1 - letras duplicadas',
          explicacao: 'Letra duplicada: insere-se um X para quebrar o par e evitar repetições.',
          consumo: `${l1} + X (X inserido devido à duplicação)`
        })
        i += 1
      } else {
        const digrama = l1 + l2
        digramas.push(digrama)
        passos.push({
          digrama,
          regra: 'Regra 2 - par normal',
          explicacao: 'Duas letras distintas formam o par sem alterações.',
          consumo: `${l1} + ${l2}`
        })
        i += 2
      }
    } else {
      const digrama = l1 + 'X'
      digramas.push(digrama)
      passos.push({
        digrama,
        regra: 'Regra 3 - letra final isolada',
        explicacao: 'Falta de par: completamos o último dígrafo com X.',
        consumo: `${l1} + X (X adicionado ao final)`
      })
      i += 1
    }
  }

  return {
    textoLimpo,
    digramas,
    passos
  }
}


/**
 * 3. Aplica a Cifra Playfair (Encoding ou Decoding).
 * @param {string} texto - Texto a ser cifrado/decifrado.
 * @param {string} chave - Palavra-chave.
 * @param {string} modo - 'encode' (padrão) ou 'decode'.
 * @returns {string} Texto transformado.
 */
export function playfair(texto, chave, modo = 'encode') {
  const { matriz, posicoes } = gerarMatrizChave(chave);
  const digramas = prepararTexto(texto);
  const shift = modo === 'encode' ? 1 : -1;
  let textoResultado = '';

  for (const digrama of digramas) {
    const l1 = digrama[0];
    const l2 = digrama[1];

    const [r1, c1] = posicoes[l1];
    const [r2, c2] = posicoes[l2];

    let novoL1, novoL2;

    if (r1 === r2) {
      // Mesma Linha: Avança/Retrocede na coluna
      novoL1 = matriz[r1][(c1 + shift + 5) % 5];
      novoL2 = matriz[r2][(c2 + shift + 5) % 5];
    } else if (c1 === c2) {
      // Mesma Coluna: Avança/Retrocede na linha
      novoL1 = matriz[(r1 + shift + 5) % 5][c1];
      novoL2 = matriz[(r2 + shift + 5) % 5][c2];
    } else {
      // Retângulo: Troca as colunas
      novoL1 = matriz[r1][c2];
      novoL2 = matriz[r2][c1];
    }

    textoResultado += novoL1 + novoL2;
  }

  return textoResultado;
}


/**
 * 4. Exemplo de uso e retorno do mapeamento da matriz para visualização.
 * @param {string} chave - Palavra-chave para gerar o mapeamento.
 * @returns {Array<Object>} Array de objetos com original, posição e cifrado (no contexto de um shift +1).
 */
export function getMapping(chave) {
  const { matriz, posicoes } = gerarMatrizChave(chave);
  const mapeamento = [];

  for (const char of ALPHABET) {
    const [r, c] = posicoes[char];
    let cifrado = '';

    // A regra de mapeamento é complexa, vamos apenas retornar a matriz para visualização
    // A regra de mapeamento depende do par de letras, e não de uma letra isolada.
    // Retornamos a matriz 5x5 para ilustrar a chave.

    mapeamento.push({
      original: char,
      posicao: [r, c],
      // Nota: 'cifrado' aqui seria ambíguo, pois depende da segunda letra do par.
    });
  }
  return { matriz, mapeamento };
}

// --- Exemplo de Execução no Console ---
/*
const chaveExemplo = "KEYWORD";
const textoOriginal = "HELLO WORLD";

console.log(`\n--- Teste Playfair ---`);

// Cifragem
const cifrado = playfair(textoOriginal, chaveExemplo, 'encode');
console.log(`\nTexto Original: ${textoOriginal}`);
console.log(`Texto Cifrado: ${cifrado}`); 
// Saída esperada (sem os prints didáticos): GYIZSCOKCFBU

// Decifragem
const decifrado = playfair(cifrado, chaveExemplo, 'decode');
console.log(`Texto Decifrado (raw): ${decifrado}`);
// Saída esperada: HELXLOWORLDX
*/
