function beforeSendData(customField, customFact) {

    customField[0] = hAPI.getCardValue("nomeSolicitante");

    customField[1] = hAPI.getCardValue("unidade");

    customField[2] = hAPI.getCardValue("contato");

    customField[3] = hAPI.getCardValue("assunto");

    customField[4] = hAPI.getCardValue("categoria");

    customField[5] = hAPI.getCardValue("mensagem");

    customField[6] = hAPI.getCardValue("revisaoSolicita");

    customField[7] = hAPI.getCardValue("mensagemTratati");

    customField[8] = hAPI.getCardValue("atendenteDespes");

    customField[9] = hAPI.getCardValue("segmento");

    customField[10] = hAPI.getCardValue("atendente");

    customField[11] = hAPI.getCardValue("mensagemDespesa");
}
