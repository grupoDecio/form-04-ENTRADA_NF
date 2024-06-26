function createDataset(fields, constraints, sortFields) 
{
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("Nome"); /// Nome
    dataset.addColumn("Codigo"); /// Codigo
    dataset.addColumn("ISPB"); /// ISPB 
    
    //Cria os registros
    dataset.addRow(new Array('001','BANCO DO BRASIL S.A (BB)','00000000'));
    dataset.addRow(new Array('237','BRADESCO S.A','60746948'));
    dataset.addRow(new Array('335','BANCO DIGIO S.A','27098060'));
    dataset.addRow(new Array('260','NU PAGAMENTOS S.A (NUBANK)','18236120'));
    dataset.addRow(new Array('290','PAGSEGURO INTERNET S.A (PAGBANK','08561701'));
    dataset.addRow(new Array('380','PICPAY SERVIÇOS S.A.','22896431'));
    dataset.addRow(new Array('323','MERCADO PAGO (CARTEIRA DIGITAL)','10573521'));
    dataset.addRow(new Array('237','NEXT BANK (FINTECH DO  BANCO BRADESCO)','60746948'));
    dataset.addRow(new Array('637','BANCO SOFISA S.A (SOFISA DIRETO)','60889128'));
    dataset.addRow(new Array('077','BANCO INTER S.A','00416968'));
    dataset.addRow(new Array('341','ITAÚ UNIBANCO S.A (OS MESMOS DADOS PARA A CONTA ITI)','60701190'));
    dataset.addRow(new Array('104','CAIXA ECONÔMICA FEDERAL (CEF)','00360305'));
    dataset.addRow(new Array('033','BANCO SANTANDER BRASIL S.A','90400888'));
    dataset.addRow(new Array('212','BANCO ORIGINAL S.A','92894922'));
    dataset.addRow(new Array('756','BANCOOB (BANCO COOPERATIVO DO BRASIL)','02038232'));
    dataset.addRow(new Array('413','BANCO VOTORANTIM S.A','59588111'));
    dataset.addRow(new Array('655','NEON PAGAMENTOS S.A (FINTECH DO BANCO VOTORANTIM)','59588111'));
    dataset.addRow(new Array('041','BANRISUL – BANCO DO ESTADO DO RIO GRANDE DO SUL S.A','92702067'));
    dataset.addRow(new Array('389','BANCO MERCANTIL DO BRASIL S.A','17184037'));
    dataset.addRow(new Array('422','BANCO SAFRA S.A','58160789'));
    dataset.addRow(new Array('070','BANCO DE BRASÍLIA (BRB)','00000208'));
    dataset.addRow(new Array('136','UNICRED COOPERATIVA','00315557'));
    dataset.addRow(new Array('741','BANCO RIBEIRÃO PRETO','00517645'));
    dataset.addRow(new Array('739','BANCO CETELEM S.A','00558456'));
    dataset.addRow(new Array('743','BANCO SEMEAR S.A','00795423'));
    dataset.addRow(new Array('100','PLANNER CORRETORA DE VALORES S.A','00806535'));
    dataset.addRow(new Array('096','BANCO B3 S.A','00997185'));
    dataset.addRow(new Array('747','Banco RABOBANK INTERNACIONAL DO BRASIL S.A','01023570'));
    dataset.addRow(new Array('748','SICREDI S.A','01181521'));
    dataset.addRow(new Array('752','BNP PARIBAS BRASIL S.A','01522368'));
    dataset.addRow(new Array('091','UNICRED CENTRAL RS','01634601'));
    dataset.addRow(new Array('399','KIRTON BANK','01701201'));
    dataset.addRow(new Array('108','PORTOCRED S.A','01800019'));
    dataset.addRow(new Array('757','BANCO KEB HANA DO BRASIL S.A','02318507'));
    dataset.addRow(new Array('102','XP INVESTIMENTOS S.A','02332886'));
    dataset.addRow(new Array('084','UNIPRIME NORTE DO PARANÁ','02398976'));
    dataset.addRow(new Array('180','CM CAPITAL MARKETS CCTVM LTDA','02685483'));
    dataset.addRow(new Array('066','BANCO MORGAN STANLEY S.A','02801938'));
    dataset.addRow(new Array('015','UBS BRASIL CCTVM S.A','02819125'));
    dataset.addRow(new Array('143','TREVISO CC S.A','02992317'));
    dataset.addRow(new Array('062','HIPERCARD BM S.A','03012230'));
    dataset.addRow(new Array('074','BCO. J.SAFRA S.A','03017677'));
    dataset.addRow(new Array('099','UNIPRIME CENTRAL CCC LTDA','03046391'));
    dataset.addRow(new Array('025','BANCO ALFA S.A.','03323840'));
    dataset.addRow(new Array('075','BCO ABN AMRO S.A','03532415'));
    dataset.addRow(new Array('040','BANCO CARGILL S.A','03609817'));
    dataset.addRow(new Array('190','SERVICOOP','03973814'));
    dataset.addRow(new Array('063','BANCO BRADESCARD','04184779'));
    dataset.addRow(new Array('191','NOVA FUTURA CTVM LTDA','04257795'));
    dataset.addRow(new Array('064','GOLDMAN SACHS DO BRASIL BM S.A','04332281'));
    dataset.addRow(new Array('097','CCC NOROESTE BRASILEIRO LTDA','04632856'));
    dataset.addRow(new Array('016','CCM DESP TRÂNS SC E RS','04715685'));
    dataset.addRow(new Array('012','BANCO INBURSA','04866275'));
    dataset.addRow(new Array('003','BANCO DA AMAZONIA S.A','04902979'));
    dataset.addRow(new Array('060','CONFIDENCE CC S.A','04913129'));
    dataset.addRow(new Array('037','BANCO DO ESTADO DO PARÁ S.A','04913711'));
    dataset.addRow(new Array('159','CASA CREDITO S.A','05442029'));
    dataset.addRow(new Array('172','ALBATROSS CCV S.A','05452073'));
    dataset.addRow(new Array('085','COOP CENTRAL AILOS','05463212'));
    dataset.addRow(new Array('114','CENTRAL COOPERATIVA DE CRÉDITO NO','05790149'));
    dataset.addRow(new Array('000','ESTADO DO ESPÍRITO SANTO','00000000'));
    dataset.addRow(new Array('036','BANCO BBI S.A','06271464'));
    dataset.addRow(new Array('394','BANCO BRADESCO FINANCIAMENTOS S.A','07207996'));
    dataset.addRow(new Array('004','BANCO DO NORDESTE DO BRASIL S.A.','07237373'));
    dataset.addRow(new Array('320','BANCO CCB BRASIL S.A','07450604'));
    dataset.addRow(new Array('189','HS FINANCEIRA','07512441'));
    dataset.addRow(new Array('105','LECCA CFI S.A','07652226'));
    dataset.addRow(new Array('076','BANCO KDB BRASIL S.A.','07656500'));
    dataset.addRow(new Array('082','BANCO TOPÁZIO S.A','07679404'));
    dataset.addRow(new Array('286','CCR DE OURO','07853842'));
    dataset.addRow(new Array('093','PÓLOCRED SCMEPP LTDA','07945233'));
    dataset.addRow(new Array('273','CCR DE SÃO MIGUEL DO OESTE','08253539'));
    dataset.addRow(new Array('157','ICAP DO BRASIL CTVM LTDA','09105360'));
    dataset.addRow(new Array('183','SOCRED S.A','09210106'));
    dataset.addRow(new Array('014','NATIXIS BRASIL S.A','09274232'));
    dataset.addRow(new Array('130','CARUANA SCFI','09313766'));
    dataset.addRow(new Array('127','CODEPE CVC S.A','09512542'));
    dataset.addRow(new Array('079','BANCO ORIGINAL DO AGRONEGÓCIO S.A','09516419'));
    dataset.addRow(new Array('081','BBN BANCO BRASILEIRO DE NEGOCIOS S.A','10264663'));
    dataset.addRow(new Array('118','STANDARD CHARTERED BI S.A','11932017'));
    dataset.addRow(new Array('133','CRESOL CONFEDERAÇÃO','10398952'));
    dataset.addRow(new Array('121','BANCO AGIBANK S.A','10664513'));
    dataset.addRow(new Array('083','BANCO DA CHINA BRASIL S.A','10690848'));
    dataset.addRow(new Array('138','GET MONEY CC LTDA','10853017'));
    dataset.addRow(new Array('024','BCO BANDEPE S.A','10866788'));
    dataset.addRow(new Array('095','BANCO CONFIDENCE DE CÂMBIO S.A','11703662'));
    dataset.addRow(new Array('094','BANCO FINAXIS','11758741'));
    dataset.addRow(new Array('276','SENFF S.A','11970623'));
    dataset.addRow(new Array('137','MULTIMONEY CC LTDA','12586596'));
    dataset.addRow(new Array('092','BRK S.A','12865507'));
    dataset.addRow(new Array('047','BANCO BCO DO ESTADO DE SERGIPE S.A','13009717'));
    dataset.addRow(new Array('144','BEXS BANCO DE CAMBIO S.A.','13059145'));
    dataset.addRow(new Array('126','BR PARTNERS BI','13220493'));
    dataset.addRow(new Array('301','BPP INSTITUIÇÃO DE PAGAMENTOS S.A','13370835'));
    dataset.addRow(new Array('173','BRL TRUST DTVM SA','13486793'));
    dataset.addRow(new Array('119','BANCO WESTERN UNION','13720915'));
    dataset.addRow(new Array('254','PARANA BANCO S.A','14388334'));
    dataset.addRow(new Array('268','BARIGUI CH','14511781'));
    dataset.addRow(new Array('107','BANCO BOCOM BBM S.A','15114366'));
    dataset.addRow(new Array('412','BANCO CAPITAL S.A','15173776'));
    dataset.addRow(new Array('124','BANCO WOORI BANK DO BRASIL S.A','15357060'));
    dataset.addRow(new Array('149','FACTA S.A. CFI','15581638'));
    dataset.addRow(new Array('197','STONE PAGAMENTOS S.A','16501555'));
    dataset.addRow(new Array('142','BROKER BRASIL CC LTDA','16944141'));
    dataset.addRow(new Array('389','BANCO MERCANTIL DO BRASIL S.A.','17184037'));
    dataset.addRow(new Array('184','BANCO ITAÚ BBA S.A','17298092'));
    dataset.addRow(new Array('634','BANCO TRIANGULO S.A (BANCO TRIÂNGULO)','17351180'));
    dataset.addRow(new Array('545','SENSO CCVM S.A','17352220'));
    dataset.addRow(new Array('132','ICBC DO BRASIL BM S.A','17453575'));
    dataset.addRow(new Array('298','VIPS CC LTDA','17772370'));
    dataset.addRow(new Array('129','UBS BRASIL BI S.A','18520834'));
    dataset.addRow(new Array('128','MS BANK S.A BANCO DE CÂMBIO','19307785'));
    dataset.addRow(new Array('194','PARMETAL DTVM LTDA','20155248'));
    dataset.addRow(new Array('310','VORTX DTVM LTDA','22610500'));
    dataset.addRow(new Array('163','COMMERZBANK BRASIL S.A BANCO MÚLTIPLO','23522214'));
    dataset.addRow(new Array('280','AVISTA S.A','23862762'));
    dataset.addRow(new Array('146','GUITTA CC LTDA','24074692'));
    dataset.addRow(new Array('279','CCR DE PRIMAVERA DO LESTE','26563270'));
    dataset.addRow(new Array('182','DACASA FINANCEIRA S/A','27406222'));
    dataset.addRow(new Array('278','GENIAL INVESTIMENTOS CVM S.A','27652684'));
    dataset.addRow(new Array('271','IB CCTVM LTDA','27842177'));
    dataset.addRow(new Array('021','BANCO BANESTES S.A','28127603'));
    dataset.addRow(new Array('246','BANCO ABC BRASIL S.A','28195667'));
    dataset.addRow(new Array('751','SCOTIABANK BRASIL','29030467'));
    dataset.addRow(new Array('208','BANCO BTG PACTUAL S.A','30306294'));
    dataset.addRow(new Array('746','BANCO MODAL S.A','30723886'));
    dataset.addRow(new Array('241','BANCO CLASSICO S.A','31597552'));
    dataset.addRow(new Array('612','BANCO GUANABARA S.A','31880826'));
    dataset.addRow(new Array('604','BANCO INDUSTRIAL DO BRASIL S.A','31895683'));
    dataset.addRow(new Array('505','BANCO CREDIT SUISSE (BRL) S.A','32062580'));
    dataset.addRow(new Array('196','BANCO FAIR CC S.A','32648370'));
    dataset.addRow(new Array('300','BANCO LA NACION ARGENTINA','33042151'));
    dataset.addRow(new Array('477','CITIBANK N.A','33042953'));
    dataset.addRow(new Array('266','BANCO CEDULA S.A','33132044'));
    dataset.addRow(new Array('122','BANCO BRADESCO BERJ S.A','33147315'));
    dataset.addRow(new Array('376','BANCO J.P. MORGAN S.A','33172537'));
    dataset.addRow(new Array('473','BANCO CAIXA GERAL BRASIL S.A','33466988'));
    dataset.addRow(new Array('745','BANCO CITIBANK S.A','33479023'));
    dataset.addRow(new Array('120','BANCO RODOBENS S.A','33603457'));
    dataset.addRow(new Array('265','BANCO FATOR S.A','33644196'));
    dataset.addRow(new Array('007','BNDES (BANCO NACIONAL DO DESENVOLVIMENTO SOCIAL)','33657248'));
    dataset.addRow(new Array('188','ATIVA S.A INVESTIMENTOS','33775974'));
    dataset.addRow(new Array('134','BGC LIQUIDEZ DTVM LTDA','33862244'));
    dataset.addRow(new Array('641','BANCO ALVORADA S.A','33870163'));
    dataset.addRow(new Array('029','BANCO ITAÚ CONSIGNADO S.A','33885724'));
    dataset.addRow(new Array('243','BANCO MÁXIMA S.A','33923798'));
    dataset.addRow(new Array('078','HAITONG BI DO BRASIL S.A','34111187'));
    dataset.addRow(new Array('111','BANCO OLIVEIRA TRUST DTVM S.A','36113876'));
    dataset.addRow(new Array('017','BNY MELLON BANCO S.A','42272526'));
    dataset.addRow(new Array('174','PERNAMBUCANAS FINANC S.A','43180355'));
    dataset.addRow(new Array('495','LA PROVINCIA BUENOS AIRES BANCO','44189447'));
    dataset.addRow(new Array('125','BRASIL PLURAL S.A BANCO','45246410'));
    dataset.addRow(new Array('488','JPMORGAN CHASE BANK','46518205'));
    dataset.addRow(new Array('065','BANCO ANDBANK S.A','48795256'));
    dataset.addRow(new Array('492','ING BANK N.V','49336860'));
    dataset.addRow(new Array('250','BANCO BCV','50585090'));
    dataset.addRow(new Array('145','LEVYCAM CCV LTDA','50579044'));
    dataset.addRow(new Array('494','BANCO REP ORIENTAL URUGUAY','51938876'));
    dataset.addRow(new Array('253','BEXS CC S.A','52937216'));
    dataset.addRow(new Array('269','HSBC BANCO DE INVESTIMENTO','53518684'));
    dataset.addRow(new Array('213','BCO ARBI S.A','54403563'));
    dataset.addRow(new Array('139','INTESA SANPAOLO BRASIL S.A','55230916'));
    dataset.addRow(new Array('018','BANCO TRICURY S.A','57839805'));
    dataset.addRow(new Array('630','BANCO INTERCAP S.A','58497702'));
    dataset.addRow(new Array('224','BANCO FIBRA S.A','58616418'));
    dataset.addRow(new Array('600','BANCO LUSO BRASILEIRO S.A','59118133'));
    dataset.addRow(new Array('623','BANCO PAN','59285411'));
    dataset.addRow(new Array('204','BANCO BRADESCO CARTOES S.A','59438325'));
    dataset.addRow(new Array('479','BANCO ITAUBANK S.A','60394079'));
    dataset.addRow(new Array('456','BANCO MUFG BRASIL S.A','60498557'));
    dataset.addRow(new Array('464','BANCO SUMITOMO MITSUI BRASIL S.A','60518222'));
    dataset.addRow(new Array('613','OMNI BANCO S.A','60850229'));
    dataset.addRow(new Array('652','ITAÚ UNIBANCO HOLDING BM S.A','60872504'));
    dataset.addRow(new Array('653','BANCO INDUSVAL S.A','61024352'));
    dataset.addRow(new Array('069','BANCO CREFISA S.A','61033106'));
    dataset.addRow(new Array('370','BANCO MIZUHO S.A','61088183'));
    dataset.addRow(new Array('249','BANCO INVESTCRED UNIBANCO S.A','61182408'));
    dataset.addRow(new Array('318','BANCO BMG S.A','61186680'));
    dataset.addRow(new Array('626','BANCO FICSA S.A','61348538'));
    dataset.addRow(new Array('270','SAGITUR CC LTDA','61444949'));
    dataset.addRow(new Array('366','BANCO SOCIETE GENERALE BRASIL','61533584'));
    dataset.addRow(new Array('113','MAGLIANO S.A','61723847'));
    dataset.addRow(new Array('131','TULLETT PREBON BRASIL CVC LTDA','61747085'));
    dataset.addRow(new Array('011','C.SUISSE HEDGING-GRIFFO CV S.A (CREDIT SUISSE)','61809182'));
    dataset.addRow(new Array('611','BANCO PAULISTA','61820817'));
    dataset.addRow(new Array('755','BOFA MERRILL LYNCH BM S.A','62073200'));
    dataset.addRow(new Array('089','CCR REG MOGIANA','62109566'));
    dataset.addRow(new Array('643','BANCO PINE S.A','62144175'));
    dataset.addRow(new Array('140','EASYNVEST – TÍTULO CV S.A','62169875'));
    dataset.addRow(new Array('707','BANCO DAYCOVAL S.A','62232889'));
    dataset.addRow(new Array('288','CAROL DTVM LTDA','62237649'));
    dataset.addRow(new Array('101','RENASCENCA DTVM LTDA','62287735'));
    dataset.addRow(new Array('487','DEUTSCHE BANK S.A BANCO ALEMÃO','62331228'));
    dataset.addRow(new Array('233','BANCO CIFRA','62421979'));
    dataset.addRow(new Array('177','GUIDE','65913436'));
    dataset.addRow(new Array('633','BANCO RENDIMENTO S.A','68900810'));
    dataset.addRow(new Array('218','BANCO BS2 S.A','71027866'));
    dataset.addRow(new Array('292','BS2 DISTRIBUIDORA DE TÍTULOS E INVESTIMENTOS','28650236'));
    dataset.addRow(new Array('169','BANCO OLÉ BONSUCESSO CONSIGNADO S.A','71371686'));
    dataset.addRow(new Array('293','LASTRO RDV DTVM LTDA','71590442'));
    dataset.addRow(new Array('285','FRENTE CC LTDA','71677850'));
    dataset.addRow(new Array('080','B&T CC LTDA','73622748'));
    dataset.addRow(new Array('753','NOVO BANCO CONTINENTAL S.A BM','74828799'));
    dataset.addRow(new Array('222','BANCO CRÉDIT AGRICOLE BR S.A','75647891'));
    dataset.addRow(new Array('754','BANCO SISTEMA','76543115'));
    dataset.addRow(new Array('098','CREDIALIANÇA CCR','78157146'));
    dataset.addRow(new Array('610','BANCO VR S.A','78626983'));
    dataset.addRow(new Array('712','BANCO OURINVEST S.A','78632767'));
    dataset.addRow(new Array('010','CREDICOAMO','81723108'));
    dataset.addRow(new Array('283','RB CAPITAL INVESTIMENTOS DTVM LTDA','89960090'));
    dataset.addRow(new Array('217','BANCO JOHN DEERE S.A','91884981'));
    dataset.addRow(new Array('117','ADVANCED CC LTDA','92856905'));
    dataset.addRow(new Array('336','BANCO C6 S.A – C6 BANK','28326000'));
    dataset.addRow(new Array('654','BANCO DIGIMAIS S.A','92874270'));
	return dataset;
}
