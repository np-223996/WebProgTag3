module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var zeit = (req.query.Zeit || (req.body && req.body.Zeit));
    var stromstaerke = (req.query.Stromstärke || (req.body && req.body.Stromstärke));
    var spannung = (req.query.Spannung || (req.body && req.body.Spannung));
    var widerstand = (req.query.Widerstand || (req.body && req.body.Widerstand));

    if (zeit == null){
        context.res = {
            status: 400,
            body: "Der Zeit parameter fehlt"
        };
        return context.done();
    }
    else{

    }
    if (stromstaerke == null){
        
        if (spannung != null || widerstand != null) {
            if (spannung == null) {
                stromstaerke = 230 / widerstand;
            }
            if (widerstand == null) {
                stromstaerke = spannung / 1300;
            }
            else {
                stromstaerke = spannung / widerstand;
            }
            }
        else {
            context.res = {
                status: 400,
                body: "Bitte Stromstärke oder Spannung oder Widerstand eingeben"
            }
            return context.done();
        }
    }

    var result = stromstaerke * zeit;

    if (result < 0.05) {
        context.res = {
            status: 200,
            body: "keine Verletzung"
        }
        return context.done();
    }
    else if (0.05 <= result < 1 ) {
        context.res = {
            status: 200,
            body: "leichte Verletzung"
        }
        return context.done();
    }
    else if (1 <= result < 100 ) {
        context.res = {
            status: 200,
            body: "mittel schwere Verletzung"
        }
        return context.done();
    }
    else if (100 <= result < 2500 ) {
        context.res = {
            status: 200,
            body: "schwere Verletzung"
        } 
        return context.done();
    }
    else {
        context.res = {
            status: 200,
            body: "tödliche Verletzung"
        } 
        return context.done();
    }
}
