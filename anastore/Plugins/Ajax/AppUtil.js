
function ShowMsgResponse(respose) {
    if (respose.Tag == "error") {
        Msg.MsgError(respose.ResponseText);
    }
    else if (respose.Tag == "valid") {
        Msg.MsgWarning(respose.ResponseText);
    }
}

function InitDatePicker(container) {
    var el = $(container);

    el.find(".datepicker").datepicker({
        format: "dd-mm-yyyy",
        maxViewMode: 0,
        todayBtn: "linked",
        clearBtn: true,
        language: "es",
        daysOfWeekHighlighted: "1",
        todayHighlight: true,
        toggleActive: true
    });

}

function InitSelectPicker(container) {

    var el = $(container);
    el.find(".selectpicker").selectpicker();

}

function SetFormData(frm, row) {

    var el = $(frm);

    if (!AppUtil.IsNull(row)) {

        $.each(row, function (name, value) {
            var input = el.find('[name="' + name + '"]');
            if (input.length > 0) {
                input.val(value);
            }
        });
    }
}

function GetDataByContainer(elementContainer) {

    var el = $(elementContainer);

    var els = el.find('[data-control="true"]');

    var vData = {};

    $.each(els, function (i, xel) {

        var input = $(xel);
        var name = input.attr("name");


        if (input.is("input")) {

            vData[name] = input.val();
        }
        else if (input.is("select")) {

            vData[name] = input.val();

            if (input.data("propertydisplay")) {
                vData[input.data("propertydisplay")] = $.trim(input.children("option:selected").text());
            }
            else {
                vData[(name + "_display")] = input.val();
            }

        }

    });

    return vData;
}

function ClearByContainer(elementContainer) {

    var el = $(elementContainer);

    var els = el.find('[data-control="true"]');

    $.each(els, function (i, xel) {

        var input = $(xel);
        var name = input.attr("name");

        input.val("");

    });


}

var AppUtil = {

    //select, data, ValueField, DisplayField
    LoadSelect: function (options) {

        var opDefault = { element: null, data: [], valueField: "Codigo", displayField: "Descripcion", labelValueOption: '""', useStore: true };
        opDefault = $.extend(opDefault, options);

        var select = $(options.element);
        var data = opDefault.data;
        var $opciones = '';

        if (opDefault.labelValueOption) {
            var label = select.children('option[value=' + opDefault.labelValueOption + ']').text();

            if (opDefault.labelValueOption == '""') {
                $opciones = '<option value=""> ' + label + ' </option>';
            }
            else {
                $opciones = '<option value="' + opDefault.labelValueOption + '"> ' + label + ' </option>';
            }
        }

        select.find("option").remove();

        var val = select.data("value");

        if (data != null) {
            $.each(data, function (index, value) {

                var sel = "";
                if (val) {
                    if (val == value[opDefault.valueField]) {
                        sel = "selected";
                    }
                }


                var json = "";

                if (opDefault.useStore) {
                    json = JSON.stringify(value);
                }

                $opciones += '<option value="' + value[opDefault.valueField] + '" ' + sel + ' data-item-json="' + json + '"  >' + value[opDefault.displayField] + '</option>';

            });
        }

        select.append($opciones);

        if (val && val != "") {
            select.val(val); 
        }

    },

    LoadTable: function (options) {

        var modal = $("#modalGeneralSearch");
        var table = modal.find("#tableSearch");
        var input = modal.find(".searchText");
        var btn = modal.find(".searchBtn");
        var Url = $("#hUrlStoreJson").val();

        var opDefault = {
            idPanel: null,
            idCommand: null,
            columns: [],
            SelectItem: function () { },
            GetParam: function () {
                return null;
            }
        };

        opDefault = $.extend(opDefault, options);

        input.unbind("keyup");
        input.keyup(function (e) {
            if (e.keyCode == 13) {
                table.bootstrapTable("refresh");
            }
        });

        window.modalSearchEvent = {
            'click .selectSearch': function (e, value, row, index, el) {
                opDefault.SelectItem(row, opDefault, modal, el);
            }
        }

        opDefault.columns.splice(0, 0, {
            align: "center", width: "60", title: 'Seleccionar', events: window.modalSearchEvent, formatter: function (value, row, index) {

                var html = [
                    '<button type="button" class="btn btn-default btn-sm selectSearch" title="Seleccionar" data-action="View">',
                    '<i class="fa fa-reply-all" aria-hidden="true"></i>',
                    '</button>'
                ];

                return html.join(" ");

            }
        });

        btn.unbind("click");
        btn.click(function () {
            table.bootstrapTable("refresh");
        });

        if (table.data("bootstrap.table") != undefined) {
            table.bootstrapTable("destroy");
        }

        table.bootstrapTable({
            locale:"es-NI",
            method: "POST",
            cache: false,
            url: Url,
            search: false,
            clickToSelect: false,
            columns: [opDefault.columns],
            onDblClickRow: function (item, $element) {
                opDefault.SelectItem(item, opDefault, modal, $element);
            },
            queryParams: function (params) {

                var idcmd = opDefault.idCommand;
                var val = input.val();

                var param = { search: val };
                param = $.extend(param, opDefault.GetParam());
                
                params.model = {
                    IdCommand: idcmd, Param: param
                };

                return JSON.stringify(params);
            }
        });

        modal.modal({ show: true, keyboard: false, backdrop: "static" });

    },

    DateFomratYMD: function (dateIn) {

        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        return String(10000 * yyyy + 100 * mm + dd); // Leading zeros for mm and dd

    },

    Diff_Min: function (dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    },

    CalDays: function (startDate, endDate) {

        if (startDate == null || endDate == null) {
            return 0;
        }

        if (startDate.getTime() == endDate.getTime())
            return 1;

        var tempEndDate = (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, 0, 0));

        if (endDate.getTime() == tempEndDate.getTime()) {
            endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 24, 60, 60, 0);
        }

        return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    },

    getParamQueryString: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    GetLocales: function () {

        var Locales = {};

        if (sessionStorage["Locales"]) {
            Locales = JSON.parse(sessionStorage["Locales"]);
        }

        return Locales;
    },

    GetLocalUser: function () {

        var dataUser = JSON.parse(sessionStorage["jUser"]);
        return dataUser;
    },

    IsNullOrEmpty: function (value) {

        if (value == undefined) return true;
        if (value == null) return true;
        if ($.trim(value) == "") return true;

        return false;
    },

    SetWidthModalLarge: function ($ele, porcentWidth) {
        if (!porcentWidth) {
            porcentWidth = '85%';
        }

        $ele.find(".modal-dialog").css('width', porcentWidth);
    },

    IsLocalPath: function (value) {
        var g = /^[a-zA-Z]:\\[\\\S|*\S]?.*$/g;
        return g.test(value);
    },
    IsUncPath: function (value) {
        return value.startsWith("\\\\");
    },
    IsHttpOrHttps: function (value) {
        var g = /^(http|https):///g
        return g.test(value);
    },
    IsMail: function (sMail) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(sMail);
    },
    IsDomain: function (sDomain) {
        //(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]
        return /^([a-zA-Z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/g.test(sDomain);
    },
    IsNull: function (value) {

        if (value == undefined) {
            return true;
        }
        else if (value == null) {
            return true;
        }

        return false;
    },
    get_current_grid_option: function () {
        try {
            return $('.device-check:visible').attr('data-device')
        } catch (e) {
            return '';
        }
    }

};

