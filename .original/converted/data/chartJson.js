define(['../utils/chartUtil'], function (a) {
    'use strict';
    const baseComponent = {
        label: {
            fontSize: 12,
            color: '#333',
            fontFamily: 'sans-serif',
            fontGroup: [],
            cusFontSize: 12
        },
        formatter: {
            prefix: '',
            suffix: '',
            ratio: 1,
            digit: 'auto'
        }
    };
    const chartComponent = {
        title: {
            show: false,
            text: '默认标题',
            label: a.deepCopy(baseComponent.label),
            position: {
                value: 'left-top',
                offsetX: 40,
                offsetY: 50
            }
        },
        subtitle: {
            show: false,
            text: '',
            label: a.deepCopy(baseComponent.label),
            distance: {
                value: 'auto',
                cusGap: 40
            }
        },
        config: {
            color: 'transparent',
            fontFamily: 'Sans-serif',
            grid: {
                value: 'normal',
                top: 5,
                left: 10,
                right: 20,
                bottom: 10
            }
        },
        legend: {
            show: true,
            selectMode: 'multiple',
            selected: [
                {
                    seriesName: '衣服',
                    isShow: true
                },
                {
                    seriesName: '食材',
                    isShow: true
                },
                {
                    seriesName: '图书',
                    isShow: true
                }
            ],
            label: a.deepCopy(baseComponent.label),
            position: {
                value: 'left-top',
                offsetX: 40,
                offsetY: 50,
                direction: 'horizontal'
            },
            width: {
                value: 'auto',
                cusSize: 25
            },
            height: {
                value: 'auto',
                cusSize: 14
            },
            distance: {
                value: 'auto',
                cusGap: 10
            },
            itemGap: 10
        },
        tooltip: {
            show: true,
            label: a.deepCopy(baseComponent.label),
            backgroundColor: 'rgba(50,50,50,0.7)',
            triggerOn: 'mousemove',
            triggerType: 'item',
            axisPointer: {
                type: 'line',
                style: {
                    color: '#555',
                    width: 'normal',
                    type: 'solid'
                }
            },
            format: [
                {
                    seriesName: '衣服',
                    prefix: '',
                    suffix: '',
                    ratio: 1,
                    digit: 'auto'
                },
                {
                    seriesName: '食材',
                    prefix: '',
                    suffix: '',
                    ratio: 1,
                    digit: 'auto'
                },
                {
                    seriesName: '图书',
                    prefix: '',
                    suffix: '',
                    ratio: 1,
                    digit: 'auto'
                }
            ],
            position: 'auto'
        },
        axis: {
            axisType: 'xAxisDown',
            xAxisUp: {
                show: false,
                title: {
                    showTitle: false,
                    text: '',
                    nameGap: 15,
                    rotate: 0,
                    label: a.deepCopy(baseComponent.label),
                    fzPosition: 'end'
                },
                name: '显示X轴',
                inverse: false,
                tickLine: {
                    show: true,
                    width: 1,
                    color: 'auto'
                },
                tick: {
                    show: true,
                    position: 'outside',
                    length: 5,
                    width: 1,
                    color: 'auto'
                },
                tickLabel: {
                    show: true,
                    label: a.deepCopy(baseComponent.label),
                    rotate: 0,
                    prefix: '',
                    suffix: '',
                    optimize: 0,
                    distance: 0,
                    min: 'auto',
                    max: 'auto',
                    ratio: 1,
                    digit: 'auto'
                },
                netLine: {
                    show: false,
                    width: 1,
                    type: 'solid',
                    color: 'auto',
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    }
                },
                netArea: {
                    show: false,
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    },
                    colorOne: 'auto',
                    colorTwo: 'auto'
                },
                axisLine: { onZero: false }
            },
            xAxisDown: {
                show: true,
                title: {
                    showTitle: false,
                    text: '',
                    nameGap: 15,
                    rotate: 0,
                    label: a.deepCopy(baseComponent.label),
                    fzPosition: 'end'
                },
                name: '显示X轴',
                inverse: false,
                tickLine: {
                    show: true,
                    width: 1,
                    color: 'auto'
                },
                tick: {
                    show: true,
                    position: 'outside',
                    length: 5,
                    width: 1,
                    color: 'auto'
                },
                tickLabel: {
                    show: true,
                    label: a.deepCopy(baseComponent.label),
                    rotate: 0,
                    prefix: '',
                    suffix: '',
                    optimize: 0,
                    distance: 0,
                    min: null,
                    max: null,
                    ratio: 1,
                    digit: 'auto'
                },
                netLine: {
                    show: false,
                    width: 1,
                    type: 'solid',
                    color: 'auto',
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    }
                },
                netArea: {
                    show: false,
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    },
                    colorOne: 'auto',
                    colorTwo: 'auto'
                }
            },
            yAxisLeft: {
                show: true,
                title: {
                    showTitle: false,
                    text: '',
                    nameGap: 15,
                    rotate: 0,
                    label: a.deepCopy(baseComponent.label),
                    fzPosition: 'end'
                },
                name: '显示Y轴',
                inverse: false,
                tickLine: {
                    show: true,
                    width: 1,
                    color: 'auto'
                },
                tick: {
                    show: true,
                    position: 'outside',
                    length: 5,
                    width: 1,
                    color: 'auto'
                },
                tickLabel: {
                    show: true,
                    label: a.deepCopy(baseComponent.label),
                    rotate: 0,
                    formatter: a.deepCopy(baseComponent.formatter),
                    split: 5,
                    min: null,
                    max: null,
                    prefix: '',
                    suffix: '',
                    ratio: 1,
                    digit: 'auto',
                    distance: 0
                },
                netLine: {
                    show: false,
                    width: 1,
                    type: 'solid',
                    color: 'auto',
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    }
                },
                netArea: {
                    show: false,
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    },
                    colorOne: 'auto',
                    colorTwo: 'auto'
                }
            },
            yAxisRight: {
                show: false,
                title: {
                    showTitle: false,
                    text: '',
                    nameGap: 15,
                    rotate: 0,
                    label: a.deepCopy(baseComponent.label),
                    fzPosition: 'end'
                },
                name: '显示Y轴',
                inverse: false,
                tickLine: {
                    show: true,
                    width: 1,
                    color: 'auto'
                },
                tick: {
                    show: true,
                    position: 'outside',
                    length: 5,
                    width: 1,
                    color: 'auto'
                },
                tickLabel: {
                    show: true,
                    label: a.deepCopy(baseComponent.label),
                    rotate: 0,
                    formatter: a.deepCopy(baseComponent.formatter),
                    split: 5,
                    min: null,
                    max: null,
                    prefix: '',
                    suffix: '',
                    ratio: 1,
                    digit: 'auto',
                    distance: 0
                },
                netLine: {
                    show: false,
                    width: 1,
                    type: 'solid',
                    color: 'auto',
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    }
                },
                netArea: {
                    show: false,
                    interval: {
                        value: 'auto',
                        cusNumber: 0
                    },
                    colorOne: 'auto',
                    colorTwo: 'auto'
                }
            }
        }
    };
    const positionOption = [
        {
            value: 'left-top',
            label: '左上'
        },
        {
            value: 'left-middle',
            label: '左中'
        },
        {
            value: 'left-bottom',
            label: '左下'
        },
        {
            value: 'right-top',
            label: '右上'
        },
        {
            value: 'right-middle',
            label: '右中'
        },
        {
            value: 'right-bottom',
            label: '右下'
        },
        {
            value: 'center-top',
            label: '中上'
        },
        {
            value: 'center-middle',
            label: '居中'
        },
        {
            value: 'center-bottom',
            label: '中下'
        },
        {
            value: 'custom',
            label: '自定义'
        }
    ];
    const distanceOption = [
        {
            value: 'auto',
            label: '默认'
        },
        {
            value: 'far',
            label: '远'
        },
        {
            value: 'normal',
            label: '一般'
        },
        {
            value: 'close',
            label: '近'
        },
        {
            value: 'custom',
            label: '自定义'
        }
    ];
    const fontSizeOption = [
        {
            value: 6,
            label: '6px'
        },
        {
            value: 8,
            label: '8px'
        },
        {
            value: 10,
            label: '10px'
        },
        {
            value: 12,
            label: '12px'
        },
        {
            value: 14,
            label: '14px'
        },
        {
            value: 16,
            label: '16px'
        },
        {
            value: 18,
            label: '18px'
        },
        {
            value: 20,
            label: '20px'
        },
        {
            value: 22,
            label: '22px'
        },
        {
            value: 24,
            label: '24px'
        },
        {
            value: 30,
            label: '30x'
        },
        {
            value: 36,
            label: '36px'
        },
        {
            value: 'custom',
            label: '自定义'
        }
    ];
    const lineStyleOption = [
        {
            value: 'solid',
            label: '实线'
        },
        {
            value: 'dashed',
            label: '虚线'
        },
        {
            value: 'dotted',
            label: '点线'
        }
    ];
    const lineWeightOption = [
        {
            value: 'normal',
            label: '正常'
        },
        {
            value: 'bold',
            label: '粗'
        },
        {
            value: 'bolder',
            label: '加粗'
        }
    ];
    const posOption = [
        {
            value: 'auto',
            label: '默认'
        },
        {
            value: 'inside',
            label: '中心位置'
        },
        {
            value: 'top',
            label: '上侧'
        },
        {
            value: 'left',
            label: '左侧'
        },
        {
            value: 'right',
            label: '右侧'
        },
        {
            value: 'bottom',
            label: '底侧'
        }
    ];
    const ratioOption = [
        {
            value: 100,
            label: '乘以100'
        },
        {
            value: 10,
            label: '乘以10'
        },
        {
            value: 1,
            label: '默认'
        },
        {
            value: 0.1,
            label: '除以10'
        },
        {
            value: 0.01,
            label: '除以100'
        },
        {
            value: 0.001,
            label: '除以1000'
        },
        {
            value: 0.0001,
            label: '除以一万'
        },
        {
            value: 0.00001,
            label: '除以10万'
        },
        {
            value: 0.000001,
            label: '除以一百万'
        },
        {
            value: 1e-7,
            label: '除以一千万'
        },
        {
            value: 1e-8,
            label: '除以一亿'
        },
        {
            value: 1e-9,
            label: '除以十亿'
        }
    ];
    const digitOption = [
        {
            value: 'auto',
            label: '自动显示'
        },
        {
            value: 0,
            label: '整数'
        },
        {
            value: 1,
            label: '1位小数'
        },
        {
            value: 2,
            label: '2位小数'
        },
        {
            value: 3,
            label: '3位小数'
        },
        {
            value: 4,
            label: '4位小数'
        },
        {
            value: 5,
            label: '5位小数'
        },
        {
            value: 6,
            label: '6位小数'
        },
        {
            value: 7,
            label: '7位小数'
        },
        {
            value: 8,
            label: '8位小数'
        }
    ];
    const sizeOption = [
        {
            value: 'auto',
            label: '默认'
        },
        {
            value: 'big',
            label: '大'
        },
        {
            value: 'medium',
            label: '中'
        },
        {
            value: 'small',
            label: '小'
        },
        {
            value: 'custom',
            label: '自定义'
        }
    ];
    const intervalOption = [
        {
            value: 'auto',
            label: '默认'
        },
        {
            value: 0,
            label: '每个刻度'
        },
        {
            value: 1,
            label: '间隔1个'
        },
        {
            value: 2,
            label: '间隔2个'
        },
        {
            value: 3,
            label: '间隔3个'
        },
        {
            value: 'custom',
            label: '自定义'
        }
    ];
    const fontSizeList = [
        {
            label: '默认',
            value: 'auto'
        },
        {
            label: '6px',
            value: 6
        },
        {
            label: '8px',
            value: 8
        },
        {
            label: '10px',
            value: 10
        },
        {
            label: '12px',
            value: 12
        },
        {
            label: '14px',
            value: 14
        },
        {
            label: '16px',
            value: 16
        },
        {
            label: '18px',
            value: 18
        },
        {
            label: '24px',
            value: 24
        },
        {
            label: '28px',
            value: 28
        },
        {
            label: '36px',
            value: 36
        },
        {
            label: '自定义',
            value: 'custom'
        }
    ];
    const fontStyleIBV = {
        bold: {
            des: '加粗',
            text: 'B'
        },
        italic: {
            des: '斜体',
            text: 'I'
        },
        vertical: {
            des: '文字方向',
            text: '垂直'
        }
    };
    const fontStyleIB = {
        bold: {
            des: '加粗',
            text: 'B'
        },
        italic: {
            des: '斜体',
            text: 'I'
        }
    };
    const chartModelData = [
        [
            '地区',
            '衣服',
            '食材',
            '图书'
        ],
        [
            '上海',
            134,
            345,
            51
        ],
        [
            '北京',
            345,
            421,
            234
        ],
        [
            '广州',
            453,
            224,
            156
        ],
        [
            '杭州',
            321,
            634,
            213
        ],
        [
            '南京',
            654,
            542,
            231
        ]
    ];
    const chartOptions = {
        chartAllType: 'echarts|line|default',
        defaultOption: a.deepCopy(chartComponent),
        chartData: a.deepCopy(chartModelData)
    };
    return {
        chartComponent,
        positionOption,
        distanceOption,
        fontSizeOption,
        lineStyleOption,
        lineWeightOption,
        posOption,
        ratioOption,
        digitOption,
        sizeOption,
        fontSizeList,
        intervalOption,
        fontStyleIBV,
        fontStyleIB,
        chartOptions
    };
});