const html = document.documentElement;
const botaoTema = document.querySelector(".botao-tema");
const CHAVE_TEMA = "tema-hydropump";

/* ---- Tema claro/escuro ---- */
function definirTema(tema) {
    html.setAttribute("data-tema", tema);
    localStorage.setItem(CHAVE_TEMA, tema);
}

function carregarTema() {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    if (salvo === "claro" || salvo === "escuro") {
        definirTema(salvo);
    } else {
        definirTema("escuro");
    }
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const atual = html.getAttribute("data-tema") || "escuro";
        const proximo = atual === "escuro" ? "claro" : "escuro";
        definirTema(proximo);
    });
}

/* ---- Link ativo no menu ---- */
function marcarLinkAtivo() {
    const links = document.querySelectorAll(".menu a");
    const caminho = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const alvo = href.split("/").pop();

        if (alvo === caminho) {
            link.classList.add("ativo");
        } else {
            link.classList.remove("ativo");
        }
    });
}

/* ---- Animação de revelar ao rolar ---- */
function iniciarRevelar() {
    const elementos = document.querySelectorAll(".revelar");
    if (elementos.length === 0) return;

    if (!("IntersectionObserver" in window)) {
        elementos.forEach(el => el.classList.add("visivel"));
        return;
    }

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(el => observador.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTema();
    marcarLinkAtivo();
    iniciarRevelar();
})
