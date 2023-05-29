const abas = await chrome.tabs.query({
    url: [
        "https://developer.chrome.com/docs/webstore/*",
        "https://developer.chrome.com/docs/extensions/*",
    ],
});

const collator = new Intl.Collator();
abas.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elementos = new Set();
for (const aba of abas) {
    const elemento = template.content.firstElementChild.cloneNode(true);

    const titulo = aba.title.split("-")[0].trim();
    const caminho = new URL(aba.url).pathname.slice("/docs".length);

    elemento.querySelector(".titulo").textContent = titulo;
    elemento.querySelector(".caminho").textContent = caminho;
    elemento.querySelector("a").addEventListener("click", async () => {
        // é necessário focar na janela além da aba ativa
        await chrome.tabs.update(aba.id, { active: true });
        await chrome.windows.update(aba.windowId, { focused: true });
    });

    elementos.add(elemento);
}
document.querySelector("ul").append(...elementos);
const botao = document.querySelector("button");
botao.addEventListener("click", async () => {
    const idsAbas = abas.map(({ id }) => id);
    const grupo = await chrome.tabs.group({ tabIds: idsAbas });
    await chrome.tabGroups.update(grupo, { title: "DOCS" });
});
