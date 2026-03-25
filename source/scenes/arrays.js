Q.time = 0;
Q.year = 1272;
Q.season = 4;

Q.budget = 0;
Q.admin_cap = 100;
Q.army = 50;
Q.intel = 50;


// estates

Q.estates["aristocracy"].inf    = 40;
Q.estates["petty_nobility"].inf = 30;
Q.estates["guilds"].inf         = 15;
Q.estates["church"].inf         = 20;
Q.estates["peasants"].inf       =  5;

Q.estates["aristocracy"].sat    = 20;
Q.estates["petty_nobility"].sat = 45;
Q.estates["guilds"].sat         = 45;
Q.estates["church"].sat         = 20;
Q.estates["peasants"].sat       = 30;

// provinces

Q.provinces["low_red"].control = 50
Q.provinces["upp_red"].control = 35
Q.provinces["coast"].control   = 30
Q.provinces["tridam"].control  = 20
Q.provinces["gelibol"].control = 5

Q.provinces["low_red"].governor = "Adam"
Q.provinces["upp_red"].governor = "Bertie"
Q.provinces["coast"].governor   = "Charlie"
Q.provinces["tridam"].governor  = "Denis"
Q.provinces["gelibol"].governor = "Edmund"

Q.provinces["low_red"].gov_allegiance = "Chancellor's Party"
Q.provinces["upp_red"].gov_allegiance = "Aristocracy"
Q.provinces["coast"].gov_allegiance   = "Guilds"
Q.provinces["tridam"].gov_allegiance  = "Aristocracy"
Q.provinces["gelibol"].gov_allegiance = "Aristocracy"

Q.provinces["low_red"].pop = 1400
Q.provinces["upp_red"].pop = 1100
Q.provinces["coast"].pop   =  900
Q.provinces["tridam"].pop  =  600
Q.provinces["gelibol"].pop =  300

Q.provinces["low_red"].land = 2140
Q.provinces["upp_red"].land = 1690
Q.provinces["coast"].land   = 1250
Q.provinces["tridam"].land  =  710
Q.provinces["gelibol"].land =  280

Q.provinces["low_red"].wealth = 1000
Q.provinces["upp_red"].wealth =  250
Q.provinces["coast"].wealth   =  200
Q.provinces["tridam"].wealth  =  200
Q.provinces["gelibol"].wealth =  300

Q.provinces["low_red"].trade = 2000
Q.provinces["upp_red"].trade = 600
Q.provinces["coast"].trade   = 300
Q.provinces["tridam"].trade  = 500
Q.provinces["gelibol"].trade = 200

// taxes

Q.taxes["vassals"].id      = "vassals"
Q.taxes["vassals"].name    = "feudal duties"
Q.taxes["vassals"].active  = true
Q.taxes["vassals"].base    = 0.5
Q.taxes["vassals"].rate    = 1
Q.taxes["vassals"].metrics = ["land", "pop"]
Q.taxes["vassals"].eff     = 0.5
Q.taxes["vassals"].rev     = 0

Q.taxes["cities"].id      = "cities"
Q.taxes["cities"].name    = "city duties"
Q.taxes["cities"].active  = true
Q.taxes["cities"].base    = 0.5
Q.taxes["cities"].rate    = 1
Q.taxes["cities"].metrics = ["wealth"]
Q.taxes["cities"].eff     = 0.5
Q.taxes["cities"].rev     = 0

Q.taxes["poll"].id      = "poll"
Q.taxes["poll"].name    = "poll tax"
Q.taxes["poll"].active  = false
Q.taxes["poll"].base    = 1
Q.taxes["poll"].rate    = 1
Q.taxes["poll"].metrics = ["pop"]
Q.taxes["poll"].eff     = 0
Q.taxes["poll"].rev     = 0

Q.taxes["land"].id      = "land"
Q.taxes["land"].name    = "land tax"
Q.taxes["land"].active  = false
Q.taxes["land"].base    = 1
Q.taxes["land"].rate    = 1
Q.taxes["land"].metrics = ["land"]
Q.taxes["land"].eff     = 0
Q.taxes["land"].rev     = 0

Q.taxes["houses"].id      = "houses"
Q.taxes["houses"].name    = "window tax"
Q.taxes["houses"].active  = false
Q.taxes["houses"].base    = 1
Q.taxes["houses"].rate    = 1
Q.taxes["houses"].metrics = ["wealth, pop"]
Q.taxes["houses"].eff     = 0
Q.taxes["houses"].rev     = 0

Q.taxes["income"].id      = "income"
Q.taxes["income"].name    = "income tax"
Q.taxes["income"].active  = false
Q.taxes["income"].base    = 1
Q.taxes["income"].rate    = 1
Q.taxes["income"].metrics = ["wealth"]
Q.taxes["income"].eff     = 0
Q.taxes["income"].rev     = 0

Q.taxes["consum"].id      = "consum"
Q.taxes["consum"].name    = "goods tax"
Q.taxes["consum"].active  = false
Q.taxes["consum"].base    = 1
Q.taxes["consum"].rate    = 1
Q.taxes["consum"].metrics = [""]
Q.taxes["consum"].eff     = 0
Q.taxes["consum"].rev     = 0

Q.taxes["tithe"].id      = "tithe"
Q.taxes["tithe"].name    = "royal tithe"
Q.taxes["tithe"].active  = true
Q.taxes["tithe"].base    = 2
Q.taxes["tithe"].rate    = 1
Q.taxes["tithe"].metrics = ["pop, land"]
Q.taxes["tithe"].eff     = 0.5
Q.taxes["tithe"].rev     = 0

Q.taxes["toll_novigrad"].id      = "toll_novigrad"
Q.taxes["toll_novigrad"].name    = "Novigradian toll"
Q.taxes["toll_novigrad"].active  = true
Q.taxes["toll_novigrad"].base    = 0.5
Q.taxes["toll_novigrad"].rate    = 1
Q.taxes["toll_novigrad"].metrics = ["trade"]
Q.taxes["toll_novigrad"].eff     = 0.5
Q.taxes["toll_novigrad"].rev     = 0

Q.taxes["tolls"].id      = "tolls"
Q.taxes["tolls"].name    = "Other tolls"
Q.taxes["tolls"].active  = true
Q.taxes["tolls"].base    = 1
Q.taxes["tolls"].rate    = 1
Q.taxes["tolls"].metrics = ["trade"]
Q.taxes["tolls"].eff     = 0.7
Q.taxes["tolls"].rev     = 0

Q.taxes.forEach((tax) => {
    if (tax.active) {
        let base = 0;
        Q.provinces.forEach((prov) => {
            if (tax.metrics.includes("pop")){
                base += prov.pop * prov.control
            }
            if (tax.metrics.includes("land")){
                base += prov.land * prov.control
            }
            if (tax.metrics.includes("wealth")){
                base += prov.wealth * prov.control
            }
            if (tax.metrics.includes("trade")){
                base += prov.trade * prov.control
            }
        })
        base /= tax.metrics.length   
        Q.taxes[tax.id].rev = Math.round(base * tax.base * tax.rate * tax.eff) / 100
    }
});
