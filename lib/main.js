require.config({
    baseUrl: '.',
    paths: {
        'weather-client': 'lib/weather-client'
    }
});
var views = {};

function weatherDay(city, require) {
    var weather = require('weather-client');
    var typetemperature = "metric";
    console.log(city);
    weather.getToday(city, typetemperature).then(function (data) {
        views.todayView(data);

    }, function (data) {
        views.todayView(data);
    });
}

function weatherweek(city, require) {
    var weather = require('weather-client');
    var typetemperature = "metric";

    weather.getWeek(city, typetemperature).then(function (data) {
        views.weekView(data);


    }, function (data) {

        views.weekView(data);
    });
}



function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}


function loadmain() {
    require(['require', 'weather-client'], function (require) {
        city = document.getElementById("city").value;
        console.log(city);
        citycookie = getCookie("city");
        if (city === '') {

            if (citycookie === null) {
                city = "toronto";
            } else {
                city = getCookie("city");

            }
        } else {
            setCookie('city', city, 10);
        }

        weatherDay(city, require);
        weatherweek(city, require);

    });
}

function typetemp(temp, type) {
    if (type === "metric") {
        return temp.toFixed(1) + " ºC";
    } else {
        return temp.toFixed(1) + " ºF";
    }
}




function convertDate(date_, w) {

    var time_zone = 1000 * (new Date().getTimezoneOffset()) * (-60);

    date_ = new Date(date_ * 1000 + time_zone);
    if (w === 1) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        date_ = weekday[date_.getDay()];
    }

    return date_;
}





views.emptyView = function (data) {
    var html = '<div class="row"><div class="col-md-12">' +
        '<div class="row"><div class="col-md-10"><input class="form-control" type="text" id="city" value="' + data.name + '" onkeydown="if (event.keyCode === 13) loadmain();" placeholder="Enter you city"   autofocus></div>';


    html += '<div class="col-md-2"> <button type="button" id="enviar" class="btn btn-primary" onclick="loadmain()">Search</button></div></div>';
    if (data.status === 404) {
        html += '<h1>' + data.message.replace('Error:', ' ') + '</h1>';
    }
    html += '</div></div>';

    return html;
};
views.itemView = function (data) {
    return '<div class="row"><div class="col-md-12">' + views.emptyView(data) + ' </div></div>' +
        
        '<div class="row"><div class="col-md-12">' +
        '<h1>' + data.name + '</h1><h2>' + data.desc + '</h2>' +
        '<table align=center><tr><td><h2><img src="img_clima/' + data.icon + '.png" align="left middle" > ' + typetemp(data.temp, data.type) + '</h2></td><td><h1>&nbsp;/&nbsp;<h1></td><td align=left>max: ' + typetemp(data.temp_max, data.type) + '<br>min: ' + typetemp(data.temp_min, data.type) + '</td></tr></table>' +
        '</div></div>';
};
views.todayView = function (data) {
    var html;
    console.log(data.status);
    if (data.status !== 200) {
        data.name = "";
        html = views.emptyView(data);
        titulo = '<img src="img_clima/01d.png" align="left middle" > WeatherNow';
    } else {
        titulo = '<img src="img_clima/' + data.icon + '.png" align="left middle" > WeatherNow';
        html = views.itemView(data);
    }
    document.getElementById("main").innerHTML = html;
    document.getElementById("titlemain").innerHTML = titulo;
};

views.itemweekView = function (data) {

    return '<div class="col-lg-6">' +
        '<h3>' + convertDate(data.dt, 1) + '</h3>' +
        '<p>' + data.weather[0].description + '</p>' +
        '<table align=center><tr><td><h2><img src="img_clima/' + data.weather[0].icon + '.png" align="left middle" > ' + typetemp(data.temp.day, data.type) + '</h2></td><td><h1>&nbsp;/&nbsp;<h1></td><td align=left>max: ' + typetemp(data.temp.max, data.type) + '<br>min: ' + typetemp(data.temp.morn, data.type) + '</td></tr></table>' +
        '<p>' +
        'Morn: ' + typetemp(data.temp.morn, data.type) + '<br>' +
        'Ever: ' + typetemp(data.temp.eve, data.type) + '<br>' +
        'Nigh: ' + typetemp(data.temp.night, data.type) + '<br>' +
        '</p>' +
        '</div>';
};


views.weekView = function (data) {


    if (data.status === "200") {
        var len = data.list.length;
        var ct = 0;
        var html = "";
        for (var i = 0; i < len; i++) {

            if (ct === 0) {
                html += '<div class="row marketing sombrarredondada" >';
                abre = 1;

            }
            html += views.itemweekView(data.list[i]);

            ct += 1;

            if (ct === 2) {
                ct = 0;
                abre = 0;

                html += '</div>';
            }
        }

        if (abre === 1) {
            html += '</div>';
        }
        document.getElementById("week").innerHTML = html;
    } else {
        document.getElementById("week").innerHTML = "";

    }




};



loadmain();