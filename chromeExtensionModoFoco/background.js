chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensoes = 'https://developer.chrome.com/docs/extensions'
const lojaWeb = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (aba) => {
    if (aba.url.startsWith(extensoes) || aba.url.startsWith(lojaWeb)) {
        // Recupera o distintivo de ação para verificar se a extensão está 'ON' ou 'OFF'
        const estadoAnterior = await chrome.action.getBadgeText({ tabId: aba.id });
        // O próximo estado sempre será o oposto
        const proximoEstado = estadoAnterior === 'ON' ? 'OFF' : 'ON'

        // Define o distintivo de ação para o próximo estado
        await chrome.action.setBadgeText({
            tabId: aba.id,
            text: proximoEstado,
        });
        if (proximoEstado === "ON") {
            // Insere o arquivo CSS quando o usuário ativa a extensão
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: { tabId: aba.id },
            });
        } else if (proximoEstado === "OFF") {
            // Remove o arquivo CSS quando o usuário desativa a extensão
            await chrome.scripting.removeCSS({
                files: ["focus-mode.css"],
                target: { tabId: aba.id },
            });
        }
    }
});
