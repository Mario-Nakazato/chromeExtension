const artigo = document.querySelector("article");

// `document.querySelector` pode retornar null se o seletor não corresponder a nada.
if (artigo) {
    const texto = artigo.textContent;
    const expressaoRegularCorrespondenciaPalavra = /[^\s]+/g; // Expressão regular
    const palavras = texto.matchAll(expressaoRegularCorrespondenciaPalavra);
    // matchAll retorna um iterador, converta-o em um array para obter a contagem de palavras
    const quantidadePalavras = [...palavras].length;
    const tempoLeitura = Math.round(quantidadePalavras / 200);
    const distintivo = document.createElement("p");
    // Use o mesmo estilo das informações de publicação no cabeçalho de um artigo
    distintivo.classList.add("color-secondary-text", "type--caption");
    distintivo.textContent = `⏱️ ${tempoLeitura} min de leitura`;

    // Suporte para documentos de referência de API
    const titulo = artigo.querySelector("h1");
    // Suporte para documentos de artigo com data
    const data = artigo.querySelector("time")?.parentNode;

    (data ?? titulo).insertAdjacentElement("afterend", distintivo);
}
