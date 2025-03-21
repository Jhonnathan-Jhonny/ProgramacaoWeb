// Mostrar ou esconder o botão "Voltar ao Topo"
window.onscroll = function() {
    const btnTopo = document.getElementById("btnTopo");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTopo.style.display = "flex"; // Mostra o botão
    } else {
        btnTopo.style.display = "none"; // Esconde o botão
    }
};

// Função para voltar ao topo da página
document.getElementById("btnTopo").onclick = function() {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para outros navegadores
};