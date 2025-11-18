# Documentação dos Algoritmos de Criptografia

Este documento descreve cada algoritmo de criptografia implementado neste projeto, explicando seu funcionamento, propósito histórico e características técnicas.

---

## 📋 Índice

- [Cifra de Atbash](#cifra-de-atbash)

---

## 🕍 Cifra de Atbash

### Visão Geral

A **Cifra de Atbash** é uma das cifras de substituição mais antigas conhecidas, originária da antiguidade hebraica. É um algoritmo de criptografia simples que funciona através de uma substituição monoalfabética inversa.

### Propósito Histórico

A Cifra de Atbash foi originalmente usada para cifrar textos hebraicos, onde cada letra do alfabeto era substituída pela sua correspondente no alfabeto invertido. O nome "Atbash" vem das primeiras letras do alfabeto hebraico: Aleph (א), Taw (ת), Bet (ב), Shin (ש) - formando um acrônimo que representa a própria cifra.

**Contexto de uso:**
- Proteção de mensagens religiosas e sagradas
- Cifragem de textos bíblicos e comentários rabínicos
- Uso em contextos onde a segurança não era crítica, mas a privacidade básica era desejada

### Como Funciona

A Cifra de Atbash é uma cifra de substituição onde cada letra do alfabeto é mapeada para sua correspondente no alfabeto invertido:

- **A** → **Z**
- **B** → **Y**
- **C** → **X**
- **D** → **W**
- ...
- **M** → **N**
- **N** → **M**
- ...
- **Z** → **A**

### Algoritmo

O algoritmo funciona da seguinte forma:

1. **Normalização**: Converte todo o texto para maiúsculas
2. **Mapeamento**: Para cada caractere:
   - Se for uma letra do alfabeto, encontra sua posição no alfabeto
   - Calcula a posição inversa: `posição_inversa = tamanho_alfabeto - 1 - posição_atual`
   - Substitui pela letra na posição inversa
3. **Preservação**: Mantém caracteres não-alfabéticos (espaços, números, pontuação) inalterados

**Fórmula matemática:**
```
cifrado[i] = ALPHABET[25 - posição(original[i])]
```

Onde:
- `ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"` (26 letras, índices 0-25)
- `posição(original[i])` retorna o índice da letra no alfabeto

### Características Técnicas

| Característica | Descrição |
|----------------|-----------|
| **Tipo** | Cifra de substituição monoalfabética |
| **Simetria** | Simétrica (criptografar e descriptografar usam o mesmo processo) |
| **Chave** | Nenhuma chave necessária (fixa) |
| **Complexidade** | O(n) onde n é o tamanho do texto |
| **Segurança** | Extremamente fraca - facilmente quebrável |
| **Dificuldade de implementação** | Muito fácil |

### Exemplo Prático

**Texto original:**
```
HELLO WORLD
```

**Processo:**
- H (posição 7) → S (posição 18 = 25 - 7)
- E (posição 4) → V (posição 21 = 25 - 4)
- L (posição 11) → O (posição 14 = 25 - 11)
- L (posição 11) → O (posição 14 = 25 - 11)
- O (posição 14) → L (posição 11 = 25 - 14)
- (espaço mantido)
- W (posição 22) → D (posição 3 = 25 - 22)
- O (posição 14) → L (posição 11 = 25 - 14)
- R (posição 17) → I (posição 8 = 25 - 17)
- L (posição 11) → O (posição 14 = 25 - 11)
- D (posição 3) → W (posição 22 = 25 - 3)

**Texto cifrado:**
```
SVOOL DLIOW
```

**Verificação:**
Aplicando Atbash novamente em "SVOOL DLIOW", obtemos "HELLO WORLD", confirmando que a cifra é simétrica.

### Por que é Fraca?

A Cifra de Atbash é extremamente vulnerável a ataques por várias razões:

1. **Sem chave**: O mapeamento é sempre o mesmo, não há variação
2. **Análise de frequência**: Como é uma substituição monoalfabética, preserva os padrões de frequência das letras
3. **Fácil quebra**: Um atacante pode facilmente descobrir o padrão testando algumas letras
4. **Reversibilidade trivial**: O algoritmo é auto-inverso, então qualquer pessoa que conheça o método pode descriptografar

### Casos de Uso Modernos

Embora não seja adequada para segurança real, a Cifra de Atbash ainda tem utilidade:

- **Educação**: Excelente para ensinar conceitos básicos de criptografia
- **Obfuscação básica**: Pode ser usada para ocultar texto de leitura casual (não para segurança)
- **Quebra-cabeças e jogos**: Comum em enigmas e desafios de decodificação
- **Introdução à criptografia**: Serve como primeiro passo antes de algoritmos mais complexos

### Implementação no Projeto

No código deste projeto, a Cifra de Atbash está implementada em `src/cyphers/atbash.js`:

- **Função `atbash(text)`**: Aplica a transformação no texto
- **Função `getMapping()`**: Retorna o mapeamento completo do alfabeto para visualização

A interface web permite:
- Visualizar o mapeamento completo do alfabeto
- Cifrar/decifrar texto em tempo real
- Entender visualmente como cada letra é transformada

---

## 🔮 Algoritmos Futuros

Este projeto está em desenvolvimento e pode incluir outros algoritmos de criptografia no futuro, como:

- Cifra de César
- Cifra de Vigenère
- Cifra de Playfair
- E outros algoritmos clássicos e modernos

