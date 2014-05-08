/**
 * Created by ehtashamul.haq on 2/28/14.

 */
var myRef;
function OnDForm() {

    this.ElementsMap = new Object();
    this.Ont2HtmlMap = new Object();
    this.ObjectProperties = new Array();
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
    this.Ont2HtmlMap["onblur"] = {tag: "event"};
    this.Ont2HtmlMap["onchange"] = {tag: "event"};
    this.Ont2HtmlMap["onclick"] = {tag: "event"};
    this.Ont2HtmlMap["oncontextmenu"] = {tag: "event"};
    this.Ont2HtmlMap["ondblclick"] = {tag: "event"};
    this.Ont2HtmlMap["onfocus"] = {tag: "event"};
    this.Ont2HtmlMap["onformchange"] = {tag: "event"};
    this.Ont2HtmlMap["onforminput"] = {tag: "event"};
    this.Ont2HtmlMap["oninput"] = {tag: "event"};
    this.Ont2HtmlMap["oninvalid"] = {tag: "event"};
    this.Ont2HtmlMap["onkeydown"] = {tag: "event"};
    this.Ont2HtmlMap["onkeypress"] = {tag: "event"};
    this.Ont2HtmlMap["onkeyup"] = {tag: "event"};
    this.Ont2HtmlMap["onmousedown"] = {tag: "event"};
    this.Ont2HtmlMap["onmousemove"] = {tag: "event"};
    this.Ont2HtmlMap["onmouseout"] = {tag: "event"};
    this.Ont2HtmlMap["onmouseover"] = {tag: "event"};
    this.Ont2HtmlMap["onmouseup"] = {tag: "event"};
    this.Ont2HtmlMap["onreset"] = {tag: "event"};
    this.Ont2HtmlMap["onselect"] = {tag: "event"};
    this.Ont2HtmlMap["onsubmit"] = {tag: "event"};
    this.Ont2HtmlMap["optgroup"] = {tag: "optgroup"};
    this.Ont2HtmlMap["option"] = {tag: "option"};
    this.Ont2HtmlMap["output"] = {tag: "output"};
    this.Ont2HtmlMap["password"] = {tag: "input", type: "password"};
    this.Ont2HtmlMap["radio"] = {tag: "input", type: "radio"};
    this.Ont2HtmlMap["range"] = {tag: "input", type: "range"};
    this.Ont2HtmlMap["reset"] = {tag: "input", type: "reset"};
    this.Ont2HtmlMap["search"] = {tag: "input", type: "search"};
    this.Ont2HtmlMap["script"] = {tag: "script"};
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
    /*var keys = [];
     for (var key in obj) {
     if (obj.hasOwnProperty(key)) {
     keys.push(key);
     }
     }
     keys.sort (
     function(a,b){
     if(obj[b].order && obj[a].order){
     return obj[b].order - obj[a].order;
     }else{
     return 0;
     }
     }
     );*/
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
    for (var m in myRef.ElementsMap) {
        var element = myRef.ElementsMap[m];
        if (element.type == "form") {
            var myform = generateForm(element);
            target.append(myform);
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
                            if(myRef.ElementsMap[value].tag = "event")
                            jqElement.append(generateForm(myRef.ElementsMap[value]))
                        });
                    } else {
                        jqElement.append(generateForm(myRef.ElementsMap[element[key]]));
                    }
                }else if (key == "hasEvent") {
                    var handle = myRef.ElementsMap[element[key]];
                    jqElement.on("submit", handle);

                }  else if (jqElement.is("select") && key == "list") {
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
    myRef = this;
    $.get(ontology, function (data) {
        //console.log(data);

        parser.parse(data,
            function (error, triple) {
                if (triple) {

                    console.log(triple.subject, '|', triple.predicate, '|', triple.object, '.');

                    var obj = triple.object.substr(triple.object.lastIndexOf("#") + 1);
                    if (triple.predicate == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {

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






