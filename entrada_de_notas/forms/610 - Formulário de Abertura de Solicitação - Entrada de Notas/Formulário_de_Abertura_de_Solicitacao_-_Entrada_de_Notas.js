$(document).ready(function () {
  setFilterZoom();
  reloadZoomCarregado("atendente","04-ENTRADA_NF-ATENDENTE");
  reloadZoomCarregado("atendenteDespes","04-ENTRADA_NF-ATENDENTEDESPES");
});


function reloadZoomCarregado(campo, grupoSelecionado) {
    if (window[campo].element) {
        reloadZoomFilterValues(campo, `groupId,${grupoSelecionado}`);
        return true;
    } else {
        setTimeout(() => { reloadZoomCarregado(campo, grupoSelecionado); }, 300);
    }
}

function setFilterZoom() {}
