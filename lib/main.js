require.config({
    baseUrl: '.',
    paths: {
        'weather-client': 'lib/weather-client'
    }
});

function formmain(city, nf) {
    if (city == "" || nf == 1) {
        nf = 'placeholder="Enter you city"'
    }
    var form;
    form = '<div class="row"><div class="col-md-11"><input class="form-control" type="text" id="city" value="' + city + '" onkeydown="loadkey(event)" ' + nf + '  autofocus></div>';
    form += '<div class="col-md-1"> <button type="button" id="enviar" class="btn btn-primary" onclick="loadmain()">Search</button></div>';

    return form;
}

function dayhtml(city, nf) {
    if (city == "" || nf == 1) {
        nf = 'City Not Found'
    }
    var html;
    html = '<div class="row"><div class="col-md-12">' + formmain(city, nf) + '</div>';
    html += '<div class="row"><div class="col-md-12"><h1>' + city + nf + '</h1><p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p></div>';
    html += '</div>';
    document.getElementById("main").innerHTML = html;
}

function on(city, require) {
    var weather = require('weather-client');
    if (city == null) {
        city = "Toronto";
    }
    city = removerAcentos(city);
    weather.getToday(city).then(function (data) {
        name = data.name;
        if (name.toUpperCase() != city.toUpperCase()) {
            dayhtml("", 1);
        } else {
            dayhtml(name, "");
        }
    }, function () {
        city = dayhtml("", 1);
    });
}

function loadmain() {
    require(['require', 'weather-client'], function (require) {
        city = document.getElementById("city").value;
        on(city, require);
    });
}

loadmain()

function loadkey(e) {
    if (e.keyCode == 13) {
        loadmain();
    }
}


function removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
    }

    return string;
}