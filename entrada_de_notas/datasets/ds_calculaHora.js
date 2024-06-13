function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("TIMETOTARGET");

    var alvo = "";

    if (constraints != null && constraints.length > 0) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.toUpperCase() == "TARGET") {
                    alvo = constraints[c].initialValue.trim();
                }
            }
        }
    }

    if (alvo == "") {
        dataset.addRow(["Necessário informar a hora alvo!"]);
        return dataset;
    }

    var agora = new Date();
    var horaAtual = agora.getHours();
    var minutoAtual = agora.getMinutes();

    var [horas, minutos] = alvo.split(':');

    var destino = new Date(agora);
    destino.setHours(horas, minutos, 0, 0);

    var diferencaEmMilissegundos = destino - agora;

    var sinal = "";

    if (diferencaEmMilissegundos < 0) {
        sinal = "-";
        diferencaEmMilissegundos = -diferencaEmMilissegundos;
    }

    var diferencaEmHoras = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
    var diferencaEmMinutos = Math.floor((diferencaEmMilissegundos / (1000 * 60)) % 60);

    var horasFormatadas = diferencaEmHoras < 10 ? "0" + diferencaEmHoras : diferencaEmHoras;
    var minutosFormatados = diferencaEmMinutos < 10 ? "0" + diferencaEmMinutos : diferencaEmMinutos;
    var resultadoFormatado = sinal + horasFormatadas + ":" + minutosFormatados;

    dataset.addRow([resultadoFormatado]);
    return dataset;
}
