# Documentação dos Algoritmos de Criptografia

Este documento descreve cada algoritmo de criptografia implementado neste projeto, explicando seu funcionamento, propósito histórico e características técnicas.

---

## 📋 Índice

- [Cifra de Atbash](#cifra-de-atbash)
- [Cifra de Vigenère](#cifra-de-vigenère)
- [Cifra de Playfair](#cifra-de-playfair)

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


## 🔐 Cifra de Vigenère

### Visão Geral

A **Cifra de Vigenère** é um método de criptografia polialfabética desenvolvido no século XVI. Ao contrário das cifras monoalfabéticas como Atbash, que usam apenas um alfabeto de substituição, a Vigenère emprega múltiplos alfabetos de substituição baseados em uma palavra-chave, tornando-a muito mais resistente a ataques de análise de frequência.

### Propósito Histórico

A cifra foi criada por Blaise de Vigenère em 1586, embora tenha sido originalmente descrita por Giovan Battista Bellaso em 1553. Recebeu o nome de Vigenère por ser popularizada por ele. Durante séculos, foi considerada "indecifrável" e foi usada em comunicações diplomáticas e militares.

**Contexto de uso:**
- Comunicações diplomáticas e militares nos séculos XVI-XIX
- Correspondência secreta entre nobres e governantes
- Uso em guerras e espionagem até o século XIX
- Considerada segura até o desenvolvimento da análise de frequência por Charles Babbage em 1854

### Como Funciona

A Cifra de Vigenère usa uma palavra-chave para determinar o deslocamento de cada letra do texto. Cada letra da chave define um alfabeto de substituição diferente (como uma Cifra de César com deslocamento variável).

O processo funciona como um "carrossel" onde a chave se repete ciclicamente sobre o texto:

- **Texto:** A T A Q U E
- **Chave:** L E M O N L
- **Cifrado:** L F Q F U J

### Algoritmo

O algoritmo funciona da seguinte forma:

1. **Preparação da chave**: A palavra-chave é limpa (apenas letras maiúsculas) e se repete ciclicamente sobre o texto
2. **Mapeamento**: Para cada caractere do texto:
   - Se for uma letra, encontra sua posição no alfabeto (0-25)
   - Usa a letra correspondente da chave para determinar o deslocamento
   - Aplica a fórmula: `posição_cifrada = (posição_original + posição_chave) mod 26`
3. **Preservação**: Mantém caracteres não-alfabéticos inalterados
4. **Decifragem**: Usa a fórmula inversa: `posição_original = (posição_cifrada - posição_chave) mod 26`

**Fórmula matemática:**
```
Cifragem:   cifrado[i] = (texto[i] + chave[i]) mod 26
Decifragem: texto[i] = (cifrado[i] - chave[i]) mod 26
```

Onde:
- `texto[i]` e `chave[i]` são posições no alfabeto (0-25)
- A chave se repete ciclicamente: `chave[i] = chave[i mod tamanho_chave]`

### Características Técnicas

| Característica | Descrição |
|----------------|-----------|
| **Tipo** | Cifra de substituição polialfabética |
| **Simetria** | Simétrica (mesma chave para cifrar/decifrar) |
| **Chave** | Palavra-chave (sequência de letras) |
| **Complexidade** | O(n) onde n é o tamanho do texto |
| **Segurança** | Moderada (quebrável com análise de frequência kasiski) |
| **Dificuldade de implementação** | Média |

### Exemplo Prático

**Texto original:**
```
ATTACK AT DAWN
```

**Chave:** `LEMON`

**Processo passo a passo:**

1. **Preparação da chave repetida:**
   ```
   Texto: A T T A C K A T D A W N
   Chave: L E M O N L E M O N L E
   ```

2. **Cifragem letra por letra:**
   - A (0) + L (11) = L (11)
   - T (19) + E (4) = X (23)
   - T (19) + M (12) = F (5)
   - A (0) + O (14) = O (14)
   - C (2) + N (13) = P (15)
   - K (10) + L (11) = V (21)
   - (espaço mantido)
   - A (0) + E (4) = E (4)
   - T (19) + M (12) = F (5)
   - D (3) + O (14) = R (17)
   - A (0) + N (13) = N (13)
   - W (22) + L (11) = H (7)
   - N (13) + E (4) = R (17)

**Texto cifrado:**
```
LXFPVEFRNH R
```

**Verificação:**
Aplicando Vigenère novamente com a mesma chave "LEMON", obtemos "ATTACKATDAWN", confirmando a decifragem.

### Por que é Mais Segura que Atbash?

A Cifra de Vigenère supera as limitações do Atbash através de:

1. **Múltiplos alfabetos**: Cada posição usa um deslocamento diferente
2. **Resistência à análise de frequência**: Mesmas letras podem ser cifradas de formas diferentes
3. **Chave variável**: O padrão muda baseado na palavra-chave escolhida
4. **Não é auto-inversa**: Cifragem e decifragem requerem processos diferentes

No entanto, ainda é vulnerável ao:
- **Ataque Kasiski**: Análise de repetições no texto cifrado
- **Análise de frequência aprimorada**: Com tamanho da chave conhecido
- **Ataque de força bruta**: Se a chave for curta

## 🔳 Cifra de Playfair

### Visão Geral

A **Cifra de Playfair** é uma cifra de substituição poligráfica (operando sobre pares de letras) desenvolvida em 1854 por Charles Wheatstone e popularizada por Lord Playfair. É uma evolução das cifras monoalfabéticas, operando sobre digramas (pares de letras) usando uma matriz 5x5 baseada em uma palavra-chave.

### Propósito Histórico

Criada durante a Guerra da Crimeia (1853-1856), a cifra Playfair foi uma das primeiras cifras militares modernas. Wheatstone demonstrou sua superioridade sobre as cifras de substituição simples da época. Foi usada extensivamente pelas forças britânicas e americanas durante as Guerras Mundiais.

**Contexto de uso:**
- Comunicações militares durante a Guerra da Crimeia
- Uso pelos serviços de inteligência britânicos e americanos
- Comunicações diplomáticas no século XIX e início do XX
- Substituiu cifras mais simples em contextos onde segurança era importante

### Como Funciona

A Cifra de Playfair usa uma matriz 5x5 construída a partir de uma palavra-chave. A matriz contém 25 letras (I e J são tratadas como uma única letra). O texto é dividido em pares de letras (digramas), e cada par é cifrado seguindo regras específicas baseadas nas posições das letras na matriz.

**Regras de cifragem:**
1. **Mesma linha**: As letras avançam uma posição para a direita
2. **Mesma coluna**: As letras avançam uma posição para baixo
3. **Retângulo**: As letras trocam de coluna dentro do retângulo formado

### Algoritmo

O algoritmo funciona em duas fases principais:

#### 1. Preparação da Matriz
- A palavra-chave é processada, removendo duplicatas e letras repetidas
- As letras restantes do alfabeto são adicionadas (exceto J, que é combinada com I)
- Forma-se uma matriz 5x5 preenchida linha por linha

#### 2. Preparação do Texto
- Texto é convertido para maiúsculo e limpo (apenas letras)
- Dividido em digramas (pares de letras)
- **Regra 1**: Se duas letras iguais consecutivas, insere-se "X" entre elas
- **Regra 2**: Se sobrar uma letra final, adiciona-se "X" no final

#### 3. Cifragem/Decifragem
Para cada digrama (par de letras), aplica-se:
- **Mesma linha**: Move cada letra uma coluna para direita (cifragem) ou esquerda (decifragem)
- **Mesma coluna**: Move cada letra uma linha para baixo (cifragem) ou cima (decifragem)
- **Retângulo**: Troca as colunas das letras dentro do retângulo formado

**Tratamento especial de I/J:**
- I e J são consideradas a mesma letra na matriz
- Ambas são representadas como "I" durante o processamento

### Características Técnicas

| Característica | Descrição |
|----------------|-----------|
| **Tipo** | Cifra de substituição poligráfica (digramas) |
| **Simetria** | Simétrica (mesma chave para cifrar/decifrar) |
| **Chave** | Palavra-chave que define a matriz 5x5 |
| **Complexidade** | O(n) onde n é o tamanho do texto |
| **Segurança** | Boa para época (superior à Vigenère em alguns aspectos) |
| **Dificuldade de implementação** | Alta |

### Exemplo Prático

**Texto original:**
```
HELLO WORLD
```

**Chave:** `KEYWORD`

**Construção da matriz:**
```
K E Y W O
R D A B C
F G H I J
L M N P Q
S T U V X
Z
```

**Processo:**

1. **Preparação do texto:**
   - "HELLOWORLD" → digramas: HE, LL, OW, OR, LD
   - "LL" duplicado → insere X: HE, LX, OW, OR, LD

2. **Cifragem digrama por digrama:**
   - HE: Retângulo (H=[2,2], E=[0,1]) → EI
   - LX: Retângulo (L=[3,0], X=[4,4]) → XL
   - OW: Mesma linha (O=[0,4], W=[0,3]) → WO
   - OR: Retângulo (O=[0,4], R=[1,0]) → RO
   - LD: Retângulo (L=[3,0], D=[1,1]) → DL

**Texto cifrado:**
```
EIXLWORDL
```

**Verificação:**
Aplicando Playfair novamente com a mesma chave, obtemos o texto original (desconsiderando os X inseridos).

### Por que é Mais Segura?

A Cifra de Playfair supera limitações anteriores através de:

1. **Operação em digramas**: Trabalha com pares de letras, não letras individuais
2. **Múltiplas regras**: Diferentes transformações baseadas na posição relativa
3. **Quebra de padrões**: Elimina letras duplicadas consecutivas
4. **Maior espaço de chave**: Matriz 5x5 oferece mais possibilidades que alfabetos simples

Limitações:
- Ainda vulnerável à análise de frequência de digramas
- Ataque conhecido através da análise de padrões de linguagem
- Quebrável com texto suficiente para análise estatística



