(function() {
    var history = {
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageReady: function() {
            var me = this;
            me._nearDaysChart();
            me._errorTypeChart();
            me._warningTypeChart();
        },
        /**
         * 错误类型饼图
         * @return {void} 
         */
        _errorTypeChart: function() {
            var me=this;
            var title='错误类型分布';
            var id='#error-type-container';
            me._pieChart(title,id);
        },
        /**
         * 警告类型饼图
         * @return {void} 
         */
        _warningTypeChart: function() {
            var me=this;
            var title='警告类型分布';
            var id='#warning-type-container';
            me._pieChart(title,id);
        },
        /**
         * 生成饼图
         * @return {void} 
         */
        _pieChart: function(title,id) {
            var container = $(id)[0];
            var data = JSON.parse(container.dataset.data);
            if(data.length==0){
                container.hidden=true;
            }
            var myChart = echarts.init(container);
            var ruleIdArray = _.pluck(data, 'ruleName');
            //统计问题出现的次数
            var ruleCounts = _.reduce(ruleIdArray, function(counts, ruleName) {
                counts[ruleName] = (counts[ruleName] || 0) + 1;
                return counts;
            }, {});
            //转换为echarts可以识别的对象
            ruleCounts = _.map(ruleCounts, function(v, k) { return { name: k, value: v } });

            var option = {
                title: {
                    text: title,
                    subtext: '总计：'+ruleIdArray.length,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: _.uniq(ruleIdArray)
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                series: [{
                    name: '类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: ruleCounts
                }]
            };
            myChart.setOption(option);
        },
        /**
         * 最近检查记录折线图
         * @return {void} 
         */
        _nearDaysChart: function() {
            var container = $('#near-days-container')[0];
            var data = JSON.parse(container.dataset.data);
            var myChart = echarts.init(container);
            var dateArray = _.map(_.pluck(data, 'createdTime'), function(v) {
                return moment(v).format('YYYY-MM-DD HH:mm:ss');
            });
            var option = {
                title: {
                    text: '最近10天检查结果',
                    subtext: data[0].projName
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['错误', '警告']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: dateArray
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                series: [{
                    name: '错误',
                    type: 'line',
                    data: _.pluck(data, 'errorCount'),
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }, {
                    name: '警告',
                    type: 'line',
                    data: _.pluck(data, 'warningCount'),
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            };
            myChart.setOption(option);
        }
    };
    window.report_history = history;
})();
$(document).ready(function() {
    window.report_history.pageReady();
});