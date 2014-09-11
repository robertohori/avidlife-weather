require.config({
    baseUrl: '.',
    paths: {
        'weather-client': 'lib/weather-client'
    }
});

/*function formmain(city, nf) {
 
    var form;
    form = '<div class="row"><div class="col-md-10"><input class="form-control" type="text" id="city" value="' + city + '" onkeydown="loadkey(event)" ' + nf + '  autofocus></div>' +
        '<div class="col-md-2"> <button type="button" id="enviar" class="btn btn-primary" onclick="loadmain()">Search</button></div></div>';

    return form;
}
*/

var views = {};
views.emptyView = function(data) {
  var  html= '<div class="row"><div class="col-md-12">'+
            '<div class="row"><div class="col-md-10"><input class="form-control" type="text" id="city" value="' + data.name + '" onkeydown="loadkey(event)" placeholder="Enter you city"   autofocus></div>' ;
    
    if (data.status==404){
  html+=  '<h1>' + data.name + '</h1>';
    }
    html+=     '<div class="col-md-2"> <button type="button" id="enviar" class="btn btn-primary" onclick="loadmain()">Search</button></div></div>';
        '</div></div>';
    
    return html;
};
views.itemView = function(data) {
    return '<div class="row"><div class="col-md-12">' + views.emptyView(data) + '</div></div>' +
            '<div class="row"><div class="col-md-12">' +
            '<h1>' + data.name + '</h1><h2>' + data.desc + '</h2>' +
            '<table align=center><tr><td><h2><img src="img_clima/' + data.icon + '.png" align="left middle" > ' + typetemp(data.temp, data.type) + '</h2></td><td><h1>&nbsp;/&nbsp;<h1></td><td align=left>max: ' + typetemp(data.temp_max, data.type) + '<br>min: ' + typetemp(data.temp_min, data.type) + '</td></tr></table>' +
            '</div></div>';
};
views.todayView = function (data) {
    var html;
        
    if (data.status!= 200) {
        data.name="";
        html = views.emptyView(data);
        titulo = '<img src="img_clima/01d.png" align="left middle" > WeatherNow';
    } else {
        titulo = '<img src="img_clima/' + data.icon + '.png" align="left middle" > WeatherNow'
        html = views.itemView(data);
    }
    document.getElementById("main").innerHTML = html;
    document.getElementById("titlemain").innerHTML = titulo;
};

function weekhtml(city, nf, list, totaldays) {


    var html = ""
    var type = "metric"
    if (city == "" || nf == 1) {
        html = "";
    } else {
    
        var len = list.length;
        var ct = 0;
    
        for (var i = 0; i < len; i++) {

            if (ct == 0) {
                html += '<div class="row marketing sombrarredondada" >';
                abre = 1;

            }

            temp = list[i].temp.day;
            temp_max = list[i].temp.max;
            temp_min = list[i].temp.min;
            temp_morn = list[i].temp.morn;
            temp_eve = list[i].temp.eve;
            temp_night = list[i].temp.night;

            icon = list[i].weather[0].icon;
            desc = list[i].weather[0].description;
            date = list[i].dt;

            html += '<div class="col-lg-6">' +
                '<h3>' + convertDate(date, 1) + '</h3>' +
                '<h5>' + desc + '</h5>' +
                '<table align=center><tr><td><h2><img src="img_clima/' + icon + '.png" align="left middle" > ' + typetemp(temp, type) + '</h2></td><td><h1>&nbsp;/&nbsp;<h1></td><td align=left>max: ' + typetemp(temp_max, type) + '<br>min: ' + typetemp(temp_min, type) + '</td></tr></table>' +
                '<p>' +
                'Morn: ' + typetemp(temp_morn, type) + '<br>' +
                'Ever: ' + typetemp(temp_eve, type) + '<br>' +
                'Nigh: ' + typetemp(temp_night, type) + '<br>' +
                '</p>' +
                '</div>';

            ct += 1;

            if (ct == 2) {
                ct = 0;
                abre = 0;

                html += '</div>';
            }
        }

        if (abre == 1) {
            html += '</div>';
        }



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
        
        
        
        views.todayView(data);
        
    }, function (data) {
       console.log(data);
        views.todayView(data);
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
       
console.log(data);
            weekhtml(name, "", list, totaldays);
       

    }, function () {
        weekhtml("", 1, [], []);
    });
}



function loadmain() {
    require(['require', 'weather-client'], function (require) {
            city = document.getElementById("city").value;
            if (city == "") {
                
                if (getCookie("city") != "") {
                    city = getCookie("city");
                } else{
                    city = "toronto";
            }
            } else {
                
           setCookie('city', city, 1);
        }
        weatherDay(city, require); 
        weatherweek(city, require);

    });
}



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



function convertDate(date_, w) {

    var time_zone = 1000 * (new Date().getTimezoneOffset()) * (-60);

    date_ = new Date(date_ * 1000 + time_zone);
    if (w == 1) {
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

function setCookie(cookie_name, cookie_value, expire_in_days)
{
var cookie_expire = "";
  if (expire_in_days != null)
  {
	var expire = new Date();
	expire.setTime(expire.getTime() + 1000*60*60*24*parseInt(expire_in_days));
	cookie_expire = "; expires=" + expire.toGMTString();
  }

 document.cookie = escape(cookie_name) + "=" + escape(cookie_value) + cookie_expire;
}

function getCookie(cookie_name)
{
  if (!document.cookie.match(eval("/" + escape(cookie_name) + "=/")))
  {
   return false;
  }

return unescape(document.cookie.replace(eval("/^.*?" + escape(cookie_name) + "=([^\\s;]*).*$/"), "$1"));
}


/*// Acessando
function LerCookie()
{
cookie = getCookie("nome");

if (!cookie)
 document.getElementById("resultado_cookie").innerHTML = "Cookie não gerado";
else
 document.getElementById("resultado_cookie").innerHTML = "O valor do cookie gravado é: " + cookie;
}
*/

loadmain()