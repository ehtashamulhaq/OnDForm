/**
 * Created by ehtashamul.haq on 2/28/14.

 */

var RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    RDF_NIL = RDF_PREFIX + 'nil',
    RDF_FIRST = RDF_PREFIX + 'first',
    RDF_REST = RDF_PREFIX + 'rest',
    RDF_TYPE = RDF_PREFIX + 'type';

var myRef;
var store;
function OnDForm() {

    this.ElementsMap = new Object();
    this.Ont2HtmlMap = new Object();

    this.prefix = "";

    this.Ont2HtmlMap["button"] = {tag: "input", type: "button"};
    this.Ont2HtmlMap["checkbox"] = {tag: "input", type: "checkbox"};
    this.Ont2HtmlMap["color"] = {tag: "input", type: "color"};
    this.Ont2HtmlMap["datalist"] = {tag: "datalist"};
    this.Ont2HtmlMap["date"] = {tag: "input", type: "date"};
    this.Ont2HtmlMap["datetime"] = {tag: "input", type: "datetime"};
    this.Ont2HtmlMap["datetime-local"] = {tag: "input", type: "datetime-local"};
    this.Ont2HtmlMap["email"] = {tag: "input", type: "email"};
    this.Ont2HtmlMap["fieldset"] = {tag: "fieldset"};
    this.Ont2HtmlMap["file"] = {tag: "input", type: "file"};
    this.Ont2HtmlMap["form"] = {tag: "form"};
    this.Ont2HtmlMap["hidden"] = {tag: "input", type: "hidden"};
    this.Ont2HtmlMap["image"] = {tag: "input", type: "image"};
    this.Ont2HtmlMap["legend"] = {tag: "legend"};
    this.Ont2HtmlMap["month"] = {tag: "input", type: "month"};
    this.Ont2HtmlMap["number"] = {tag: "input", type: "number"};
    this.Ont2HtmlMap["onblur"] = {tag: "blur", type: "event"};
    this.Ont2HtmlMap["onchange"] = {tag: "change", type: "event"};
    this.Ont2HtmlMap["onclick"] = {tag: "click", type: "event"};
    this.Ont2HtmlMap["oncontextmenu"] = {tag: "contextmenu", type: "event"};
    this.Ont2HtmlMap["ondblclick"] = {tag: "dblclick", type: "event"};
    this.Ont2HtmlMap["onfocus"] = {tag: "focus", type: "event"};
    this.Ont2HtmlMap["onformchange"] = {tag: "formchange", type: "event"};
    this.Ont2HtmlMap["onforminput"] = {tag: "forminput", type: "event"};
    this.Ont2HtmlMap["oninput"] = {tag: "input", type: "event"};
    this.Ont2HtmlMap["oninvalid"] = {tag: "invalid", type: "event"};
    this.Ont2HtmlMap["onkeydown"] = {tag: "keydown", type: "event"};
    this.Ont2HtmlMap["onkeypress"] = {tag: "keypress", type: "event"};
    this.Ont2HtmlMap["onkeyup"] = {tag: "keyup", type: "event"};
    this.Ont2HtmlMap["onmousedown"] = {tag: "mousedown", type: "event"};
    this.Ont2HtmlMap["onmousemove"] = {tag: "mousemove", type: "event"};
    this.Ont2HtmlMap["onmouseout"] = {tag: "mouseout", type: "event"};
    this.Ont2HtmlMap["onmouseover"] = {tag: "mouseover", type: "event"};
    this.Ont2HtmlMap["onmouseup"] = {tag: "mouseup", type: "event"};
    this.Ont2HtmlMap["onreset"] = {tag: "reset", type: "event"};
    this.Ont2HtmlMap["onselect"] = {tag: "select", type: "event"};
    this.Ont2HtmlMap["onsubmit"] = {tag: "submit", type: "event"};
    this.Ont2HtmlMap["optgroup"] = {tag: "optgroup"};
    this.Ont2HtmlMap["option"] = {tag: "option"};
    this.Ont2HtmlMap["output"] = {tag: "output"};
    this.Ont2HtmlMap["password"] = {tag: "input", type: "password"};
    this.Ont2HtmlMap["radio"] = {tag: "input", type: "radio"};
    this.Ont2HtmlMap["range"] = {tag: "input", type: "range"};
    this.Ont2HtmlMap["reset"] = {tag: "input", type: "reset"};
    this.Ont2HtmlMap["search"] = {tag: "input", type: "search"};
    this.Ont2HtmlMap["text/javascript"] = {tag: "script"};
    this.Ont2HtmlMap["select"] = {tag: "select"};
    this.Ont2HtmlMap["submit"] = {tag: "input", type: "submit"};
    this.Ont2HtmlMap["tel"] = {tag: "input", type: "tel"};
    this.Ont2HtmlMap["text"] = {tag: "input", type: "text"};
    this.Ont2HtmlMap["textarea"] = {tag: "textarea"};
    this.Ont2HtmlMap["time"] = {tag: "input", type: "time"};
    this.Ont2HtmlMap["url"] = {tag: "input", type: "url"};
    this.Ont2HtmlMap["week"] = {tag: "input", type: "week"};
}

OnDForm.prototype.addElement = function (name, type) {
    if (this.ElementsMap[name] == undefined || this.ElementsMap[name] == null) {
        this.ElementsMap[name] = new Object();
    }
    this.ElementsMap[name].name = name;
    this.ElementsMap[name].type = type;
};

OnDForm.prototype.setElementProperty = function (name, property, value) {
    value = value.replace(/["]/g, '');
    if (this.ElementsMap[name][property] == undefined || !this.ElementsMap[name][property]) {
        this.ElementsMap[name][property] = value;
    }
    else {
        if (!(this.ElementsMap[name][property] instanceof Array)) {
            var temp = this.ElementsMap[name][property];
            this.ElementsMap[name][property] = new Array();
            this.ElementsMap[name][property][0] = temp;
        }
        this.ElementsMap[name][property][this.ElementsMap[name][property].length] = value;
    }

};

OnDForm.prototype.isElementPropertyExist = function (name, property) {

    return (this.ElementsMap[name][property] != undefined && this.ElementsMap[name][property]);
};

sortMembers = function (obj) {
    if (!obj) {
        return;
    }

    $.each(obj, function (index, value) {
        if (value instanceof Array) {
            value.sort(function (a, b) {
                    if (a.order && b.order) {
                        return parseFloat(a.order) - parseFloat(b.order);
                    } else if (myRef.ElementsMap[b] != undefined && myRef.ElementsMap[b].order && myRef.ElementsMap[a] != undefined && myRef.ElementsMap[a].order) {
                        return parseFloat(myRef.ElementsMap[a].order) - parseFloat(myRef.ElementsMap[b].order);
                    }
                    return 0;
                }
            );
        } else {
            if (value instanceof Object) {
                sortMembers(value);
            }

        }
    });

}
OnDForm.prototype.getElement = function (name) {
    return this.ElementsMap[name];
};

OnDForm.prototype.getOnt2HtmlMap = function (obj) {
    return this.Ont2HtmlMap[obj];
};

OnDForm.prototype.createForm = function (target) {
    if (!target) {
        target = $('body');
    }

    var ele = myRef.getElement(this.prefix + "#text-name");
    var keys = [];
    for (var key in myRef.ElementsMap) {
        if (myRef.ElementsMap.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    keys.sort(
        function (a, b) {
            if (myRef.ElementsMap[a].type == "text/javascript") {
                return -1;
            } else if (myRef.ElementsMap[b].type == "text/javascript") {
                return 1;
            } else {
                return 0;
            }
        }
    );
    for (var k in keys) {
        var element = myRef.ElementsMap[keys[k]];
        if (element.type == "form") {
            var myform = generateForm(element);
            target.append(myform);
        } else if (element.type == "text/javascript") {
            var scriptElement = $('<script/>');
            for (var key in element) {
                scriptElement.attr(key, element[key]);
            }
            $('head').append(scriptElement);
        }

    }

    $.each($("[label]"), function (index, value) {
        var element = $(value);
        $("<label>" + element.attr("label") + "</label>").insertBefore(element);
    });
};

function generateForm(element) {

    if (element.type && myRef.Ont2HtmlMap[element.type]) {

        var tag = myRef.Ont2HtmlMap[element.type].tag;

        var jqElement = $("<" + tag + "/>," + myRef.Ont2HtmlMap[element.type]);
        for (var key in element) {
            if (element.hasOwnProperty(key)) {
                if (myRef.Ont2HtmlMap[key]) {
                    jqElement.append(generateForm(element[key]));
                } else if (key == "member") {
                    if (element[key] instanceof Array) {
                        $.each(element[key], function (index, value) {

                            jqElement.append(generateForm(myRef.ElementsMap[value]));
                        });
                    } else {
                        jqElement.append(generateForm(myRef.ElementsMap[element[key]]));
                    }
                } else if (key == "hasEvent") {
                    var eventElement = myRef.ElementsMap[element[key]];

                    var handler = store.find(eventElement.hasHandler, myRef.prefix + '#doOperation');
                    $.each(handler, function (index, value) {
                        var funcName = value.object.substr(value.object.lastIndexOf("#") + 1);
                        var funcTypeTriples = store.find(value.object, RDF_TYPE);
                        var funcType = "";
                        var targetElement = "";
                        $.each(funcTypeTriples, function (i, t) {
                            if (myRef.prefix === t.object.substr(0, myRef.prefix.length)) {
                                funcType = t.object.substr(t.object.lastIndexOf("#") + 1);
                            }
                        });


                        $("head").append('<script> function ' + funcName + '(){ \n'
                            + 'var subjectName = myRef.prefix +\'#' + funcName + '\';\n'
                            + funcType + '(subjectName);' + '}</script>');

                        var fn = window[funcName];
                        jqElement.bind(myRef.Ont2HtmlMap[eventElement.type].tag, fn);

                    });


                } else if (jqElement.is("select") && key == "list") {
                    var strList = element[key].replace(/['"]/g, '\"');
                    var jsonList = $.parseJSON(strList);
                    $.each(jsonList, function (index, value) {
                        jqElement.append($("<option/>").attr("value", index).append(value));
                    });
                }
                else {
                    if (element[key][0] == "#") {
                        var k = myRef.prefix + element[key];
                        if (!myRef.isElementPropertyExist(k, "id")) {
                            myRef.setElementProperty(k, "id", k);
                        }
                        element[key] = k;
                        jqElement.append(generateForm(myRef.ElementsMap[k]));
                    }
                    jqElement.attr(key, element[key]);
                }
            }
        }
        return $("<div/>").append(jqElement);
    }
    generateForm(element)
}
OnDForm.prototype.readOntology = function (ontology) {

    var parser = new N3Parser();
    store = new N3Store();
    myRef = this;
    $.get(ontology, function (data) {
        //console.log(data);

        parser.parse(data,
            function (error, triple) {
                if (triple) {

                    console.log(triple.subject, '|', triple.predicate, '|', triple.object, '.');
                    store.addTriple(triple);
                    var obj = triple.object.substr(triple.object.lastIndexOf("#") + 1);
                    if (triple.predicate == RDF_TYPE) {

                        if (myRef.Ont2HtmlMap[obj]) {
                            myRef.addElement(triple.subject, obj);
                        }
                        if (myRef.prefix == "" && "Ontology" === obj) {
                            myRef.prefix = triple.subject;
                            console.log(triple.subject);
                        }

                    } else {

                        if (myRef.getElement(triple.subject)) {
                            var property = triple.predicate.substr(triple.predicate.lastIndexOf("#") + 1);
                            myRef.setElementProperty(triple.subject, property, triple.object);
                        }
                    }

                }
                else {
                    console.log("# That's it, folks!");
                    sortMembers(myRef.ElementsMap);
                    myRef.createForm($('body'));
                }
            });
    });
};

function getElementNameFromSubject(subjectName) {
    var elementTriple = store.find(subjectName, myRef.prefix + '#targetElement');
    if (elementTriple) {
        elementTriple = elementTriple[0];
    }

    return elementTriple.object;
}

function getElementByName(elementName) {

    return $('[name=\'' + elementName + '\']');
}

function addElement(subjectName) {

    var elementName = getElementNameFromSubject(subjectName);

    if (getElementByName(elementName).length > 0) {
        removeElement(subjectName);
    } else {
        var memberOf = store.find(subjectName, myRef.prefix + '#memberOf');
        var memberOfElement = $('[name=\'' + memberOf[0].object + '\']');
        var element = generateForm(myRef.getElement(elementName));
        memberOfElement.append(element);
        element = getElementByName(elementName);
        ;
        $("<label>" + element.attr("label") + "</label>").insertBefore(element);
    }

}

function removeElement(subjectName) {

    var elementName = getElementNameFromSubject(subjectName);

    var element = getElementByName(elementName);
    if (element.length > 0) {
        var label = element.attr("label");
        if (label) {
            var labelElement = element.closest('label=' + label);
            labelElement.remove();
        }

        element.remove();
    }
}

function changeCss(subjectName) {
    var elementName = getElementNameFromSubject(subjectName);
    var element = getElementByName(elementName);
    var elementId, memberOf, cssMap;

}

function changeData(subjectName) {
    var elementName = getElementNameFromSubject(subjectName);
    var element = getElementByName(elementName);

    var propertyName = store.find(subjectName, myRef.prefix + '#propertyName');
    var propertyValue = store.find(subjectName, myRef.prefix + '#propertyValue')

    alert(propertyName.object);

    if (element.is("select") && key == "list") {
        var strList = element[key].replace(/['"]/g, '\"');
        var jsonList = $.parseJSON(strList);
        $.each(jsonList, function (index, value) {
            jqElement.append($("<option/>").attr("value", index).append(value));
        });
    }
    var elementId, memberOf, dataMap;

}

function changeState(subjectName) {
    var elementName = getElementNameFromSubject(subjectName);
    var element = getElementByName(elementName);
    var elementId, memberOf, stateMap;

}