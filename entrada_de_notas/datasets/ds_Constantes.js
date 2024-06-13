function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("id");
    dataset.addColumn("Valor");
    dataset.addColumn("descrição");

    //Cria os registros
    dataset.addRow(new Array('ZZ-IntervaloElevacao', '000:01', 'Horas entre cada aviso-elevação formato HHH:MM'));
    dataset.addRow(new Array('10-DESPESA', '0-3=Urgentissimo,4-10=Urgente,11-100=Normal', 'Classificação da urgência do pagamento'));
    dataset.addRow(new Array('00-FLUIG-APROVA', 'Sim', 'Sim=Com etapa de Aprovação / Não=Sem etapa de Aprovação'));

    dataset.addRow(new Array('Cor_Fundo_Ativa', '#98E1BD', 'Cor de Fundo Divisão ativa do HTML'));
    dataset.addRow(new Array('Cor_Fundo_Inativa', '#DBDBDB', 'Cor de Fundo Divisão Inativa do HTML'));
    dataset.addRow(new Array('Cor_Fundo_Consulta', '#87CEFA', 'Cor de Fundo Divisão Encerrada'));

    /// 01-TI_SISTEMAS
    dataset.addRow(new Array('01-TI_SISTEMAS-029-SISTEMA-PROTHEUS', 'SIM', 'SIM-Aprovação NÃO-DIRETO'));
    dataset.addRow(new Array('01-TI_SISTEMAS-029-SISTEMA-FLUIG', 'NAO', 'SIM-Aprovação NÃO-DIRETO'))
    dataset.addRow(new Array('01-TI_SISTEMAS-029-SISTEMA-TEF', 'NAO', 'SIM-Aprovação NÃO-DIRETO'))
    dataset.addRow(new Array('01-TI_SISTEMAS-008_SLA', '008:00', 'SLA previsto para a atividade 008 Complementar Solicitação'));
    dataset.addRow(new Array('01-TI_SISTEMAS-013_SLA', '013:00', 'SLA previsto para a atividade 013 Validar solução'));
    dataset.addRow(new Array('01-TI_SISTEMAS-077_SLA', '077:00', 'SLA previsto para a atividade 077 Avaliação de satisafação'));
    dataset.addRow(new Array('01-TI_SISTEMAS-004_SLA', '000:01', 'SLA previsto para a atividade 004 Analisasr SLA'));
    dataset.addRow(new Array('01-TI_SISTEMAS-029_SLA', '029:00', 'SLA previsto para a atividade 029 Atuar N1'));
    dataset.addRow(new Array('01-TI_SISTEMAS-029_SLA-TI', '', 'SLA previsto para a atividade 029 Atuar N1 TI'));
    dataset.addRow(new Array('01-TI_SISTEMAS-065_SLA', '065:00', 'SLA previsto para a atividade 065 Atuar N2'));
    dataset.addRow(new Array('01-TI_SISTEMAS-066_SLA', '066:00', 'SLA previsto para a atividade 066 Atuar N3'));
    dataset.addRow(new Array('01-TI_SISTEMAS-090_SLA', '090:00', 'SLA previsto para a atividade 090 Elevação N1'));
    dataset.addRow(new Array('01-TI_SISTEMAS-094_SLA', '094:00', 'SLA previsto para a atividade 094 Elevação N2'));
    dataset.addRow(new Array('01-TI_SISTEMAS-095_SLA', '095:00', 'SLA previsto para a atividade 095 Elevação N3'));
    
    
    /// 02-DESPESAS_IMOBILIARIA
    dataset.addRow(new Array('02-DESPESAS_IMOBILIARIA-016_SLA', '017:00', 'SLA previsto para a atividade 56-Avaliar Atendimento'));

    //03 - CADASTRO ITEM
    dataset.addRow(new Array('03-CADASTRO_ITEM-012_SLA', '024:00', 'SLA previsto para corrigir informações'));
    dataset.addRow(new Array('03-CADASTRO_ITEM-039_SLA', '024:00', 'SLA previsto para validar solucao'));
    dataset.addRow(new Array('03-CADASTRO_ITEM-048_SLA', '048:00', 'SLA previsto para avaliar atendimento'));
 
    /// identificar
    dataset.addRow(new Array('348-PROMOCAO-086_SLA', '017:00', 'SLA previsto para a atividade 348-Avaliar Atendimento'));
    
    ///05-DESLIGAMENTO
    dataset.addRow(new Array('05-DESLIGAMENTO-104', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-104'));
    dataset.addRow(new Array('05-DESLIGAMENTO-029', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-029'));
    dataset.addRow(new Array('05-DESLIGAMENTO-114', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-114'));
    dataset.addRow(new Array('05-DESLIGAMENTO-007', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-007'));
    dataset.addRow(new Array('05-DESLIGAMENTO-092', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-092'));
    dataset.addRow(new Array('05-DESLIGAMENTO-120', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-128'));
    dataset.addRow(new Array('05-DESLIGAMENTO-034', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-034'));
    dataset.addRow(new Array('05-DESLIGAMENTO-081', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-081'));
    dataset.addRow(new Array('05-DESLIGAMENTO-218', '002:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-218'));
    dataset.addRow(new Array('05-DESLIGAMENTO-014', '001:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-014'));
    dataset.addRow(new Array('05-DESLIGAMENTO-275', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-275'));
    dataset.addRow(new Array('05-DESLIGAMENTO-016', '003:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-016'));
    dataset.addRow(new Array('05-DESLIGAMENTO-020', '005:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-020'));
    dataset.addRow(new Array('05-DESLIGAMENTO-018', '005:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-018'));
    dataset.addRow(new Array('05-DESLIGAMENTO-345', '006:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-345'));
    dataset.addRow(new Array('05-DESLIGAMENTO-348', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-348'));
    dataset.addRow(new Array('05-DESLIGAMENTO-332', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-332'));
    dataset.addRow(new Array('05-DESLIGAMENTO-333', '006:00', 'SLA previsto para a atividade 05-DESLIGAMENTO-333'));
    dataset.addRow(new Array('05-DESLIGAMENTO-338', '008:30', 'SLA previsto para a atividade 05-DESLIGAMENTO-338'));
    
    dataset.addRow(new Array('05-DESLIGAMENTO-BI', '032:00', 'SLA previsto 05-DESLIGAMENTO-BI')); 
    dataset.addRow(new Array('15-JURIDICO-BI', '032:00', 'SLA previsto 15-JURIDICO-BI')); 
 
    ///07-PROMOCAO
    dataset.addRow(new Array('07-PROMOCAO-086_SLA', '017:00', 'SLA previsto para a atividade 86-Avaliar Atendimento'));

    //08-FINANCEIRO
    dataset.addRow(new Array('08-FINANCEIRO-035_SLA', '048:00', 'SLA previsto para a atividade 35-Avaliar Atendimento'));

    /// 10-DESPESA
    dataset.addRow(new Array('10-DEPESAS-016_SLA', '017:00', 'SLA previsto para a atividade 16-Avaliar Atendimento'));
    
    //13 - PAGAMENTO_RPA
    dataset.addRow(new Array('089-PAGAMENTO_RPA-089_SLA', '024:00', 'SLA previsto para validar solucao'));
 
    
    
    
    /// 15-JURIDICO
    dataset.addRow(new Array('15-JURIDICO_004_HORAEXPI', '23:00', 'Hora para expirar atividade'));
    dataset.addRow(new Array('15-JURIDICO_063_HORAEXPI', '24:00', 'Hora para expirar atividade'));
    dataset.addRow(new Array('15-JURIDICO_SLA', '008:00', 'SLA padrão'));
    dataset.addRow(new Array('15-JURIDICO-004_SLA'                  , '034:00', 'SLA previsto para a atividade 04-Analisar Solicitação 4 dias'));
    dataset.addRow(new Array('15-JURIDICO-008_SLA'                  , '042:30', 'SLA previsto para a atividade 08-Ajustar Solicitação 5 dias'));
    dataset.addRow(new Array('15-JURIDICO-063_SLA'                  , '045:00', 'SLA previsto para a atividade 63-Atuar na Solicitaçã 3 dias'));
    dataset.addRow(new Array('15-JURIDICO-065_SLA'                  , '170:00', 'SLA previsto para a atividade 65-Validar Solução Enviada 10 dias'));
    dataset.addRow(new Array('15-JURIDICO-072_SLA'                  , '017:00', 'SLA previsto para a atividade 72-Avaliar Atendimento 1 dias'));
    dataset.addRow(new Array('15-JURIDICO-063-MEDIDADISCIPLINAR_SLA', '060:00', 'SLA previsto para a atividade 063 - MEDIDA DISCIPLINAR 4 dias'));
    

   
    /// 16-CARTAO_VEXPENSES
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-004_SLA', '017:00', 'SLA previsto para a atividade 04Analisar - Gestor Imediato'));
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-008_SLA', '017:00', 'SLA previsto para a atividade 08-Realizar correção '));
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-063_SLA', '017:00', 'SLA previsto para a atividade 63-Realizar Análise - Diretor Imediato'));
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-065_SLA', '017:00', 'SLA previsto para a atividade 65-Realizar Análise - Diretor Financeiro'));
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-100_SLA', '017:00', 'SLA previsto para a atividade 100-Disponibilizar Cartão Solicitado'));
    dataset.addRow(new Array('16-CARTAO_VEXPENSSES-072_SLA', '017:00', 'SLA previsto para a atividade 72-Avaliar Atendimento'));
    
    /// 17-RECRUTAMENTO
    dataset.addRow(new Array('17-RECRUTAMENTO-277-SLA', '002:00', 'SLA previsto para a atividade 277-Avaliar Atendimento'));
    
    /// 21-ERROS_NF
    dataset.addRow(new Array('21-ERRONF-008-SLA', '008:30', 'SLA previsto para a atividade 008-Revisar Solicitação'));
    dataset.addRow(new Array('21-ERRONF-089-SLA', '008:30', 'SLA previsto para a atividade 089-Avaliar Atendimento'));
    dataset.addRow(new Array('21-ERRONF-196-SLA', '000:01', 'SLA previsto para a atividade 196-Notificação'));
    dataset.addRow(new Array('21-ERRONF-004-SLA', '017:00', 'SLA previsto para a atividade 004-Analise da Solicitação'));
    dataset.addRow(new Array('21-ERRONF-100-SLA', '017:00', 'SLA previsto para a atividade 100-Ajustar Pedido'));
    dataset.addRow(new Array('21-ERRONF-154-SLA', '017:00', 'SLA previsto para a atividade 154-Ajustar Cadastro'));
    dataset.addRow(new Array('21-ERRONF-134-SLA', '017:00', 'SLA previsto para a atividade 134-Lancar Nota Fiscal'));
    dataset.addRow(new Array('21-ERRONF-136-SLA', '017:00', 'SLA previsto para a atividade 136-Ajuste Nota Fiscal'));
    
    /// 23-TI_GDIN
    dataset.addRow(new Array('23-TI_GDIN-005-SLA', '016:00', 'SLA previsto para a atividade 005-Analisar Solicitacao'));
    dataset.addRow(new Array('23-TI_GDIN-007-SLA', '056:00', 'SLA previsto para a atividade 007-Revisar/Complementar Solicitação'));
    dataset.addRow(new Array('23-TI_GDIN-019-SLA', '016:00', 'SLA previsto para a atividade 019-Aguardar Atendimento do Fornecedor'));
    dataset.addRow(new Array('23-TI_GDIN-026-SLA', '016:00', 'SLA previsto para a atividade 026-Atuar'));
    dataset.addRow(new Array('23-TI_GDIN-041-SLA', '016:00', 'SLA previsto para a atividade 041-Analisar Solicitacao'));
    dataset.addRow(new Array('23-TI_GDIN-067-SLA', '056:00', 'SLA previsto para a atividade 067-Validar Solução'));
    dataset.addRow(new Array('23-TI_GDIN-081-SLA', '016:00', 'SLA previsto para a atividade 081-Realizar Instalação/Configuração da Solução'));
    dataset.addRow(new Array('23-TI_GDIN-083-SLA', '056:00', 'SLA previsto para a atividade 083-Avaliar Atendimento'));
    return dataset;
}