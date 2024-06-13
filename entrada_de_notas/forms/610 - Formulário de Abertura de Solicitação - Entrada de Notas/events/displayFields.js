function displayFields(form, customHTML) {
    try {
        var activity = getValue('WKNumState');
        var corDeFundoAtiva = get_Constante("Cor_Fundo_Ativa")
        var corDeFundoInativa = get_Constante("Cor_Fundo_Inativa")
        var corDeFundoConsulta = get_Constante("Cor_Fundo_Consulta")
        var cSuper_user = getAtribuicoes("super_user");
        var cUser = getValue("WKUser");
        if (cUser != 'suporte.fluig' && cUser != cSuper_user) {
            /****  div_atribuicoes****/
            form.setVisibleById("div_atribuicoes", false);

        }
        if (activity == 3 || activity == 0) {
            //Inicio do bloco de atribuição de dados nas tasks
            form.setValue("cTask027", getAtribuicoes("NOTIFICA-" + getValue("WKUser")));

            form.setVisibleById("div_aprovar_solicitacao", false);
            form.setVisibleById("div_tratativa_solicitacao", false);
            form.setVisibleById("div_tratativa_solicitacao_despesas", false);

            customHTML.append('\n<script>');
            customHTML.append('\n   $("#div_solicitante").css({backgroundColor: "' + corDeFundoAtiva + '" });');
            customHTML.append('\n   $("#div_solicitacao").css({backgroundColor: "' + corDeFundoAtiva + '" });');
            customHTML.append('\n   $(\'*[name="revisaoSolicita"]\').css(\'display\', \'none\');var closers = $(\'*[name="revisaoSolicita"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="revisaoSolicita"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="revisaoSolicita"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').css(\'display\', \'none\');var closers = $(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').css(\'display\', \'none\');var closers = $(\'*[name="atendenteDespes"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="atendenteDespes"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="despesaReceita"]\').css(\'display\', \'none\');var closers = $(\'*[name="despesaReceita"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="despesaReceita"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="despesaReceita"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="atendente"]\').css(\'display\', \'none\');var closers = $(\'*[name="atendente"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="atendente"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="atendente"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').css(\'display\', \'none\');var closers = $(\'*[name="atendenteDespes"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="atendenteDespes"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="mensagemTratati"]\').css(\'display\', \'none\');var closers = $(\'*[name="mensagemTratati"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="mensagemTratati"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="mensagemTratati"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="revisaoEntrada"]\').css(\'display\', \'none\');var closers = $(\'*[name="revisaoEntrada"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="revisaoEntrada"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="revisaoEntrada"]\').closest("li").hide()');
            customHTML.append('\n</script>');
        }
        else if (activity == 4) {
            form.setVisibleById("div_tratativa_solicitacao_despesas", false);
            customHTML.append('\n<script>');
            customHTML.append('\n   $("#div_tratativa_solicitacao").css({backgroundColor: "' + corDeFundoAtiva + '" });');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').css(\'display\', \'none\');var closers = $(\'*[name="atendenteDespes"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="atendenteDespes"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').css(\'display\', \'none\');var closers = $(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').closest("li").hide()');
            customHTML.append('\n</script>');
        }
        else if (activity == 8) {
            customHTML.append('\n<script>');
            customHTML.append('\n   $("#div_solicitante").css({backgroundColor: "' + corDeFundoAtiva + '" });');
            customHTML.append('\n   $("#div_solicitacao").css({backgroundColor: "' + corDeFundoAtiva + '" });');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').css(\'display\', \'none\');var closers = $(\'*[name="atendenteDespes"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="atendenteDespes"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="atendenteDespes"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').css(\'display\', \'none\');var closers = $(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="mensagemDespesa"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="mensagemDespesa"]\').closest("li").hide()');
            customHTML.append('\n   $(\'*[name="revisaoEntrada"]\').css(\'display\', \'none\');var closers = $(\'*[name="revisaoEntrada"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="revisaoEntrada"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('\n   $(\'*[name="revisaoEntrada"]\').closest("li").hide()');
            customHTML.append('\n</script>');
        }
        else if (activity == 37) {
            customHTML.append('\n<script>\n   $("#div_aprovar_solicitacao").css({backgroundColor: "' + corDeFundoAtiva + '" });\n</script>');
            form.setVisibleById("div_tratativa_solicitacao", false);
            form.setVisibleById("div_tratativa_solicitacao_despesas", false);
        }
        else if (activity == 18) {
            customHTML.append('\n<script>\n   $("#div_tratativa_solicitacao_despesas").css({backgroundColor: "' + corDeFundoAtiva + '" });\n</script>');
            customHTML.append('<script>');
            customHTML.append('$(\'*[name="revisaoSolicita"]\').css(\'display\', \'none\');var closers = $(\'*[name="revisaoSolicita"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="revisaoSolicita"]\').closest(\'.form-field\').css(\'display\', \'none\');}');
            customHTML.append('</script>');
            customHTML.append('<script>');
            customHTML.append('$(\'*[name="revisaoSolicita"]\').closest("li").hide()');
            customHTML.append('</script>');
        }

        else if (activity == 11 || activity == 20) {
            customHTML.append('\n<script>');
            customHTML.append('\n   $("#div_solicitante").css({backgroundColor: "' + corDeFundoConsulta + '" });');
            customHTML.append('\n   $("#div_solicitacao").css({backgroundColor: "' + corDeFundoConsulta + '" });');
            customHTML.append('\n   $("#div_aprovar_solicitacao").css({backgroundColor: "' + corDeFundoConsulta + '" });');
            customHTML.append('\n   $("#div_tratativa_solicitacao").css({backgroundColor: "' + corDeFundoConsulta + '" });');
            customHTML.append('\n   $("#div_tratativa_solicitacao_despesas").css({backgroundColor: "' + corDeFundoConsulta + '" });');
            customHTML.append('\n</script>');
        }

        /** Negações */
        if (activity != 0 && activity != 3 && activity != 8 && activity != 11 && activity != 20) {
            customHTML.append('\n<script>\n   $("#div_solicitante").css({backgroundColor: "' + corDeFundoInativa + '" });\n</script>');
            customHTML.append('\n<script>\n   $("#div_solicitacao").css({backgroundColor: "' + corDeFundoInativa + '" });\n</script>');
        }
        if (activity != 37 && activity != 11 && activity != 20) {
            customHTML.append('\n<script>\n   $("#div_aprovar_solicitacao").css({backgroundColor: "' + corDeFundoInativa + '" });\n</script>');
        }
        if (activity != 4 && activity != 11 && activity != 20) {
            customHTML.append('\n<script>\n   $("#div_tratativa_solicitacao").css({backgroundColor: "' + corDeFundoInativa + '" });\n</script>');
        }
        if (activity != 18 && activity != 11 && activity != 20) {
            customHTML.append('\n<script>\n   $("#div_tratativa_solicitacao_despesas").css({backgroundColor: "' + corDeFundoInativa + '" });\n</script>');
        }

        customHTML.append('\n<script>');
        customHTML.append('\n   const activity = ' + activity + ';');
        customHTML.append('\n</script>');
    } catch (error) {
        customHTML.append('\n<script>');
        customHTML.append('\n   const error = \'' + String(error) + '\';');
        customHTML.append('\n   const errorLine = ' + String(error.lineNumber) + ';');
        customHTML.append('\n   alert(error);');
        customHTML.append('\n</script>');
    }
}

///* FUNÇÃO NOVA DE ATRIBUIÇÕES 
function getAtribuicoes(atribuicao) {
    var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
    var dtsAtribuicoes = DatasetFactory.getDataset("dts_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)
    if (dtsAtribuicoes.rowsCount > 0) {
        return dtsAtribuicoes.getValue(0, "hd_cod_user_atv")
    } else {
        return ""
    }
}

function get_Constante(cCriterio) {
    var aConstraint = [];
    aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));
    var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
    for (var i = 0; i < oConstantes.rowsCount; i++) {
        if (oConstantes.getValue(i, "id").trim() == cCriterio.trim()) {
            return oConstantes.getValue(i, "Valor").trim();
        }
    }
    return '0';
}