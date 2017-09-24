module.exports = {
    //警告
    // "quotes": [1, "single"],                  //建议使用单引号
    // "no-inner-declarations": [1, "both"],     //不建议在{}代码块内部声明变量或函数
    "no-extra-boolean-cast": "多余的感叹号转布尔型", //
    "no-extra-semi": "多余的分号", //
    "no-extra-parens": "多余的括号", //
    "no-empty": "空代码块", //
    "no-use-before-define": "使用前未定义", //
    "complexity": "圈复杂度大于10 警告", //

    //常见错误
    "comma-dangle": "定义数组或对象最后多余的逗号", //
    "no-debugger": "debugger 调试代码未删除", //
    "no-constant-condition": "常量作为条件", //
    "no-dupe-args": "参数重复", //
    "no-dupe-keys": "对象属性重复", //
    "no-duplicate-case": "case重复", //
    "no-empty-character-class": "正则无法匹配任何值", //
    "no-invalid-regexp": "无效的正则", //
    "no-func-assign":"函数被赋值", //
    "valid-typeof": "无效的类型判断", //
    "no-unreachable": "不可能执行到的代码", //
    "no-unexpected-multiline": "行尾缺少分号可能导致一些意外情况", //
    "no-sparse-arrays":"数组中多出逗号", //
    "no-shadow-restricted-names": "关键词与命名冲突", //
    "no-undef": "变量未定义", //
    //"no-unused-vars": "变量定义后未使用", //
    "no-cond-assign": "条件语句中禁止赋值操作", //
    "no-native-reassign": "禁止覆盖原生对象", //

    //代码风格优化
    "no-else-return": "在else代码块中return，else是多余的", //
    // "no-multi-spaces": "不允许多个空格", //
    // "key-spacing": [1, { "beforeColon": false, "afterColon": true }], //object直接量建议写法 : 后一个空格签名不留空格
    "block-scoped-var": "变量定义后未使用", //
    "consistent-return": "函数返回值可能是不同类型", //
    // "accessor-pairs": 2, //object getter/setter方法需要成对出现
    "dot-location": "换行调用对象方法  点操作符应写在行首", //
    "no-lone-blocks": "多余的{}嵌套", //
    "no-labels": "无用的标记", //
    "no-extend-native": "禁止扩展原生对象", //
    "no-floating-decimal": "浮点型需要写全 禁止.1 或 2.写法", //
    "no-loop-func": "禁止在循环体中定义函数", //
    "no-new-func": "禁止new Function(...) 写法", //
    "no-self-compare": "不允与自己比较作为条件", //
    "no-sequences": "禁止可能导致结果不明确的逗号操作符", //
    "no-throw-literal": "禁止抛出一个直接量 应是Error对象", //
    "no-return-assign": "不允return时有赋值操作", //
    "no-redeclare": "不允许重复声明", //
    "no-unused-expressions": "未使用的表达式", //
    "no-useless-call": "无意义的函数call或apply", //
    "no-useless-concat": "无意义的string concat", //
    "no-void": "禁用void", //
    "no-with": "禁用with", //
    "no-warning-comments": "标记未写注释", //
    "curly": "if、else、while、for代码块用{}包围" //
    //"require-jsdoc":1, // 要求使用 JSDoc 注释
    //"valid-jsdoc": 2 //强制使用有效的 JSDoc 注释
};