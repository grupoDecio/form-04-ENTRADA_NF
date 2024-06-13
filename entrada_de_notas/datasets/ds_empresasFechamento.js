function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    dataset.addColumn("RAZAOSOCIAL");
    dataset.addColumn("NOMEFANTASIA");
    dataset.addColumn("CNPJ");

    var arrEmpresas = [
        {
            RAZAOSOCIAL: "Liderpetro Distribuidora de Petroleo Ltda",
            NOMEFANTASIA: "Liderpetro - Uberlândia",
            CNPJ: "01083568000186"
        },
        {
            RAZAOSOCIAL: "Liderpetro Distribuidora de Petroleo Ltda",
            NOMEFANTASIA: "Liderpetro - Senador Canedo",
            CNPJ: "01083568000348"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio 5",
            CNPJ: "02211749000103"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L1",
            CNPJ: "02211749000375"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L2",
            CNPJ: "02211749000618"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L6",
            CNPJ: "02211749000707"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L5",
            CNPJ: "02211749000880"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L7",
            CNPJ: "02211749000960"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L3",
            CNPJ: "02211749001428"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L14",
            CNPJ: "02211749001509"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L4",
            CNPJ: "02211749001690"
        },
        {
            RAZAOSOCIAL: "Posto 5.5 Limitada",
            NOMEFANTASIA: "Posto Decio L17",
            CNPJ: "02211749001770"
        },
        {
            RAZAOSOCIAL: "Auto Posto Brisa Ltda.",
            NOMEFANTASIA: "Posto Brisa - Santa Vitória",
            CNPJ: "02315777000170"
        },
        {
            RAZAOSOCIAL: "Decio L13 Limitada",
            NOMEFANTASIA: "Posto Decio L13",
            CNPJ: "03194071000160"
        },
        {
            RAZAOSOCIAL: "Organizacao Contabil Soares e Cia Ltda Me",
            NOMEFANTASIA: "Decio Contabilidade",
            CNPJ: "05006086000183"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto Gurupi Ltda",
            NOMEFANTASIA: "Decio Gurupi Posto",
            CNPJ: "06698533000175"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto Gurupi Ltda",
            NOMEFANTASIA: "Decio Gurupi Churrascaria",
            CNPJ: "06698533000256"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto Gurupi Ltda",
            NOMEFANTASIA: "Variedades Gurupi",
            CNPJ: "06698533000337"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto Gurupi Ltda",
            NOMEFANTASIA: "Acessórios Gurupi",
            CNPJ: "06698533000507"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto Gurupi Ltda",
            NOMEFANTASIA: "Conveniência Gurupi",
            CNPJ: "06698533000418"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Gurupi Ltda",
            NOMEFANTASIA: "BR Mania",
            CNPJ: "07868850000155"
        },
        {
            RAZAOSOCIAL: "Decio Churrascaria Ltda",
            NOMEFANTASIA: "Decio Churrascaria",
            CNPJ: "08043170000165"
        },
        {
            RAZAOSOCIAL: "Decio Churrascaria Ltda",
            NOMEFANTASIA: "Decio Churrascaria",
            CNPJ: "08043170000246"
        },
        {
            RAZAOSOCIAL: "Decio Com. de Peças e Aces. para Veículos Ltda",
            NOMEFANTASIA: "Decio Gurupi Peças",
            CNPJ: "08304361000133"
        },
        {
            RAZAOSOCIAL: "Decio Loja de Conveniência Ltda.",
            NOMEFANTASIA: "BR Mania - Araporã",
            CNPJ: "08612381000171"
        },
        {
            RAZAOSOCIAL: "Decio Loja de Conveniência Ltda.",
            NOMEFANTASIA: "Variedades - Centralina",
            CNPJ: "08612381000252"
        },
        {
            RAZAOSOCIAL: "Rodo Decio Transportes Ltda",
            NOMEFANTASIA: "Rodo Decio - Matriz",
            CNPJ: "10390278000176"
        },
        {
            RAZAOSOCIAL: "Rodo Decio Transportes Ltda",
            NOMEFANTASIA: "Rodo Decio - Filial",
            CNPJ: "10390278000257"
        },
        {
            RAZAOSOCIAL: "Decio Comunicação & Marketing Ltda.",
            NOMEFANTASIA: "Decio Comunicação",
            CNPJ: "10564081000106"
        },
        {
            RAZAOSOCIAL: "Decio Comunicação & Marketing Ltda.",
            NOMEFANTASIA: "Decio Comunicação",
            CNPJ: "10564081000297"
        },
        {
            RAZAOSOCIAL: "Decio Manutenção e Instalação Ltda.",
            NOMEFANTASIA: "Decio Manutenção",
            CNPJ: "11652697000100"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio 5",
            CNPJ: "13815059000180"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L2",
            CNPJ: "13815059000260"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L1",
            CNPJ: "13815059000341"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L3",
            CNPJ: "13815059000422"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L5 - RVD",
            CNPJ: "13815059000503"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L6 - RVD",
            CNPJ: "13815059000694"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L7 - RVD",
            CNPJ: "13815059000775"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Brisa - Santa Vit.",
            CNPJ: "13815059000856"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Drogaria 050",
            CNPJ: "13815059000937"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L4",
            CNPJ: "13815059001070"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L14 - RVD",
            CNPJ: "13815059001151"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Panificadora Bombocado",
            CNPJ: "13815059001402"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L13 - RVD",
            CNPJ: "13815059001232"
        },
        {
            RAZAOSOCIAL: "Decio Conveniência Ltda.",
            NOMEFANTASIA: "Bombocado - Decio L17",
            CNPJ: "13815059001313"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto L. 8 Ltda",
            NOMEFANTASIA: "Posto L8",
            CNPJ: "14058826000116"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto L. 8 Ltda",
            NOMEFANTASIA: "Posto L9",
            CNPJ: "14058826000205"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto L. 8 Ltda",
            NOMEFANTASIA: "Posto L11",
            CNPJ: "14058826000388"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto L. 8 Ltda",
            NOMEFANTASIA: "Posto L10",
            CNPJ: "14058826000469"
        },
        {
            RAZAOSOCIAL: "Decio Auto Posto L. 8 Ltda",
            NOMEFANTASIA: "Posto L12",
            CNPJ: "14058826000540"
        },
        {
            RAZAOSOCIAL: "Decio Mania RV Ltda.",
            NOMEFANTASIA: "Bazar da Ju - RVD",
            CNPJ: "16812480000125"
        },
        {
            RAZAOSOCIAL: "Decio Mania RV Ltda.",
            NOMEFANTASIA: "BR Mania - RVD",
            CNPJ: "16812480000206"
        },
        {
            RAZAOSOCIAL: "Decio Mania RV Ltda.",
            NOMEFANTASIA: "Drogaria 060 - RVD",
            CNPJ: "16812480000397"
        },
        {
            RAZAOSOCIAL: "Vila 13 Comércio Ltda - ME",
            NOMEFANTASIA: "Vila 13 - Ituiutaba",
            CNPJ: "18286168000170"
        },
        {
            RAZAOSOCIAL: "Vila 13 Comércio Ltda - ME",
            NOMEFANTASIA: "Vila 13 - Uberlândia",
            CNPJ: "18286168000251"
        },
        {
            RAZAOSOCIAL: "Decio Imobiliária Ltda.",
            NOMEFANTASIA: "Decio Imobiliaria",
            CNPJ: "18749263000163"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Ituiutaba",
            CNPJ: "19046218000105"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Ituiutaba",
            CNPJ: "19046218000296"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Ituiutaba",
            CNPJ: "19046218000377"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Parada Bonita",
            CNPJ: "19046218000458"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Buriti",
            CNPJ: "19046218000539"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Buriti",
            CNPJ: "19046218000610"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Parada Bonita",
            CNPJ: "19046218000709"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Araporã",
            CNPJ: "19046218000881"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Parada Bonita",
            CNPJ: "19046218000962"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Buriti",
            CNPJ: "19046218001004"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Araporã",
            CNPJ: "19046218001187"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Campina Verde",
            CNPJ: "19046218001268"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Araporã",
            CNPJ: "19046218001349"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Campina Verde",
            CNPJ: "19046218001420"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Uberlândia",
            CNPJ: "19046218001500"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Uberlândia",
            CNPJ: "19046218001691"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Uberlândia",
            CNPJ: "19046218001772"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Campina Verde",
            CNPJ: "19046218001853"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Rio Verde",
            CNPJ: "19046218001934"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Rio Verde",
            CNPJ: "19046218002078"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Rio Verde",
            CNPJ: "19046218002159"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Centralina",
            CNPJ: "19046218002230"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Centralina",
            CNPJ: "19046218002310"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Centralina",
            CNPJ: "19046218002400"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Olhos D'Agua",
            CNPJ: "19046218002582"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Churrascaria - Olhos D'Agua",
            CNPJ: "19046218002663"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Peças - Olhos D'Agua",
            CNPJ: "19046218002744"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Olhos D'Agua",
            CNPJ: "19046218002825"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Uberlândia",
            CNPJ: "19046218002906"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Buriti",
            CNPJ: "19046218003040"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Campina Verde",
            CNPJ: "19046218003120"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Araporã",
            CNPJ: "19046218003201"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Parada Bonita",
            CNPJ: "19046218003392"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Rio Verde",
            CNPJ: "19046218003473"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Centralina",
            CNPJ: "19046218003554"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "BR Mania Ituiutaba",
            CNPJ: "19046218003635"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Variedades - Centralina",
            CNPJ: "19046218003716"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Hotel Buriti",
            CNPJ: "19046218003805"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Variedades - Uberlândia",
            CNPJ: "19046218003988"
        },
        {
            RAZAOSOCIAL: "Bulk Fit 4 Academia Ltda",
            NOMEFANTASIA: "Bulk Fit 4",
            CNPJ: "19687497000196"
        },
        {
            RAZAOSOCIAL: "Transl Transporte de Combustíveis Ltda",
            NOMEFANTASIA: "Transl Transportadora",
            CNPJ: "23626692000183"
        },
        {
            RAZAOSOCIAL: "Decio Administração e Participação Ltda.",
            NOMEFANTASIA: "Decio Administração",
            CNPJ: "24088673000103"
        },
        {
            RAZAOSOCIAL: "Bulk Fit 3 Academia Ltda",
            NOMEFANTASIA: "Bulk Fit 3",
            CNPJ: "24634488000177"
        },
        {
            RAZAOSOCIAL: "Decio Marcenaria Ltda",
            NOMEFANTASIA: "Decio Marcenaria",
            CNPJ: "25450619000129"
        },
        {
            RAZAOSOCIAL: "Decio Atacadista de Combustíveis Ltda (TRR)",
            NOMEFANTASIA: "Decio TRR - Gurupi",
            CNPJ: "26195088000138"
        },
        {
            RAZAOSOCIAL: "Posto Alto da Cidade Ltda.",
            NOMEFANTASIA: "Posto Alto da Cidade",
            CNPJ: "26339598000131"
        },
        {
            RAZAOSOCIAL: "D Macedo Conveniência Ltda - EPP",
            NOMEFANTASIA: "BR Mania Uberlândia",
            CNPJ: "26649482000107"
        },
        {
            RAZAOSOCIAL: "PHSR Administração EIRELI ME",
            NOMEFANTASIA: "PHSR Administração",
            CNPJ: "26681666000146"
        },
        {
            RAZAOSOCIAL: "DMS Conveniência Ltda - EPP",
            NOMEFANTASIA: "BR Mania Buriti",
            CNPJ: "26809803000185"
        },
        {
            RAZAOSOCIAL: "DMS Conveniência Ltda - EPP",
            NOMEFANTASIA: "Bazar da Jú Uberlândia",
            CNPJ: "26809803000266"
        },
        {
            RAZAOSOCIAL: "Villa 13 Doceria Gourmet Ltda - EPP",
            NOMEFANTASIA: "Villa 13 Doceria Gourmet - ITB",
            CNPJ: "27861062000144"
        },
        {
            RAZAOSOCIAL: "Edmundo Filho Administração EIRELI - EPP",
            NOMEFANTASIA: "Edmundo F. Administração",
            CNPJ: "28288676000141"
        },
        {
            RAZAOSOCIAL: "Costa Macedo Doceria Ltda",
            NOMEFANTASIA: "Villa 13 Doceria Gourmet - UDI",
            CNPJ: "29563529000103"
        },
        {
            RAZAOSOCIAL: "Rapa do Tacho Doceria Ltda",
            NOMEFANTASIA: "Villa 13 Doceria Gourmet - ITB",
            CNPJ: "29626601000196"
        },
        {
            RAZAOSOCIAL: "Panificadora Bombocado Ltda",
            NOMEFANTASIA: "Panificadora Bombocado",
            CNPJ: "29997682000130"
        },
        {
            RAZAOSOCIAL: "Bulk Fit Academia Ltda",
            NOMEFANTASIA: "Bulk Fit Academia",
            CNPJ: "30651469000151"
        },
        {
            RAZAOSOCIAL: "Decio Gurupi Drogaria Ltda",
            NOMEFANTASIA: "Decio Gurupi Drogaria",
            CNPJ: "30651986000120"
        },
        {
            RAZAOSOCIAL: "Macedo Distribuidora Ltda",
            NOMEFANTASIA: "Decio Distribuidora",
            CNPJ: "32544414000178"
        },
        {
            RAZAOSOCIAL: "Macedo Distribuidora Ltda",
            NOMEFANTASIA: "Decio Distribuidora - Rio Verde",
            CNPJ: "32544414000259"
        },
        {
            RAZAOSOCIAL: "Bulk Fit 2 Academia Ltda",
            NOMEFANTASIA: "Bulk Fit 2",
            CNPJ: "32598770000174"
        },
        {
            RAZAOSOCIAL: "Decio Locadora Ltda",
            NOMEFANTASIA: "Decio Locadora Uberlândia",
            CNPJ: "32734509000154"
        },
        {
            RAZAOSOCIAL: "Decio Locadora Ltda",
            NOMEFANTASIA: "Decio Locadora Ituiutaba",
            CNPJ: "32734509000235"
        },
        {
            RAZAOSOCIAL: "Decio Locadora Ltda",
            NOMEFANTASIA: "Decio Locadora Araporã",
            CNPJ: "32734509000316"
        },
        {
            RAZAOSOCIAL: "Decio Locadora Ltda",
            NOMEFANTASIA: "Decio Locadora Itumbiara",
            CNPJ: "32734509000405"
        },
        {
            RAZAOSOCIAL: "Decio Locadora Ltda",
            NOMEFANTASIA: "Decio Locadora Rio Verde",
            CNPJ: "32734509000588"
        },
        {
            RAZAOSOCIAL: "Rede Ohana Participações e Negócios Ltda",
            NOMEFANTASIA: "Rede Ohana Participações e Negócios",
            CNPJ: "34217045000134"
        },
        {
            RAZAOSOCIAL: "Santa Maria Participações e Negócios Ltda",
            NOMEFANTASIA: "Santa Maria Participações e Negócios",
            CNPJ: "34217052000136"
        },
        {
            RAZAOSOCIAL: "Nossa Senhora das Graças Participações Ltda",
            NOMEFANTASIA: "Nossa Senhora das Graças Participações",
            CNPJ: "34217076000195"
        },
        {
            RAZAOSOCIAL: "New Ceddrus Participações Ltda",
            NOMEFANTASIA: "New Ceddrus Participações",
            CNPJ: "34234779000121"
        },
        {
            RAZAOSOCIAL: "Bulk Fit 5 Academia Ltda",
            NOMEFANTASIA: "Bulk Fit 5",
            CNPJ: "35579315000110"
        },
        {
            RAZAOSOCIAL: "JB Administração Ltda",
            NOMEFANTASIA: "JB Administração Ltda",
            CNPJ: "43666157000163"
        },
        {
            RAZAOSOCIAL: "Jacaranda Agropecuaria Ltda",
            NOMEFANTASIA: "Jacaranda Agropecuaria Ltda",
            CNPJ: "37925170000197"
        },
        {
            RAZAOSOCIAL: "Decio Holding Ltda",
            NOMEFANTASIA: "Decio Holding",
            CNPJ: "39848608000106"
        },
        {
            RAZAOSOCIAL: "Decio Holding Ltda",
            NOMEFANTASIA: "CSC Grupo Decio",
            CNPJ: "39848608000297"
        },
        {
            RAZAOSOCIAL: "Decio Abastecimento de Aeronave Ltda",
            NOMEFANTASIA: "Decio Aviation",
            CNPJ: "40737998000126"
        },
        {
            RAZAOSOCIAL: "Bastos Negócios Agropecuários Ltda",
            NOMEFANTASIA: "Bastos Negócios Agropecuários",
            CNPJ: "41102561000189"
        },
        {
            RAZAOSOCIAL: "Decio Comercio de Artigos Veterinarios Ltda",
            NOMEFANTASIA: "PET D Uberlândia",
            CNPJ: "42401790000167"
        },
        {
            RAZAOSOCIAL: "Decio Comercio de Artigos Veterinarios Ltda",
            NOMEFANTASIA: "PET D Rio Verde",
            CNPJ: "42401790000248"
        },
        {
            RAZAOSOCIAL: "CD Decio Drogarias Ltda",
            NOMEFANTASIA: "CD Decio Drogarias",
            CNPJ: "44192447000185"
        },
        {
            RAZAOSOCIAL: "Bulk Fit 5 Academia Ltda",
            NOMEFANTASIA: "Bulk Fit 5 Academia",
            CNPJ: "47784151000141"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Uberlândia",
            CNPJ: "64429400000108"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Itumbiara",
            CNPJ: "64429400000280"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Rio Verde",
            CNPJ: "64429400000361"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Itumbiara",
            CNPJ: "64429400000442"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Ituiutaba",
            CNPJ: "64429400000523"
        },
        {
            RAZAOSOCIAL: "Decio Transportadora Retalhista de Comb. Ltda",
            NOMEFANTASIA: "Decio TRR - Parada Bonita",
            CNPJ: "64429400000604"
        },
        {
            RAZAOSOCIAL: "Líder Panificação Ltda. - EPP",
            NOMEFANTASIA: "Líder Panificação",
            CNPJ: "66198664000115"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Mineiros",
            CNPJ: "19046218004011"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Restaurante - Mineiros",
            CNPJ: "19046218004364"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Acessórios - Mineiros",
            CNPJ: "19046218004283"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Conveniência - Mineiros",
            CNPJ: "19046218004100"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Posto - Barreiras",
            CNPJ: "19046218004526"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Restaurante - Barreiras",
            CNPJ: "19046218004607"
        },
        {
            RAZAOSOCIAL: "Decio Comércio e Serviços Rodoviários Ltda",
            NOMEFANTASIA: "Acessórios - Barreiras",
            CNPJ: "19046218004445"
        }
    ]


    for(var p = 0; p < arrEmpresas.length; p++){
        dataset.addRow(new Array(arrEmpresas[p].RAZAOSOCIAL, arrEmpresas[p].NOMEFANTASIA, arrEmpresas[p].CNPJ));
    }


    return dataset;
}