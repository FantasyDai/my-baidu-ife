//判断arr是否为一个数组，返回一个bool值
function isArray(arr){
	return (Object.prototype.toString.call(arr)==='[object Array]');
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn){
	return (Object.prototype.toString.call(fn)==='[object Function]');
}

//使用递归实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src){
	if(typeof(src)!='object'||src===null){
		return src;
	}else if(isArray(src)){
		var result=[];
		var len=src.length;
		for(var i=0;i<len;i++){
			if(typeof(src[i])=='object'&&src[i]!=null){
				result[i]=arguments.callee(src[i]);
			}else{
				result[i]=src[i];
			}			
		}

	}else{
		var result={};
		for(key in src){
			if(typeof(src[key])=='object'&&src[key]!=null){
				result[key]=arguments.callee(src[key]);
			}else{
				result[key]=src[key];
			}
			
		}
	}
	return result;
}
//对数组进行去重操作，只考虑数组中的元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
	var result=[];
	var len=arr.length;
	for(var i=0;i<len;i++){
		if(result.indexOf(arr[i])==-1){
			result.push(arr[i]);
		}
	}
	return result;
}
//实现一个简单的trim函数，用于去除一个字符串，头部尾部的空白字符
//加点空白字符只有半角空格，Tab
function simpleTrim(str){
	return  str.replace(/^(\s+)/,'').replace(/(\s+)$/,'');
}
//实现一个遍历数组的方法，针对数组中的每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn){
	    var len=arr.length;
	for (var i=0;i<len; i++){
		fn(arr[i],i);
	}
}
//获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var num=0;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			num++;
		}
	}
	return num;
}
//判断是否为邮箱地址
function isEmail(emailStr){
	return /^\w+@\w+\.[com,cn,edu]$/.test(eamilStr);
}
//判断是否为手机号
function isMobilePhone(phone){
	return /^\d{10}\d$/.test(phone);
}
//3 DOM
//检测element中是否含有指定类名
function hasClass(element,className){
	var list=element.className.split(' ');
	return list.indexOf(calssName);
}
//为element增加一个样式名为newClassName的样式
function addClass(element,newClassName){
	if(!this.hasClass(element,newClassName)){
	element.className+=" "+newClassName; 
	}
}
//移除element中的样式oldClassName
function removeClass(element,oldClassName){
	if(this.hasClass(element,oldClassName)){
		var Reg=new RegExp('\\s?'+oldClassName+'\\s?');
		element.className=element.className.replace(Reg,' ');
	}
}
//判断siblingNode和element是否为同一父元素下的同一级元素，返回bool值
function isSiblingNode(element,siblingNode){
	var parent=element.parentNode;
	for(var node=parent.firstChild;node;node.nextSibling){
		if(siblingNode===node){
			return true;
		}
	}
	return false;
}//获取element相对于浏览器窗口的位置，返回一个对象{x,y}
function getPosition(element){
	var xValue=element.getBoundingClientRect().left,
	      yValue=element.getBoundingClientRect().left;
	return {'x':xValue,'y':yValue};
}
//实现一个简单的jQuery
/**
 * mini $
 *
 * @param {string} selector 选择器
 * @return {Array.<HTMLElement>} 返回匹配的元素列表
 */
function $(selector) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^\.([\w_\-]+)/;
    var tagReg = /^\w+$/i;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // 不考虑'>' 、`~`等嵌套关系
    // 父子选择器之间用空格相隔
    var context = document;

    function blank() {}

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2);
        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function (id) {
                return [
                    document.getElementById(id)
                ];
            },
            className: function (className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                }
                else {
                    var temp = context.getElementsByTagName('*');
                    for (var i = 0, len = temp.length; i < len; i++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            },
            tag: function (tag) {
                return context.getElementsByTagName(tag);
            },
            attribute: function (tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    }
                    else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }
        };

        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
    }

    function filterParents(parts, ret) {
        var parentPart = parts.pop();
        var result = [];

        for (var i = 0, len = ret.length; i < len; i++) {
            var node = ret[i];
            var p = node;

            while (p = p.parentNode) {
                var actions = {
                    id: function (el, id) {
                        return (el.id === id);
                    },
                    className: function (el, className) {
                         return hasClass(el, className);
                    },
                    tag: function (el, tag) {
                        return (el.tagName.toLowerCase() === tag);
                    },
                    attribute: function (el, tag, key, value) {
                        var valid = true;
                        if (tag) {
                            valid = actions.tag(el, tag);
                        }
                        valid = valid && el.hasAttribute(key);
                        if (value) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid;
                    }
                };
                var matches = direct(parentPart, actions, p);

                if (matches) {
                    break;
                }
            }

            if (matches) {
                result.push(node);
            }
        }

        return parts[0] && result[0] ? filterParents(parts, result) : result;
    }

    var result = find(selector.split(/\s+/), context);

    return result;
}

//给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element,type,listener){
	if(element.addEventListener){
		element.addEventListener(type,listener,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,listener);
	}else{
		element["on"+type]=handler;
	}
}
//移除element对象对于event时间发生时执行listener的响应
function removeEvent(element,type,listener){
	if(element.removeEventListener){
		element.removeEventListener(type,listener,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,listener);
	}else{
		element["on"+type]=listener;
	}
}
//实现对click事件的绑定
function addClickEvent(element,listener){
	return addEvent(element,"click",listener);
}
//实现对于按enter键时的事件绑定
function addEnterEvent(element,listener){

	return addEven(element,"keypress",function(event){
		event=event||window.event;
		if(event.keyCode===13){
			listener.call(element,event);//这句不太懂
		}
	});
}
//事件代理程序
function delegateEvent(element,tag,eventName,listener){
	return addEvent(element,eventName,function(e){
		event=e||window.event;
		target=event.target||event.srcElement;
		if(target.nodeName.toLowercase()=="li"){
			listener.call(element,event);
		}
	});
}
//insertAfter方法
function insertAfter(newElement, targetElement){
var parent = targetElement.parentNode;
if (parent.lastChild == targetElement) {
// 如果最后的节点是目标元素，则直接添加。因为默认是最后
parent.appendChild(newElement);
}
else {
parent.insertBefore(newElement, targetElement.nextSibling);
//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
}
}