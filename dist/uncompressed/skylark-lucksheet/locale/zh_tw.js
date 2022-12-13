define(function () {
    'use strict';
    return {
        functionlist: [
            {
                'n': 'SUMIF',
                't': 0,
                'd': '對範圍中符合指定條件的值求和\u3002',
                'a': '對範圍中符合指定條件的值求和\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': '範圍',
                        'detail': '要根據條件進行檢測的範圍\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '條件',
                        'detail': '要應用於範圍的模式或測試條件\u3002\n\n如果範圍包含的是要檢測的文字,則條件必須為字串\u3002條件可以包含萬用字元,包括用於匹配單個字元的\uFF1F或用於匹配零個或連續多個字元的*\u3002要匹配問號星號本身,請在該字元前面加上波浪號\uFF08~\uFF09首碼\uFF08即~\uFF1F和~*\uFF09\u3002字串條件必須用引號括起來\u3002函數會檢查範圍中的每個儲存格與條件是否相等或匹配\uFF08如果使用了萬用字元\uFF09\u3002\n\n如果範圍包含的是要檢測的數位,則條件可以是字串也可以是數位\u3002如果給定的條件是一個數位,則檢查範圍中的每個儲存格是否等於條件\u3002另外,條件也可能是包含數位的字串\uFF08也將對其進行相等檢測\uFF09,或者帶有以下首碼的數位:=\uFF08檢查是否相等\uFF09\u3001>\uFF08檢查範圍儲存格的值是否大於條件值\uFF09或<\uFF08檢查範圍儲存格的值是否小於條件值\uFF09',
                        'example': '">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '求和範圍',
                        'detail': '要求和的範圍\uFF08如果與範圍不同\uFF09\u3002',
                        'example': 'B1:B10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'TAN',
                't': 0,
                'd': '返回已知角度的正切值\u3002',
                'a': '返回已知角度的正切值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '角度',
                        'detail': '要求其正切值的角度,以弧度表示\u3002',
                        'example': '45*PI()/180',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'TANH',
                't': 0,
                'd': '返回給定實數的雙曲正切值\u3002',
                'a': '返回給定實數的雙曲正切值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其雙曲正切值的實數\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'CEILING',
                't': 0,
                'd': '將數值向上取整為最接近的指定因數的倍數\u3002',
                'a': '將數值向上取整為最接近的指定因數的倍數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要向上舍入的數值\u3002',
                        'example': '23.25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '因數',
                        'detail': '要將值舍入到此數的整數倍\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ATAN',
                't': 0,
                'd': '返回數值的反正切值,以弧度表示\u3002',
                'a': '返回數值的反正切值',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反正切值的數值\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ASINH',
                't': 0,
                'd': '返回數值的反雙曲正弦值\u3002',
                'a': '返回數值的反雙曲正弦值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反雙曲正弦值的數值\u3002',
                        'example': '0.9',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ABS',
                't': 0,
                'd': '返回數值的絕對值\u3002',
                'a': '返回數值的絕對值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要返回其絕對值的數\u3002',
                        'example': '-2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ACOS',
                't': 0,
                'd': '返回數值的反余弦值,以弧度表示\u3002',
                'a': '返回數值的反余弦值',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反余弦值的數值\u3002必須介於-1和1之間,包括兩端值\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ACOSH',
                't': 0,
                'd': '返回數值的反雙曲余弦值\u3002',
                'a': '返回數值的反雙曲余弦值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反雙曲余弦值的數值\u3002必須大於等於1\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'MULTINOMIAL',
                't': 0,
                'd': '返回參數和的階乘除以各參數階乘的乘積後得到的值\u3002',
                'a': '返回參數和的階乘除以各參數階乘的乘積後得到的值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '用於計算的第一項數值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2',
                        'detail': '用於計算的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ATANH',
                't': 0,
                'd': '返回數值的反雙曲正切值\u3002',
                'a': '返回數值的反雙曲正切值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反雙曲正切值的數值\u3002必須介於-1和1之間\uFF08不包括-1和1\uFF09\u3002',
                        'example': '0.9',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ATAN2',
                't': 0,
                'd': '以弧度為組織返回x軸與從原點\uFF080,0\uFF09到指定座標點\uFF08`x`,`y`\uFF09之間連線的夾角\u3002',
                'a': '以弧度為組織返回x軸與從原點\uFF080,0\uFF09到指定座標點\uFF08`x`,`y`\uFF09之間連線的夾角\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '要計算其與x軸夾角大小的線段的終點x座標\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'y',
                        'detail': '要計算其與x軸夾角大小的線段的終點y座標\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUNTBLANK',
                't': 1,
                'd': '返回給定範圍內的空儲存格數\u3002',
                'a': '返回給定範圍內的空儲存格數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '範圍',
                        'detail': '要統計空白儲存格數量的範圍\u3002',
                        'example': 'A2:C100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }]
            },
            {
                'n': 'COSH',
                't': 0,
                'd': '返回給定實數的雙曲余弦值\u3002',
                'a': '返回給定實數的雙曲余弦值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其雙曲余弦值的實數值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'INT',
                't': 0,
                'd': '數值向下取整為小於或等於該數的最接近的整數\u3002',
                'a': '數值向下取整為小於或等於該數的最接近的整數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要向下取整為最接近的整數的數值\u3002',
                        'example': '99.44',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ISEVEN',
                't': 0,
                'd': '檢查所提供的數值是否為偶數\u3002',
                'a': '檢查所提供的數值是否為偶數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要驗證其是否為偶數的數值\u3002\n\n如果值為偶數或指向包含偶數的儲存格的引用,ISEVEN將返回TRUE,否則返回FALSE\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ISODD',
                't': 0,
                'd': '檢查所提供的數值是否為奇數\u3002',
                'a': '檢查所提供的數值是否為奇數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要驗證其是否為奇數的數值\u3002\n\n如果值為奇數或指向包含奇數的儲存格,ISODD將返回TRUE,否則返回FALSE\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'LCM',
                't': 0,
                'd': '返回一個或多個整數的最小公倍數\u3002',
                'a': '返回一個或多個整數的最小公倍數\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '要在求最小公倍數數的計算中檢查其因數的第一項數值或範圍\u3002',
                        'example': 'A2:A5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在求最小公倍數時要考慮其因數的其他數值或範圍\u3002',
                        'example': '3',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LN',
                't': 0,
                'd': '返回數值以e\uFF08歐拉數\uFF09為底的對數\u3002',
                'a': '返回數值以e\uFF08歐拉數\uFF09為底的對數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要以e為底數計算其對數的值\u3002\n\n值必須為正數\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'LOG',
                't': 0,
                'd': '根據指定底數返回數位的對數\u3002',
                'a': '根據指定底數返回數位的對數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '想要計算其對數的正實數\u3002',
                        'example': '128',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '底數',
                        'detail': '[可選] - 對數的底數\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'LOG10',
                't': 0,
                'd': '返回數值以10為底的對數\u3002',
                'a': '返回數值以10為底的對數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其以10為底的對數的數值\u3002\n\n值必須為正值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'MOD',
                't': 0,
                'd': '返回兩數相除的餘數,結果的符號與除數相同\u3002',
                'a': '返回兩數相除的餘數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '被除數',
                        'detail': '要將其相除以得到餘數的數值\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '除數',
                        'detail': '用於除其他數的數值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MROUND',
                't': 0,
                'd': '將數值取整為另一整數最接近的整數倍\u3002',
                'a': '將數值取整為另一整數最接近的整數倍\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要取整為另一整數最接近的整數倍的數值\u3002',
                        'example': '21',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '因數',
                        'detail': '值將取此因數的整數倍\u3002',
                        'example': '14',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ODD',
                't': 0,
                'd': '將數值向上取整為最接近的奇整數\u3002',
                'a': '將數值向上取整為最接近的奇整數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要向上取整的數值,取整值為大於此值的最接近的奇數\u3002\n\n如果值為負數,則將其取整為絕對值大於該值的相鄰負奇數',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'SUMSQ',
                't': 0,
                'd': '返回一組數值和/或儲存格的平方總和\u3002',
                'a': '返回一組數值和/或儲存格的平方總和\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '要將其平方相加的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 要將其平方與值1的平方相加的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'COMBIN',
                't': 0,
                'd': '給定集合中的對象總數和要選擇的對象數量,返回共有多少種不同選擇管道\u3002',
                'a': '給定集合中的對象總數和要選擇的對象數量',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'n',
                        'detail': '要從中進行選擇的對象集合的大小\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'k',
                        'detail': '要選擇的對象數量\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUM',
                't': 0,
                'd': '返回一組數值和/或儲存格的總和\u3002',
                'a': '返回一組數值和/或儲存格的總和\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '要相加的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 要相加的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'SUBTOTAL',
                't': 0,
                'd': '使用指定的匯總函數,返回一系列縱向儲存格的分類匯總\u3002',
                'a': '使用指定的匯總函數',
                'm': [
                    2,
                    256
                ],
                'p': [
                    {
                        'name': '函數程式碼',
                        'detail': '用於計算分類匯總的函數\u3002\n\n1代表AVERAGE\n\n2代表COUNT\n\n3代表COUNTA\n\n4代表MAX\n\n5代表MIN\n\n6代表PRODUCT\n\n7代表STDEV\n\n8代表STDEVP\n\n9代表SUM\n\n10代表VAR\n\n11代表VARP\n\n通過在這些2位程式碼前附加10\uFF08對於1位程式碼\uFF09或1\uFF08對於2位程式碼\uFF09,可以將隱藏值忽略\u3002例如,102代表忽略隱藏儲存格的COUNT,而110則代表忽略隱藏值的VAR\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '範圍1',
                        'detail': '要計算分類匯總的第一個範圍\u3002',
                        'example': 'A2:A5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '範圍2',
                        'detail': '[可選] - 要計算分類匯總的其他範圍\u3002',
                        'example': 'B2:B8',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'ASIN',
                't': 0,
                'd': '返回數值的反正弦值,以弧度表示\u3002',
                'a': '返回數值的反正弦值',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其反正弦值的數值\u3002必須介於-1和1之間,包括兩端值\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'COUNTIF',
                't': 1,
                'd': '返回範圍內滿足某個條件的儲存格的數量\u3002',
                'a': '返回範圍內滿足某個條件的儲存格的數量\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '範圍',
                        'detail': '要根據條件進行檢測的範圍\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '條件',
                        'detail': '要應用於範圍的模式或測試條件\u3002\n\n如果範圍包含的是要檢測的文字,則條件必須為字串\u3002條件可以包含萬用字元,包括用於匹配單個字元的\uFF1F或用於匹配零個或連續多個字元的*\u3002要匹配問號星號本身,請在該字元前面加上波浪號\uFF08~\uFF09首碼\uFF08即~\uFF1F和~*\uFF09\u3002字串條件必須用引號括起來\u3002函數會檢查範圍中的每個儲存格與條件是否相等或匹配\uFF08如果使用了萬用字元\uFF09\u3002\n\n如果範圍包含的是要檢測的數位,則條件可以是字串也可以是數位\u3002如果給定的條件是一個數位,則檢查範圍中的每個儲存格是否等於條件\u3002另外,條件也可能是包含數位的字串\uFF08也將對其進行相等檢測\uFF09,或者帶有以下首碼的數位:=\u3001>\u3001>=\u3001<或<=,這些條件將分別用於檢查範圍中的儲存格是否等於\u3001大於\u3001大於等於\u3001小於\u3001小於等於條件值\u3002',
                        'example': '">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RADIANS',
                't': 0,
                'd': '將以度表示的角度值轉換為弧度\u3002',
                'a': '將以度表示的角度值轉換為弧度\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '角度',
                        'detail': '要從度轉換為弧度的角度\u3002',
                        'example': '180',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'RAND',
                't': 0,
                'd': '返回一個介於0和1之間\uFF08包括0但不包括1\uFF09的亂數\u3002',
                'a': '返回一個介於0和1之間\uFF08包括0但不包括1\uFF09的亂數\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'COUNTUNIQUE',
                't': 0,
                'd': '計算一列指定值和範圍中不重複數值的個數\u3002',
                'a': '計算一列指定值和範圍中不重複數值的個數\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '要檢查其是否唯一的第一個值或範圍\u3002',
                        'example': 'A1:C100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 要檢查是否唯一的其他值或範圍\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'DEGREES',
                't': 0,
                'd': '將以弧度表示的角度值轉換為度\u3002',
                'a': '將以弧度表示的角度值轉換為度\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '角度',
                        'detail': '要從弧度轉換為度的角度\u3002',
                        'example': 'PI()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ERFC',
                't': 9,
                'd': '返回數值的互補高斯誤差函數\u3002',
                'a': '返回數值的互補高斯誤差函數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'z',
                        'detail': '要為其計算互補高斯誤差函數的數值\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'EVEN',
                't': 0,
                'd': '將數值向上取整為最接近的偶整數\u3002',
                'a': '將數值向上取整為最接近的偶整數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要向上取整的數值,取整值為大於此值的最接近的偶數\u3002\n\n如果值為負數,則將其取整為絕對值大於該值的相鄰負偶數\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'EXP',
                't': 0,
                'd': '返回歐拉數e\uFF08~2.718\uFF09的指定次幂\u3002',
                'a': '返回歐拉數e\uFF08~2.718\uFF09的指定次幂\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '指數',
                        'detail': '指定e的自乘幂次值\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'FACT',
                't': 0,
                'd': '返回數值的階乘\u3002',
                'a': '返回數值的階乘\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算並返回其階乘的數位或對數位\uFF08所在儲存格\uFF09的引用\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'FACTDOUBLE',
                't': 0,
                'd': '返回數值的"雙階乘"\u3002',
                'a': '返回數值的"雙階乘"\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算並返回其雙階乘的數位或對數位\uFF08所在儲存格\uFF09的引用\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'PI',
                't': 0,
                'd': '返回帶有14位小數的PI值\u3002',
                'a': '返回帶有14位小數的PI值\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'FLOOR',
                't': 0,
                'd': '將數值向下取整為指定因數的最接近的整數倍\u3002',
                'a': '將數值向下取整為指定因數的最接近的整數倍\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要向下舍入為因數的最接近整數倍的數值\u3002',
                        'example': '23.25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '因數',
                        'detail': '要將值舍入到此數的整數倍\u3002\n\n因數不得為0\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'GCD',
                't': 0,
                'd': '返回一個或多個整數的最大公約數\u3002',
                'a': '返回一個或多個整數的最大公約數\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '要在查找最大公約數的計算中檢查其因數的第一項數值或範圍\u3002',
                        'example': 'A2:A5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在求最大公約數時要考慮其因數的其他數值或範圍\u3002',
                        'example': '96',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RANDBETWEEN',
                't': 0,
                'd': '返回介於兩個整數之間\uFF08包括這兩個整數\uFF09的亂數\u3002',
                'a': '返回介於兩個整數之間\uFF08包括這兩個整數\uFF09的亂數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '下界',
                        'detail': '隨機值範圍的下界\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '上界',
                        'detail': '隨機值範圍的上界\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ROUND',
                't': 0,
                'd': '將數位四捨五入到指定的位數\u3002',
                'a': '將數位四捨五入到指定的位數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要四捨五入的數位\u3002',
                        'example': '99.44',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '位數',
                        'detail': '要進行四捨五入運算的位數\u3002\n\n位數可以取負值,在這種情況下會將值的小數點左側部分舍入到指定的位數\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ROUNDDOWN',
                't': 0,
                'd': '朝著零的方向將數位進行向下舍入\u3002',
                'a': '朝著零的方向將數位進行向下舍入\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '需要向下舍入的任意實數\u3002',
                        'example': '99.44',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '位數',
                        'detail': '要通過舍入達到的小數位數\u3002\n\n位數可以取負值,在這種情況下會將值的小數點左側部分舍入到指定的位數\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ROUNDUP',
                't': 0,
                'd': '朝著遠離0\uFF08零\uFF09的方向將數位進行向上舍入\u3002',
                'a': '朝著遠離0\uFF08零\uFF09的方向將數位進行向上舍入\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要將其舍入為位數位數位的值,始終向上舍入\u3002',
                        'example': '99.44',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '位數',
                        'detail': '要通過舍入達到的小數位數\u3002\n\n位數可以取負值,在這種情況下會將值的小數點左側部分舍入到指定的位數\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SERIESSUM',
                't': 0,
                'd': '給定參數x\u3001n\u3001m和a,返回幂級數的和a1xn + a2x\uFF08n+m\uFF09+\u2026+ aix\uFF08n+\uFF08i-1\uFF09m\uFF09,其中i為範圍a中的項數\u3002',
                'a': '給定參數x\u3001n\u3001m和a',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '幂級數的輸入值\u3002隨相應的近似類型而變,有可能為角度\u3001指數或其他一些值\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'n',
                        'detail': '在幂級數中x的初始自乘幂次\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'm',
                        'detail': 'x的幂次中的附加增量\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'a',
                        'detail': '包含幂級數係數的數組或範圍\u3002',
                        'example': '{FACT(0)',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SIGN',
                't': 0,
                'd': '給定輸入數值,如果為負返回-1\uFF1B如果為正返回1\uFF1B如果為零則返回0\u3002',
                'a': '給定輸入數值',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要返回其符號的數值\u3002',
                        'example': '-42',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'SIN',
                't': 0,
                'd': '給定角度\uFF08以弧度表示\uFF09,返回其正弦值\u3002',
                'a': '給定角度\uFF08以弧度表示\uFF09',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '角度',
                        'detail': '要返回其正弦值的角度,以弧度表示\u3002',
                        'example': 'PI()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'SINH',
                't': 0,
                'd': '返回給定實數的雙曲正弦值\u3002',
                'a': '返回給定實數的雙曲正弦值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其雙曲正弦值的實數值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'SQRT',
                't': 0,
                'd': '返回一個正數的正平方根\u3002',
                'a': '返回一個正數的正平方根\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要計算其正平方根的數值\u3002\n\n值必須為正數\uFF1B如果為負,SQRT將返回#NUM\uFF01錯誤\u3002',
                        'example': '9',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'SQRTPI',
                't': 0,
                'd': '返回PI與給定正數乘積的正平方根\u3002',
                'a': '返回PI與給定正數乘積的正平方根\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '要將其與PI相乘並返回該乘積的平方根的數值\n\n值必須為正數\uFF1B如果為負數,SQRTPI將返回#NUM\uFF01錯誤\u3002',
                        'example': '9',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'GAMMALN',
                't': 1,
                'd': '返回指定伽瑪函數的以e\uFF08歐拉數\uFF09為底的對數\u3002',
                'a': '返回指定伽瑪函數的以e\uFF08歐拉數\uFF09為底的對數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '值',
                        'detail': '伽瑪函數的輸入值\u3002返回的將是伽瑪\uFF08值\uFF09的自然對數\u3002\n\n值必須為正數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'COS',
                't': 0,
                'd': '返回給定角度的余弦值\uFF08角度以弧度表示\uFF09\u3002',
                'a': '返回給定角度的余弦值\uFF08角度以弧度表示\uFF09\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '角度',
                        'detail': '要取其余弦值的角度,以弧度表示\u3002',
                        'example': 'PI()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'TRUNC',
                't': 0,
                'd': '除指定有效位之外的部分,取數據的指定有效位\u3002',
                'a': '除指定有效位之外的部分',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': '值',
                        'detail': '要截取的數據\u3002',
                        'example': '3.141592654',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '位數',
                        'detail': '[可選 - 預設值為0] - 小數點右側要保留的有效位數\u3002\n\n如果位數大於值中的有效位數,則將"值"原樣返回\u3002\n\n位數可以取負值,在這種情況下會將小數點左側指定位數的值更改為零\u3002小數點右側的所有位數都會被捨棄\u3002如果值的所有位都被更改為零,則TRUNC會返回0\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'QUOTIENT',
                't': 0,
                'd': '返回以一個數除以另一個數所得的結果,不包含餘數\u3002',
                'a': '返回以一個數除以另一個數所得的結果',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '被除數',
                        'detail': '要被除的數值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '除數',
                        'detail': '用於除其他數的數值\u3002\n\n除數不得為0',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'POWER',
                't': 0,
                'd': '返回數值的指定次幂\u3002',
                'a': '返回數值的指定次幂\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '底數',
                        'detail': '要計算其指數次幂的數值\u3002\n\n如果底數為負,則指數必須為整數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '指數',
                        'detail': '指定底數的自乘幂次值\u3002',
                        'example': '0.5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUMIFS',
                't': 0,
                'd': '根據多項條件返回範圍之和\u3002',
                'a': '根據多項條件返回範圍之和\u3002',
                'm': [
                    3,
                    257
                ],
                'p': [
                    {
                        'name': '求和範圍',
                        'detail': '要對其求和的範圍\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '條件範圍1',
                        'detail': '要在哪個範圍內檢查條件1\u3002',
                        'example': ' B1:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '條件1',
                        'detail': '要應用於條件範圍1的模式或測試條件\u3002',
                        'example': ' ">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '條件範圍2,條件2\u2026',
                        'detail': '[ 可選 ] - 要檢查的其他範圍和條件\u3002',
                        'example': ' C1:C10',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'COUNTIFS',
                't': 1,
                'd': '根據多項條件返回範圍中的儲存格數量\u3002',
                'a': '根據多項條件返回範圍中的儲存格數量\u3002',
                'm': [
                    2,
                    256
                ],
                'p': [
                    {
                        'name': '條件範圍1',
                        'detail': '要在哪個範圍內檢查條件1\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '條件1',
                        'detail': '要應用於條件範圍1的模式或測試條件\u3002',
                        'example': ' ">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '條件範圍2,條件2\u2026',
                        'detail': '[ 可選 ] - 要檢查的其他範圍和條件,可重複\u3002',
                        'example': ' B1:B10',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'PRODUCT',
                't': 0,
                'd': '返回將一組數相乘所得的結果\u3002',
                'a': '返回將一組數相乘所得的結果\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '乘數1',
                        'detail': '用於計算乘積的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '乘數2 ... 乘數30',
                        'detail': '[可選] - 要相乘的其他數值',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'HARMEAN',
                't': 1,
                'd': '計算數據集的調和平均值\u3002',
                'a': '計算數據集的調和平均值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'HYPGEOMDIST',
                't': 1,
                'd': '返回超幾何分佈\u3002如果已知樣本量\u3001總體成功次數和總體大小,則 HYPGEOM.DIST 返回樣本取得已知成功次數的概率\u3002',
                'a': '返回超幾何分佈\u3002',
                'm': [
                    5,
                    5
                ],
                'p': [
                    {
                        'name': 'Sample_s',
                        'detail': '樣本中成功的次數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'Number_sample',
                        'detail': '樣本量\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'Population_s',
                        'detail': '總體中成功的次數\u3002',
                        'example': '20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'Number_pop',
                        'detail': '總體大小\u3002',
                        'example': '40',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果cumulative為TRUE\uFF08\uFF09,則HYPGEOM.DIST返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'TRUE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'INTERCEPT',
                't': 1,
                'd': '計算數據集的線性回歸方程直線與 Y 軸的相交點\uFF08x=0\uFF09的y值\u3002',
                'a': '計算數據集的線性回歸方程直線與 Y 軸的相交點\uFF08x=0\uFF09的y值\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'KURT',
                't': 1,
                'd': '計算數據集的峭度,該名額訓示數據集\uFF08分佈\uFF09的形態,尤其是該形態的陡峭程度\u3002',
                'a': '計算數據集的峭度',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '數據集中的第一個值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'LARGE',
                't': 1,
                'd': '返回數據集中第 n 個最大元素,n 由用戶指定\u3002',
                'a': '返回數據集中第 n 個最大元素',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'n',
                        'detail': '要返回的元素的排行位置\uFF08從大到小順序\uFF09\u3002\n\n例如,將n設為4將使LARGE返回數據中排名第4的最大元素\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'STDEVA',
                't': 1,
                'd': '基於樣本計算標準差,將文字取值為0\u3002',
                'a': '基於樣本計算標準差',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2,\u2026',
                        'detail': '[可選] - 樣本中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'STDEVP',
                't': 1,
                'd': '基於樣本總體計算標準差\u3002',
                'a': '基於樣本總體計算標準差\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '數據集中的第一個值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'GEOMEAN',
                't': 1,
                'd': '計算數據集的幾何平均值\u3002',
                'a': '計算數據集的幾何平均值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RANK_EQ',
                't': 1,
                'd': '返回指定值在數據集中的排名\u3002如果相同的值在數據集中存在多項,則返回其中的最高排名\u3002',
                'a': '返回指定值在數據集中的排名\u3002如果相同的值在數據集中存在多項,則返回其中的最高排名\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要確定其排名的值\u3002',
                        'example': 'A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'ref',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A1:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'order',
                        'detail': '[可選-默認為按降序\uFF08FALSE\uFF08\uFF09\uFF09] - 要按昇冪還是按降序考慮"data"中的值\u3002',
                        'example': 'TRUE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RANK_AVG',
                't': 1,
                'd': '返回指定值在數據集中的排名\u3002如果相同的值在數據集中存在多項,則返回這些項排名的平均值\u3002',
                'a': '返回指定值在數據集中的排名\u3002如果相同的值在數據集中存在多項,則返回這些項排名的平均值\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要確定其排名的值\u3002',
                        'example': 'A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'ref',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A1:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'order',
                        'detail': '[可選-默認為按降序\uFF08FALSE\uFF08\uFF09\uFF09] - 要按昇冪還是按降序考慮"data"中的值\u3002',
                        'example': 'TRUE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'PERCENTRANK_EXC',
                't': 1,
                'd': '以百分數形式返回指定值在給定數據集中的百分比排名\uFF08介於0和1之間,不包括兩端值\uFF09\u3002',
                'a': '以百分數形式返回指定值在給定數據集中的百分比排名\uFF08介於0和1之間,不包括兩端值\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'data',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A1:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'x',
                        'detail': '要確定其百分比排位的值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'significance',
                        'detail': '[可選-預設值為3] - 要在計算中使用的有效位數\u3002',
                        'example': '4',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PERCENTRANK_INC',
                't': 1,
                'd': '以百分比形式返回指定值在給定數據集中的百分比排名\uFF08介於0和1之間,包括兩端值\uFF09\u3002',
                'a': '以百分比形式返回指定值在給定數據集中的百分比排名\uFF08介於0和1之間,包括兩端值\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'data',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A1:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'x',
                        'detail': '要確定其百分比排位的值\u3002',
                        'example': ' A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'significance',
                        'detail': '[可選-預設值為3] - 要在計算中使用的有效位數\u3002',
                        'example': '4',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'FORECAST',
                't': 1,
                'd': '基於數據集的線性回歸,計算指定 x 的預期 y 值\u3002',
                'a': '基於數據集的線性回歸',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': 'x軸上用於預測的值\u3002',
                        'example': 'A1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'FISHERINV',
                't': 1,
                'd': '返回指定數值的 Fisher 逆變換\u3002',
                'a': '返回指定數值的 Fisher 逆變換\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'y',
                        'detail': '要計算其Fisher逆變換的數值\u3002',
                        'example': '0.962',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'FISHER',
                't': 1,
                'd': '返回指定數值的 Fisher 變換\u3002',
                'a': '返回指定數值的 Fisher 變換\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'x',
                        'detail': '要計算其Fisher變換的數值\u3002',
                        'example': '0.962',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'MODE_SNGL',
                't': 1,
                'd': '返回數據集中出現次數最多的值\u3002',
                'a': '返回數據集中出現次數最多的值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算模式時要檢查的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計算模式時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'WEIBULL_DIST',
                't': 1,
                'd': '給定形狀和尺度,返回韋伯分佈函數\uFF08或韋伯累積分佈函數\uFF09的值\u3002',
                'a': '給定形狀和尺度',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': 'WEIBULL 分佈函數的輸入值\u3002',
                        'example': '2.4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'alpha',
                        'detail': 'Weibull 分佈函數的形狀參數\u3002\n\n alpha值必須大於0\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'beta',
                        'detail': 'Weibull 分佈函數的尺度參數\u3002\n\n beta值必須大於0\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': 'TRUE\uFF08\uFF09表示使用累積分佈函數,FALSE\uFF08\uFF09則表示使用概率密度函數\u3002',
                        'example': 'TRUE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'COUNT',
                't': 1,
                'd': '返回數據集中數值的個數\u3002',
                'a': '返回數據集中數值的個數\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計數時要檢查的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計數時要檢查的其他值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'COUNTA',
                't': 1,
                'd': '返回數據集中值的數量\u3002',
                'a': '返回數據集中值的數量\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計數時要檢查的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計數時要檢查的其他值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'AVEDEV',
                't': 1,
                'd': '計算數據與數據集平均值之間的偏差大小的平均值\u3002',
                'a': '計算數據與數據集平均值之間的偏差大小的平均值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 樣本中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'AVERAGE',
                't': 1,
                'd': '返回數據集的算術平均值,對文字忽略不計\u3002',
                'a': '返回數據集的算術平均值',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算平均值時用到的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計算平均值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'AVERAGEA',
                't': 1,
                'd': '返回數據集的算術平均值\u3002',
                'a': '返回數據集的算術平均值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算平均值時用到的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計算平均值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'BINOM_DIST',
                't': 1,
                'd': '返回一元二項式分佈的概率\u3002',
                'a': '返回一元二項式分佈的概率\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'number_s',
                        'detail': '試驗的成功次數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'trials',
                        'detail': '獨立檢驗的次數\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'probability_s',
                        'detail': '任一給定檢驗的成功概率\u3002',
                        'example': '0.005',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '是否使用二項式累積分佈\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'BINOM_INV',
                't': 1,
                'd': '計算累積二項式分佈大於或等於指定條件的最小值\u3002',
                'a': '計算累積二項式分佈大於或等於指定條件的最小值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'trials',
                        'detail': '貝努利試驗次數\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'probability_s',
                        'detail': '任一次給定檢驗的成功概率\u3002',
                        'example': '0.005',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'alpha',
                        'detail': '期望的臨界概率\u3002',
                        'example': '0.8',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'CONFIDENCE_NORM',
                't': 1,
                'd': '計算常态分配的置信區間的一半寬度\u3002',
                'a': '計算常态分配的置信區間的一半寬度\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'alpha',
                        'detail': '用來計算置信水准的顯著性水准\u3002\n\n置信水准等於100*\uFF081 - alpha\uFF09%,亦即,如果 alpha 為0.05,則置信水准為 95%\u3002',
                        'example': '0.05',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': '數據區域的總體標準差\u3002',
                        'example': '1.6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'size',
                        'detail': '樣本總量的大小\u3002',
                        'example': '250',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'CORREL',
                't': 1,
                'd': '計算給定數據集的皮爾遜積矩相關係數 r\u3002',
                'a': '計算給定數據集的皮爾遜積矩相關係數 r\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COVARIANCE_P',
                't': 1,
                'd': '計算數據集的總體協方差\u3002',
                'a': '計算數據集的總體協方差\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COVARIANCE_S',
                't': 1,
                'd': '計算數據集的樣本協方差\u3002',
                'a': '計算數據集的樣本協方差\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DEVSQ',
                't': 1,
                'd': '基於樣本計算其偏差的平方和\u3002',
                'a': '基於樣本計算其偏差的平方和\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 樣本中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'EXPON_DIST',
                't': 1,
                'd': '返回帶有指定 Lambda 和指定值的指數分佈函數的值\u3002',
                'a': '返回帶有指定 Lambda 和指定值的指數分佈函數的值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '指數分佈函數的輸入值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'lambda',
                        'detail': '用於指定指數分佈函數的 lambda 值\u3002',
                        'example': '0.5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '是否使用指數累積分佈\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'AVERAGEIF',
                't': 1,
                'd': '根據條件返回範圍的平均值\u3002',
                'a': '根據條件返回範圍的平均值\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'criteria_range',
                        'detail': '要對其檢查 criterion 的範圍\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criterion',
                        'detail': '要應用於criteria_range的模式或測試條件\u3002\n\n等於:"文字" 或 1 或 "=文字" 或 "=1"\n\n大於:">1"\n\n大於等於:">=1"\n\n小於:"<1"\n\n小於等於:"<=1"\n\n不等於:"<>1"或"<>文字"',
                        'example': '">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'average_range',
                        'detail': '[可選] - 要計算平均值的範圍\u3002如果未提供此參數,則改用criteria_range來計算平均值\u3002',
                        'example': 'B1:B10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'AVERAGEIFS',
                't': 1,
                'd': '根據多項條件返回範圍的平均值\u3002',
                'a': '根據多項條件返回範圍的平均值\u3002',
                'm': [
                    2,
                    255
                ],
                'p': [
                    {
                        'name': 'average_range',
                        'detail': '要計算平均值的範圍\u3002',
                        'example': 'A1:A10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria_range1',
                        'detail': '要對其檢查 criterion1 的範圍\u3002',
                        'example': ' B1:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criterion1',
                        'detail': '要應用於criteria_range1的模式或測試條件\u3002',
                        'example': ' ">20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria_range2, criterion2, ...',
                        'detail': '[可選] - 要檢查的其他範圍和條件\u3002',
                        'example': ' C1:C10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'PERMUT',
                't': 1,
                'd': '返回可從數位對象中選擇的給定數目對象的排列數\u3002',
                'a': '返回可從數位對象中選擇的給定數目對象的排列數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '表示對象個數的整數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'number_chosen',
                        'detail': '表示每個排列中對象個數的整數\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TRIMMEAN',
                't': 1,
                'd': '在排除數據集高低兩端的部分數據之後計算所得的平均值\u3002',
                'a': '在排除數據集高低兩端的部分數據之後計算所得的平均值\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據',
                        'detail': '包含相關數據集的數組或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': '排除比例',
                        'detail': '要從數據集的極值部分排除的數據占數據集的比例\u3002\n\n排除比例必須大於等於0且小於1\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PERCENTILE_EXC',
                't': 1,
                'd': '返回數組的 K 百分點值,K 介於0到1之間,不含0與1\u3002',
                'a': '返回數組的 K 百分點值,K 介於0到1之間,不含0與1\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '定義相對位置的數組或數據區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'k',
                        'detail': '0 到 1 之間的百分點值,不包含 0 和 1\u3002',
                        'example': '0.25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PERCENTILE_INC',
                't': 1,
                'd': '返回數組的 K 百分點值,K 介於 0 到 1 之間,包含 0 與 1\u3002',
                'a': '返回數組的 K 百分點值,K 介於 0 到 1 之間,包含 0 與 1\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '定義相對位置的數組或數據區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'k',
                        'detail': '0 到 1 之間的百分點值,包含 0 和 1\u3002',
                        'example': '0.25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PEARSON',
                't': 1,
                'd': '回皮爾生\uFF08Pearson\uFF09乘積矩相關係數 r\u3002',
                'a': '回皮爾生\uFF08Pearson\uFF09乘積矩相關係數 r\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'NORM_S_INV',
                't': 1,
                'd': '返回標準正態累積分佈函數的反函數值\u3002該分佈的平均值為0,標準差為1\u3002',
                'a': '返回標準正態累積分佈函數的反函數值\u3002該分佈的平均值為0,標準差為1\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'probability',
                        'detail': '對應於常态分配的概率\u3002',
                        'example': '0.75',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'NORM_S_DIST',
                't': 1,
                'd': '返回標準常态分配函數\uFF08該分佈的平均值為0,標準差為1\uFF09\u3002',
                'a': '返回標準常态分配函數\uFF08該分佈的平均值為0,標準差為1\uFF09\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'z',
                        'detail': '需要計算其分佈的數值\u3002',
                        'example': '2.4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果為TRUE\uFF08\uFF09,則返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'NORM_INV',
                't': 1,
                'd': '返回指定平均值和標準差的正態累積分佈函數的反函數值\u3002',
                'a': '返回指定平均值和標準差的正態累積分佈函數的反函數值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'probability',
                        'detail': '對應於常态分配的概率\u3002',
                        'example': '0.75',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': '分佈的算術平均值\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': '分佈的標準差\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'NORM_DIST',
                't': 1,
                'd': '返回指定平均值和標準差的常态分配函數\u3002',
                'a': '返回指定平均值和標準差的常态分配函數\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '需要計算其分佈的數值\u3002',
                        'example': '2.4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': '分佈的算術平均值\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': '分佈的標準差\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果為TRUE\uFF08\uFF09,則返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'NEGBINOM_DIST',
                't': 1,
                'd': '返回負二項式分佈\u3002',
                'a': '返回負二項式分佈\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'number_f',
                        'detail': '要類比的失敗次數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'number_s',
                        'detail': '要類比的成功次數\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'probability_s',
                        'detail': '任一次給定檢驗的成功概率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果為TRUE\uFF08\uFF09,則返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'MINA',
                't': 1,
                'd': '返回數據集中的最小數值\u3002',
                'a': '返回數據集中的最小數值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算最小值時所用的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在計算最小值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MIN',
                't': 1,
                'd': '返回數值數據集中的最小值\u3002',
                'a': '返回數值數據集中的最小值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算最小值時所用的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在計算最小值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MEDIAN',
                't': 1,
                'd': '返回數值數據集中的中值\u3002',
                'a': '返回數值數據集中的中值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算中值時所用的第一個數值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在計算中值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MAXA',
                't': 1,
                'd': '返回數據集中的最大數值\u3002',
                'a': '返回數據集中的最大數值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算最大值時所用的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 在計算最大值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MAX',
                't': 1,
                'd': '返回數值數據集中的最大值\u3002',
                'a': '返回數值數據集中的最大值\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '計算最大值時所用的第一個值或範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2',
                        'detail': '[可選] - 在計算最大值時要考慮的其他數值或範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'LOGNORM_INV',
                't': 1,
                'd': '返回 x 的對數累積分佈函數的反函數值\u3002',
                'a': '返回 x 的對數累積分佈函數的反函數值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'probability',
                        'detail': '與對數分佈相關的概率,介於0與1之間\uFF08不含0與1\uFF09\u3002',
                        'example': '0.4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': 'ln(x) 的平均值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': 'ln(x) 的標準差,正數\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'LOGNORM_DIST',
                't': 1,
                'd': '返回 x 的對數分佈函數\u3002',
                'a': '返回 x 的對數分佈函數\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '用來計算函數的值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': 'ln(x) 的平均值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': 'ln(x) 的標準差,正數\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果為TRUE\uFF08\uFF09,則返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'Z_TEST',
                't': 1,
                'd': '返回 z 檢驗的單尾 P 值\u3002',
                'a': '返回 z 檢驗的單尾 P 值\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '用來檢驗 x 的數組或數據區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'x',
                        'detail': '要測試的值\u3002',
                        'example': 'B2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'sigma',
                        'detail': '[可選] - 總體\uFF08已知\uFF09標準差\u3002如果省略,則使用樣本標準差\u3002',
                        'example': '3',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PROB',
                't': 1,
                'd': '返回區域中的數值落在指定區間內的概率\u3002',
                'a': '返回區域中的數值落在指定區間內的概率\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'x_range',
                        'detail': '具有各自相應概率值的 x 數值區域\u3002',
                        'example': 'A3:A6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'prob_range',
                        'detail': '與 x_range 中的值相關聯的一組概率值\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'lower_limit',
                        'detail': '要計算其概率的數值下界\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'upper_limit',
                        'detail': '[可選 - 預設值為下界] - 要計算其概率的可選數值上界\u3002\n\n如果省略上界,PROB則計算隨機選取相應值的次數恰好等於下界的概率\u3002',
                        'example': '4',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'QUARTILE_EXC',
                't': 1,
                'd': '基於 0 到 1 之間\uFF08不包括 0 和 1\uFF09的百分點值返回數據集的四分位數\u3002',
                'a': '基於 0 到 1 之間\uFF08不包括 0 和 1\uFF09的百分點值返回數據集的四分位數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '要求得四分位數值的數組或數字型儲存格區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'quart',
                        'detail': '要返回第幾個四分位值\u3002\n\n1返回數據中最靠近第一個四分位值的值\uFF0825%標記\uFF09\u3002\n\n2返回數據中最接近中值的值\uFF0850%標記\uFF09\u3002\n\n3返回數據中最接近第三個四分位值的值\uFF0875%標記\uFF09\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'QUARTILE_INC',
                't': 1,
                'd': '根據 0 到 1 之間的百分點值\uFF08包含 0 和 1\uFF09返回數據集的四分位數\u3002',
                'a': '根據 0 到 1 之間的百分點值\uFF08包含 0 和 1\uFF09返回數據集的四分位數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '要求得四分位數值的數組或數字型儲存格區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'quart',
                        'detail': '要返回第幾個四分位值\u3002\n\n0返回數據中的最小值\uFF080%標記\uFF09\u3002\n\n1返回數據中最靠近第一個四分位值的值\uFF0825%標記\uFF09\u3002\n\n2返回數據中最接近中值的值\uFF0850%標記\uFF09\u3002\n\n3返回數據中最接近第三個四分位值的值\uFF0875%標記\uFF09\u3002\n\n4返回數據中的最大值\uFF08100%標記\uFF09\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'POISSON_DIST',
                't': 1,
                'd': '返回泊松分布\u3002',
                'a': '返回泊松分布\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '事件數\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': '期望值\u3002非負數',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '一 邏輯值,確定所返回的概率分佈的形式\u3002\n\n如果為TRUE\uFF08\uFF09,則返回發生的隨機事件數在零\uFF08含零\uFF09和x\uFF08含x\uFF09之間的累積泊松概率\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回發生的事件數正好是x的泊松概率密度函數\u3002',
                        'example': 'FALSE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RSQ',
                't': 1,
                'd': '返回皮爾生(Pearson)乘積矩相關係數r的平方\u3002',
                'a': '返回皮爾生(Pearson)乘積矩相關係數r的平方\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'T_DIST',
                't': 1,
                'd': '返回學生的左尾 t 分佈\u3002',
                'a': '返回學生的左尾 t 分佈\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': 'T-分佈函數的輸入\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom',
                        'detail': '自由度數值\u3002',
                        'example': '30',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'tails',
                        'detail': '决定函數形式的邏輯值\u3002\n\n如果cumulative為TRUE\uFF08\uFF09,則HYPGEOM.DIST返回累積分佈函數\uFF1B\n\n如果為FALSE\uFF08\uFF09,則返回概率密度函數\u3002',
                        'example': 'TRUE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'T_DIST_2T',
                't': 1,
                'd': '返回學生的雙尾 t 分佈\u3002',
                'a': '返回學生的雙尾 t 分佈\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': 'T-分佈函數的輸入\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom',
                        'detail': '自由度數值\u3002',
                        'example': '30',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'T_DIST_RT',
                't': 1,
                'd': '返回學生的右尾 t 分佈\u3002',
                'a': '返回學生的右尾 t 分佈\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': 'T-分佈函數的輸入\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom',
                        'detail': '自由度數值\u3002',
                        'example': '30',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'T_INV',
                't': 1,
                'd': '返回學生的 t 分佈的左尾反函數\u3002',
                'a': '返回學生的 t 分佈的左尾反函數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'probability',
                        'detail': '與學生的 t 分佈相關的概率\u3002\n\n必須大於 0 且小於 1\u3002',
                        'example': '0.35',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'deg_freedom',
                        'detail': '自由度數值\u3002\n\n如果所提供的參數不是整數,將截取其整數部分\u3002\n\n必須大於等於1\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'T_INV_2T',
                't': 1,
                'd': '返回學生 t 分佈的雙尾反函數\u3002',
                'a': '返回學生 t 分佈的雙尾反函數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'probability',
                        'detail': '與學生的t分佈相關的概率\u3002\n\n必須大於 0 且小於 1\u3002',
                        'example': '0.35',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'deg_freedom',
                        'detail': '自由度數值\u3002\n\n如果所提供的參數不是整數,將截取其整數部分\u3002\n\n必須大於等於1\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'T_TEST',
                't': 1,
                'd': '返回與t-檢驗相關的概率\u3002用於判斷兩個樣本是否可能是出自平均值相同的兩個樣本總體\u3002',
                'a': '返回與t-檢驗相關的概率\u3002用於判斷兩個樣本是否可能是出自平均值相同的兩個樣本總體\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'array1',
                        'detail': '將用於t檢驗的第一個數據樣本或第一組儲存格\u3002',
                        'example': 'A1:A4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array2',
                        'detail': '將用於t檢驗的第二個數據樣本或第二組儲存格\u3002',
                        'example': 'B1:B4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'tails',
                        'detail': '指定分佈的尾數\u3002\n\n如果為 1:使用單尾分佈\u3002\n\n如果為 2:使用雙尾分佈\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '指定t檢驗的類型\u3002\n\n如果為 1:執行配對檢驗\u3002\n\n如果為 2:執行雙樣本等方差\uFF08同方差\uFF09檢驗\u3002\n\n如果為 3:執行雙樣本不等方差\uFF08异方差\uFF09檢驗\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'F_DIST',
                't': 1,
                'd': '給定輸入值 x,計算兩個數據集的左尾 F 概率分佈\uFF08差异程度\uFF09\u3002此分佈也稱為 Fisher-Snedecor 分佈或Snedecor F 分佈\u3002',
                'a': '給定輸入值 x',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '用來計算函數的值\u3002',
                        'example': '15.35',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom1',
                        'detail': '分子自由度\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom2',
                        'detail': '分母自由度\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cumulative',
                        'detail': '用於確定函數形式的邏輯值\u3002預設值為 FALSE\u3002\n\n如果為 TRUE\uFF08\uFF09:F.DIST將返回累積分佈函數值\u3002\n\n如果為FALSE\uFF08\uFF09:F.DIST將返回概率密度函數值\u3002',
                        'example': 'TRUE()',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'F_DIST_RT',
                't': 1,
                'd': '給定輸入x,計算兩個數據集的右尾F概率分佈\uFF08差异程度\uFF09\u3002此分佈也稱為Fisher-Snedecor分佈或Snedecor F分佈\u3002',
                'a': '給定輸入 x',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '用來計算函數的值\u3002',
                        'example': '15.35',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom1',
                        'detail': '分子自由度\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'degrees_freedom2',
                        'detail': '分母自由度\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'VAR_P',
                't': 1,
                'd': '基於樣本總體計算方差\u3002',
                'a': '基於樣本總體計算方差\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '數據集中的第一個值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, \u2026',
                        'detail': '[可選] - 數據集中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'VAR_S',
                't': 1,
                'd': '基於樣本計算方差\u3002',
                'a': '基於樣本計算方差\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, \u2026',
                        'detail': '[可選] - 樣本中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'VARA',
                't': 1,
                'd': '基于样本计算方差,将文本取值为0\u3002',
                'a': '基于样本计算方差',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value2, ...',
                        'detail': '[可選] - 樣本中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'VARPA',
                't': 1,
                'd': '基於樣本總體計算方差,將文字取值為0\u3002',
                'a': '基於樣本總體計算方差',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '樣本中的第一項值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他數值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'STEYX',
                't': 1,
                'd': '返回通過線性回歸法預測每個 x 的 y 值時所產生的標準誤差\u3002',
                'a': '返回通過線性回歸法預測每個 x 的 y 值時所產生的標準誤差\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'STANDARDIZE',
                't': 1,
                'd': '給定分佈的平均值和標準差,計算一個隨機變數正態化的相應值\u3002',
                'a': '給定分佈的平均值和標準差,計算一個隨機變數正態化的相應值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'x',
                        'detail': '要正態化的隨機變數值\u3002',
                        'example': '96',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'mean',
                        'detail': '分佈的平均值\u3002',
                        'example': '80',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'standard_dev',
                        'detail': '分佈的標準差\u3002',
                        'example': '6.7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SMALL',
                't': 1,
                'd': '返回數據集中的第k個最小值\u3002',
                'a': '返回數據集中的第k個最小值\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '需要找到第k個最小值的數組或數值數據區域\u3002',
                        'example': 'A2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'k',
                        'detail': '要返回的數據在數組或數據區域裏的位置\uFF08從小到大\uFF09\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SLOPE',
                't': 1,
                'd': '計算通過數據集的線性回歸得到的直線的斜率\u3002',
                'a': '計算通過數據集的線性回歸得到的直線的斜率\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': '數據_y',
                        'detail': '代表因變數數據數組或矩陣的範圍\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '數據_x',
                        'detail': '代表引數數據數組或矩陣的範圍\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SKEW',
                't': 1,
                'd': '返回分佈的偏斜度\u3002偏斜度表明分佈相對於平均值的不對稱程度\u3002正偏斜度表明分佈的不對稱尾部趨向於更多正值\u3002負偏斜度表明分佈的不對稱尾部趨向於更多負值\u3002',
                'a': '返回分佈的偏斜度\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '數據集中的第一個值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'SKEW_P',
                't': 1,
                'd': '返回基於樣本總體的分佈不對稱度:表明分佈相對於平均值的不對稱程度\u3002',
                'a': '返回基於樣本總體的分佈不對稱度:表明分佈相對於平均值的不對稱程度\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': '值1',
                        'detail': '數據集中的第一個值或範圍\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '值2, ...',
                        'detail': '[可選] - 數據集中包含的其他值或範圍\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'VLOOKUP',
                't': 2,
                'd': '縱向查找\u3002在範圍的第一列中自上而下蒐索某個鍵值,並返回所找到的行中指定儲存格的值\u3002',
                'a': '縱向查找\u3002在範圍的第一列中自上而下蒐索某個鍵值',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': '蒐索鍵值',
                        'detail': '要蒐索的值,如 42\u3001"Cats" 或 I24\u3002',
                        'example': '10003',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '範圍',
                        'detail': '要進行蒐索的範圍\u3002VLOOKUP 將在該範圍的第一列中蒐索蒐索鍵值中指定的鍵值\u3002',
                        'example': 'A2:B26',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '索引',
                        'detail': '要返回的值的列索引,範圍中的第一列編號為1\u3002\n\n如果索引不是介於1和範圍中的列數之間,將返回#VALUE\uFF01\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '已排序',
                        'detail': '[預設值為TRUE()] -訓示要蒐索的列\uFF08指定範圍的第一列\uFF09是否已排序\u3002大多數情况下,建議設為FALSE\uFF08\uFF09\u3002\n\n建議將已排序設為FALSE\u3002如果設為FALSE,將返回完全匹配項\u3002如果存在多個匹配值,將返回找到的第一個值對應的儲存格的內容,如果找不到匹配值,則返回#N/A\u3002\n\n如果將已排序設為TRUE或省略,將返回\uFF08小於或等於蒐索鍵值的\uFF09最接近的匹配項\u3002如果蒐索的列中所有的值均大於蒐索鍵值,則返回#N/A\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'HLOOKUP',
                't': 2,
                'd': '橫向查找\u3002在範圍的第一行中蒐索某個鍵值,並返回所找到的列中指定儲存格的值\u3002',
                'a': '橫向查找\u3002在範圍的第一行中蒐索某個鍵值',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': '蒐索鍵值',
                        'detail': '要蒐索的值\u3002例如,42\u3001"Cats"或I24\u3002',
                        'example': '10003',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '範圍',
                        'detail': '要進行蒐索的範圍\u3002將在該範圍的第一行中蒐索在蒐索鍵值中指定的鍵值\u3002',
                        'example': 'A2:Z6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '索引',
                        'detail': '要返回的值的行索引,範圍中的第一行編號為1\u3002\n\n如果索引不是介於1和範圍中的行數之間,將返回#VALUE\uFF01\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '已排序',
                        'detail': '[可選 - 預設值為TRUE()] - 訓示要蒐索的行\uFF08指定範圍的第一行\uFF09是否已排序\u3002\n\n如果將已排序設為TRUE或省略,將返回最接近的匹配值\uFF08小於或等於蒐索鍵值\uFF09\u3002如果在蒐索的行中所有的值均大於蒐索鍵值,則返回#N/A\u3002\n\n如果將已排序設為TRUE或將其省略,而範圍的首行並非處於已排序狀態,則返回值可能會是錯誤的\u3002\n\n如果將已排序設為FALSE,則僅返回完全匹配\u3002如果存在多個匹配值,將返回與找到的第一個值對應的儲存格的內容,如果找不到匹配值則返回#N/A\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LOOKUP',
                't': 2,
                'd': '在行或列中查找相應鍵,並將相應儲存格的值返回到與蒐索行或列所在位置相同的結果範圍中\u3002',
                'a': '在行或列中查找相應鍵',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': '蒐索鍵值',
                        'detail': '要在行或列中蒐索的值\u3002例如,42\u3001"Cats" 或 I24\u3002',
                        'example': '10003',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '搜索範圍 | 搜索結果數組',
                        'detail': '使用LOOKUP的一種方法是給定單行或單列形式的搜索範圍進行蒐索查找,這種管道要用到另一個參數結果範圍\u3002另一種管道是將這兩個參數合併為一個搜索結果數組,其中第一行或第一列用於蒐索,並將返回值放在該數組的最後一行或最後一列中\u3002',
                        'example': 'A1:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '結果範圍',
                        'detail': '[ 可選 ] - 用於存放返回結果的範圍\u3002返回值對應於在搜索範圍中找到蒐索鍵值的位置\u3002此範圍必須僅為單行或單列,而如果您使用的是搜索結果數組管道,則不應提供此參數\u3002',
                        'example': 'B1:B100',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ADDRESS',
                't': 2,
                'd': '返回字串形式的儲存格引用\u3002',
                'a': '返回字串形式的儲存格引用\u3002',
                'm': [
                    2,
                    5
                ],
                'p': [
                    {
                        'name': 'row_num',
                        'detail': '一個數值,指定要在儲存格引用中使用的行號\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'column_num',
                        'detail': '一個數值,指定要在儲存格引用中使用的列號\uFF08而非名稱\uFF09\u3002A列的編號為1\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'abs_num',
                        'detail': '[可選 - 預設值為1] - 一個數值,指定要返回的參考類型\u3002\n\n1表示行列均採用絕對值\uFF08例如$A$1\uFF09\uFF1B\n\n2表示採用絕對行號,相對列標\uFF08例如A$1\uFF09\uFF1B\n\n3表示採用相對行號,絕對列標\uFF08例如$A1\uFF09\uFF1B\n\n4表示行列均採用相對值\uFF08例如A1\uFF09\u3002',
                        'example': '4',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'A1',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個布林值,訓示採用A1標記形式\uFF08TRUE\uFF09還是R1C1標記形式\uFF08FALSE\uFF09\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'sheet_text',
                        'detail': '[可選 - 默認預設] - 用於指定地址所指向的工作表名稱\u3002',
                        'example': '"Sheet2"',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'INDIRECT',
                't': 2,
                'd': '返回以字串指定的儲存格引用\u3002',
                'a': '返回以字串指定的儲存格引用\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'ref_text',
                        'detail': '以帶引號的字串形式提供的儲存格引用\u3002',
                        'example': '"Sheet2!"&B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'A1',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個布林值,訓示採用A1標記形式\uFF08TRUE\uFF09還是R1C1標記形式\uFF08FALSE\uFF09\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ROW',
                't': 2,
                'd': '返回指定儲存格的行號',
                'a': '返回指定儲存格的行號',
                'm': [
                    0,
                    1
                ],
                'p': [{
                        'name': 'reference',
                        'detail': '[可選 - 默認為此公式所在的儲存格] - 要返回其行號的儲存格\u3002\n\n如果儲存格引用指向的範圍其寬度大於一個儲存格,而此公式不是用作數組公式的,這時會僅返回儲存格引用中首行的編號值\u3002',
                        'example': 'A9',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ROWS',
                't': 2,
                'd': '返回指定數組或範圍中的行數\u3002',
                'a': '返回指定數組或範圍中的行數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'array',
                        'detail': '要返回其行數的範圍\u3002',
                        'example': 'A9:A62',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'COLUMN',
                't': 2,
                'd': '按照 `A=1` 的規則返回指定儲存格的列號\u3002',
                'a': '按照 `A=1` 的規則返回指定儲存格的列號\u3002',
                'm': [
                    0,
                    1
                ],
                'p': [{
                        'name': 'reference',
                        'detail': '[可選 - 默認為包含此公式的儲存格] - 要返回其列號的儲存格\u3002A列對應的編號為1\u3002\n\n如果儲存格引用是寬度超過一個儲存格的範圍,而此公式不是作為數組公式來使用的,囙此將返回儲存格引用中的第一列的位置\u3002',
                        'example': 'A9',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'COLUMNS',
                't': 2,
                'd': '返回指定數組或範圍中的列數\u3002',
                'a': '返回指定數組或範圍中的列數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'array',
                        'detail': '要返回其列數的範圍\u3002',
                        'example': 'A9:W62',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'OFFSET',
                't': 2,
                'd': '給定某範圍的起始儲存格引用以及該範圍涵蓋的行列數量,返回該範圍的引用\u3002',
                'a': '給定某範圍的起始儲存格引用以及該範圍涵蓋的行列數量,返回該範圍的引用\u3002',
                'm': [
                    3,
                    5
                ],
                'p': [
                    {
                        'name': 'reference',
                        'detail': '用於計算行列偏移量的起點\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'rows',
                        'detail': '要偏移的行數\u3002\n\n行偏移量必須是整數,但也可以是負數\u3002如果提供的參數帶有小數,小數部分將被截去\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cols',
                        'detail': '要偏移的列數\u3002\n\n列偏移量必須是整數,但也可以是負數\u3002如果提供的參數帶有小數,小數部分將被截去\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'height',
                        'detail': '[可選] - 要從偏移目標開始返回的範圍的高度\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'width',
                        'detail': '[可選] - 要從偏移目標開始返回的範圍的寬度\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MATCH',
                't': 2,
                'd': '在儲存格中蒐索指定項,然後返回該項在儲存格區域中的相對位置\u3002',
                'a': '在儲存格中蒐索指定項,然後返回該項在儲存格區域中的相對位置\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'lookup_value',
                        'detail': '要在 lookup_array 中匹配的值\u3002',
                        'example': '"Sunday"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'lookup_array',
                        'detail': '要蒐索的儲存格區域\u3002\n\n如果所用的範圍的高度和寬度均大於1,MATCH將返回#N/A\uFF01\u3002',
                        'example': 'A2:A9',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'match_type',
                        'detail': '[可選 - 預設值為1] - 要採用的蒐索管道\u3002\n\n1為默認類型,此時MATCH會假設範圍已按昇冪排序,並返回小於等於蒐索鍵值的最大值\u3002\n\n0表示完全匹配,在範圍未排序的情况下需要使用此管道\u3002\n\n-1讓MATCH假設範圍是按降序排序的,並返回大於等於蒐索鍵值的最小值\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'INDEX',
                't': 2,
                'd': '返回表格或中的元素值,此元素由行號和列號的索引值給定\u3002',
                'a': '返回表格或中的元素值,此元素由行號和列號的索引值給定\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '儲存格區域或數組常數\u3002',
                        'example': 'A1:C20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'row_num',
                        'detail': '選擇數組中的某行,函數從該行返回數值\u3002',
                        'example': '5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'column_num',
                        'detail': '選擇數組中的某列,函數從該列返回數值\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'GETPIVOTDATA',
                't': 2,
                'd': '從與指定行和列標題對應的數據透視錶中選取匯總值\u3002',
                'a': '從與指定行和列標題對應的數據透視錶中選取匯總值\u3002',
                'm': [
                    2,
                    254
                ],
                'p': [
                    {
                        'name': 'data_field',
                        'detail': '您想從數據透視錶中獲取其數據的值名稱\u3002\n值名稱必須括在引號中或是指向包含相關文字的任何儲存格的引用\u3002\n如果有多個值欄位,則必須使用數據透視錶中顯示的確切名稱\uFF08如"銷售總額"\uFF09\u3002',
                        'example': '"SUM of number of units"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'pivot_table',
                        'detail': '目標數據透視錶中的任何儲存格的引用\uFF08推薦位於頂角的儲存格\uFF09\u3002',
                        'example': "'Pivot table'!A1",
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'field1',
                        'detail': '[可選] - 源數據集\uFF08不是數據透視錶\uFF09中列的名稱\u3002',
                        'example': '"division"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'item1',
                        'detail': '[可選] - 數據透視錶中顯示的與您要檢索的欄位名稱1相對應的行或列的名稱\u3002',
                        'example': '"east"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'CHOOSE',
                't': 2,
                'd': '基於索引返回選項清單中的元素\u3002',
                'a': '基於索引返回選項清單中的元素\u3002',
                'm': [
                    2,
                    255
                ],
                'p': [
                    {
                        'name': 'index_num',
                        'detail': '指定要返回哪一項\u3002\n\n如果索引為零\u3001負值或大於提供的選擇數量,將返回#VALUE\uFF01錯誤\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value1',
                        'detail': '一項可能的返回值\u3002必須提供\u3002可以是儲存格引用或單獨的值\u3002',
                        'example': '"A"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '[可選] - 其他可以選擇的值\u3002選擇',
                        'example': '"B"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'HYPERLINK',
                't': 2,
                'd': '在儲存格內創建一個超連結\u3002',
                'a': '在儲存格內創建一個超連結\u3002',
                'p': [
                    {
                        'name': '網址',
                        'detail': '以引號括住的連結位置的完整網址,或對包含這種網址的儲存格的引用\u3002\n\n僅允許某些連結類型\u3002其中包括:http://\u3001https://\u3001mailto:\u3001aim:\u3001ftp://\u3001gopher://\u3001telnet://和news://,明確禁用使用其他協定\u3002如果指定的是其他協定,將會在儲存格中顯示連結標籤,但該標籤不會以連結形式呈現\u3002\n\n如果未指定協定,則假設使用http://,並將其作為網址的首碼\u3002',
                        'example': '"http://www.google.com/"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '連結標籤',
                        'detail': '[可選-默認為網址] - 要在儲存格中作為連結顯示的文字\uFF08用引號括起來的\uFF09,或者指向包含這種標籤的儲存格的引用\u3002\n\n如果連結標籤是指向某個空儲存格的引用,如果網址有效,就將其作為連結顯示,否則作為純文字顯示\u3002\n\n如果連結標籤為空字串常數\uFF08""\uFF09,所在儲存格顯示的內容將為空白,但通過點擊該儲存格或轉入該儲存格仍然可以訪問連結\u3002',
                        'example': '"Google"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'TIME',
                't': 6,
                'd': '將給定的小時\u3001分鐘和秒轉換為時間\u3002',
                'a': '將給定的小時\u3001分鐘和秒轉換為時間\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': '小時',
                        'detail': '0\uFF08零\uFF09到 32767 之間的數位,代表小時\u3002\n\n任何大於 23 的值都會除以24,餘數將作為小時值\u3002',
                        'example': '11',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '分鐘',
                        'detail': '0\uFF08零\uFF09到 32767 之間的數位,代表分鐘\u3002\n\n任何大於 59 的值將轉換為小時和分鐘\u3002',
                        'example': '40',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '秒',
                        'detail': '0\uFF08零\uFF09到 32767 之間的數位,代表秒\u3002\n\n任何大於 59 的值將轉換為小時\u3001分鐘和秒\u3002',
                        'example': '59',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TIMEVALUE',
                't': 6,
                'd': '按一天24小時返回該時間的分數表示\u3002',
                'a': '按一天24小時返回該時間的分數表示\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'time_text',
                        'detail': '用於表示時間的字串\u3002',
                        'example': '"2:15 PM"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'EOMONTH',
                't': 6,
                'd': '返回某個月份最後一天的序號,該月份在另一個日期之前或之後的數個月\uFF08月數由參數指定\uFF09\u3002',
                'a': '返回某個月份最後一天的序號',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '用於計算結果的參照日期\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'months',
                        'detail': '用於計算的起始日期之前\uFF08負\uFF09或之後\uFF08正\uFF09的月數\u3002返回的是計算所得月份的最後那天\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'EDATE',
                't': 6,
                'd': '返回表示某個日期的序號,該日期在另一個日期的數月之前/之後\u3002',
                'a': '返回表示某個日期的序號',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '用於計算結果的參照日期\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'months',
                        'detail': '用於計算的起始日期之前\uFF08負\uFF09或之後\uFF08正\uFF09的月數\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SECOND',
                't': 6,
                'd': '返回時間值的秒數\u3002秒數是0\uFF08零\uFF09到59範圍內的整數\u3002',
                'a': '返回時間值的秒數\u3002秒數是0\uFF08零\uFF09到59範圍內的整數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '時間',
                        'detail': '用於計算秒鐘部分的時間\u3002必須為以下值之一:指向包含日期/時間值的儲存格的引用\u3001返回日期/時間的函數或者數位\u3002',
                        'example': 'TIME(11',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'MINUTE',
                't': 6,
                'd': '以數位格式返回特定時間的分鐘部分\u3002',
                'a': '以數位格式返回特定時間的分鐘部分\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '時間',
                        'detail': '用於計算分鐘部分的時間\u3002必須為以下值之一:指向包含日期/時間值的儲存格的引用\u3001返回日期/時間的函數或者數位\u3002',
                        'example': 'TIME(11',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'HOUR',
                't': 6,
                'd': '以數位格式返回特定時間的小時部分\u3002',
                'a': '以數位格式返回特定時間的小時部分\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '時間',
                        'detail': '用於計算小時部分的時間\u3002必須為以下值之一:指向包含日期/時間值的儲存格的引用\u3001返回日期/時間的函數或者數位\u3002',
                        'example': 'TIME(11',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'NOW',
                't': 6,
                'd': '以日期值格式返回當前日期和時間\u3002',
                'a': '以日期值格式返回當前日期和時間\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'NETWORKDAYS',
                't': 6,
                'd': '返回所提供的兩個日期之間的淨工作日天數\u3002',
                'a': '返回所提供的兩個日期之間的淨工作日天數\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '用於計算淨工作日天數的時間段開始日期\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'end_date',
                        'detail': '用於計算淨工作日天數的時間段結束日期\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'holidays',
                        'detail': '[可選] - 一個範圍或數組常數,其中包含作為節假日的日期序號\u3002\n\n在節假日數組中提供的值必須是日期序號值\uFF08例如由N所返回的值\uFF09或日期值\uFF08例如由DATE\u3001DATEVALUE或TO_DATE返回的值\uFF09\u3002由範圍指定的值應該是標準的日期值或日期序數值\u3002',
                        'example': '16)',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'NETWORKDAYS_INTL',
                't': 6,
                'd': '返回給定的兩個日期之間的淨工作日天數\uFF08排除指定的週末和節假日\uFF09\u3002',
                'a': '返回給定的兩個日期之間的淨工作日天數\uFF08排除指定的週末和節假日\uFF09\u3002',
                'm': [
                    2,
                    4
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '用於計算淨工作日天數的時間段開始日期\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'end_date',
                        'detail': '用於計算淨工作日天數的時間段結束日期\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'weekend',
                        'detail': '[可選-預設值為1] - 用於表示哪些天為週末的數位或字串\u3002\n字串管道:可以使用由0和1組成的字串來指定週末,串中的第一個數位字元代表週一,最後一個則代表周日\u3002零表示這一天是工作日,1 表示這一天為週末\u3002例如,"0000011"表示將週六和周日作為週末\u3002\n數位管道:這種管道不使用上述字串形式,而是使用一個數位\u30021 =週六/周日為週末,2 =周日/週一為週末,依此類推則7 =週五/週六\u300211 =周日為唯一週末,12 =週一為唯一週末,依此類推則17 =週六為唯一週末\u3002',
                        'example': '16)',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'holidays',
                        'detail': '[可選] - 這是一個範圍或數組常數,其中包含作為節假日的日期\u3002\n在節假日數組內提供的值必須為日期序數值\uFF08例如N的返回值\uFF09或日期值\uFF08例如DATE\u3001DATEVALUE或TO_DATE的返回值\uFF09\u3002由範圍指定的值應該是標準的日期值或日期序數值\u3002',
                        'example': 'DATE(1969',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ISOWEEKNUM',
                't': 6,
                'd': '返回給定日期在全年中的 ISO 周數\u3002',
                'a': '返回給定日期在全年中的 ISO 周數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'date',
                        'detail': '用於日期和時間計算的日期-時間程式碼\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'WEEKNUM',
                't': 6,
                'd': '返回特定日期的周數\u3002',
                'a': '返回特定日期的周數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'serial_number',
                        'detail': '要確定其位於第幾周的日期,必須是對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'return_type',
                        'detail': '[可選-預設值為1 ] - 代表一周起始日的數位,系統也使用該數位來確定一年的第一周\uFF081=周日,2=週一\uFF09\u3002',
                        'example': '7',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'WEEKDAY',
                't': 6,
                'd': '返回一個數位,對應於給定日期所在的星期幾\u3002',
                'a': '返回一個數位,對應於給定日期所在的星期幾\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'serial_number',
                        'detail': '要為其確定星期幾的日期\u3002必須是對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'return_type',
                        'detail': '[可選-預設值為1] -以數位訓示使用哪種編號順序來表示星期幾\u3002默認情况下,按星期日\uFF08= 1\uFF09開始計算\u3002\n\n如果類型為1,則星期值將從星期日開始算起,並且星期日的值為1,囙此星期六的值就是7\u3002\n\n如果類型為2,則星期值將從星期一開始算起,並且星期一的值為1,囙此星期日的值就是7\u3002\n\n如果類型為3,則星期值將從星期一算起,並且星期一的值為0,囙此星期日的值就是6\u3002',
                        'example': '7',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DAY',
                't': 6,
                'd': '以數位格式返回特定日期所在的當月幾號\u3002',
                'a': '以數位格式返回特定日期所在的當月幾號\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'serial_number',
                        'detail': '要從中選取具體幾號的日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'DAYS',
                't': 6,
                'd': '返回兩個日期之間的天數\u3002',
                'a': '返回兩個日期之間的天數\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'end_date',
                        'detail': '計算中要使用的結束日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': '2011-3-15',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_date',
                        'detail': '計算中要使用的開始日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': '2011-2-1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'DAYS360',
                't': 6,
                'd': '按照每年360天,返回兩個日期之間的差\uFF08用於計算利息\uFF09\u3002',
                'a': '按照每年360天,返回兩個日期之間的差\uFF08用於計算利息\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '計算中要使用的開始日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'end_date',
                        'detail': '計算中要使用的結束日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'method',
                        'detail': '[可選 - 默認為FALSE\uFF08\uFF09] - 訓示要使用哪種天數計算方法\u3002\n\nFALSE -採用美國\uFF08NASD\uFF09方法時,如果起始日期為某月的最後一天,為便於計算,會將起始日期的當月幾號更改為30\u3002此外,如果結束日期是所在月份的最後一天,而且起始日期在其所在月的30號之前,則將結束日期更改為結束日期之後那個月的第一天,否則將結束日期更改為該月的30號\u3002\n\nTRUE -採用歐洲方法時,會將所有日期在31號的起始日期或結束日期更改為當月的30號\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'DATE',
                't': 6,
                'd': '將提供的年\u3001月\u3001日轉換為日期\u3002',
                'a': '將提供的年\u3001月\u3001日轉換為日期\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'year',
                        'detail': '日期的年份部分,包含一到四位數位\u3002\n\n介於0\uFF08零\uFF09到 1899 之間,會將該值與 1900 相加來計算年份\uFF1B\n\n介於 1900 到 9999 之間,將使用該數值作為年份\uFF1B\n\n小於0或大於等於 10000,返回錯誤值#NUM\uFF01\u3002',
                        'example': '1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'month',
                        'detail': '日期的月份部分,一個正整數或負整數\u3002\n\n如果 month 大於 12,則 month 會將該月份數與指定年中的第一個月相加\u3002\n\n如果 month 小於 1,month 則從指定年份的一月份開始遞減該月份數,然後再加上 1 個月\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'day',
                        'detail': '日期的日部分,一個正整數或負整數\u3002\n\n如果 day 大於月中指定的天數,則 day 會將天數與該月中的第一天相加\u3002\n\n如果 day 小於1,則 day 從指定月份的第一天開始遞減該天數,然後再加上 1 天\u3002',
                        'example': '20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DATEVALUE',
                't': 6,
                'd': '將提供的日期字串轉換為日期的序號\u3002',
                'a': '將提供的日期字串轉換為日期的序號\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'date_text',
                        'detail': '表示日期的字串\u3002',
                        'example': '"1969-7-20"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'DATEDIF',
                't': 6,
                'd': '計算兩個日期之間的天數\u3001月數或年數\u3002',
                'a': '計算兩個日期之間的天數\u3001月數或年數\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': '起始日期',
                        'detail': '計算中要使用的開始日期\u3002必須是對包含DATE值的儲存格的引用\u3001返回DATE類型的函數或數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '結束日期',
                        'detail': '計算中要使用的結束日期\u3002必須是對包含DATE值的儲存格的引用\u3001返回DATE類型的函數或數位\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '組織',
                        'detail': '時間組織的縮寫文字\u3002例如"M"代表月\u3002有效值包括:"Y"\u3001"M"\u3001"D"\u3001"MD"\u3001"YM"和"YD"\u3002\n\n"Y":返回起始日期和結束日期之間的整年數\u3002\n\n"M":返回起始日期和結束日期之間的整月數\u3002\n\n"D":返回起始日期和結束日期之間的天數\u3002\n\n"MD":返回起始日期和結束日期之間的天數\uFF08不計整月數\uFF09\u3002\n\n"YM":返回起始日期和結束日期之間的整月數\uFF08不計整年數\uFF09\u3002\n\n"YD":返回起始日期和結束日期之間的天數\uFF08假設起始日期和結束日期的間隔不超過一年\uFF09\u3002',
                        'example': '16)',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'WORKDAY',
                't': 6,
                'd': '指定工作日天數,計算結束日期\u3002',
                'a': '指定工作日天數,計算結束日期\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '計算的開始日期\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'days',
                        'detail': 'start_date之前或之後不含週末及節假日的天數\u3002\n\n為正值將生成未來日期\uFF1B\n\n為負值生成過去日期\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'holidays',
                        'detail': '[可選] - 一個範圍或數組常數,其中包含作為節假日的日期序號\u3002\n\n在節假日數組中提供的值必須是日期序號值\uFF08例如由N所返回的值\uFF09或日期值\uFF08例如由DATE\u3001DATEVALUE或TO_DATE返回的值\uFF09\u3002由範圍指定的值應該是標準的日期值或日期序數值\u3002',
                        'example': '16)',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'WORKDAY_INTL',
                't': 6,
                'd': '返回指定的若干個工作日之前或之後的日期的序號\uFF08使用自定義週末參數\uFF09\u3002 ',
                'a': '返回指定的若干個工作日之前或之後的日期的序號\uFF08使用自定義週末參數\uFF09\u3002 ',
                'm': [
                    2,
                    4
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '開始日期\uFF08將被截尾取整\uFF09\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'days',
                        'detail': 'start_date之前或之後的工作日的天數\u3002\n\n正值表示未來日期\uFF1B\n\n負值表示過去日期\uFF1B\n\n零值表示開始日期\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'weekend',
                        'detail': '[可選 - 預設值為1] - 用於表示哪些天為週末的數位或字串\u3002\n字串管道:可以使用由0和1組成的字串來指定週末,串中的第一個數位字元代表週一,最後一個則代表周日\u3002零表示這一天是工作日,1表示這一天為週末\u3002例如,"0000011"表示將週六和周日作為週末\u3002\n數位管道:這種管道不使用上述字串形式,而是使用一個數位\u30021 =週六/周日為週末,2 =周日/週一為週末,依此類推則7 =週五/週六\u300211 =周日為唯一週末,12 =週一為唯一週末,依此類推則17 =週六為唯一週末\u3002',
                        'example': '16)',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'holidays',
                        'detail': '[可選] - 這是一個範圍或數組常數,其中包含作為節假日的日期\u3002\n在節假日數組內提供的值必須為日期序數值\uFF08例如N的返回值\uFF09或日期值\uFF08例如DATE\u3001DATEVALUE或TO_DATE的返回值\uFF09\u3002由範圍指定的值應該是標準的日期值或日期序數值\u3002',
                        'example': 'DATE(1969',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'YEAR',
                't': 6,
                'd': '返回對應於某個日期的年份\u3002Year作為 1900 - 9999 之間的整數返回\u3002',
                'a': '返回對應於某個日期的年份\u3002Year作為 1900 - 9999 之間的整數返回\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'serial_number',
                        'detail': '用於計算年份的日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'YEARFRAC',
                't': 6,
                'd': '返回 start_date 和 end_date 之間的天數占全年天數的百分比\u3002',
                'a': '返回 start_date 和 end_date 之間的天數占全年天數的百分比\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'start_date',
                        'detail': '計算中要使用的開始日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'end_date',
                        'detail': '計算中要使用的結束日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': '7',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 要使用的日計數基準類型\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '16)',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TODAY',
                't': 6,
                'd': '以日期值格式返回當前日期\u3002',
                'a': '以日期值格式返回當前日期\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'MONTH',
                't': 6,
                'd': '返回日期\uFF08以序列數表示\uFF09中的月份\u3002月份是介於1\uFF08一月\uFF09到12\uFF08十二月\uFF09之間的整數\u3002',
                'a': '返回日期\uFF08以序列數表示\uFF09中的月份\u3002月份是介於1\uFF08一月\uFF09到12\uFF08十二月\uFF09之間的整數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'serial_number',
                        'detail': '要從中選取月份的日期\u3002必須是以下一種:對包含日期的儲存格的引用\u3001返回日期類型的函數或者數位\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'EFFECT',
                't': 8,
                'd': '根據名義利率及每年的複利計息期數來計算實際年利率\u3002',
                'a': '根據名義利率及每年的複利計息期數來計算實際年利率\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'nominal_rate',
                        'detail': '每年的名義利率\u3002',
                        'example': '0.99',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'npery',
                        'detail': '每年的複利計算期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DOLLAR',
                't': 12,
                'd': '將數位格式設定為與語言區域相對應的貨幣格式\u3002',
                'a': '將數位格式設定為與語言區域相對應的貨幣格式\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要設定格式的值\u3002',
                        'example': '1.2351',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'decimals',
                        'detail': '[可選 - 預設值為2] - 要顯示的小數位數\u3002\n\n如果這是負數,則將數位四捨五入到小數點左側\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DOLLARDE',
                't': 8,
                'd': '將以整數部分和分數部分轉換為以小數部分表示的金額數位',
                'a': '將以整數部分和分數部分轉換為以小數部分表示的金額數位',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'fractional_dollar',
                        'detail': '以整數部份和分數部分表示的數位,用小數點隔開\u3002',
                        'example': '100.10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fraction',
                        'detail': '用作分數中的分母的整數\u3002',
                        'example': '32',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DOLLARFR',
                't': 8,
                'd': '將小數轉換為分數表示的金額數位\u3002',
                'a': '將小數轉換為分數表示的金額數位\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'decimal_dollar',
                        'detail': '小數\u3002',
                        'example': '100.125',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fraction',
                        'detail': '用作分數中的分母的整數\u3002',
                        'example': '32',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DB',
                't': 8,
                'd': '使用固定餘額遞減法,返回指定期間內某項固定資產的折舊值\u3002',
                'a': '使用固定餘額遞減法,返回指定期間內某項固定資產的折舊值\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'cost',
                        'detail': '資產原值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'salvage',
                        'detail': '折舊末尾時的值\uFF08有時也稱為資產殘值\uFF09\u3002',
                        'example': '50',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'life',
                        'detail': '資產的折舊期數\uFF08有時也稱作資產的使用壽命\uFF09\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'period',
                        'detail': '在使用期限內要計算折舊的折舊期\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'month',
                        'detail': '[可選 - 預設值為12] - 折舊第一年中的月數\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DDB',
                't': 8,
                'd': '用雙倍餘額遞減法,返回指定期間內某項固定資產的折舊值\u3002',
                'a': '用雙倍餘額遞減法,返回指定期間內某項固定資產的折舊值\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'cost',
                        'detail': '资产原值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'salvage',
                        'detail': '折舊末尾時的值\uFF08有時也稱為資產殘值\uFF09\u3002',
                        'example': '50',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'life',
                        'detail': '資產的折舊期數\uFF08有時也稱作資產的使用壽命\uFF09\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'period',
                        'detail': '在使用期限內要計算折舊的折舊期\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'factor',
                        'detail': '[可選 - 預設值為2] - 折舊的遞減係數\u3002',
                        'example': '2.25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'RATE',
                't': 8,
                'd': '返回年金每期的利率\u3002',
                'a': '返回年金每期的利率\u3002',
                'm': [
                    3,
                    6
                ],
                'p': [
                    {
                        'name': 'nper',
                        'detail': '年金的付款總期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pmt',
                        'detail': '每期的付款金額,在年金週期內不能更改\u3002',
                        'example': '-100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值即一系列未來付款當前值的總和\u3002',
                        'example': '400',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選 - 預設值為0] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'guess',
                        'detail': '[可選 - 預設值為0.1] - 預期利率\u3002',
                        'example': '0.1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'CUMPRINC',
                't': 8,
                'd': '基於等額分期付款和固定利率,計算投資在多個付款期內的累計本金償還額\u3002',
                'a': '基於等額分期付款和固定利率,計算投資在多個付款期內的累計本金償還額\u3002',
                'm': [
                    6,
                    6
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '利率\u3002',
                        'example': '0.12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '總付款期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '年金的現值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'start_period',
                        'detail': '開始累計計算的付款期序號\u3002\n\n首期必須大於等於1\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'end_period',
                        'detail': '結束累計計算的付款期序號\u3002\n\n末期必須大於首期\u3002',
                        'example': '5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPNUM',
                't': 8,
                'd': '返回在結算日和到期日之間的付息次數\uFF0C向上舍入到最近的整數',
                'a': '返回在結算日和到期日之間的付息次數\uFF0C向上舍入到最近的整數',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': '02',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SYD',
                't': 8,
                'd': '返回在指定期間內資產按年限總和折舊法計算的折舊\u3002',
                'a': '返回在指定期間內資產按年限總和折舊法計算的折舊\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'cost',
                        'detail': '資產原值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'salvage',
                        'detail': '折舊末尾時的值\uFF08有時也稱為資產殘值\uFF09\u3002',
                        'example': '50',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'life',
                        'detail': '資產的折舊期數\uFF08有時也稱作資產的使用壽命\uFF09\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'period',
                        'detail': '在使用期限內要計算折舊的折舊期\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TBILLEQ',
                't': 8,
                'd': '基於貼現率計算美國政府短期債券的等效年化收益率\u3002',
                'a': '基於貼現率計算美國政府短期債券的等效年化收益率\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '債券的結算日期,此日期為債券發行後交付給買家的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '債券的到期或結束日期,届時可將其以面值或票面價值贖回\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'discount',
                        'detail': '債券購買時的貼現率\u3002',
                        'example': '2)',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TBILLYIELD',
                't': 8,
                'd': '基於價格計算美國政府短期債券的收益率\u3002',
                'a': '基於價格計算美國政府短期債券的收益率\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '債券的結算日期,此日期為債券發行後交付給買家的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '債券的到期或結束日期,届時可將其以面值或票面價值贖回\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'pr',
                        'detail': '債券的購買價格\u3002',
                        'example': '95',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TBILLPRICE',
                't': 8,
                'd': '基於貼現率計算美國政府短期債券的價格\u3002',
                'a': '基於貼現率計算美國政府短期債券的價格\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '債券的結算日期,此日期為債券發行後交付給買家的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '債券的到期或結束日期,届時可將其以面值或票面價值贖回\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'discount',
                        'detail': '債券購買時的貼現率\u3002',
                        'example': '0.09',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PV',
                't': 8,
                'd': '基於等額分期付款和固定利率,計算年金投資的現值\u3002',
                'a': '基於等額分期付款和固定利率,計算年金投資的現值\u3002',
                'm': [
                    3,
                    5
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '各期利率\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '年金的付款總期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pmt',
                        'detail': '每期的付款金額,在年金週期內不能更改\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': 'D2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ACCRINT',
                't': 8,
                'd': '返回定期付息證券的應計利息\u3002',
                'a': '返回定期付息證券的應計利息\u3002',
                'm': [
                    6,
                    8
                ],
                'p': [
                    {
                        'name': 'issue',
                        'detail': '有價證券的發行日\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'first_interest',
                        'detail': '有價證券的首次計息日\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'rate',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'par',
                        'detail': '證券的票面值\u3002',
                        'example': '10000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示""歐洲30/360"方法"-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'calc_method',
                        'detail': '[可選 - 默認為TRUE\uFF08\uFF09] - 一個邏輯值,指定當結算日期晚於首次計息日期時用於計算總應計利息的方法\u3002\n\n如果值為TRUE,則返回從發行日到結算日的總應計利息\u3002\n\n如果值為FALSE,則返回從首次計息日到結算日的應計利息\u3002',
                        'example': 'TRUE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ACCRINTM',
                't': 8,
                'd': '返回在到期日支付利息的有價證券的應計利息\u3002',
                'a': '返回在到期日支付利息的有價證券的應計利息\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'issue',
                        'detail': '有價證券的發行日\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'settlement',
                        'detail': '有價證券的到期日\u3002',
                        'example': 'DATE(1969',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'rate',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'par',
                        'detail': '證券的票面值\u3002',
                        'example': '1000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPDAYBS',
                't': 8,
                'd': '返回從付息期開始到結算日的天數\u3002',
                'a': '返回從付息期開始到結算日的天數\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPDAYS',
                't': 8,
                'd': '返回結算日所在的付息期的天數\u3002',
                'a': '返回結算日所在的付息期的天數\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] -訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPDAYSNC',
                't': 8,
                'd': '返回從結算日到下一票息支付日之間的天數\u3002',
                'a': '返回從結算日到下一票息支付日之間的天數\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法  - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPNCD',
                't': 8,
                'd': '計算結算日之後的下一票息或利息派發日期\u3002',
                'a': '計算結算日之後的下一票息或利息派發日期\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '01)',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': 'DATE(2019',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COUPPCD',
                't': 8,
                'd': '計算結算日之前的最後一個票息或利息支付日\u3002',
                'a': '計算結算日之前的最後一個票息或利息支付日\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4 \u3002',
                        'example': '01)',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': 'DATE(2019',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'FV',
                't': 8,
                'd': '基於等額分期付款和固定利率,計算年金投資的未來價值\u3002',
                'a': '基於等額分期付款和固定利率,計算年金投資的未來價值\u3002',
                'm': [
                    3,
                    5
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '各期利率\u3002',
                        'example': '0.12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '年金的付款總期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pmt',
                        'detail': '各期所應支付的金額,在整個年金期間保持不變\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '[可選 - 預設值為0 ] - 現值,或一系列未來付款的當前值的累積和\u3002',
                        'example': '400',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0 ] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'FVSCHEDULE',
                't': 8,
                'd': '返回應用一系列複利率計算的初始本金的未來值\u3002',
                'a': '返回應用一系列複利率計算的初始本金的未來值\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'principal',
                        'detail': '現值\u3002',
                        'example': '10000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'schedule',
                        'detail': '用於計算本金複利的一組利率\u3002\n\n利率錶必須是範圍或數組,其中包含要用於計算複利的一組利率\u3002這些利率值應該以十進位小數形式表示,或者使用UNARY_PERCENT以百分比形式表示,即表示為0.09或UNARY_PERCENT\uFF089\uFF09,而不要表示為9\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'YIELD',
                't': 8,
                'd': '返回定期支付利息的債券的收益率\u3002',
                'a': '返回定期支付利息的債券的收益率\u3002',
                'm': [
                    6,
                    7
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'rate',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.057',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pr',
                        'detail': '有價證券的價格\u3002',
                        'example': '95',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '有價證券的清償價值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法 - 此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'YIELDDISC',
                't': 8,
                'd': '基於價格計算折價發行的\uFF08不帶息\uFF09債券的年收益率\u3002',
                'a': '基於價格計算折價發行的\uFF08不帶息\uFF09債券的年收益率\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'pr',
                        'detail': '有價證券的價格\u3002',
                        'example': '95',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '有價證券的清償價值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法 - 此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'NOMINAL',
                't': 8,
                'd': '基於給定的實際利率和年複利期數,返回名義年利率\u3002',
                'a': '基於給定的實際利率和年複利期數,返回名義年利率\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'effect_rate',
                        'detail': '每年的實際利率\u3002',
                        'example': '0.85',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'npery',
                        'detail': '每年的複利期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'XIRR',
                't': 8,
                'd': '返回一組不一定定期發生的現金流的內部收益率\u3002',
                'a': '返回一組不一定定期發生的現金流的內部收益率\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'values',
                        'detail': '其中含有投資相關收益或支出的數組或範圍\u3002\n\n現金流數額中必須至少包含一項負的和一項正的現金流金額才能計算回報率\u3002',
                        'example': 'B2:B25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'dates',
                        'detail': '與現金流數額參數中的現金流對應的日期數組或範圍\u3002',
                        'example': 'C2:C25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'guess',
                        'detail': '[可選 - 預設值為0.1] - 對內部回報率的估算值\u3002',
                        'example': '250',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MIRR',
                't': 8,
                'd': '返回一系列定期現金流的修改後內部收益率\u3002',
                'a': '返回一系列定期現金流的修改後內部收益率\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'values',
                        'detail': '其中含有投資相關收益或支出的數組或範圍\u3002\n\n現金流數額中必須至少包含一項負的和一項正的現金流金額才能計算回報率\u3002',
                        'example': 'A2:A25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'finance_rate',
                        'detail': '現金流中使用的資金支付的利率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'reinvest_rate',
                        'detail': '將現金流再投資的收益率\u3002',
                        'example': '0.12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'IRR',
                't': 8,
                'd': '返回由值中的數位表示的一系列現金流的內部收益率\u3002 ',
                'a': '返回由值中的數位表示的一系列現金流的內部收益率\u3002 ',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'values',
                        'detail': '其中含有投資相關收益或支出的數組或範圍\u3002\n\n現金流數額中必須至少包含一項負的和一項正的現金流金額才能計算回報率\u3002',
                        'example': 'A2:A25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'guess',
                        'detail': '[可選 - 默認為0.1] - 內部收益率的估值\u3002',
                        'example': '200',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'NPV',
                't': 8,
                'd': '使用貼現率和一系列未來支出\uFF08負值\uFF09和收益\uFF08正值\uFF09來計算一項投資的淨現值\u3002',
                'a': '使用貼現率和一系列未來支出\uFF08負值\uFF09和收益\uFF08正值\uFF09來計算一項投資的淨現值\u3002',
                'm': [
                    2,
                    255
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '某一期間的貼現率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value1',
                        'detail': '第一筆支出\uFF08負值\uFF09和收益\uFF08正值\uFF09\u3002',
                        'example': '200',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2, ...',
                        'detail': '[可選] - 其他支出\uFF08負值\uFF09和收益\uFF08正值\uFF09\u3002',
                        'example': '250',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'XNPV',
                't': 8,
                'd': '返回一組現金流的淨現值,這些現金流不一定定期發生\u3002',
                'a': '返回一組現金流的淨現值,這些現金流不一定定期發生\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '應用於現金流的貼現率\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'values',
                        'detail': '與dates中的支付時間相對應的一系列現金流\u3002',
                        'example': 'B2:B25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'dates',
                        'detail': '與現金流支付相對應的支付日期錶\u3002',
                        'example': 'C2:C25',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'CUMIPMT',
                't': 8,
                'd': '基於等額分期付款和固定利率,計算投資在一系列付款期內的累計利息\u3002',
                'a': '基於等額分期付款和固定利率,計算投資在一系列付款期內的累計利息\u3002',
                'm': [
                    6,
                    6
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '利息率\u3002',
                        'example': '0.12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '總付款期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'start_period',
                        'detail': '開始累計計算的付款期序號\u3002\n\n首期必須大於等於1\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'end_period',
                        'detail': '結束累計計算的付款期序號\u3002\n\n末期必須大於首期\u3002',
                        'example': '5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '0',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PMT',
                't': 8,
                'd': '用於根據固定付款額和固定利率計算貸款的付款額\u3002',
                'a': '用於根據固定付款額和固定利率計算貸款的付款額\u3002',
                'm': [
                    3,
                    5
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '貸款利率\u3002',
                        'example': '0.08',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '該項貸款的付款總數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值,或一系列未來付款額現在所值的總額,也叫本金\u3002',
                        'example': ' 100000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選 - 預設值為0] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': 'D2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'IPMT',
                't': 8,
                'd': '基於固定利率及等額分期付款管道,返回給定期數內對投資的利息償還額\u3002',
                'a': '基於固定利率及等額分期付款管道,返回給定期數內對投資的利息償還額\u3002',
                'm': [
                    4,
                    6
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '各期利率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'per',
                        'detail': '用於計算其利息數額的期數,必須在1到nper之間\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '年金的付款總期數\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值,或一系列未來付款的當前值的累積和\u3002',
                        'example': '80000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選 - 預設值為0] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': 'E2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PPMT',
                't': 8,
                'd': '返回根據定期固定付款和固定利率而定的投資在已知期間內的本金償付額\u3002',
                'a': '返回根據定期固定付款和固定利率而定的投資在已知期間內的本金償付額\u3002',
                'm': [
                    4,
                    6
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '各期利率\u3002',
                        'example': '0.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'per',
                        'detail': '指定期數,該值必須在 1 到 nper 範圍內\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'nper',
                        'detail': '年金的付款總期數\u3002',
                        'example': '3*12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值即一系列未來付款當前值的總和\u3002',
                        'example': '100000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選 - 預設值為0] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'INTRATE',
                't': 8,
                'd': '返回完全投資型證券的利率\u3002',
                'a': '返回完全投資型證券的利率\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'investment',
                        'detail': '有價證券的投資額\u3002',
                        'example': '100000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '有價證券到期時的兌換值\u3002',
                        'example': '101200',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法-此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法 - 此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法-此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PRICE',
                't': 8,
                'd': '返回定期付息的面值\uFFE5100的有價證券的價格\u3002',
                'a': '返回定期付息的面值\uFFE5100的有價證券的價格\u3002',
                'm': [
                    6,
                    7
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'rate',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.057',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'yld',
                        'detail': '有價證券的年收益率\u3002',
                        'example': '0.065',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '面值\uFFE5100的有價證券的清償價值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PRICEDISC',
                't': 8,
                'd': '返回折價發行的面值\uFFE5100的有價證券的價格\u3002',
                'a': '返回折價發行的面值\uFFE5100的有價證券的價格\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'discount',
                        'detail': '有价证券的贴现率\u3002',
                        'example': '0.0525',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '面值\uFFE5100的有價證券的清償價值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'PRICEMAT',
                't': 8,
                'd': '返回到期付息的面值\uFFE5100的有價證券的價格\u3002',
                'a': '返回到期付息的面值\uFFE5100的有價證券的價格\u3002',
                'm': [
                    5,
                    6
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'issue',
                        'detail': '有價證券的發行日\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'rate',
                        'detail': '有價證券在發行日的利率\u3002',
                        'example': '0.061',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'yld',
                        'detail': '有價證券的年收益率\u3002',
                        'example': '0.061',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'RECEIVED',
                't': 8,
                'd': '返回一次性付息的有價證券到期收回的金額\u3002',
                'a': '返回一次性付息的有價證券到期收回的金額\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'investment',
                        'detail': '有價證券的投資額\u3002',
                        'example': '10000000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'discount',
                        'detail': '有價證券的貼現率\u3002',
                        'example': '0.0575',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '12',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DISC',
                't': 8,
                'd': '返回有價證券的貼現率\u3002',
                'a': '返回有價證券的貼現率\u3002',
                'm': [
                    4,
                    5
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'pr',
                        'detail': '有價證券的價格\uFF08按面值為\uFFE5100計算\uFF09\u3002',
                        'example': '97.975',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'redemption',
                        'detail': '面值\uFFE5100的有價證券的清償價值\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '12',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'NPER',
                't': 8,
                'd': '基於固定利率及等額分期付款管道,返回某項投資的總期數\u3002',
                'a': '基於固定利率及等額分期付款管道,返回某項投資的總期數\u3002',
                'm': [
                    3,
                    5
                ],
                'p': [
                    {
                        'name': 'rate',
                        'detail': '各期利率\u3002',
                        'example': '0.12',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pmt',
                        'detail': '各期所應支付的金額,在整個年金期間保持不變\u3002',
                        'example': '500',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'pv',
                        'detail': '現值,或一系列未來付款的當前值的累積和\u3002',
                        'example': '40000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'fv',
                        'detail': '[可選 - 預設值為0] - 未來值,或在最後一次付款後希望得到的現金餘額\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'type',
                        'detail': '[可選 - 預設值為0] - 指定各期的付款時間是在期初還是期末\u3002\n\n0表示期末\uFF1B\n\n1表示期初\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SLN',
                't': 8,
                'd': '返回一個期間內的資產的直線折舊\u3002',
                'a': '返回一個期間內的資產的直線折舊\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'cost',
                        'detail': '資產原值\u3002',
                        'example': '300000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'salvage',
                        'detail': '折舊末尾時的值\uFF08有時也稱為資產殘值\uFF09\u3002',
                        'example': '75000',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'life',
                        'detail': '資產的折舊期數\uFF08有時也稱作資產的使用壽命\uFF09\u3002',
                        'example': '10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DURATION',
                't': 8,
                'd': '返回假設面值\uFFE5100的定期付息有價證券的修正期限\u3002',
                'a': '返回假設面值\uFFE5100的定期付息有價證券的修正期限\u3002',
                'm': [
                    5,
                    6
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'coupon',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.08',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'yld',
                        'detail': '有價證券的年收益率\u3002',
                        'example': '0.09',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MDURATION',
                't': 8,
                'd': '返回假設面值\uFFE5100的有價證券的Macauley修正期限\u3002',
                'a': '返回假設面值\uFFE5100的有價證券的Macauley修正期限\u3002',
                'm': [
                    5,
                    6
                ],
                'p': [
                    {
                        'name': 'settlement',
                        'detail': '有價證券的結算日\u3002有價證券結算日是在發行日之後,有價證券賣給購買者的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'maturity',
                        'detail': '有價證券的到期日\u3002到期日是有價證券有效期截止時的日期\u3002',
                        'example': 'DATE(2010',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'coupon',
                        'detail': '有價證券的年息票利率\u3002',
                        'example': '0.08',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'yld',
                        'detail': '有價證券的年收益率\u3002',
                        'example': '0.09',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'frequency',
                        'detail': '年付息次數\u3002\n\n如果按年支付,frequency = 1\uFF1B\n\n按半年期支付,frequency = 2\uFF1B\n\n按季支付,frequency = 4\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'basis',
                        'detail': '[可選 - 默認為0] - 訓示要使用哪種天數計算方法\u3002\n\n0表示"美國\uFF08NASD\uFF0930/360"方法 - 此方法按照美國全國證券交易商協會標準,假設每月30天\u3001每年360天,並對所輸入的月末日期進行具體調整\u3002\n\n1表示"實際/實際"方法-此方法計算基於指定日期之間的實際天數和所涉及的年份中的實際天數進行計算\u3002此方法用於美國長期債券,也是在非財經用途方面使用最多的方法\u3002\n\n2表示"實際/360"方法 - 此方法基於指定日期之間的實際天數進行計算, 但假定每年為360天\u3002\n\n3表示"實際/365"方法 - 此方法基於指定日期之間的實際天數進行計算,但假定每年為365天\u3002\n\n4表示"歐洲30 / 360"方法-類似於0,此方法基於每月30天\u3001每年360天進行計算,但按照歐洲金融慣例對月末日期進行調整\u3002',
                        'example': '0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'BIN2DEC',
                't': 9,
                'd': '將二進位數轉換為十進位數\u3002',
                'a': '將二進位數轉換為十進位數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '要轉換為十進位數的帶符號的10位二進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的二進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n對於此函數,最大的正數輸入值為0111111111,最小的負數輸入值為1000000000\u3002\n\n如果所提供的帶符號的二進位數是有效的二進位數,會自動將其轉換為相應的字串輸入\u3002例如,BIN2DEC\uFF08100\uFF09和BIN2DEC\uFF08"100"\uFF09得出的結果相同,均為4\u3002',
                        'example': '101',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'BIN2HEX',
                't': 9,
                'd': '將二進位數轉換為十六進位數\u3002',
                'a': '將二進位數轉換為十六進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的十六進位數的帶符號的10位二進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的二進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n對於此函數,最大的正數輸入值為0111111111,最小的負數輸入值為1000000000\u3002\n\n如果所提供的帶符號的二進位數是有效的二進位數,會自動將其轉換為相應的字串輸入\u3002例如,BIN2HEX\uFF0811111\uFF09和BIN2HEX\uFF08"11111"\uFF09得出的結果相同,均為1F\u3002',
                        'example': '101',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] -結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002例如,BIN2HEX\uFF08"11111",8\uFF09所得的結果值為0000001F\u3002\n\n如果帶符號的二進位數的最高位為1,則忽略此值\uFF1B即當提供的帶符號的二進位數大於等於1000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'BIN2OCT',
                't': 9,
                'd': '二進位數轉換為八進制數\u3002',
                'a': '二進位數轉換為八進制數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的八進制數的帶符號的10位二進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的二進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n對於此函數,最大的正數輸入值為0111111111,最小的負數輸入值為1000000000\u3002\n\n如果所提供的帶符號的二進位數是有效的二進位數,會自動將其轉換為相應的字串輸入\u3002例如,BIN2OCT\uFF0811111\uFF09和BIN2OCT\uFF08"11111"\uFF09得出的結果相同,均為37\u3002',
                        'example': '101',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002例如,BIN2OCT\uFF08"11111"\uFF09得到的結果值為00000037\u3002\n\n如果帶符號的二進位數的最高位為1,則忽略此值\uFF1B即當提供的帶符號的二進位數大於等於1000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DEC2BIN',
                't': 9,
                'd': '將十進位數轉換為二進位數\u3002',
                'a': '將十進位數轉換為二進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的二進位數的十進位數值\uFF08以字串形式提供\uFF09\u3002\n\n對於此函數,最大的正數輸入值為511,最小的負數輸入值為-512\u3002\n\n如果所提供的十進位數是有效的十進位數,會自動將其轉換為相應的字串輸入\u3002例如,DEC2BIN\uFF08199\uFF09和DEC2BIN\uFF08"199"\uFF09得出的結果相同,均為11000111\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果十進位數為負數,則忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DEC2HEX',
                't': 9,
                'd': '將十進位數轉換為十六進位數\u3002',
                'a': '將十進位數轉換為十六進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的十六進位數的十進位數值\uFF08以字串形式提供\uFF09\u3002\n\n此函數可接受的最大正數值為549755813887,最小負數值為-549755814888\u3002\n\n如果所提供的十進位數是有效的十進位數,會自動將其轉換為相應的字串輸入\u3002例如,DEC2HEX\uFF08100\uFF09和DEC2HEX\uFF08"100"\uFF09得出的結果相同,均為64\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果十進位數為負數,則忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DEC2OCT',
                't': 9,
                'd': '將十進位數轉換為八進制數\u3002',
                'a': '將十進位數轉換為八進制數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的八進制數的十進位數值\uFF08以字串形式提供\uFF09\u3002\n\n此函數可接受的最大正數值為536870911,最小負數值為-53687092\u3002\n\n如果所提供的十進位數是有效的十進位數,會自動將其轉換為相應的字串輸入\u3002例如,DEC2OCT\uFF08199\uFF09和DEC2OCT\uFF08"199"\uFF09得出的結果相同,均為307\u3002',
                        'example': '100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] -結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果十進位數為負數,則忽略此值 \u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'HEX2BIN',
                't': 9,
                'd': '將十六進位數轉換為二進位數\u3002',
                'a': '將十六進位數轉換為二進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的二進位數的帶符號的40位十六進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的十六進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為1FF,最小負數值為FFFFFFFE00\u3002\n\n如果所提供的帶符號的十六進位數是有效的十六進位數,函數會自動將其轉換為相應的字串輸入\u3002例如,HEX2BIN\uFF08199\uFF09和HEX2BIN\uFF08"199"\uFF09得出的結果相同,均為110011001\u3002',
                        'example': '"f3"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果帶符號的十六進位數的最高位為1,則忽略此值\uFF1B即當提供的帶符號的十六進位數大於等於8000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'HEX2DEC',
                't': 9,
                'd': '將十六進位數轉換為十進位數\u3002',
                'a': '將十六進位數轉換為十進位數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '要轉換為十進位數的帶符號的40位十六進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的十六進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為7fffffffff,最小負數值為8000000000\u3002\n\n如果所提供的帶符號的十六進位數是有效的十六進位數,函數會自動將其轉換為相應的字串輸入\u3002例如,HEX2DEC\uFF08199\uFF09和HEX2DEC\uFF08"199"\uFF09得出的結果相同,均為409 \u3002',
                        'example': '"f3"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'HEX2OCT',
                't': 9,
                'd': '將十六進位數轉換為八進制數\u3002',
                'a': '將十六進位數轉換為八進制數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的八進制數的帶符號的40位十六進位數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的十六進位數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為1FFFFFFF,最小負數值為FFE0000000\u3002\n\n如果所提供的帶符號的十六進位數是有效的十六進位數,函數會自動將其轉換為相應的字串輸入\u3002例如,HEX2OCT\uFF08199\uFF09和HEX2OCT\uFF08"199"\uFF09得出的結果相同,均為631\u3002',
                        'example': '"f3"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果帶符號的十六進位數的最高位為1,則忽略此值\uFF1B即當給定的帶符號的十六進位數大於等於8000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'OCT2BIN',
                't': 9,
                'd': '將八進制數轉換為二進位數\u3002',
                'a': '將八進制數轉換為二進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的二進位數的帶符號的30位八進制數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的八進制數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為777,最小負數值為7777777000\u3002\n\n如果所提供的帶符號的八進制數是有效的八進制數,函數會自動將其轉換為相應的字串輸入\u3002例如,OCT2BIN\uFF08177\uFF09和OCT2BIN\uFF08"177"\uFF09得出的結果相同,均為1111111\u3002',
                        'example': '37',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果帶符號的八進制數的最高位為1,則忽略此值\uFF1B即當給定的帶符號的八進制數大於等於4000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'OCT2DEC',
                't': 9,
                'd': '將八進制數轉換為十進位數\u3002',
                'a': '將八進制數轉換為十進位數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '要轉換為十進位數的帶符號的30位八進制數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的ba進制數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為3777777777,最小負數值為4000000000\u3002\n\n如果所提供的帶符號的八進制數是有效的八進制數,函數會自動將其轉換為相應的字串輸入\u3002例如,OCT2DEC\uFF08177\uFF09和OCT2DEC\uFF08"177"\uFF09得出的結果相同,均為127\u3002',
                        'example': '37',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'OCT2HEX',
                't': 9,
                'd': '將八進制數轉換為十六進位數\u3002',
                'a': '將八進制數轉換為十六進位數\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要轉換為帶符號的十六進位數的帶符號的30位八進制數值\uFF08以字串形式提供\uFF09\u3002\n\n帶符號的ba進制數的最高位是符號位\uFF1B也就是說,負數是以二的補數形式表示的\u3002\n\n此函數可接受的最大正數值為3777777777,最小負數值為4000000000\u3002\n\n如果所提供的帶符號的八進制數是有效的八進制數,函數會自動將其轉換為相應的字串輸入\u3002例如,OCT2HEX\uFF08177\uFF09和OCT2HEX\uFF08"177"\uFF09得出的結果相同,均為7F\u3002',
                        'example': '37',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'places',
                        'detail': '[ 可選 ] - 結果中要確保的有效位數\u3002\n\n如果設定的有效位數大於結果中的有效位數,則在結果的左側填充0,使總有效位數達到有效位數\u3002\n\n如果帶符號的八進制數的最高位為1,則忽略此值\uFF1B即當給定的帶符號的八進制數大於等於4000000000時忽略此值\u3002',
                        'example': '8',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'COMPLEX',
                't': 9,
                'd': '將實係數及虛係數轉換為 x+yi 或 x+yj 形式的複數\u3002',
                'a': '將實係數及虛係數轉換為 x+yi 或 x+yj 形式的複數\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'real_num',
                        'detail': '複數的實係數\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'i_num',
                        'detail': '複數的虛係數\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'suffix',
                        'detail': '[可選 - 默認為"i"] - 複數中虛係數的尾碼\u3002',
                        'example': '"j"',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangestring'
                    }
                ]
            },
            {
                'n': 'IMREAL',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的複數的實係數\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的複數的實係數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'inumber',
                        'detail': '需要計算其實係數的複數\u3002',
                        'example': '"4+5i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'IMAGINARY',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的複數的虛係數\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的複數的虛係數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'inumber',
                        'detail': '需要計算其虛係數的複數\u3002',
                        'example': '"4+5i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'IMCONJUGATE',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的複數的共軛複數\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的複數的共軛複數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'inumber',
                        'detail': '需要計算其共軛數的複數\u3002',
                        'example': '"3+4i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'IMABS',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的複數的絕對值\uFF08模\uFF09\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的複數的絕對值\uFF08模\uFF09\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'inumber',
                        'detail': '要計算其絕對值的複數\u3002',
                        'example': '"3+4i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'DELTA',
                't': 9,
                'd': '檢驗兩個值是否相等\u3002如果 number1=number2,則返回1\uFF1B否則返回0\u3002',
                'a': '檢驗兩個值是否相等\u3002如果 number1=number2,則返回1\uFF1B否則返回0\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'number1',
                        'detail': '第一個數位\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'number2',
                        'detail': '[可選 - 默認為0] - 第二個數位\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'IMSUM',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 個複數的和\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 個複數的和\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'inumber1',
                        'detail': '要相加的第一個複數',
                        'example': '"3+4i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'inumber2, \u2026',
                        'detail': '[可選] -要與值1相加的其他複數',
                        'example': '"5-3i"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'IMSUB',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的兩個複數的差\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的兩個複數的差\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'inumber1',
                        'detail': '從\uFF08複\uFF09數中减去 inumber2\u3002',
                        'example': '"6+5i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'inumber2',
                        'detail': '從 inumber1 中减\uFF08複\uFF09數\u3002',
                        'example': '"2+3i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'IMPRODUCT',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 個複數的乘積\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 個複數的乘積\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'inumber1',
                        'detail': '用於計算乘積的第一個複數',
                        'example': '"3+4i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'inumber2, \u2026',
                        'detail': '[可選] -要相乘的其他複數\u3002',
                        'example': '"5-3i"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'IMDIV',
                't': 9,
                'd': '返回以 x+yi 或 x+yj 文本格式表示的兩個複數的商\u3002',
                'a': '返回以 x+yi 或 x+yj 文本格式表示的兩個複數的商\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'inumber1',
                        'detail': '複數分子或被除數\u3002',
                        'example': '"11+16i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'inumber2',
                        'detail': '複數分母或除數\u3002',
                        'example': '"3+2i"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'NOT',
                't': 10,
                'd': '返回某個邏輯值的相反值-"NOT\uFF08TRUE\uFF08\uFF09\uFF09"將返回FALSE\uFF1B"NOT\uFF08FALSE\uFF08\uFF09\uFF09"將返回TRUE\u3002',
                'a': '返回某個邏輯值的相反值-"NOT\uFF08TRUE\uFF08\uFF09\uFF09"將返回FALSE\uFF1B"NOT\uFF08FALSE\uFF08\uFF09\uFF09"將返回TRUE\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'logical',
                        'detail': '計算結果為TRUE或FALSE的任何值或運算式\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TRUE',
                't': 10,
                'd': '返回邏輯值 TRUE\u3002',
                'a': '返回邏輯值 TRUE\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'FALSE',
                't': 10,
                'd': '返回邏輯值 FALSE\u3002',
                'a': '返回邏輯值 FALSE\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'AND',
                't': 10,
                'd': '所有參數的計算結果為TRUE時,返回TRUE\uFF1B只要有一個參數的計算結果為FALSE,即返回FALSE\u3002',
                'a': '所有參數的計算結果為TRUE時,返回TRUE\uFF1B只要有一個參數的計算結果為FALSE,即返回FALSE\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'logical1',
                        'detail': '要測試的第一個條件,其計算結果可以為TRUE或FALSE\u3002',
                        'example': 'A2 = "foo"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'logical2,...',
                        'detail': '[可選] - 要測試的其他條件,其計算結果可以為TRUE或FALSE,最多可包含255個條件\u3002',
                        'example': 'A3 = "bar"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'IFERROR',
                't': 10,
                'd': '如果第一個參數不是錯誤值,就返回第一個參數\uFF1B否則,返回第二個參數\u3002',
                'a': '如果第一個參數不是錯誤值',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value',
                        'detail': '檢查是否存在錯誤的參數\u3002',
                        'example': 'A1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value_if_error',
                        'detail': '公式的計算結果錯誤時返回的值\u3002計算以下錯誤類型:#N/A\u3001#VALUE\uFF01\u3001#REF\uFF01\u3001#DIV/0\uFF01\u3001#NUM\uFF01\u3001#NAME\uFF1F或#NULL\uFF01\u3002',
                        'example': '"Error in cell A1"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'IF',
                't': 10,
                'd': '當邏輯運算式的值為TRUE時返回一個值,而當其為FALSE時返回另一個值\u3002',
                'a': '當邏輯運算式的值為TRUE時返回一個值,而當其為FALSE時返回另一個值\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'logical_test',
                        'detail': '一個運算式或對包含運算式的儲存格的引用,該運算式代表某種邏輯值\uFF08即TRUE或FALSE\uFF09\u3002',
                        'example': 'A2 = "foo"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value_if_true',
                        'detail': '當邏輯運算式為TRUE時的返回值\u3002',
                        'example': '"A2 is foo"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value_if_false',
                        'detail': '[可選 - 默認為空白] - 當邏輯運算式等於FALSE時的函數返回值\u3002',
                        'example': '"A2 was false"',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'OR',
                't': 10,
                'd': '只要有一個參數的計算結果為TRUE時,返回TRUE\uFF1B所有參數的計算結果為FALSE,即返回FALSE\u3002',
                'a': '只要有一個參數的計算結果為TRUE時,返回TRUE\uFF1B所有參數的計算結果為FALSE,即返回FALSE\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'logical1',
                        'detail': '要測試的第一個條件,其計算結果可以為TRUE或FALSE\u3002',
                        'example': 'A2 = "foo"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '邏輯運算式2',
                        'detail': '[可選] - 其他運算式或對包含運算式的儲存格的引用,這些運算式代表某種邏輯值\uFF08即TRUE或FALSE\uFF09或者可以強制轉換為邏輯值\u3002',
                        'example': ' A3 = "bar"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'NE',
                't': 11,
                'd': '如果指定的值不相等,則返回"TRUE"\uFF1B否則返回"FALSE"\u3002相當於"<>"運算子\u3002',
                'a': '如果指定的值不相等,則返回"TRUE"\uFF1B否則返回"FALSE"\u3002相當於"<>"運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '第一個值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '要檢查是否與 value1 不相等的值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'EQ',
                't': 11,
                'd': '如果指定的值相等,則返回"TRUE"\uFF1B否則返回"FALSE"\u3002相當於"="運算子\u3002',
                'a': '如果指定的值相等,則返回"TRUE"\uFF1B否則返回"FALSE"\u3002相當於"="運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '第一個值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '要檢查是否與value1相等的值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'GT',
                't': 11,
                'd': '如果第一個參數嚴格大於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於' > '運算子\u3002',
                'a': '如果第一個參數嚴格大於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於' > '運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '要測試其是否大於 value2 的值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'GTE',
                't': 11,
                'd': '如果第一個參數大於或等於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於">="運算子\u3002',
                'a': '如果第一個參數大於或等於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於">="運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '要测试其是否大于等于 value2 的值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LT',
                't': 11,
                'd': '如果第一個參數嚴格小於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於"<"運算子\u3002',
                'a': '如果第一個參數嚴格小於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於"<"運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '要测试其是否小于 value2 的值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LTE',
                't': 11,
                'd': '如果第一個參數小於或等於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於"<="運算子\u3002',
                'a': '如果第一個參數小於或等於第二個\uFF0C則返回TRUE\uFF1B否則返回FALSE\u3002相當於"<="運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '要测试其是否小于等于 value2 的值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'ADD',
                't': 11,
                'd': '返回兩個數值之和\u3002相當於"+"運算子\u3002',
                'a': '返回兩個數值之和\u3002相當於"+"運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '第一個加數\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個加數\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MINUS',
                't': 11,
                'd': '返回兩個數值之差\u3002相當於"-"運算子\u3002',
                'a': '返回兩個數值之差\u3002相當於"-"運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '被減數,即要對其計减的數值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value2',
                        'detail': '減數,即要從value1中减除的數值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MULTIPLY',
                't': 11,
                'd': '返回兩個數的乘積\u3002相當於"*"運算子\u3002',
                'a': '返回兩個數的乘積\u3002相當於"*"運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '第一個乘數\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value2',
                        'detail': '第二個乘數\u3002',
                        'example': 'B2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'DIVIDE',
                't': 11,
                'd': '返回兩個參數相除所得的結果\u3002相當於`/`運算子\u3002',
                'a': '返回兩個參數相除所得的結果\u3002相當於`/`運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': '要被除的數值\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'value2',
                        'detail': '用於除其他數的數值\u3002\n\n除數不得為0\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'CONCAT',
                't': 11,
                'd': '返回兩個值的串聯\u3002相當於`&`運算子\u3002',
                'a': '返回兩個值的串聯\u3002相當於`&`運算子\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value1',
                        'detail': 'value2 將附於其後的值\u3002',
                        'example': '"de"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'value2',
                        'detail': '要附於 value1 之後的值\u3002',
                        'example': '"mystify"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'UNARY_PERCENT',
                't': 11,
                'd': '返回按百分比解釋的數值\u3002例如,"UNARY_PERCENT\uFF08100\uFF09"等於1\u3002',
                'a': '返回按百分比解釋的數值\u3002例如,"UNARY_PERCENT\uFF08100\uFF09"等於1\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '要作為百分比解釋的數值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'CONCATENATE',
                't': 12,
                'd': '將兩個或多個文字字串聯接為一個字串\u3002',
                'a': '將兩個或多個文字字串聯接為一個字串\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'text1',
                        'detail': '初始字串\u3002',
                        'example': '"Super"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'text2\u2026',
                        'detail': '[可選] - 要按順序連接在一起的其他字串\u3002',
                        'example': '"calla"',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'CODE',
                't': 12,
                'd': '返回所提供的字串中首字元的Unicode映射值\u3002',
                'a': '返回所提供的字串中首字元的Unicode映射值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要返回其首字元的Unicode映射值的字串\u3002',
                        'example': '"a"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'CHAR',
                't': 12,
                'd': '按照當前Unicode編碼表,將數位轉換為對應的字元\u3002',
                'a': '按照當前Unicode編碼表,將數位轉換為對應的字元\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '介於1到255之間的數位\u3002',
                        'example': '97',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'ARABIC',
                't': 12,
                'd': '將羅馬數字轉換為阿拉伯數字\u3002',
                'a': '將羅馬數字轉換為阿拉伯數字\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要轉換格式的羅馬數字',
                        'example': '"XIV"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ROMAN',
                't': 12,
                'd': '將數位格式設定為羅馬數字形式\u3002',
                'a': '將數位格式設定為羅馬數字形式\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'number',
                        'detail': '要設定格式的數位,介於1到3999之間\uFF08包括這兩個數位\uFF09\u3002',
                        'example': '499',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'REGEXEXTRACT',
                't': 12,
                'd': '按照規則運算式選取匹配的子串\u3002',
                'a': '按照規則運算式選取匹配的子串\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '輸入文字\u3002',
                        'example': '"Needle in a haystack"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'regular_expression',
                        'detail': '此函數將返回文字中符合此運算式的第一個子串\u3002',
                        'example': '".e{2}dle"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'REGEXMATCH',
                't': 12,
                'd': '判斷一段文字是否與規則運算式相匹配\u3002',
                'a': '判斷一段文字是否與規則運算式相匹配\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '要用規則運算式測試的文字\u3002',
                        'example': '"Spreadsheets"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'regular_expression',
                        'detail': '用來測試文字的規則運算式\u3002',
                        'example': '"S.r"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'REGEXREPLACE',
                't': 12,
                'd': '使用規則運算式將文字字串中的一部分替換為其他文字字串\u3002',
                'a': '使用規則運算式將文字字串中的一部分替換為其他文字字串\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '要對其局部進行替換操作的文字\u3002',
                        'example': '"Spreadsheets"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'regular_expression',
                        'detail': '規則運算式\u3002text中所有匹配的實例都將被替換\u3002',
                        'example': '"S.*d"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'replacement',
                        'detail': '要插入到原有文字中的文字\u3002',
                        'example': '"Bed"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'T',
                't': 12,
                'd': '返回文本格式的字串參數\u3002',
                'a': '返回文本格式的字串參數\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為文字的參數\u3002\n\n如果值為文字,T將返回值本身\u3002\n\n如果值為指向包含文字的儲存格的引用,T將返回值中的內容\u3002\n\n如果值為錯誤值或包含錯誤值的儲存格,T將返回該錯誤值\u3002\n\n對於所有其他情况,T將返回空串\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'FIXED',
                't': 12,
                'd': '以固定的小數位數設定數位的格式\u3002',
                'a': '以固定的小數位數設定數位的格式\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '要進行舍入並轉換為文字的數位\u3002',
                        'example': '3.141592653',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'decimals',
                        'detail': '[可選-預設值為2] - 結果中要顯示的小數位數\u3002\n\n如果數值的有效位數小於小數位數,將以零填充\u3002如果數值的有效位數大於小數位數,則將其舍入到所需的小數位數而不是將其截斷\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'no_commas',
                        'detail': '[可選-預設值為FALSE\uFF08\uFF09] - 一個邏輯值,如果為TRUE\uFF08\uFF09,則會禁止FIXED在返回的文字中包含逗號\u3002',
                        'example': 'FALSE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'FIND',
                't': 12,
                'd': '返回字串在文字中首次出現的位置\uFF08區分大小寫\uFF09\u3002',
                'a': '返回字串在文字中首次出現的位置\uFF08區分大小寫\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'find_text',
                        'detail': '要在要蒐索的文字中查找的字串\u3002',
                        'example': '"n"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'within_text',
                        'detail': '要在其中蒐索蒐索字串的首次出現位置的文字\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_num',
                        'detail': '[可選-預設值為1] - 要在要蒐索的文字中開始蒐索的字元位置\u3002',
                        'example': '14',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'FINDB',
                't': 12,
                'd': '返回某個字串在文字中首次出現的位置\uFF08每個雙位元組字元占兩個位置\uFF09\u3002',
                'a': '返回某個字串在文字中首次出現的位置\uFF08每個雙位元組字元占兩個位置\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'find_text',
                        'detail': '要在要蒐索的文字中查找的字串\u3002',
                        'example': '"新"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'within_text',
                        'detail': '要在其中蒐索蒐索字串的首次出現位置的文字\u3002',
                        'example': '"農曆新年"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_num',
                        'detail': '[可選-預設值為1] - 要在要蒐索的文字中開始蒐索的字元位置\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'JOIN',
                't': 12,
                'd': '將一個或多個使用指定定界符的一維數組的元素連接到一起\u3002',
                'a': '將一個或多個使用指定定界符的一維數組的元素連接到一起\u3002',
                'm': [
                    2,
                    255
                ],
                'p': [
                    {
                        'name': 'separator',
                        'detail': '置於相互連接的值之間的字元或字串\u3002\n\n定界符可以為空,例如JOIN\uFF08,{1,2,3}\uFF09\u3002',
                        'example': '"and-a"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'array1',
                        'detail': '要使用定界符連接的一個或多個值\u3002',
                        'example': '{1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'array2,\u2026',
                        'detail': '[可選] - 要使用定界符連接的其他值或數組\u3002',
                        'example': '2',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LEFT',
                't': 12,
                'd': '從文字字串的第一個字元開始返回指定個數的字元\u3002',
                'a': '從文字字串的第一個字元開始返回指定個數的字元\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '包含要選取的字元的文字字串\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'num_chars',
                        'detail': '[可選-預設值為1] - 指定要由LEFT選取的字元的數量\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'RIGHT',
                't': 12,
                'd': '根據所指定的字元數返回文字字串中最後一個或多個字元\u3002',
                'a': '根據所指定的字元數返回文字字串中最後一個或多個字元\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '包含要選取的字元的文字字串\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'num_chars',
                        'detail': '[可選-預設值為1] - 指定要由RIGHT選取的字元的數量\u3002',
                        'example': '2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'MID',
                't': 12,
                'd': '返回文字字串中從指定位置開始的特定數目的字元\u3002',
                'a': '返回文字字串中從指定位置開始的特定數目的字元\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '包含要選取的字元的文字字串\u3002',
                        'example': '"get this"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_num',
                        'detail': '要從字串中開始選取的位置\u3002字串中第一個字元的索引為1\u3002',
                        'example': '5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'num_chars',
                        'detail': '指定要由MID選取的字元的數量\u3002\n\n如果選取的字元數尚不足選取長度個字元時就到達了字串尾部,則MID返回從開始位置到字串尾部的字元\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'LEN',
                't': 12,
                'd': '返回給定字串的長度\u3002',
                'a': '返回給定字串的長度\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要返回其長度的字串\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'LENB',
                't': 12,
                'd': '返回文字中所包含的字元數\u3002與雙位元組字元集\uFF08DBCS\uFF09一起使用\u3002',
                'a': '返回文字中所包含的字元數\u3002與雙位元組字元集\uFF08DBCS\uFF09一起使用\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要返回其位元組數的字串\u3002\uFF08一個漢字為兩個位元組數\uFF09',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'LOWER',
                't': 12,
                'd': '將指定字串中的字母轉換為小寫\u3002',
                'a': '將指定字串中的字母轉換為小寫\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要轉換為小寫的字串\u3002',
                        'example': '"LOREM IPSUM"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'UPPER',
                't': 12,
                'd': '將指定字串中的字母轉換為大寫\u3002',
                'a': '將指定字串中的字母轉換為大寫\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要轉換為大寫的字串\u3002',
                        'example': '"lorem ipsum"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'EXACT',
                't': 12,
                'd': '比較兩個字串是否相同\u3002',
                'a': '比較兩個字串是否相同\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'text1',
                        'detail': '要比較的第一個字串\u3002',
                        'example': 'A1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'text2',
                        'detail': '要比較的第二個字串\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'REPLACE',
                't': 12,
                'd': '將文字字串的一部分替換為其他文字字串\u3002',
                'a': '將文字字串的一部分替換為其他文字字串\u3002',
                'm': [
                    4,
                    4
                ],
                'p': [
                    {
                        'name': 'old_text',
                        'detail': '要對其局部進行替換操作的文字\u3002',
                        'example': '"Spreadsheets"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_num',
                        'detail': '開始進行替換操作的位置\uFF08文字開頭位置為1\uFF09\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'num_chars',
                        'detail': '要在文字中替換的字元個數\u3002',
                        'example': '6',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'new_text',
                        'detail': '要插入到原有文字中的文字\u3002',
                        'example': '"Bed"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'REPT',
                't': 12,
                'd': '返回指定文字的多次重複\u3002',
                'a': '返回指定文字的多次重複\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '要重複的字元或字串\u3002',
                        'example': '"ha"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'number_times',
                        'detail': '要重複的文字要在返回值中出現的次數\u3002\n\n最大重複次數為100\u3002即使重複次數大於100,REPT也僅將相應文字重複100次\u3002',
                        'example': '4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SEARCH',
                't': 12,
                'd': '返回字串在文字中首次出現的位置\uFF08不區分大小寫\uFF09\u3002',
                'a': '返回字串在文字中首次出現的位置\uFF08不區分大小寫\uFF09\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'find_text',
                        'detail': '要在要蒐索的文字中查找的字串\u3002',
                        'example': '"n"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'within_text',
                        'detail': '要在其中蒐索蒐索字串的首次出現位置的文字\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'start_num',
                        'detail': '[可選-預設值為1 ] - 要在要蒐索的文字中開始蒐索的字元位置\u3002',
                        'example': '14',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUBSTITUTE',
                't': 12,
                'd': '在文字字串中用new_text替換old_text\u3002',
                'a': '在文字字串中用new_text替換old_text\u3002',
                'm': [
                    3,
                    4
                ],
                'p': [
                    {
                        'name': 'text',
                        'detail': '需要替換其中字元的文字,或對含有文字\uFF08需要替換其中字元\uFF09的儲存格的引用\u3002',
                        'example': '"search for it"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'old_text',
                        'detail': '需要替換的文字\u3002',
                        'example': '"search for"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'new_text',
                        'detail': '用於替換old_text的文字\u3002',
                        'example': '"Google"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'instance_num',
                        'detail': '[可選] - 指定要用new_text替換old_text的事件\u3002如果指定了instance_num,則只有滿足要求的old_text被替換\u3002否則,文字中出現的所有old_text都會更改為new_text\u3002',
                        'example': '3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'CLEAN',
                't': 12,
                'd': '移除文字中的不可列印ASCII字元後將其返回\u3002',
                'a': '移除文字中的不可列印ASCII字元後將其返回\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要移除其中不可列印字元的文字\u3002',
                        'example': '"AF"&amp;CHAR\uFF0831\uFF09',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TEXT',
                't': 12,
                'd': '按照指定格式將數位轉換為文字\u3002',
                'a': '按照指定格式將數位轉換為文字\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'value',
                        'detail': '要設定格式的數位\u3001日期或時間\u3002',
                        'example': '1.23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'format_text',
                        'detail': '以括弧括起來的模式串,將按該模式設定數位的格式\u3002\n\n0表示在數值位數少於格式指定的位數時必定以零填充\u3002例如,TEXT\uFF0812.3,\u201C000.00"\uFF09將返回012.30\u3002當數值的小數位數超過模式指定的小數位數時,四捨五入為指定的小數位數\u3002例如,TEXT\uFF0812.305,\u201C00.00"\uFF09將返回12.31\u3002\n\n#類似於0,但並不是在小數點的兩側都以零填充\u3002例如,TEXT\uFF0812.3,\u201C###.##"\uFF09將返回12.3\u3002',
                        'example': '"$0.00"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'TRIM',
                't': 12,
                'd': '删除指定字串前後的空格\u3002',
                'a': '删除指定字串前後的空格\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要修剪的字串或指向包含該字串的儲存格的引用\u3002',
                        'example': '"lorem ipsum"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'VALUE',
                't': 12,
                'd': '將可識別的任何日期\u3001時間或數位格式的字串轉換為數位\u3002',
                'a': '將可識別的任何日期\u3001時間或數位格式的字串轉換為數位\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '包含要轉換的值的字串\u3002',
                        'example': '"123"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'PROPER',
                't': 12,
                'd': '將指定字串中每個單詞的首字母轉為大寫\u3002',
                'a': '將指定字串中每個單詞的首字母轉為大寫\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'text',
                        'detail': '要轉換的文字,其中每個單詞的首字母都將轉為大寫,所有其他字母則轉為小寫\u3002',
                        'example': '"united states"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'CONVERT',
                't': 13,
                'd': '將數位從一種度量系統轉換為另一種度量系統\u3002',
                'a': '將數位從一種度量系統轉換為另一種度量系統\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'number',
                        'detail': '是以from_unit為組織的需要進行轉換的數值\u3002',
                        'example': '5.1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'from_unit',
                        'detail': '是數值的組織\u3002',
                        'example': '"g"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'to_unit',
                        'detail': '是結果的組織\u3002',
                        'example': '"kg"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'SUMX2MY2',
                't': 14,
                'd': '返回兩數組中對應數值的平方差之和\u3002',
                'a': '返回兩數組中對應數值的平方差之和\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array_x',
                        'detail': '第一個數組或數值區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array_y',
                        'detail': '第二個數組或數值區域\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUMX2PY2',
                't': 14,
                'd': '返回兩數組中對應數值的平方和之和\u3002',
                'a': '返回兩數組中對應數值的平方和之和\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array_x',
                        'detail': '第一個數組或數值區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array_y',
                        'detail': '第二個數組或數值區域\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUMXMY2',
                't': 14,
                'd': '返回兩數組中對應數值之差的平方和\u3002',
                'a': '返回兩數組中對應數值之差的平方和\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array_x',
                        'detail': '第一個數組或數值區域\u3002',
                        'example': 'A2:A100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array_y',
                        'detail': '第二個數組或數值區域\u3002',
                        'example': 'B2:B100',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'TRANSPOSE',
                't': 14,
                'd': '將數組或儲存格範圍的行列轉置\u3002',
                'a': '將數組或儲存格範圍的行列轉置\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'array',
                        'detail': '要將其行列互換的數組或範圍\u3002',
                        'example': '{1,2}',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }]
            },
            {
                'n': 'TREND',
                't': 14,
                'd': '返回線性趨勢值\u3002',
                'a': '返回線性趨勢值\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'known_y',
                        'detail': '關係運算式y = mx + b 中已知的y值集合\u3002\n\n如果known_y為二維陣列或範圍,則known_x的維數必須與之相同,或者省略此參數\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'B2:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'known_x',
                        'detail': '[可選-默認該數組為{1,2,3,\u2026},其大小與known_y相同] -關係運算式y = mx + b 中已知的可選x值集合\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'A2:A10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'new_x',
                        'detail': '[可選 - 默認與known_x相同] - 需要函數TREND返回對應y值的新x值\u3002',
                        'example': 'A11:A13',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'const',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個邏輯值,用於指定是否將常數b強制設為0\u3002\n\nTRUE\uFF08\uFF09表示b將按正常計算\uFF1B\n\nFALSE\uFF08\uFF09表示b將被設為0\uFF08零\uFF09,m 將被調整以使y = mx\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'FREQUENCY',
                't': 14,
                'd': '計算數值在某個區域內的出現頻率,然後返回一個垂直數組\u3002',
                'a': '計算數值在某個區域內的出現頻率,然後返回一個垂直數組\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'data_array',
                        'detail': '要對其頻率進行計數的一組數值或對這組數值的引用\u3002',
                        'example': 'A2:A40',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'bins_array',
                        'detail': '要將data_array中的值插入到的間隔數組或對間隔的引用\u3002\n\n為清晰起見,應將類別排序,但如果未排序,FREQUENCY會在內部對這些指定的值進行排序並返回正確結果\u3002',
                        'example': 'B2:B5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'GROWTH',
                't': 14,
                'd': '使用現有數據計算預測的指數等比\u3002',
                'a': '使用現有數據計算預測的指數等比\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'known_y',
                        'detail': '關係運算式y = b*m^x 中已知的y值集合\u3002\n\n如果已知數據_y為二維陣列或範圍,則已知數據_x的維數必須與之相同,或者省略此參數\u3002\n\n如果已知數據_y為一維數組或範圍,已知數據_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果已知數據_y為單行,則將已知數據_x中的每行解釋為各自獨立的值,類似情况也適用於已知數據_y為單列的情况\u3002',
                        'example': 'B2:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'known_x',
                        'detail': '[可選 - 默認該數組為{1,2,3,\u2026},其大小與known_y相同] - 關係運算式y = b*m^x 中已知的可選x值集合\u3002\n\n如果已知數據_y為一維數組或範圍,已知數據_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果已知數據_y為單行,則將已知數據_x中的每行解釋為各自獨立的值,類似情况也適用於已知數據_y為單列的情况\u3002',
                        'example': 'A2:A10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'new_x',
                        'detail': '[可選 - 默認與known_x相同] - 需要函數GROWTH返回對應y值的新x值\u3002',
                        'example': 'A11:A13',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'const',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個邏輯值,用於指定是否將常數b強制設為1\u3002\n\nTRUE\uFF08\uFF09表示b將按正常計算\uFF1B\n\nFALSE\uFF08\uFF09表示b將被設為1,m將被調整以使y = m^x\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LINEST',
                't': 14,
                'd': '可通過使用最小二乘法計算與現有數據最佳擬合的直線,來計算某直線的統計值,然後返回描述此直線的數組\u3002',
                'a': '可通過使用最小二乘法計算與現有數據最佳擬合的直線,來計算某直線的統計值,然後返回描述此直線的數組\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'known_y',
                        'detail': '關係運算式y = mx + b 中已知的y值集合\u3002\n\n如果known_y為二維陣列或範圍,則known_x的維數必須與之相同,或者省略此參數\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'B2:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'known_x',
                        'detail': '[可選 - 默認該數組為{1,2,3,\u2026},其大小與known_y相同] - 關係運算式y = mx + b中已知的可選x值集合\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'A2:A10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'const',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個邏輯值,用於指定是否將常數b強制設為0\u3002\n\nTRUE\uFF08\uFF09表示b將按正常計算\uFF1B\n\nFALSE\uFF08\uFF09表示b將被設為0\uFF08零\uFF09,m將被調整以使y = mx\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'stats',
                        'detail': '[可選 - 預設值為FALSE\uFF08\uFF09] - 一個邏輯值,用於指定是否返回附加回歸統計值\u3002\n\n如果詳細為TRUE,除了對應於每個引數的一組線性係數和y截距之外,LINEST還返回以下資訊:\n\n每項係數和截距的標準誤差\u3001\n\n限定係數\uFF08介於0和1之間,1表示完全相關\uFF09\u3001\n\n因變數值的標准誤差\u3001\n\nF統計或F觀測值,訓示所觀測到的因變數和引數變數之間的關係是隨機的還是線性的\u3001\n\n自由度,用於在參照錶中查找F統計值以估算可信度\u3001\n\n回歸平方和,以及\n\n殘差平方和\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'LOGEST',
                't': 14,
                'd': '在回歸分析中,計算最符合數據的指數回歸擬合曲線,並返回描述該曲線的數值數組\u3002',
                'a': '在回歸分析中,計算最符合數據的指數回歸擬合曲線,並返回描述該曲線的數值數組\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'known_y',
                        'detail': '關係運算式y = mx + b 中已知的y值集合\u3002\n\n如果known_y為二維陣列或範圍,則known_x的維數必須與之相同,或者省略此參數\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'B2:B10',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'known_x',
                        'detail': '[可選 - 默認該數組為{1,2,3,\u2026},其大小與known_y相同] - 關係運算式y = mx + b中已知的可選x值集合\u3002\n\n如果known_y為一維數組或範圍,known_x則可代表二維陣列或範圍中的多個引數\u3002也就是說,如果known_y為單行,則將known_x中的每行解釋為各自獨立的值,類似情况也適用於known_y為單列的情况\u3002',
                        'example': 'A2:A10',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'const',
                        'detail': '[可選 - 預設值為TRUE\uFF08\uFF09] - 一個邏輯值,用於指定是否將常數b強制設為0\u3002\n\nTRUE\uFF08\uFF09表示b將按正常計算\uFF1B\n\nFALSE\uFF08\uFF09表示b將被設為0\uFF08零\uFF09,m將被調整以使y = mx\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'stats',
                        'detail': '[可選 - 預設值為FALSE\uFF08\uFF09] - 一個邏輯值,用於指定是否返回附加回歸統計值\u3002\n\n如果詳細為TRUE,則除了為每個引數和係數b返回一組指數值之外,LOGEST還將返回以下數據:\n\n每項指數和係數的標準誤差\u3001\n\n限定係數\uFF08介於0和1之間,1表示完全相關\uFF09\u3001\n\n因變數值的標准誤差\u3001\n\nF統計或F觀測值,訓示所觀測到的因變數和引數之間的關係是隨機的還是指數的\u3001\n\n自由度-用於在參照錶中查找F統計值以估算可信度\u3001\n\n回歸平方和,以及\n\n殘差平方和\u3002',
                        'example': 'TRUE\uFF08\uFF09',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'MDETERM',
                't': 14,
                'd': '返回一個數組的矩陣行列式的值\u3002',
                'a': '返回一個數組的矩陣行列式的值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'array',
                        'detail': '行數和列數相等的數值數組\u3002',
                        'example': 'A1:D4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'MINVERSE',
                't': 14,
                'd': '返回數組中存儲的矩陣的逆矩陣\u3002',
                'a': '返回數組中存儲的矩陣的逆矩陣\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'array',
                        'detail': '行數和列數相等的數值數組\u3002',
                        'example': 'A1:D4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'MMULT',
                't': 14,
                'd': '返回兩個數組的矩陣乘積\u3002結果矩陣的行數與array1的行數相同,矩陣的列數與array2的列數相同\u3002',
                'a': '返回兩個數組的矩陣乘積\u3002結果矩陣的行數與array1的行數相同,矩陣的列數與array2的列數相同\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'array1',
                        'detail': '要進行矩陣乘法運算的第一個矩陣數組\u3002\n\narray1列數必須與array2的行數相同',
                        'example': 'A1:B3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array2',
                        'detail': '要進行矩陣乘法運算的第二個矩陣數組\u3002\n\narray2的行數必須與array1列數相同',
                        'example': 'C1:F2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SUMPRODUCT',
                't': 14,
                'd': '在給定的幾組數組中,將數組間對應的元素相乘,並返回乘積之和\u3002',
                'a': '在給定的幾組數組中,將數組間對應的元素相乘,並返回乘積之和\u3002',
                'm': [
                    1,
                    255
                ],
                'p': [
                    {
                        'name': 'array1',
                        'detail': '其相應元素需要進行相乘並求和的第一個數組參數\u3002',
                        'example': 'A2:C5',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'array2',
                        'detail': '[可選] - 其相應元素需要進行相乘並求和的其它數組參數\u3002',
                        'example': 'D2:F5',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'ISFORMULA',
                't': 15,
                'd': '檢查公式是否位於引用的儲存格中\u3002',
                'a': '檢查公式是否位於引用的儲存格中\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'cell',
                        'detail': '要檢查是否存在公式的儲存格\u3002\n\n如果 cell 為包含公式的儲存格,則 ISFORMULA 將返回TRUE\u3002如果 cell 為相應儲存格範圍,則當該範圍內的首個儲存格包含公式時,系統會返回TRUE\u3002如果是任何其他值,系統都將返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }]
            },
            {
                'n': 'CELL',
                't': 15,
                'd': '返回有關儲存格的格式\u3001位置或內容的資訊\u3002',
                'a': '返回有關儲存格的格式\u3001位置或內容的資訊\u3002',
                'm': [
                    2,
                    2
                ],
                'p': [
                    {
                        'name': 'info_type',
                        'detail': '一個文字值,指定要返回的儲存格資訊的類型\u3002',
                        'example': '"type"',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'reference',
                        'detail': '需要其相關資訊的儲存格\u3002',
                        'example': 'C2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'NA',
                't': 15,
                'd': '返回錯誤值#N/A\u3002',
                'a': '返回錯誤值#N/A\u3002',
                'm': [
                    0,
                    0
                ],
                'p': []
            },
            {
                'n': 'ERROR_TYPE',
                't': 15,
                'd': '返回與其他儲存格中的錯誤值相對應的數位\u3002',
                'a': '返回與其他儲存格中的錯誤值相對應的數位\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'error_val',
                        'detail': '用於查找錯誤號的儲存格,雖然您也可以直接提供錯誤值\u3002',
                        'example': 'A3',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISBLANK',
                't': 15,
                'd': '檢查所引用的儲存格是否為空\u3002',
                'a': '檢查所引用的儲存格是否為空\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '對要檢查其是否為空的儲存格的引用\u3002\n\n如果是空儲存格,則TRUE\uFF1B否則返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }]
            },
            {
                'n': 'ISERR',
                't': 15,
                'd': '檢查某個值是否為#N/A以外的錯誤值\u3002',
                'a': '檢查某個值是否為#N/A以外的錯誤值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其是否為#N/A以外的錯誤類型的值\u3002\n\n如果值是除#N/A之外的任何錯誤\uFF08包括#DIV/0\uFF01\u3001#NAME\uFF1F\u3001#NULL\uFF01\u3001#NUM\uFF01\u3001#VALUE\uFF01和#REF\uFF01\uFF09,ISERR將返回TRUE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISERROR',
                't': 15,
                'd': '檢查某個值是否為錯誤值\u3002',
                'a': '檢查某個值是否為錯誤值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其是否為錯誤類型的值\u3002\n\n只要值是某種錯誤值\uFF08包括#DIV/0\uFF01\u3001#N/A\u3001#NAME\uFF1F\u3001#NULL\uFF01\u3001#NUM\uFF01\u3001#VALUE\uFF01和#REF\uFF01\uFF09,ISERROR就會返回TRUE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISLOGICAL',
                't': 15,
                'd': '檢查某個值是TRUE還是FALSE\u3002',
                'a': '檢查某個值是TRUE還是FALSE\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其為邏輯 TRUE 還是邏輯 FALSE 的值\u3002\n\n*如果值為TRUE或FALSE,或為指向值為TRUE或FALSE的儲存格的引用,ISLOGICAL將返回TRUE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISNA',
                't': 15,
                'd': '檢查某個值是否為錯誤值#N/A\u3002',
                'a': '檢查某個值是否為錯誤值#N/A\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要與錯誤值#N/A進行比較的值\u3002\n\n*如果值為#N/A或指向包含#N/A的儲存格的引用,則ISNA將返回TRUE,否則返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISNONTEXT',
                't': 15,
                'd': '檢查某個值是否為非文字\u3002',
                'a': '檢查某個值是否為非文字\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要檢查的文字\u3002\n\n*如果參數為文字值或指向包含文字的儲存格的引用,ISNONTEXT將返回FALSE,否則返回TRUE\u3002\n\n當值為指向空儲存格的引用時,ISNONTEXT會返回TRUE\u3002\n\n當值為空字串時,ISNONTEXT將返回FALSE,因為空串被視作文字\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISNUMBER',
                't': 15,
                'd': '檢查某個值是否為數位\u3002',
                'a': '檢查某個值是否為數位\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其是否為數位的值\u3002\n\n*如果參數為數位或指向內容為數位值的儲存格的引用,ISNUMBER將返回TRUE,否則返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'ISREF',
                't': 15,
                'd': '檢查某個值是否為有效的儲存格引用\u3002',
                'a': '檢查某個值是否為有效的儲存格引用\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其是否為儲存格引用的值\u3002\n\n*如果參數是有效的儲存格引用,ISREF將返回TRUE,否則返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }]
            },
            {
                'n': 'ISTEXT',
                't': 15,
                'd': '檢查某個值是否為文字\u3002',
                'a': '檢查某個值是否為文字\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要驗證其是否為文字的值\u3002\n\n如果參數為文字值或指向包含文字值的儲存格的引用,ISTEXT將返回TRUE,否則返回FALSE\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TYPE',
                't': 15,
                'd': '返回數值的類型\u3002',
                'a': '返回數值的類型\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要確定其類型的數據\u3002\n\n數位返回1\uFF1B\n\n文字返回2\uFF1B\n\n邏輯值返回4\uFF1B\n\n錯誤值返回16\uFF1B\n\n數組返回64\uFF1B',
                        'example': 'C4',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'N',
                't': 15,
                'd': '返回轉化為數值後的值\u3002',
                'a': '返回轉化為數值後的值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為數位的參數\u3002\n\n如果值為數位,則返回該數位\u3002\n\n如果值為日期,則返回該日期的序號\u3002\n\n如果值為TRUE,則返回1\u3002\n\n如果值為FALSE,則返回0\u3002\n\n如果值為錯誤值,則返回錯誤值\u3002\n\n如果值為其他值,則返回0\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TO_DATE',
                't': 16,
                'd': '將指定的數位轉換為日期\u3002',
                'a': '將指定的數位轉換為日期\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為日期的參數或其儲存格引用\u3002\n\n如果值為數位或指向內容為數值的儲存格的引用,TO_DATE會將值轉換為相應的日期並返回,值代表從十二月30日到對應的日期之間的天數,\n\n負值表示對應的日期在十二月30日之前,而小數值則代表一天中從午夜算起的時間\u3002\n如果值不是數位或指向內容為數值的儲存格的引用,則TO_DATE將在不做任何修改的情况下返回值\u3002',
                        'example': '25405',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'TO_PURE_NUMBER',
                't': 16,
                'd': '將給定的日期/時間\u3001百分比\u3001貨幣金額或其他格式的數值轉換為不帶格式的純數位\u3002',
                'a': '將給定的日期/時間\u3001百分比\u3001貨幣金額或其他格式的數值轉換為不帶格式的純數位\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為純數位的參數或其儲存格引用\u3002\n\n如果值為數位或指向包含數值的儲存格的引用,TO_PURE_NUMBER將以不帶任何格式與解釋的形式返回值\u3002\n\n如果值不是數位或指向內容為數值的儲存格的引用,則TO_PERCENT將在不做任何修改的情况下返回值\u3002',
                        'example': '50%',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TO_TEXT',
                't': 16,
                'd': '將給定的數位值轉換為文本格式\u3002',
                'a': '將給定的數位值轉換為文本格式\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為文字的參數或其儲存格引用\u3002\n\n如果值為數位或指向包含數值的儲存格的引用,TO_TEXT將返回字串形式的值,並保持現有格式\u3002即原為貨幣的仍為貨幣,原為十進位數的仍為十進位數,原為百分比的仍為百分比,原為日期的仍為日期\u3002\n\n如果值不是數位或指向內容為數值的儲存格的引用,則TO_TEXT將在不做任何修改的情况下返回值\u3002',
                        'example': '24',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            {
                'n': 'TO_DOLLARS',
                't': 16,
                'd': '將指定的數位轉換為美元金額\u3002',
                'a': '將指定的數位轉換為美元金額\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為美元金額的參數或其儲存格引用\u3002\n\n如果值不是數位或指向內容為數值的儲存格的引用,則TO_DOLLARS將在不做任何修改的情况下返回值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'TO_PERCENT',
                't': 16,
                'd': '將指定的數位轉換為百分比\u3002',
                'a': '將指定的數位轉換為百分比\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': 'value',
                        'detail': '要轉換為百分比的參數或其儲存格引用\u3002\n\n如果值為數位或指向包含數值的儲存格的引用,TO_PERCENT會以1 = 100%為標準,將值轉換為百分比\u3002\n\n如果值不是數位或指向內容為數值的儲存格的引用,則TO_PERCENT將在不做任何修改的情况下返回值\u3002',
                        'example': 'A2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }]
            },
            {
                'n': 'DGET',
                't': 17,
                'd': '使用SQL式査詢,從清單或資料庫的列中選取符合指定條件的單個值\u3002',
                'a': '使用SQL式査詢,從清單或資料庫的列中選取符合指定條件的單個值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DMAX',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的最大數位\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的最大數位\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DMIN',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的最小數位\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的最小數位\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DAVERAGE',
                't': 17,
                'd': '使用SQL式査詢,對清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數值求平均值\u3002',
                'a': '使用SQL式査詢,對清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數值求平均值\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DCOUNT',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中包含數位的儲存格的個數\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中包含數位的儲存格的個數\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DCOUNTA',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的非空儲存格的個數\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的非空儲存格的個數\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DPRODUCT',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數值的乘積\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數值的乘積\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DSTDEV',
                't': 17,
                'd': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為一個樣本估算出的總體標準差\u3002',
                'a': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為一個樣本估算出的總體標準差\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DSTDEVP',
                't': 17,
                'd': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為樣本總體計算出的總體標準差\u3002',
                'a': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為樣本總體計算出的總體標準差\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DSUM',
                't': 17,
                'd': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位之和\u3002',
                'a': '使用SQL式査詢,返回列表或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位之和\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DVAR',
                't': 17,
                'd': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為一個樣本估算出的總體方差\u3002',
                'a': '使用SQL式査詢,返回利用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位作為一個樣本估算出的總體方差\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'DVARP',
                't': 17,
                'd': '使用SQL式査詢,通過使用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位計算樣本總體的樣本總體方差\u3002',
                'a': '使用SQL式査詢,通過使用清單或資料庫中滿足指定條件的記錄欄位\uFF08列\uFF09中的數位計算樣本總體的樣本總體方差\u3002',
                'm': [
                    3,
                    3
                ],
                'p': [
                    {
                        'name': 'database',
                        'detail': '構成清單或資料庫的儲存格區域,清單的第一行包含每一列的標籤\u3002',
                        'example': 'A2:F20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'field',
                        'detail': '指定database中的哪一列包含要選取和用於計算的值\u3002\n\nfield可以是與database第一行中某個列標題對應的文字標籤,也可以是指定相關列的數位索引,第一列的索引值為1\u3002',
                        'example': 'G2',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'criteria',
                        'detail': '包含所指定條件的儲存格區域\u3002計算之前將使用這些條件來過濾database中的值\u3002',
                        'example': 'A22:D23',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    }
                ]
            },
            {
                'n': 'AGE_BY_IDCARD',
                't': '3',
                'd': '據中國身份證號計算出年齡\u3002支持15位或18位身份證',
                'a': '據中國身份證號計算出年齡',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': '身份證號',
                        'example': 'A1',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '截止日期',
                        'example': '"2017-10-01"',
                        'detail': '年齡計算的截止日期或範圍,默認為當日\u3002',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedatetime'
                    }
                ]
            },
            // SEX_BY_IDCARD
            {
                'n': 'SEX_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出性別\u3002支持15位或18位身份證',
                'a': '根據身份證號得到性別\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // BIRTHDAY_BY_IDCARD
            {
                'n': 'BIRTHDAY_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出生日\u3002支持15位或18位身份證',
                'a': '根據身份證號得到生日\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '生日格式',
                        'example': '0',
                        'detail': '日期類型,默認0:[1900/01/01],1:[1900-01-01],2:[1900年1月1日]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            // PROVINCE_BY_IDCARD
            {
                'n': 'PROVINCE_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出籍貫的省份\u3002支持15位或18位身份證',
                'a': '根據身份證號得到籍貫的省份\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // CITY_BY_IDCARD
            {
                'n': 'CITY_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出籍貫的都市\u3002支持15位或18位身份證',
                'a': '根據身份證號得到籍貫的都市\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // STAR_BY_IDCARD
            {
                'n': 'STAR_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出星座\u3002支持15位或18位身份證',
                'a': '根據身份證號得到星座\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // ANIMAL_BY_IDCARD
            {
                'n': 'ANIMAL_BY_IDCARD',
                't': '3',
                'd': '根據中國身份證號計算出生肖\uFF08鼠\u3001牛\u3001虎\u3001兔\u2026\uFF09\u3002支持15位或18位身份證',
                'a': '根據身份證號得到生肖\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // ISIDCARD
            {
                'n': 'ISIDCARD',
                't': '3',
                'd': '驗證身份證的格式是否正確\u3002支持15位或18位身份證',
                'a': '驗證身份證格式正確性\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '身份證號',
                        'example': '"31033519900101XXXX"',
                        'detail': '15位或者18位的身份證號或範圍\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            // DM_TEXT_CUTWORD
            {
                'n': 'DM_TEXT_CUTWORD',
                't': '4',
                'd': '文字分詞\u3002把一連串文字折開為一系列單獨詞語',
                'a': '中文文字分詞\u3002',
                'm': [
                    1,
                    2
                ],
                'p': [
                    {
                        'name': '文字',
                        'example': '"我來到北京清華大學"',
                        'detail': '任意需要分詞的文字\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '分詞模式',
                        'example': '0',
                        'detail': '默認為0[精確模式]\uFF0C1[全模式]\uFF0C2[搜尋引擎模式]\u3002',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DM_TEXT_TFIDF
            {
                'n': 'DM_TEXT_TFIDF',
                't': '4',
                'd': '採用tf-idf算灋進行關鍵字選取\u3002從一連串文字中識別關鍵字',
                'a': 'tf-idf關鍵字識別\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '文字',
                        'example': '"我來到北京清華大學"',
                        'detail': '任意需要分詞的文字\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '關鍵字個數',
                        'example': '20',
                        'detail': '算灋返回的關鍵字個數\uFF0C默認20',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '語料庫',
                        'example': '1',
                        'detail': '選擇特定領域的語料庫\uFF0C默認0[通用]\uFF0C1[金融]\uFF0C2[醫療]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DM_TEXT_TEXTRANK
            {
                'n': 'DM_TEXT_TEXTRANK',
                't': '4',
                'd': '採用TextRank算灋進行關鍵字選取\u3002從一連串文字中識別關鍵字',
                'a': 'TextRank關鍵字識別\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '文字',
                        'example': '"我來到北京清華大學"',
                        'detail': '任意需要分詞的文字\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '關鍵字個數',
                        'example': '20',
                        'detail': '算灋返回的關鍵字個數\uFF0C默認20',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': '語料庫',
                        'example': '1',
                        'detail': '選擇特定領域的語料庫\uFF0C默認0[通用]\uFF0C1[金融]\uFF0C2[醫療]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_CLOSE
            {
                'n': 'DATA_CN_STOCK_CLOSE',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票收盤價\u3002',
                'a': '返回A股對應股票收盤價\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日\uFF0C默認為最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_OPEN
            {
                'n': 'DATA_CN_STOCK_OPEN',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票開盤價\u3002',
                'a': '返回A股對應股票開盤價\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日\uFF0C默認為最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_MAX
            {
                'n': 'DATA_CN_STOCK_MAX',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票最高價\u3002',
                'a': '返回A股對應股票最高價\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日\uFF0C默認為最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_MIN
            {
                'n': 'DATA_CN_STOCK_MIN',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票最低價\u3002',
                'a': '返回A股對應股票最低價\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日,默认为最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_VOLUMN
            {
                'n': 'DATA_CN_STOCK_VOLUMN',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票成交量\u3002',
                'a': '返回A股對應股票成交量\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日\uFF0C默認為最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // DATA_CN_STOCK_AMOUNT
            {
                'n': 'DATA_CN_STOCK_AMOUNT',
                't': '5',
                'd': '根據股票代碼和日期\uFF0C返回A股對應股票成交額\u3002',
                'a': '返回A股對應股票成交額\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': '股票代碼',
                        'example': '"000001"',
                        'detail': '6位股票代碼\uFF0C必填項\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': '日期',
                        'example': '2015-01-08',
                        'detail': '股票的交易日\uFF0C默認為最新交易日',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangedate'
                    },
                    {
                        'name': '複權除權',
                        'example': '0',
                        'detail': '選擇股票的除權複權類型\uFF0C默認0[前複權]\uFF0C1[原始價格]\uFF0C2[後複權]',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            // ISDATE
            {
                'n': 'ISDATE',
                't': '6',
                'd': '驗證日期的格式是否正確\u3002支持多種日期格式',
                'a': '驗證日期格式正確性\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '日期',
                        'example': '"1990-01-01"',
                        'detail': '日期值,例如1990/01/01, 1990年1月1日等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            },
            //sparklines函数,线图
            {
                'n': 'LINESPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的折線圖sparklines\uFF0C用於描述數據的連續走勢',
                'a': '生成儲存格折線圖',
                'm': [
                    1,
                    8
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍\uFF0C數值才能被有效計算\uFF0C例如A1:A20\uFF0C{1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //lineColor
                    {
                        'name': '線條顏色',
                        'example': '#2ec7c9',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#2ec7c9',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    // {
                    //     "name": "填充顏色",
                    //     "example": '#CCF3F4',
                    //     "detail": "形成面积图,同线条顏色配置,默认0不显示",
                    //     "require": "o",
                    //     "repeat": "n",
                    //     "type": "rangeall"
                    // },
                    //lineWidth
                    {
                        'name': '線條粗細',
                        'example': '1',
                        'detail': '折線圖線段粗細\uFF0C默認為1px',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //normalRangeMin和normalRangeMax设为相同的值,min、max、avg、median需要计算
                    {
                        'name': '輔助線',
                        'example': 'avg',
                        'detail': '一條橫線\uFF0C可以是min\u3001max\u3001avg\u3001median\u3001範圍或自定義數值\uFF0C默認0無',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //normalRangeColor
                    {
                        'name': '輔助線顏色',
                        'example': '#000',
                        'detail': '輔助線的顏色設定\uFF0C同線條顏色配寘\uFF0C默認#000',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //maxSpotColor
                    {
                        'name': '最大值標識',
                        'example': '#fc5c5c',
                        'detail': '標識線圖最大值\uFF0C同線條顏色配寘\uFF0C默認0不顯示',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //minSpotColor
                    {
                        'name': '最小值標識',
                        'example': '#fc5c5c',
                        'detail': '標識線圖最小值\uFF0C同線條顏色配寘\uFF0C默認0不顯示',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //spotRadius
                    {
                        'name': '標識大小',
                        'example': '1.5',
                        'detail': '最大值和最小值的標識大小設定\uFF0C默認為1.5',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines面积图
            {
                'n': 'AREASPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的面積圖sparklines\uFF0C一般用於描述數據的連續累積值走勢',
                'a': '生成儲存格面積圖',
                'm': [
                    1,
                    5
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍\uFF0C數值才能被有效計算\uFF0C例如A1:A20\uFF0C{1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //lineColor
                    {
                        'name': '線條顏色',
                        'example': '#2ec7c9',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#2ec7c9',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //fillColor
                    {
                        'name': '填充顏色',
                        'example': '#CCF3F4',
                        'detail': '形成面積圖\uFF0C同線條顏色配寘\uFF0C默認0不顯示',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //lineWidth
                    {
                        'name': '線條粗細',
                        'example': '1',
                        'detail': '折線圖線段粗細\uFF0C默認為1px',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //normalRangeMin和normalRangeMax设为相同的值,min、max、avg、median需要计算
                    {
                        'name': '輔助線',
                        'example': 'avg',
                        'detail': '一條橫線\uFF0C可以是min\u3001max\u3001avg\u3001median\u3001範圍或自定義數值\uFF0C默認0無',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //normalRangeColor
                    {
                        'name': '輔助線顏色',
                        'example': '#000',
                        'detail': '輔助線的顏色設定\uFF0C同線條顏色配寘\uFF0C默認#000',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }    // //maxSpotColor
                         // {
                         //     "name": "最大值标识",
                         //     "example": '#fc5c5c',
                         //     "detail": "标识线图最大值,同线条顏色配置,默认0不显示",
                         //     "require": "o",
                         //     "repeat": "n",
                         //     "type": "rangeall"
                         // },
                         // //minSpotColor
                         // {
                         //     "name": "最小值标识",
                         //     "example": '#fc5c5c',
                         //     "detail": "标识线图最大值,同线条顏色配置,默认0不显示",
                         //     "require": "o",
                         //     "repeat": "n",
                         //     "type": "rangeall"
                         // },
                         // //spotRadius
                         // {
                         //     "name": "标识大小",
                         //     "example": '1.5',
                         //     "detail": "最大值和最小值的标识大小设置,默认为1.5",
                         //     "require": "o",
                         //     "repeat": "n",
                         //     "type": "rangeall"
                         // }
                ]
            },
            // //maxSpotColor
            // {
            //     "name": "最大值标识",
            //     "example": '#fc5c5c',
            //     "detail": "标识线图最大值,同线条顏色配置,默认0不显示",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // },
            // //minSpotColor
            // {
            //     "name": "最小值标识",
            //     "example": '#fc5c5c',
            //     "detail": "标识线图最大值,同线条顏色配置,默认0不显示",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // },
            // //spotRadius
            // {
            //     "name": "标识大小",
            //     "example": '1.5',
            //     "detail": "最大值和最小值的标识大小设置,默认为1.5",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // }
            //sparklines柱状图
            {
                'n': 'COLUMNSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的垂直柱狀圖sparklines\uFF0C一般用於描述離散數據之間的大小情况',
                'a': '生成儲存格垂直柱狀圖',
                'm': [
                    1,
                    6
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍\uFF0C數值才能被有效計算\uFF0C例如A1:A20\uFF0C{1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barSpacing
                    {
                        'name': '柱條間隔',
                        'example': '1',
                        'detail': '柱條之間的間隔距離\uFF0C默認為1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barColor
                    {
                        'name': '柱條顏色',
                        'example': '#fc5c5c',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#fc5c5c',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //negBarColor
                    {
                        'name': '負向柱條顏色',
                        'example': '#97b552',
                        'detail': '負向柱條顏色設定\uFF0C代表負值的顏色\uFF0C同柱條顏色配寘\uFF0C默認#97b552',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //chartRangeMax
                    {
                        'name': '最大值',
                        'example': '100',
                        'detail': '柱圖最大值\uFF0C用於規範柱圖長度\uFF0C默認為自動計算false\u3001auto\u3001null',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //colorMap
                    {
                        'name': '色板',
                        'example': '#97b552',
                        'detail': '調色板可以單獨設定每個柱條的顏色\uFF0C可設定多個\uFF0C支持兩種格式:1顏色例如#000\uFF0C代表第一個柱的顏色是黑色\uFF1B2數值範圍:顏色\uFF0C例如-2:#000表示數值為-2的柱為黑色\uFF0C0:5:#000表示數值0-5的柱為黑色\uFF0C默認為空',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines累积柱状图
            {
                'n': 'STACKCOLUMNSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的累積垂直柱狀圖sparklines\uFF0C一般用於描述離散數據多個維度的數值大小',
                'a': '生成儲存格累積垂直柱狀圖',
                'm': [
                    1,
                    5
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍\uFF0C數值才能被有效計算\uFF0C例如A1:A20\uFF0C{1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //stackconfig
                    {
                        'name': '按列堆積',
                        'example': '1',
                        'detail': '如果需要按行堆積則本項設為false或0\uFF0C默認為是1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barSpacing
                    {
                        'name': '柱條間隔',
                        'example': '1',
                        'detail': '柱條之間的間隔距離\uFF0C默認為1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //chartRangeMax
                    {
                        'name': '最大值',
                        'example': '100',
                        'detail': '累積柱圖最大值\uFF0C用於規範柱圖長度\uFF0C默認為自動計算false\u3001auto\u3001null',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //stackedBarColor
                    {
                        'name': '累積色板',
                        'example': '#97b552',
                        'detail': '調色板可以單獨設定每個維度的柱條顏色\uFF0C可設定為A1:A10等範圍\uFF0C默認為#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines条形图
            {
                'n': 'BARSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的橫向條形圖sparklines\uFF0C一般用於描述離散數據之間的大小情况',
                'a': '生成儲存格橫向條形圖',
                'm': [
                    1,
                    6
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barSpacing
                    {
                        'name': '柱條間隔',
                        'example': '1',
                        'detail': '柱條之間的間隔距離\uFF0C默認為1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barColor
                    {
                        'name': '柱條顏色',
                        'example': '#fc5c5c',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#fc5c5c',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //negBarColor
                    {
                        'name': '負向柱條顏色',
                        'example': '#97b552',
                        'detail': '負向柱條顏色設定\uFF0C代表負值的顏色\uFF0C同柱條顏色配寘\uFF0C默認#97b552',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //chartRangeMax
                    {
                        'name': '最大值',
                        'example': '100',
                        'detail': '柱圖最大值\uFF0C用於規範柱圖長度\uFF0C默認為自動計算false\u3001auto\u3001null',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //colorMap
                    {
                        'name': '色板',
                        'example': '#97b552',
                        'detail': '調色板可以單獨設定每個柱條的顏色\uFF0C可設定多個\uFF0C支持兩種格式:1顏色例如#000\uFF0C代表第一個柱的顏色是黑色\uFF1B2數值範圍:顏色\uFF0C例如-2:#000表示數值為-2的柱為黑色\uFF0C0:5:#000表示數值0-5的柱為黑色\uFF0C默認為空',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines累积条形图
            {
                'n': 'STACKBARSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的累積橫向條形圖sparklines\uFF0C一般用於描述離散數據多個維度的數值大小',
                'a': '生成儲存格累積橫向條形圖',
                'm': [
                    1,
                    5
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //stackconfig
                    {
                        'name': '按列堆積',
                        'example': '1',
                        'detail': '如果需要按行堆積則本項設為false或0\uFF0C默認為是1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barSpacing
                    {
                        'name': '柱條間隔',
                        'example': '1',
                        'detail': '柱條之間的間隔距離\uFF0C默認為1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //chartRangeMax
                    {
                        'name': '最大值',
                        'example': '100',
                        'detail': '累積柱圖最大值\uFF0C用於規範柱圖長度\uFF0C默認為自動計算false\u3001auto\u3001null',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //stackedBarColor
                    {
                        'name': '累積色板',
                        'example': '#97b552',
                        'detail': '調色板可以單獨設定每個維度的柱條顏色\uFF0C可設定為A1:A10等範圍\uFF0C默認為#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines离散图
            {
                'n': 'DISCRETESPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的離散圖sparklines\uFF0C一般用於描述離散數據走勢',
                'a': '生成儲存格離散圖',
                'm': [
                    1,
                    4
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //thresholdValue
                    {
                        'name': '分割閾值',
                        'example': '1',
                        'detail': '離散圖柱形顏色的區分\uFF0C例如:該值為0\uFF0C則大於0為藍色\uFF0C小於0為紅色\uFF0C默認為0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //lineColor
                    {
                        'name': '閾值以上顏色',
                        'example': '#2ec7c9',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#2ec7c9',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //thresholdColor
                    {
                        'name': '閾值以下顏色',
                        'example': '#fc5c5c',
                        'detail': '閾值以下柱條顏色設定\uFF0C同閾值以上顏色\uFF0C默認#fc5c5c',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines三态图
            {
                'n': 'TRISTATESPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的三態圖sparklines\uFF0C一般用於描述三種態勢的走勢例如勝負平',
                'a': '生成儲存格三態圖',
                'm': [
                    1,
                    6
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //barSpacing
                    {
                        'name': '柱條間隔',
                        'example': '1',
                        'detail': '柱條之間的間隔距離\uFF0C默認為1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //posBarColor
                    {
                        'name': '柱條顏色',
                        'example': '#fc5c5c',
                        'detail': '線圖的線條顏色\uFF0C可以是否個範圍A1\u3001色錶索引數值或者具體顏色值\uFF0C設定為0或false則不顯示\uFF0C支持regx\u3001rgb\u3001rgba等\u3002默認#fc5c5c',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //negBarColor
                    {
                        'name': '负向柱條顏色',
                        'example': '#97b552',
                        'detail': '負向柱條顏色設定\uFF0C代表負值的顏色\uFF0C同柱條顏色配寘\uFF0C默認#97b552',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //zeroBarColor
                    {
                        'name': '零值柱條顏色',
                        'example': '#999',
                        'detail': '零值柱條顏色設定\uFF0C代表0值顏色\uFF0C同柱條顏色配寘\uFF0C默認#999',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //colorMap
                    {
                        'name': '色板',
                        'example': '#97b552',
                        'detail': '調色板可以單獨設定每個柱條的顏色\uFF0C可設定多個\uFF0C支持兩種格式:1顏色例如#000\uFF0C代表第一個柱的顏色是黑色\uFF1B2數值範圍:顏色\uFF0C例如-2:#000表示數值為-2的柱為黑色\uFF0C0-5:#000表示數值0-5的柱為黑色\uFF0C默認為空',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines饼图
            {
                'n': 'PIESPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的餅圖sparklines\uFF0C一般用於描述數據占比',
                'a': '生成儲存格餅圖',
                'm': [
                    1,
                    5
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //offset
                    {
                        'name': '旋轉角度',
                        'example': '0',
                        'detail': '餅圖的旋轉角度\uFF0C默認為0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //borderWidth
                    {
                        'name': '餅圖邊框',
                        'example': '0',
                        'detail': '餅圖邊框大小\uFF0C默認為無0',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //borderColor
                    {
                        'name': '邊框顏色',
                        'example': '#000',
                        'detail': '餅圖邊框顏色\uFF0C默認為#000',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //sliceColors
                    {
                        'name': '餅圖色板',
                        'example': '#97b552',
                        'detail': '調色板可以設定切片的顏色\uFF0C可設定為A1:A10等範圍\uFF0C默認為#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines箱线图
            {
                'n': 'BOXSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的箱線圖sparklines\uFF0C一般用於描述數據集的統計分佈',
                'a': '生成儲存格箱線圖',
                'm': [
                    1,
                    4
                ],
                'p': [
                    //data
                    {
                        'name': '數據範圍',
                        'example': 'A1:A20',
                        'detail': '數據範圍,數值才能被有效計算\uFF0C例如A1:A20, {1,2,3,4,5}等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //outlierIQR,如果为0或false则showOutliers设为false,否则为true
                    {
                        'name': '離群點比例',
                        'example': '1.5',
                        'detail': '離群點的閾值範圍\uFF0C如果為0或false則不顯示\uFF0C默認為1.5倍',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //target
                    {
                        'name': '目標點值',
                        'example': '10',
                        'detail': '箱線圖上的目標值設定\uFF0C默認為false不顯示',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //spotRadius
                    {
                        'name': '數據點大小',
                        'example': '1.5',
                        'detail': '目標點和離群點的半徑大小設定\uFF0C默認為1.5',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines子弹图
            {
                'n': 'BULLETSPLINES',
                't': '3',
                'd': '生成嵌入在儲存格內的子彈圖sparklines\uFF0C一般用於描述任務達成率',
                'a': '生成儲存格子彈圖',
                'm': [
                    2,
                    3
                ],
                'p': [
                    //目标data1
                    {
                        'name': '目標',
                        'example': '10',
                        'detail': '達成的目標值\uFF0C數值才能被有效計算\uFF0C例如A1\uFF0C100等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //目前达成data2
                    {
                        'name': '實際完成',
                        'example': '8',
                        'detail': '現時完成值\uFF0C數值才能被有效計算\uFF0C例如A1\uFF0C100等\u3002',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    //对比值datax
                    {
                        'name': '對比值',
                        'example': '12',
                        'detail': '對比值\uFF0C例如超額\u3001最低\u3001獲獎底線等\uFF0C數值才能被有效計算\uFF0C例如A1\uFF0C100等\u3002可以設定最多9個對比值',
                        'require': 'o',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }
                ]
            },
            //sparklines组合图,支持多個类型的图画在同一個单元格
            {
                'n': 'COMPOSESPLINES',
                't': '3',
                'd': '支持多個類型的圖畫在同一個儲存格\uFF0C每個參數代表一個sparklines圖',
                'a': '組合sparklines圖到一個儲存格',
                'm': [
                    1,
                    1
                ],
                'p': [//data
                    {
                        'name': '圖設定',
                        'example': 'PIESPLINES(A1:A20)',
                        'detail': 'sparklines圖設定\uFF0C例如A1:A20\uFF0C一個完成的餅圖\u3001線圖設定等\u3002',
                        'require': 'm',
                        'repeat': 'y',
                        'type': 'rangeall'
                    }]
            },
            //动态数组公式
            {
                'n': 'SORT',
                't': '14',
                'd': '返回數組中元素的排序數組\u3002返回的數組與提供的數組參數形狀相同\u3002',
                'a': '返回數組中元素的排序數組\u3002返回的數組與提供的數組參數形狀相同\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '要排序的範圍或數組\u3002',
                        'example': 'A2:A17',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'sort_index',
                        'detail': '[可選] - 表示要排序的行或列的數位\u3002\uFF08默認row1/col1\uFF09',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'sort_order',
                        'detail': '[可選] - 表示所需排序順序的數位\uFF1B1表示昇冪\uFF08默認\uFF09\uFF0C-1表示降序\u3002',
                        'example': '-1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'by_col',
                        'detail': '[可選] - 表示所需排序方向的邏輯值\uFF1B按行排序為FALSE\uFF08\uFF09\uFF08默認\uFF09\uFF0C按列排序為TRUE\uFF08\uFF09\u3002',
                        'example': 'TRUE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'FILTER',
                't': '14',
                'd': '基於一個布林\uFF08真/假\uFF09數組過濾一個數組\u3002',
                'a': '基於一個布林\uFF08真/假\uFF09數組過濾一個數組\u3002',
                'm': [
                    2,
                    3
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '要篩選的數組或範圍\u3002',
                        'example': 'A5:D20',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'include',
                        'detail': '布林數組\uFF0C其高度或寬度與數組相同',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'range'
                    },
                    {
                        'name': 'if_empty',
                        'detail': '[可選] - 如果包含數組中的所有值都為空\uFF08filter不返回任何值\uFF09\uFF0C則返回的值\u3002',
                        'example': '""',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'UNIQUE',
                't': '14',
                'd': '返回列表或區域中的唯一值的清單\u3002',
                'a': '返回列表或區域中的唯一值的清單\u3002',
                'm': [
                    1,
                    3
                ],
                'p': [
                    {
                        'name': 'array',
                        'detail': '從其返回唯一值的數組或區域\u3002',
                        'example': 'A2:B26',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'by_col',
                        'detail': '[可選] - 邏輯值\uFF0C訓示如何比較\uFF1B按行= FALSE\uFF08\uFF09或省略\uFF1B按列= TRUE\uFF08\uFF09\u3002',
                        'example': 'TRUE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    },
                    {
                        'name': 'occurs_once',
                        'detail': '[可選] - 邏輯值\uFF0C僅返回唯一值中出現一次= TRUE\uFF08\uFF09\uFF1B包括所有唯一值= FALSE\uFF08\uFF09或省略\u3002',
                        'example': 'FALSE()',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }
                ]
            },
            {
                'n': 'RANDARRAY',
                't': '14',
                'd': '返回0到1之間的隨機數位數組\u3002',
                'a': '返回0到1之間的隨機數位數組',
                'm': [
                    0,
                    2
                ],
                'p': [
                    {
                        'name': 'rows',
                        'detail': '[可選] - 要返回的行數\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cols',
                        'detail': '[可選] - 要返回的列數\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'SEQUENCE',
                't': '14',
                'd': '生成數位序列的清單\u3002',
                'a': '生成數位序列的清單\u3002',
                'm': [
                    1,
                    4
                ],
                'p': [
                    {
                        'name': 'rows',
                        'detail': '要返回的行數\u3002',
                        'example': '1',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'cols',
                        'detail': '[可選] - 要返回的列數\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'start',
                        'detail': '[可選] - 序列中的第一個數位\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    },
                    {
                        'name': 'step',
                        'detail': '[可選] -序列中每個序列值的增量\u3002',
                        'example': '1',
                        'require': 'o',
                        'repeat': 'n',
                        'type': 'rangenumber'
                    }
                ]
            },
            {
                'n': 'EVALUATE',
                't': '3',
                'd': '對以文字表示的公式或者表達式求值\uFF0C並返回結果\u3002',
                'a': '根據文字公式或者表達式求值\u3002',
                'm': [
                    1,
                    1
                ],
                'p': [{
                        'name': '公式',
                        'example': '"A1+5*2^2"',
                        'detail': '公式或表達式',
                        'require': 'm',
                        'repeat': 'n',
                        'type': 'rangeall'
                    }]
            }
        ],
        toolbar: {
            undo: '撤銷',
            redo: '重做',
            paintFormat: '格式刷',
            currencyFormat: '貨幣格式',
            percentageFormat: '百分比格式',
            numberDecrease: '减少小數位數',
            numberIncrease: '新增小數位數',
            moreFormats: '更多格式',
            font: '字體',
            fontSize: '字型大小',
            bold: '粗體\uFF08Ctrl+B\uFF09',
            italic: '斜體\uFF08Ctrl+I\uFF09',
            strikethrough: '删除線\uFF08Alt+Shift+5\uFF09',
            underline: '底線',
            textColor: '文字顏色',
            chooseColor: '顏色選擇',
            resetColor: '重置顏色',
            customColor: '自定義',
            alternatingColors: '交替顏色',
            confirmColor: '確定顏色',
            cancelColor: '取消',
            collapse: '收起',
            fillColor: '儲存格顏色',
            border: '邊框',
            borderStyle: '邊框類型',
            mergeCell: '合併儲存格',
            chooseMergeType: '選擇合併類型',
            horizontalAlign: '水准對齊',
            verticalAlign: '垂直對齊',
            alignment: '對齊管道',
            textWrap: '文字換行',
            textWrapMode: '換行管道',
            textRotate: '文字旋轉',
            textRotateMode: '旋轉管道',
            freezeTopRow: '凍結首行',
            sortAndFilter: '排序和篩選',
            findAndReplace: '查找替換',
            sum: '求和',
            autoSum: '自動求和',
            moreFunction: '更多函數',
            conditionalFormat: '條件格式',
            postil: '批註',
            pivotTable: '數據透視錶',
            chart: '圖表',
            screenshot: '截圖',
            splitColumn: '分列',
            insertImage: '插入圖片',
            insertLink: '插入連結',
            dataVerification: '數據驗證',
            protection: '保護工作表內容',
            clearText: '清除顏色選擇',
            noColorSelectedText: '沒有顏色被選擇',
            toolMore: '更多',
            toolLess: '少於',
            toolClose: '收起',
            toolMoreTip: '更多功能',
            moreOptions: '更多選項',
            cellFormat: '設定儲存格格式',
            print: '列印'
        },
        alternatingColors: {
            applyRange: '應用範圍',
            selectRange: '選擇應用範圍',
            header: '頁眉',
            footer: '頁腳',
            errorInfo: '不能對多重選擇區域執行此操作,請選擇單個區域,然後再試',
            textTitle: '格式樣式',
            custom: '自定義',
            close: '關閉',
            selectionTextColor: '選擇文字顏色',
            selectionCellColor: '選擇儲存格顏色',
            removeColor: '移除交替顏色',
            colorShow: '顏色',
            currentColor: '當前顏色',
            tipSelectRange: '請選擇交替顏色應用範圍',
            errorNoRange: '您選擇的應用範圍不是選區\uFF01',
            errorExistColors: '您選擇的應用範圍已存在交替顏色且不屬於你要編輯的應用範圍\uFF01'
        },
        button: {
            confirm: '確定',
            cancel: '取消',
            close: '關閉',
            update: 'Update',
            delete: 'Delete',
            insert: '新建'
        },
        paint: {
            start: '格式刷開啟',
            end: 'ESC鍵退出',
            tipSelectRange: '請選擇需要複製格式的區域',
            tipNotMulti: '無法對多重選擇區域執行此操作'
        },
        format: {
            moreCurrency: '更多貨幣格式',
            moreDateTime: '更多日期與時間格式',
            moreNumber: '更多數位格式',
            titleCurrency: '貨幣格式',
            decimalPlaces: '小數位數',
            titleDateTime: '日期與時間格式',
            titleNumber: '數位格式'
        },
        info: {
            detailUpdate: '新打開',
            detailSave: '已恢復本地緩存',
            row: '行',
            column: '列',
            loading: '渲染中',
            copy: '副本',
            return: '返回',
            rename: '重命名',
            tips: '表格重命名',
            noName: '無標題的試算表',
            wait: '待更新',
            add: '添加',
            addLast: '在底部添加',
            backTop: '回到頂部',
            pageInfo: '共${total}條,${totalPage}頁,當前已顯示${currentPage}頁',
            nextPage: '下一頁',
            tipInputNumber: '請輸入數位',
            tipInputNumberLimit: '新增範圍限制在1-100',
            tipRowHeightLimit: '行高必須在0 ~ 545之間',
            tipColumnWidthLimit: '列寬必須在0 ~ 2038之間',
            pageInfoFull: '共${total}條,${totalPage}頁,已顯示全部數據'
        },
        currencyDetail: {
            RMB: '人民幣',
            USdollar: '美元',
            EUR: '歐元',
            GBP: '英鎊',
            HK: '港元',
            JPY: '日元',
            AlbanianLek: '阿爾巴尼亞列克',
            AlgerianDinar: '阿爾及利亞第納爾',
            Afghani: '阿富汗尼',
            ArgentinePeso: '阿根廷比索',
            UnitedArabEmiratesDirham: '阿拉伯聯合大公國迪拉姆',
            ArubanFlorin: '阿魯巴弗羅林',
            OmaniRial: '阿曼裡亞爾',
            Azerbaijanimanat: '阿塞拜疆馬納特',
            EgyptianPound: '埃及鎊',
            EthiopianBirr: '衣索比亞比爾',
            AngolaKwanza: '安哥拉寬紮',
            AustralianDollar: '澳大利亞元',
            Patacas: '澳門元',
            BarbadosDollar: '巴巴多斯元',
            PapuaNewGuineaKina: '巴布亞新幾內亞基那',
            BahamianDollar: '巴哈馬元',
            PakistanRupee: '巴基斯坦盧比',
            ParaguayanGuarani: '巴拉圭瓜拉尼',
            BahrainiDinar: '巴林第納爾',
            PanamanianBalboa: '巴拿馬巴波亞',
            Brazilianreal: '巴西裏亞伊',
            Belarusianruble: '白俄羅斯盧布',
            BermudianDollar: '百慕大元',
            BulgarianLev: '保加利亞列弗',
            IcelandKrona: '冰島克朗',
            BosniaHerzegovinaConvertibleMark: '波黑可兌換馬克',
            PolishZloty: '波蘭茲羅提',
            Boliviano: '玻利維亞諾',
            BelizeDollar: '貝裡斯元',
            BotswanaPula: '波劄那普拉',
            NotDannuzhamu: '不丹努紮姆',
            BurundiFranc: '布隆迪法郎',
            NorthKoreanWon: '朝鮮圓',
            DanishKrone: '丹麥克朗',
            EastCaribbeanDollar: '東加勒比元',
            DominicaPeso: '多明尼加比索',
            RussianRuble: '俄國盧布',
            EritreanNakfa: '厄利垂亞納克法',
            CFAfranc: '非洲金融共同體法郎',
            PhilippinePeso: '菲律賓比索',
            FijiDollar: '斐濟元',
            CapeVerdeEscudo: '佛得角埃斯庫多',
            FalklandIslandsPound: '福克蘭群島鎊',
            GambianDalasi: '岡比亞達拉西',
            Congolesefranc: '剛果法郎',
            ColombianPeso: '哥倫比亞比索',
            CostaRicanColon: '哥斯大黎加科朗',
            CubanPeso: '古巴比索',
            Cubanconvertiblepeso: '古巴可兌換比索',
            GuyanaDollar: '蓋亞那元',
            KazakhstanTenge: '哈薩克共和國堅戈',
            Haitiangourde: '海地古德',
            won: '韓元',
            NetherlandsAntillesGuilder: '荷屬安的列斯盾',
            Honduraslempiras: '洪都拉斯拉倫皮拉',
            DjiboutiFranc: '吉布提法郎',
            KyrgyzstanSom: '吉爾吉斯斯坦索姆',
            GuineaFranc: '幾內亞法郎',
            CanadianDollar: '加拿大元',
            GhanaianCedi: '加納塞地',
            Cambodianriel: '高棉瑞爾',
            CzechKoruna: '捷克克朗',
            ZimbabweDollar: '辛巴威元',
            QatariRiyal: '卡塔爾裡亞爾',
            CaymanIslandsDollar: '開曼群島元',
            Comorianfranc: '科摩羅法郎',
            KuwaitiDinar: '科威特第納爾',
            CroatianKuna: '克羅地亞庫納',
            KenyanShilling: '肯雅先令',
            LesothoLoti: '萊索托洛蒂',
            LaoKip: '老撾基普',
            LebanesePound: '黎巴嫩鎊',
            Lithuanianlitas: '立陶宛立特',
            LibyanDinar: '利比亞第納爾',
            LiberianDollar: '利比亞元',
            RwandaFranc: '盧安達法郎',
            RomanianLeu: '羅馬尼亞列伊',
            MalagasyAriary: '馬拉加西阿裏亞裏',
            MaldivianRufiyaa: '瑪律地夫拉菲亞',
            MalawiKwacha: '馬拉威克瓦查',
            MalaysianRinggit: '馬來西亞林吉特',
            MacedoniawearingDinar: '馬其頓戴第納爾',
            MauritiusRupee: '模裡西斯盧比',
            MauritanianOuguiya: '茅利塔尼亞烏吉亞',
            MongolianTugrik: '蒙古圖格裡克',
            BangladeshiTaka: '孟加拉塔卡',
            PeruvianNuevoSol: '秘魯新索爾',
            MyanmarKyat: '緬甸開亞特',
            MoldovanLeu: '莫爾達瓦列伊',
            MoroccanDirham: '摩洛哥迪拉姆',
            MozambiqueMetical: '莫三比克梅蒂卡爾',
            MexicanPeso: '墨西哥比索',
            NamibianDollar: '納米比亞元',
            SouthAfricanRand: '南非蘭特',
            SouthSudanesePound: '南蘇丹鎊',
            NicaraguaCordoba: '尼加拉瓜科多巴',
            NepaleseRupee: '尼泊爾盧比',
            NigerianNaira: '奈及利亞奈拉',
            NorwegianKrone: '挪威克朗',
            GeorgianLari: '喬治亞拉瑞',
            RMBOffshore: '人民幣\uFF08離岸\uFF09',
            SwedishKrona: '瑞典克朗',
            SwissFranc: '瑞士法郎',
            SerbianDinar: '塞爾維亞第納爾',
            SierraLeone: '塞拉里昂利昂',
            SeychellesRupee: '塞舌耳盧比',
            SaudiRiyal: '沙特裡亞爾',
            SaoTomeDobra: '聖多美多布拉',
            SaintHelenapound: '聖赫倫那群島磅',
            SriLankaRupee: '斯里蘭卡盧比',
            SwazilandLilangeni: '史瓦濟蘭裏蘭吉尼',
            SudanesePound: '蘇丹鎊',
            Surinamesedollar: '蘇利南元',
            SolomonIslandsDollar: '所羅門群島元',
            SomaliShilling: '索馬利亞先令',
            TajikistanSomoni: '塔吉克共和國索莫尼',
            PacificFranc: '太平洋法郎',
            ThaiBaht: '泰國銖',
            TanzanianShilling: '坦尚尼亞先令',
            TonganPaanga: '東加潘加',
            TrinidadandTobagoDollar: '千裡達托貝哥元',
            TunisianDinar: '突尼斯第納爾',
            TurkishLira: '土耳其里拉',
            VanuatuVatu: '瓦努阿圖瓦圖',
            GuatemalanQuetzal: '瓜地馬拉格查爾',
            CommissionBolivar: '委內瑞拉博利瓦',
            BruneiDollar: '汶萊元',
            UgandanShilling: '烏干達先令',
            UkrainianHryvnia: '烏克蘭格裡夫尼亞',
            UruguayanPeso: '烏拉圭比索',
            Uzbekistansom: '烏茲別克蘇姆',
            WesternSamoaTala: '薩摩亞塔拉',
            SingaporeDollar: '新加坡元',
            NT: '新臺幣',
            NewZealandDollar: '新西蘭元',
            HungarianForint: '匈牙利福林',
            SyrianPound: '敘利亞鎊',
            JamaicanDollar: '牙買加元',
            ArmenianDram: '亞美尼亞德拉姆',
            YemeniRial: '葉門裡亞爾',
            IraqiDinar: '伊拉克第納爾',
            IranianRial: '伊朗裡亞爾',
            NewIsraeliShekel: '以色列新謝克爾',
            IndianRupee: '印度盧比',
            IndonesianRupiah: '印尼盧比',
            JordanianDinar: '約旦第納爾',
            VND: '越南盾',
            ZambianKwacha: '尚比亞克瓦查',
            GibraltarPound: '直布羅陀鎊',
            ChileanPeso: '智利比索',
            CFAFrancBEAC: '中非金融合作法郎'
        },
        defaultFmt: [
            {
                'text': '自動',
                'value': 'General',
                'example': ''
            },
            {
                'text': '純文字',
                'value': '@',
                'example': ''
            },
            {
                'text': '',
                'value': 'split',
                'example': ''
            },
            {
                'text': '數位',
                'value': '##0.00',
                'example': '1000.12'
            },
            {
                'text': '百分比',
                'value': '#0.00%',
                'example': '12.21%'
            },
            {
                'text': '科學計數',
                'value': '0.00E+00',
                'example': '1.01E+5'
            },
            {
                'text': '',
                'value': 'split',
                'example': ''
            },
            {
                'text': '會計',
                'value': '\xA5(0.00)',
                'example': '\xA5(1200.09)'
            },
            //{ "text": "財務", "value": "(#.####)", "example": "(1200.09)" },
            {
                'text': '萬元',
                'value': 'w',
                'example': '1亿2000万2500'
            },
            {
                'text': '貨幣',
                'value': '\xA50.00',
                'example': '\xA51200.09'
            },
            //{ "text": "貨幣整數", "value": "¥####", "example": "¥1200" },
            {
                'text': '萬元2位小數',
                'value': 'w0.00',
                'example': '2万2500.55'
            },
            {
                'text': '',
                'value': 'split',
                'example': ''
            },
            {
                'text': '日期',
                'value': 'yyyy-MM-dd',
                'example': '2017-11-29'
            },
            {
                'text': '時間',
                'value': 'hh:mm AM/PM',
                'example': '3:00 PM'
            },
            {
                'text': '時間24H',
                'value': 'hh:mm',
                'example': '15:00'
            },
            {
                'text': '日期時間',
                'value': 'yyyy-MM-dd hh:mm AM/PM',
                'example': '2017-11-29 3:00 PM'
            },
            {
                'text': '日期時間24H',
                'value': 'yyyy-MM-dd hh:mm',
                'example': '2017-11-29 15:00'
            },
            {
                'text': '',
                'value': 'split',
                'example': ''
            },
            {
                'text': '自定義格式',
                'value': 'fmtOtherSelf',
                'example': 'more'
            }
        ],
        dateFmtList: [
            {
                'name': '1930-08-05',
                'value': 'yyyy-MM-dd'
            },
            {
                'name': '1930/8/5',
                'value': 'yyyy/MM/dd'
            },
            {
                'name': '1930年8月5日',
                'value': 'yyyy"年"M"月"d"日"'
            },
            {
                'name': '08-05',
                'value': 'MM-dd'
            },
            {
                'name': '8-5',
                'value': 'M-d'
            },
            {
                'name': '8月5日',
                'value': 'M"月"d"日"'
            },
            {
                'name': '13:30:30',
                'value': 'h:mm:ss'
            },
            {
                'name': '13:30',
                'value': 'h:mm'
            },
            {
                'name': '下午01:30',
                'value': '上午/下午 hh:mm'
            },
            {
                'name': '下午1:30',
                'value': '上午/下午 h:mm'
            },
            {
                'name': '下午1:30:30',
                'value': '上午/下午 h:mm:ss'
            },
            {
                'name': '08-05 下午01:30',
                'value': 'MM-dd 上午/下午 hh:mm'
            }
        ],
        // {
        //     "name": "1930年8月5日星期二",
        //     "value": ''
        // },
        // {
        //     "name": "1930年8月5日星期二 下午1:30:30",
        //     "value": ''
        // },
        fontFamily: { MicrosoftYaHei: 'Microsoft YaHei' },
        fontarray: [
            'Times New Roman',
            'Arial',
            'Tahoma',
            'Verdana',
            '微軟雅黑',
            '宋體',
            '黑體',
            '楷體',
            '仿宋',
            '新宋體',
            '華文新魏',
            '華文行楷',
            '華文隸書'
        ],
        fontjson: {
            'times new roman': 0,
            'arial': 1,
            'tahoma': 2,
            'verdana': 3,
            '微軟雅黑': 4,
            'microsoft yahei': 4,
            '宋體': 5,
            'simsun': 5,
            '黑體': 6,
            'simhei': 6,
            '楷體': 7,
            'kaiti': 7,
            '仿宋': 8,
            'fangsong': 8,
            '新宋體': 9,
            'nsimsun': 9,
            '華文新魏': 10,
            'stxinwei': 10,
            '華文行楷': 11,
            'stxingkai': 11,
            '華文隸書': 12,
            'stliti': 12
        },
        border: {
            borderTop: '上框線',
            borderBottom: '下框線',
            borderLeft: '左框線',
            borderRight: '右框線',
            borderNone: '無',
            borderAll: '所有',
            borderOutside: '外側',
            borderInside: '內側',
            borderHorizontal: '內側橫線',
            borderVertical: '內側分隔號',
            borderColor: '邊框顏色',
            borderSize: '邊框粗細'
        },
        merge: {
            mergeAll: '全部合併',
            mergeV: '垂直合併',
            mergeH: '水平合併',
            mergeCancel: '取消合併',
            overlappingError: '不能合併重疊區域',
            partiallyError: '無法對部分合併儲存格執行此操作'
        },
        align: {
            left: '左對齊',
            center: '中間對齊',
            right: '右對齊',
            top: '頂部對齊',
            middle: '居中對齊',
            bottom: '底部對齊'
        },
        textWrap: {
            'overflow': '溢出',
            'wrap': '自動換行',
            'clip': '截斷'
        },
        rotation: {
            'none': '無旋轉',
            'angleup': '向上傾斜',
            'angledown': '向下傾斜',
            'vertical': '豎排文字',
            'rotationUp': '向上90\xB0',
            'rotationDown': '向下90\xB0'
        },
        freezen: {
            default: '凍結首行',
            freezenRow: '凍結首行',
            freezenColumn: '凍結首列',
            freezenRC: '凍結行列',
            freezenRowRange: '凍結行到選區',
            freezenColumnRange: '凍結列到選區',
            freezenRCRange: '凍結行列到選區',
            freezenCancel: '取消凍結',
            noSeletionError: '没有選區'
        },
        sort: {
            'asc': '昇冪',
            'desc': '降序',
            'custom': '自定義排序',
            'hasTitle': '數據具有標題行',
            'sortBy': '排序依據',
            'addOthers': '添加其他排序列',
            'close': '關閉',
            'confirm': '排序',
            'columnOperation': '列',
            'secondaryTitle': '次要排序',
            'sortTitle': '排序範圍',
            'sortRangeTitle': '排序範圍從',
            'sortRangeTitleTo': '到',
            'noRangeError': '不能對多重選擇區域執行此操作,請選擇單個區域,然後再試',
            'mergeError': '選區有合併儲存格,無法執行此操作\uFF01'
        },
        filter: {
            'filter': '篩選',
            'clearFilter': '清除篩選',
            sortByAsc: '以A-Z昇冪排列',
            sortByDesc: '以Z-A降序排列',
            filterByColor: '按顏色篩選',
            filterByCondition: '按條件過濾',
            filterByValues: '按值過濾',
            filiterInputNone: '無',
            filiterInputTip: '輸入篩選值',
            filiterRangeStartTip: '範圍開始',
            filiterRangeEndTip: '範圍结束',
            filterValueByAllBtn: '全選',
            filterValueByClearBtn: '清除',
            filterValueByInverseBtn: '反選',
            filterValueByTip: '按照值進行篩選',
            filterConform: '確 認',
            filterCancel: '取 消',
            clearFilter: '清除篩選',
            conditionNone: '無',
            conditionCellIsNull: '儲存格為空',
            conditionCellNotNull: '儲存格有數據',
            conditionCellTextContain: '文字包含',
            conditionCellTextNotContain: '文字不包含',
            conditionCellTextStart: '文字開頭為',
            conditionCellTextEnd: '文字結尾為',
            conditionCellTextEqual: '文字等於',
            conditionCellDateEqual: '日期等於',
            conditionCellDateBefore: '日期早於',
            conditionCellDateAfter: '日期晚於',
            conditionCellGreater: '大於',
            conditionCellGreaterEqual: '大於等於',
            conditionCellLess: '小於',
            conditionCellLessEqual: '小于等於',
            conditionCellEqual: '等於',
            conditionCellNotEqual: '不等於',
            conditionCellBetween: '介於',
            conditionCellNotBetween: '不在其中',
            filiterMoreDataTip: '數據量大\uFF01請稍後',
            filiterMonthText: '月',
            filiterYearText: '年',
            filiterByColorTip: '按儲存格顏色篩選',
            filiterByTextColorTip: '按儲存格字體顏色篩選',
            filterContainerOneColorTip: '本列僅包含一種顏色',
            filterDateFormatTip: '日期格式',
            valueBlank: '(空白)',
            mergeError: '篩選選區有合併儲存格,無法執行此操作\uFF01'
        },
        rightclick: {
            copy: '複製',
            copyAs: '複製為',
            paste: '粘貼',
            insert: '插入',
            delete: '删除',
            deleteCell: '删除儲存格',
            deleteSelected: '删除選中',
            hide: '隱藏',
            hideSelected: '隱藏選中',
            showHide: '顯示隱藏',
            to: '向',
            left: '左',
            right: '右',
            top: '上',
            bottom: '下',
            moveLeft: '左移',
            moveUp: '上移',
            add: '新增',
            row: '行',
            column: '列',
            width: '寬',
            height: '高',
            number: '數位',
            confirm: '確認',
            orderAZ: 'A-Z順序排列',
            orderZA: 'Z-A降序排列',
            clearContent: '清除內容',
            matrix: '矩陣操作選區',
            sortSelection: '排序選區',
            filterSelection: '篩選選區',
            chartGeneration: '圖表生成',
            firstLineTitle: '首行為標題',
            untitled: '無標題',
            array1: '一維數組',
            array2: '二維陣列',
            array3: '多元數組',
            diagonal: '對角線',
            antiDiagonal: '反對角線',
            diagonalOffset: '對角偏移',
            offset: '偏移量',
            boolean: '布林值',
            flip: '翻轉',
            upAndDown: '上下',
            leftAndRight: '左右',
            clockwise: '順時針',
            counterclockwise: '逆時針',
            transpose: '轉置',
            matrixCalculation: '矩陣計算',
            plus: '加',
            minus: '减',
            multiply: '乘',
            divided: '除',
            power: '次方',
            root: '次方根',
            log: 'log',
            delete0: '删除兩端0值',
            removeDuplicate: '删除重複值',
            byRow: '按行',
            byCol: '按列',
            generateNewMatrix: '生成新矩陣'
        },
        comment: {
            'insert': '新建批註',
            'edit': '編輯批註',
            'delete': '删除',
            'showOne': '顯示/隱藏批註',
            'showAll': '顯示/隱藏所有批註'
        },
        screenshot: {
            screenshotTipNoSelection: '請框選需要截圖的範圍',
            screenshotTipTitle: '提示\uFF01',
            screenshotTipHasMerge: '無法對合併儲存格執行此操作',
            screenshotTipHasMulti: '無法對多重選擇區域執行此操作',
            screenshotTipSuccess: '截取成功',
            screenshotImageName: '截圖',
            downLoadClose: '關閉',
            downLoadCopy: '複製到剪切板',
            downLoadBtn: '下載',
            browserNotTip: '下載功能IE瀏覽器不支持\uFF01',
            rightclickTip: "請在圖片上右鍵點擊'複製'",
            successTip: "已成功複製\uFF08如果粘貼失敗,請在圖片上右鍵點擊'複製圖片'\uFF09"
        },
        splitText: {
            splitDelimiters: '分割符號',
            splitOther: '其它',
            splitContinueSymbol: '連續分隔符號視為單個處理',
            splitDataPreview: '數據預覽',
            splitTextTitle: '文字分列',
            splitConfirmToExe: '此處已有數據,是否替換它\uFF1F',
            tipNoMulti: '能對多重選擇區域執行此操作,請選擇單個區域,然後再試',
            tipNoMultiColumn: '一次只能轉換一列數據,選定區域可以有多行,但不能有多列,請在選定單列區域以後再試'
        },
        imageText: {
            imageSetting: '圖片設定',
            close: '關閉',
            conventional: '常規',
            moveCell1: '移動並調整儲存格大小',
            moveCell2: '移動並且不調整儲存格的大小',
            moveCell3: '不要移動儲存格並調整其大小',
            fixedPos: '固定位置',
            border: '邊框',
            width: '寬度',
            radius: '半徑',
            style: '樣式',
            solid: '實線',
            dashed: '虛線',
            dotted: '點狀',
            double: '雙線',
            color: '顏色'
        },
        punctuation: {
            'tab': 'Tab 鍵',
            'semicolon': '分號',
            'comma': '逗號',
            'space': '空格'
        },
        findAndReplace: {
            find: '查找',
            replace: '替換',
            goto: '轉到',
            location: '定位條件',
            formula: '公式',
            date: '日期',
            number: '數位',
            string: '字元',
            error: '錯誤',
            condition: '條件格式',
            rowSpan: '間隔行',
            columnSpan: '間隔列',
            locationExample: '定位',
            lessTwoRowTip: '請選擇最少兩行',
            lessTwoColumnTip: '請選擇最少兩行',
            findTextbox: '查找内容',
            replaceTextbox: '替換內容',
            regexTextbox: '規則運算式匹配',
            wholeTextbox: '整詞匹配',
            distinguishTextbox: '區分大小寫匹配',
            allReplaceBtn: '全部替換',
            replaceBtn: '替換',
            allFindBtn: '查找全部',
            findBtn: '查找下一個',
            noFindTip: '沒有查找到該內容',
            modeTip: '該模式下不可進行此操作',
            searchTargetSheet: '工作表',
            searchTargetCell: '儲存格',
            searchTargetValue: '值',
            searchInputTip: '請輸入查找內容',
            noReplceTip: '沒有可替換的內容',
            noMatchTip: '找不到匹配項',
            successTip: '已經幫您蒐索並進行了${xlength}處替換',
            locationConstant: '常數',
            locationFormula: '公式',
            locationDate: '日期',
            locationDigital: '數位',
            locationString: '字元',
            locationBool: '邏輯值',
            locationError: '錯誤',
            locationNull: '空值',
            locationCondition: '條件格式',
            locationRowSpan: '間隔行',
            locationColumnSpan: '間隔列',
            locationTiplessTwoRow: '請選擇最少兩行',
            locationTiplessTwoColumn: '請選擇最少兩列',
            locationTipNotFindCell: '未找到儲存格'
        },
        sheetconfig: {
            delete: '删除',
            copy: '複製',
            rename: '重命名',
            changeColor: '更改顏色',
            hide: '隱藏',
            unhide: '取消隱藏',
            moveLeft: '向左移',
            moveRight: '向右移',
            resetColor: '重置顏色',
            cancelText: '取消',
            chooseText: '確定顏色',
            tipNameRepeat: '籤頁的名稱不能重複\uFF01請重新修改',
            noMoreSheet: '工作薄內至少含有一張可視工作表\u3002若需删除選定的工作表,請先插入一張新工作表或顯示一張隱藏的工作表\u3002\u3002',
            confirmDelete: '是否删除',
            redoDelete: '可以通過Ctrl+Z撤銷删除',
            noHide: '不能隱藏,至少保留一個sheet標籤',
            chartEditNoOpt: '圖表編輯模式下不允許該操作\uFF01',
            sheetNameSpecCharError: '名稱不能包含:[ ] :  ? * / \' "',
            sheetNamecannotIsEmptyError: '名稱不能為空'
        },
        conditionformat: {
            conditionformat_greaterThan: '條件格式\u2014\u2014大於',
            conditionformat_greaterThan_title: '為大於以下值的儲存格設定格式',
            conditionformat_lessThan: '條件格式\u2014\u2014小於',
            conditionformat_lessThan_title: '為小於以下值的儲存格設定格式',
            conditionformat_betweenness: '條件格式\u2014\u2014介於',
            conditionformat_betweenness_title: '為介於以下值的儲存格設定格式',
            conditionformat_equal: '條件格式\u2014\u2014等於',
            conditionformat_equal_title: '為等於以下值的儲存格設定格式',
            conditionformat_textContains: '條件格式\u2014\u2014文字包含',
            conditionformat_textContains_title: '為包含以下文字的儲存格設定格式',
            conditionformat_occurrenceDate: '條件格式\u2014\u2014發生日期',
            conditionformat_occurrenceDate_title: '為包含以下日期的儲存格設定格式',
            conditionformat_duplicateValue: '條件格式\u2014\u2014重複值',
            conditionformat_duplicateValue_title: '為包含以下類型值的儲存格設定格式',
            conditionformat_top10: '條件格式\u2014\u2014前10項',
            conditionformat_top10_percent: '條件格式\u2014\u2014前10%',
            conditionformat_top10_title: '為值最大的那些儲存格設定格式',
            conditionformat_last10: '條件格式\u2014\u2014最後10項',
            conditionformat_last10_percent: '條件格式\u2014\u2014最後10%',
            conditionformat_last10_title: '為值最小的那些儲存格設定格式',
            conditionformat_AboveAverage: '條件格式\u2014\u2014高於平均值',
            conditionformat_AboveAverage_title: '為高於平均值的儲存格設定格式',
            conditionformat_SubAverage: '條件格式\u2014\u2014低於平均值',
            conditionformat_SubAverage_title: '為低於平均值的儲存格設定格式',
            rule: '規則',
            newRule: '新建規則',
            editRule: '編輯規則',
            deleteRule: '删除規則',
            deleteCellRule: '清除所選儲存格的規則',
            deleteSheetRule: '清除整個工作表的規則',
            manageRules: '管理規則',
            showRules: '顯示其格式規則',
            highlightCellRules: '突出顯示儲存格規則',
            itemSelectionRules: '項目選取規則',
            conditionformatManageRules: '條件格式規則管理器',
            format: '格式',
            setFormat: '設定格式',
            setAs: '設定為',
            setAsByArea: '針對選定區域,設定為',
            applyRange: '應用範圍',
            selectRange: '點擊選擇應用範圍',
            selectRange_percent: '所選範圍的百分比',
            selectRange_average: '選定範圍的平均值',
            selectRange_value: '選定範圍中的數值',
            pleaseSelectRange: '請選擇應用範圍',
            selectDataRange: '點擊選擇數據範圍',
            selectCell: '選擇儲存格',
            pleaseSelectCell: '請選擇儲存格',
            pleaseSelectADate: '請選擇日期',
            pleaseEnterInteger: '請輸入一個介於1和1000之間的整數',
            onlySingleCell: '只能對單個儲存格進行引用',
            conditionValueCanOnly: '條件值只能是數位或者單個儲存格',
            ruleTypeItem1: '基於各自值設定所有儲存格的格式',
            ruleTypeItem2: '只為包含以下內容的儲存格設定格式',
            ruleTypeItem2_title: '只為滿足以下條件的儲存格',
            ruleTypeItem3: '僅對排名靠前或靠後的數值設定格式',
            ruleTypeItem3_title: '為以下排名內的值',
            ruleTypeItem4: '僅對高於或低於平均值的數值設定格式',
            ruleTypeItem4_title: '為滿足以下條件的值',
            ruleTypeItem5: '僅對唯一值或重複值設定格式',
            ruleTypeItem6: '使用公式確定要設置格式的單元格',
            formula: '公式',
            textColor: '文字顏色',
            cellColor: '儲存格顏色',
            confirm: '確定',
            confirmColor: '確定顏色',
            cancel: '取消',
            close: '關閉',
            clearColorSelect: '清除顏色選擇',
            sheet: '錶',
            currentSheet: '當前工作表',
            dataBar: '數據條',
            dataBarColor: '數據條顏色',
            gradientDataBar_1: '藍-白漸變數據條',
            gradientDataBar_2: '綠-白漸變數據條',
            gradientDataBar_3: '紅-白漸變數據條',
            gradientDataBar_4: '柳丁-白漸變數據條',
            gradientDataBar_5: '淺藍-白漸變數據條',
            gradientDataBar_6: '紫-白漸變數據條',
            solidColorDataBar_1: '藍色數據條',
            solidColorDataBar_2: '綠色數據條',
            solidColorDataBar_3: '紅色數據條',
            solidColorDataBar_4: '橙色數據條',
            solidColorDataBar_5: '淺藍色數據條',
            solidColorDataBar_6: '紫色數據條',
            colorGradation: '色階',
            colorGradation_1: '綠-黃-紅色階',
            colorGradation_2: '紅-黃-綠色階',
            colorGradation_3: '綠-白-紅色階',
            colorGradation_4: '紅-白-綠色階',
            colorGradation_5: '藍-白-紅色階',
            colorGradation_6: '紅-白-藍色階',
            colorGradation_7: '白-紅色階',
            colorGradation_8: '紅-白色階',
            colorGradation_9: '綠-白色階',
            colorGradation_10: '白-綠色階',
            colorGradation_11: '綠-黃色階',
            colorGradation_12: '黃-綠色階',
            icons: '圖標集',
            pleaseSelectIcon: '請點擊選擇一組圖標:',
            cellValue: '儲存格值',
            specificText: '特定文字',
            occurrence: '發生日期',
            greaterThan: '大於',
            lessThan: '小於',
            between: '介於',
            equal: '等於',
            in: '和',
            to: '到',
            between2: '之間',
            contain: '包含',
            textContains: '文字包含',
            duplicateValue: '重複值',
            uniqueValue: '唯一值',
            top: '前',
            top10: '前10項',
            top10_percent: '前10%',
            last: '後',
            last10: '後10項',
            last10_percent: '後10%',
            oneself: '個',
            above: '高於',
            aboveAverage: '高於平均值',
            below: '低於',
            belowAverage: '低於平均值',
            all: '全部',
            yesterday: '昨天',
            today: '今天',
            tomorrow: '明天',
            lastWeek: '上周',
            thisWeek: '本周',
            lastMonth: '上月',
            thisMonth: '本月',
            lastYear: '去年',
            thisYear: '本年',
            last7days: '最近7天',
            last30days: '最近30天',
            next7days: '未來7天',
            next30days: '未來30天',
            next60days: '未來60天',
            chooseRuleType: '選擇規則類型',
            editRuleDescription: '編輯規則說明',
            newFormatRule: '新建格式規則',
            editFormatRule: '編輯格式規則',
            formatStyle: '格式樣式',
            fillType: '填充類型',
            color: '顏色',
            twocolor: '雙色',
            tricolor: '三色',
            multicolor: '彩色',
            grayColor: '灰色',
            gradient: '漸變',
            solid: '實心',
            maxValue: '最大值',
            medianValue: '中間值',
            minValue: '最小值',
            direction: '方向',
            threeWayArrow: '三向箭頭',
            fourWayArrow: '四向箭頭',
            fiveWayArrow: '五向箭頭',
            threeTriangles: '3個三角形',
            shape: '形狀',
            threeColorTrafficLight: '三色交通燈',
            fourColorTrafficLight: '四色交通燈',
            threeSigns: '三標誌',
            greenRedBlackGradient: '綠-紅-黑漸變',
            rimless: '無邊框',
            bordered: '有邊框',
            mark: '標記',
            threeSymbols: '三個符號',
            tricolorFlag: '三色旗',
            circled: '有圓圈',
            noCircle: '無圓圈',
            grade: '等級',
            grade4: '四等級',
            grade5: '五等級',
            threeStars: '3個星形',
            fiveQuadrantDiagram: '五象限圖',
            fiveBoxes: '5個框'
        },
        insertLink: {
            linkText: '文字',
            linkType: '連結類型',
            external: '外部連結',
            internal: '内部連結',
            linkAddress: '連結地址',
            linkSheet: '工作表',
            linkCell: '儲存格引用',
            linkTooltip: '提示',
            placeholder1: '請輸入網頁連結位址',
            placeholder2: '請輸入要引用的儲存格,例A1',
            placeholder3: '請輸入提示內容',
            tooltipInfo1: '請輸入有效的連結',
            tooltipInfo2: '請輸入正確的儲存格引用'
        },
        dataVerification: {
            cellRange: '儲存格範圍',
            selectCellRange: '點擊選擇儲存格範圍',
            selectCellRange2: '請選擇儲存格範圍',
            verificationCondition: '驗證條件',
            dropdown: '下拉清單',
            checkbox: '核取方塊',
            number: '數位',
            number_integer: '數位-整數',
            number_decimal: '數位-小數',
            text_content: '文字-內容',
            text_length: '文字-長度',
            date: '日期',
            validity: '有效性',
            placeholder1: '請輸入選項,以英文逗號分隔,如1,2,3,4,5',
            placeholder2: '請輸入內容',
            placeholder3: '數值,如10',
            placeholder4: '請輸入指定的文字',
            placeholder5: '請輸入選中儲存格時顯示的提示語',
            selected: '選擇時',
            notSelected: '未選擇',
            between: '介於',
            notBetween: '不介於',
            equal: '等於',
            notEqualTo: '不等於',
            moreThanThe: '大於',
            lessThan: '小於',
            greaterOrEqualTo: '大於等於',
            lessThanOrEqualTo: '小於等於',
            include: '包括',
            exclude: '不包括',
            earlierThan: '早於',
            noEarlierThan: '不早於',
            laterThan: '晚於',
            noLaterThan: '不晚於',
            identificationNumber: '身份證號碼',
            phoneNumber: '手機號',
            remote: '自動遠程獲取選項',
            prohibitInput: '輸入數據無效時禁止輸入',
            hintShow: '選中儲存格時顯示提示語',
            deleteVerification: '删除驗證',
            tooltipInfo1: '下拉清單選項不可為空',
            tooltipInfo2: '核取方塊內容不可為空',
            tooltipInfo3: '輸入的值不是數值類型',
            tooltipInfo4: '數值2不能小於數值1',
            tooltipInfo5: '文字內容不能為空',
            tooltipInfo6: '輸入的值不是日期類型',
            tooltipInfo7: '日期2不能小於日期1'
        },
        formula: {
            sum: '求和',
            average: '平均值',
            count: '計數',
            max: '最大值',
            min: '最小值',
            ifGenerate: 'if公式生成器',
            find: '更多函數',
            tipNotBelongToIf: '該儲存格函數不屬於if公式!',
            tipSelectCell: '請選擇儲存格插入函數',
            ifGenCompareValueTitle: '比较值',
            ifGenSelectCellTitle: '點擊選擇儲存格',
            ifGenRangeTitle: '範圍',
            ifGenRangeTo: '至',
            ifGenRangeEvaluate: '範圍評估',
            ifGenSelectRangeTitle: '點擊選擇範圍',
            ifGenCutWay: '劃分管道',
            ifGenCutSame: '劃分值相同',
            ifGenCutNpiece: '劃分为N份',
            ifGenCutCustom: '自定義輸入',
            ifGenCutConfirm: '生成',
            ifGenTipSelectCell: '選擇儲存格',
            ifGenTipSelectCellPlace: '請選擇儲存格',
            ifGenTipSelectRange: '選擇單範圍',
            ifGenTipSelectRangePlace: '請選擇範圍',
            ifGenTipNotNullValue: '比較值不能為空!',
            ifGenTipLableTitile: '標籤',
            ifGenTipRangeNotforNull: '範圍不能為空!',
            ifGenTipCutValueNotforNull: '劃分值不能為空\uFF01',
            ifGenTipNotGenCondition: '沒有生成可用的條件\uFF01'
        },
        formulaMore: {
            valueTitle: '值',
            tipSelectDataRange: '選取數據範圍',
            tipDataRangeTile: '數據範圍',
            findFunctionTitle: '查找函數',
            tipInputFunctionName: '請輸入您要查找的函數名稱或函數功能的簡要描述',
            Array: '數組',
            Database: '資料來源',
            Date: '日期',
            Engineering: '工程計算',
            Filter: '篩檢程式',
            Financial: '財務',
            luckysheet: 'Luckysheet內寘',
            other: '其它',
            Logical: '邏輯',
            Lookup: '查找',
            Math: '數學',
            Operator: '運算子',
            Parser: '轉換工具',
            Statistical: '統計',
            Text: '文字',
            dataMining: '資料挖掘',
            selectFunctionTitle: '選擇函數',
            calculationResult: '計算結果',
            tipSuccessText: '成功',
            tipParamErrorText: '參數類型錯誤',
            helpClose: '關閉',
            helpCollapse: '收起',
            helpExample: '示例',
            helpAbstract: '摘要',
            execfunctionError: '提示", "公式存在錯誤',
            execfunctionSelfError: '公式不可引用其本身的儲存格',
            execfunctionSelfErrorResult: '公式不可引用其本身的儲存格,會導致計算結果不準確',
            allowRepeatText: '可重複',
            allowOptionText: '可選',
            selectCategory: '或選擇類別'
        },
        drag: {
            noMerge: '無法對合併儲存格執行此操作',
            affectPivot: '無法對所選儲存格進行此更改,因為它會影響數據透視錶\uFF01',
            noMulti: '無法對多重選擇區域執行此操作,請選擇單個區域',
            noPaste: '無法在此處粘貼此內容,請選擇粘貼區域的一個儲存格,然後再次嘗試粘貼',
            noPartMerge: '無法對部分合併儲存格執行此操作',
            inputCorrect: '請輸入正確的數值',
            notLessOne: '行列數不能小於1',
            offsetColumnLessZero: '偏移列不能為負數\uFF01',
            pasteMustKeybordAlert: 'Copy and paste in the Sheet: Ctrl + C to copy, Ctrl + V to paste, Ctrl + X to cut',
            pasteMustKeybordAlertHTMLTitle: 'Copy and paste in the Sheet',
            pasteMustKeybordAlertHTML: "<span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + C</span>&nbsp;&nbsp;to copy<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + V</span>&nbsp;&nbsp;to paste<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + X</span>&nbsp;&nbsp;to cut"
        },
        pivotTable: {
            title: '數據透視錶',
            closePannel: '關閉',
            editRange: '編輯範圍',
            tipPivotFieldSelected: '選擇需要添加到數據透視錶的欄位',
            tipClearSelectedField: '清除所有已選欄位',
            btnClearSelectedField: '清除',
            btnFilter: '篩選',
            titleRow: '行',
            titleColumn: '列',
            titleValue: '數值',
            tipShowColumn: '統計欄位顯示為列',
            tipShowRow: '統計欄位顯示為行',
            titleSelectionDataRange: '選取數據範圍',
            titleDataRange: '數據範圍',
            valueSum: '總計',
            valueStatisticsSUM: '求和',
            valueStatisticsCOUNT: '數值計數',
            valueStatisticsCOUNTA: '計數',
            valueStatisticsCOUNTUNIQUE: '去重計數',
            valueStatisticsAVERAGE: '平均值',
            valueStatisticsMAX: '最大值',
            valueStatisticsMIN: '最小值',
            valueStatisticsMEDIAN: '中位數',
            valueStatisticsPRODUCT: '乘積',
            valueStatisticsSTDEV: '標準差',
            valueStatisticsSTDEVP: '整體標準差',
            valueStatisticslet: '方差',
            valueStatisticsVARP: '整體方差',
            errorNotAllowEdit: '非編輯模式下禁止該操作!',
            errorNotAllowMulti: '不能對多重選擇區域執行此操作,請選擇單個區域,然後再試',
            errorSelectRange: '請選擇新建透視錶的區域',
            errorIsDamage: '此數據透視錶的源數據已損壞\uFF01',
            errorNotAllowPivotData: '不可選擇數據透視錶為源數據!',
            errorSelectionRange: '選擇失敗,輸入範圍錯誤\uFF01',
            errorIncreaseRange: '請擴大選擇的數據範圍!',
            titleAddColumn: '添加列到數據透視錶',
            titleMoveColumn: '移動該列到下方白框',
            titleClearColumnFilter: '清除該列的篩選條件',
            titleFilterColumn: '篩選該列',
            titleSort: '排序',
            titleNoSort: '無排序',
            titleSortAsc: '昇冪',
            titleSortDesc: '降序',
            titleSortBy: '排序依據',
            titleShowSum: '顯示總計',
            titleStasticTrue: '是',
            titleStasticFalse: '否'
        },
        dropCell: {
            copyCell: '複製儲存格',
            sequence: '填充序列',
            onlyFormat: '僅填充格式',
            noFormat: '不帶格式填充',
            day: '以天數填充',
            workDay: '以工作日填充',
            month: '以月填充',
            year: '以年填充',
            chineseNumber: '以中文小寫數位填充'
        },
        imageCtrl: {
            borderTile: '圖片邊框顏色選擇',
            borderCur: '當前顏色'
        },
        protection: {
            protectiontTitle: '保護工作表',
            enterPassword: '請輸入密碼\uFF08可留空\uFF09',
            enterHint: '您試圖更改的儲存格或圖表位於受保護的工作表中\u3002若要更改,請取消工作表保護\u3002您可能需要輸入密碼',
            swichProtectionTip: '保護工作表及鎖定的儲存格內容',
            authorityTitle: '允許此工作表的用戶進行:',
            selectLockedCells: '定鎖定儲存格',
            selectunLockedCells: '選定解除鎖定的儲存格',
            formatCells: '設定儲存格格式',
            formatColumns: '設定列格式',
            formatRows: '設定行格式',
            insertColumns: '插入列',
            insertRows: '插入行',
            insertHyperlinks: '插入超連結',
            deleteColumns: '删除列',
            deleteRows: '删除行',
            sort: '排序',
            filter: '使用自動篩選',
            usePivotTablereports: '使用數據透視錶和報表',
            editObjects: '編輯對象',
            editScenarios: '編輯方案',
            allowRangeTitle: '允許用戶編輯區域',
            allowRangeAdd: '新建...',
            allowRangeAddTitle: '標題',
            allowRangeAddSqrf: '引用儲存格',
            selectCellRange: '點擊選擇儲存格範圍',
            selectCellRangeHolder: '請輸入儲存格範圍',
            allowRangeAddTitlePassword: '密碼',
            allowRangeAddTitleHint: '提示',
            allowRangeAddTitleHintTitle: '設置密碼後,提示用戶輸入密碼\uFF08可留空\uFF09',
            allowRangeAddtitleDefault: '請輸入區域名稱',
            rangeItemDblclick: '按兩下進行編輯',
            rangeItemHasPassword: '已設置密碼',
            rangeItemErrorTitleNull: '標題不能為空',
            rangeItemErrorRangeNull: '儲存格範圍不能為空',
            rangeItemErrorRange: '儲存格範圍格式錯誤',
            validationTitle: '驗證提示',
            validationTips: '需要輸入密碼來撤銷工作表的保護',
            validationInputHint: '請輸入密碼',
            checkPasswordNullalert: '密碼不能為空!',
            checkPasswordWrongalert: '密碼錯誤,請重試\uFF01',
            checkPasswordSucceedalert: '解鎖成功,可以編輯該區域!',
            defaultRangeHintText: '該儲存格正在受密碼保護',
            defaultSheetHintText: '該儲存格或圖表位於受保護的工作表中,若要進行更改,請取消工作表保護,您可能需要輸入密碼\u3002'
        },
        cellFormat: {
            cellFormatTitle: '設定儲存格格式',
            protection: '保護',
            locked: '鎖定儲存格',
            hidden: '隱藏公式',
            protectionTips: '只有保護工作表功能\uFF08在功能表列點擊保護工作表按鈕進行設定\uFF09開啟後,鎖定儲存格或隱藏公式才能生效',
            tipsPart: '部分選中',
            tipsAll: '全部選中',
            selectionIsNullAlert: '請選擇一個範圍\uFF01',
            sheetDataIsNullAlert: '數據為空無法設定\uFF01'
        },
        print: {
            normalBtn: '常規視圖',
            layoutBtn: '頁面佈局',
            pageBtn: '分頁預覽',
            menuItemPrint: '列印(Ctrl+P)',
            menuItemAreas: '列印區域',
            menuItemRows: '列印標題行',
            menuItemColumns: '列印標題列'
        },
        edit: { typing: '正在輸入' },
        websocket: {
            success: 'WebSocket連接成功',
            refresh: 'WebSocket連接發生錯誤,請刷新頁面\uFF01',
            wait: 'WebSocket連接發生錯誤,請耐心等待\uFF01',
            close: 'WebSocket連接關閉',
            contact: '服務器通信發生錯誤,請刷新頁面後再試,如若不行請聯系管理員\uFF01',
            support: '當前瀏覽器不支持WebSocket'
        }
    };
});