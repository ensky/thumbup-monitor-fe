requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        highcharts: '//code.highcharts.com/highcharts',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min'
    },
    shim: {
        bootstrap: ['jquery'],
        highcharts: ['jquery']
    }
});

require(['chart', 'plugins'], function (chart) {
    var refresh = function () {
        $.get('stats.json?r=' + Math.random(), function (json) {
            chart.preparePages(json.pages);
            chart.render($('#chart-1min'), '按讚數(1小時)', json.period_1min);
            chart.render($('#chart-5min'), '按讚數(24小時)', json.period_5min);
            chart.render($('#chart-1hour'), '按讚數(30天)', json.period_1hour);
        });
        setTimeout(refresh, 60 * 1000);
    };
    refresh();
});