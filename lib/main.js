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
    form = '<div class="row"><div class="col-md-10"><input class="form-control" type="text" id="city" value="' + city + '" onkeydown="loadkey(event)" ' + nf + '  autofocus></div>';
    form += '<div class="col-md-2"> <button type="button" id="enviar" class="btn btn-primary" onclick="loadmain()">Search</button></div></div>';

    return form;
}

function dayhtml(city, nf, icon, temp, temp_max, temp_min) {
    var html;
    if (city == "" || nf == 1) {
        nf = 'City Not Found'
        html = '<div class="row"><div class="col-md-12">' + formmain(city, nf) + '</div></div>';
    } else {

        html = '<div class="row"><div class="col-md-12">' + formmain(city, nf) + '</div></div>';
        html += '<div class="row"><div class="col-md-12">';
        html += '<h1>' + city + '</h1><h2>'+desc+'</h2>';
        html += '<table align=center><tr><td><h2><img src="img_clima/' + icon + '.png" align="left middle" > ' + typetemp(temp, typetemp) + '</h2></td><td><h1>&nbsp;/&nbsp;<h1></td><td align=left>max: ' + typetemp(temp_max, typetemp) + '<br>min: ' + typetemp(temp_min, typetemp) + '</td></tr></table>';
        html += '</div></div>';
    }
    document.getElementById("main").innerHTML = html;
}

function weekhtml(city, nf, list, totaldays) {
     var html;
     if (city == "" || nf == 1) {
         html = city
          } else {
    html = city
                
                 }
    document.getElementById("week").innerHTML = html;
}

function weatherDay(city, require) {
    var weather = require('weather-client');
    var typetemp = "metric"
    if (city == null) {
        city = "Toronto";
    }
    city = removerAcentos(city);
    weather.getToday(city, typetemp).then(function (data) {
        name = data.name;
        icon = data.icon;
        temp_max = data.temp_max;
        temp = data.temp;
        temp_min = data.temp_min;
        desc = data.desc;

        if (name.toUpperCase() != city.toUpperCase()) {
            dayhtml("", 1, "", temp, temp_max, temp_min, typetemp,desc);
        } else {

            dayhtml(name, "", icon, temp, temp_max, temp_min, typetemp,desc);
        }
    }, function () {
        city = dayhtml("", 1, "", temp, temp_max, temp_min, typetemp,desc);
    });
}

function weatherweek(city, require) {
    var weather = require('weather-client');
    var typetemp = "metric"
    if (city == null) {
        city = "Toronto";
    }
    city = removerAcentos(city);
    weather.getWeek(city, typetemp).then(function (data) {
        name = data.name;
        list = data.list;
        totaldays = data.totaldays;
       if (name.toUpperCase() != city.toUpperCase()) {
            weekhtml("", 1, "", list, temp, totaldays);
        } else {

            dayhtml(name, "", list, temp, totaldays);
        }
        
    }, function () {
       alert("deu ruim") 
    });
}



function loadmain() {
    require(['require', 'weather-client'], function (require) {
        city = document.getElementById("city").value;
        weatherDay(city, require);
        weatherweek(city, require);
    });
}

loadmain()

function loadkey(e) {
    if (e.keyCode == 13) {
        loadmain();
        
    }
}

function typetemp(temp, type) {
    if (type = "metric") {
        return temp.toFixed(1) + " ºC";
    } else {
        return temp.toFixed(1) + " ºF";
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