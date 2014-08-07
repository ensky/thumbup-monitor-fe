define(['moment', 'highcharts'], function (moment) {
    var pub = {},
        pri = {};
    Highcharts.setOptions({
        global: {
            timezoneOffset: - 8 * 60
        }
    });

    pub.preparePages = function (pages) {
        pri.pages = pages;
    }

    pub.render = function (el, title, renderData) {
        var series = pri.pages.map(function (row) { return {name: row.name, data: []}; }),
            lastNumbers = [];
        $.each(renderData, function (i, row) {
            var lastNum = lastNumbers[row.page_id - 1] || 0;

            if (lastNum == 0) {
                lastNumbers[row.page_id - 1] = row.number;
            } else {
                series[row.page_id - 1].data.push({
                    x: moment(row.time).valueOf(),
                    y: lastNumbers[row.page_id - 1] - row.number
                });
                lastNumbers[row.page_id - 1] = row.number;
            }
        });

        // sort
        series.map(function (eachSeries) {
            return {
                name: eachSeries.name,
                data: eachSeries.data.sort(function (former, latter) {
                    return former.x - latter.x;
                })
            };
        });

        el.highcharts({
            title: {
                text: title,
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                gridLineColor: '#EEE',
                type: 'datetime',
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m/%e',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
                title: {
                    text: '時間'
                }
            },
            yAxis: {
                title: {
                    text: '單位時間按讚數'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: series
        });
    };

    return pub;
});