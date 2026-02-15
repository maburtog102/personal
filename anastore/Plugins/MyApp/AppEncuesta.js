
function gridParamEncuesta(params) {

    params.model = {
        IdCommand: "VIEW_ENCUESTO_PREGUNTA", Param: null
    };
    return JSON.stringify(params);
}

function CommandColumnEncuesta(value, row, index) {

    var html = [];

    html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppEncuesta.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Encuesta" data-action="see" data-id="' + value + '" onclick="AppEncuesta.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandColumnDetPregunta(value, row, index) {

    var html = [];

    html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Pregunta" data-action="see" data-id="' + value + '" onclick="AppEncuesta.RemovePregunta(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandOpcion(value, row, index) {

    var html = [];

    html.push(row.Valor);
    html.push(" - ");
    html.push(value);

    return html.join(" ");
}

function CommandColumnOpction(value, row, index) {

    var html = [];

    html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Encuesta" data-action="see" data-id="' + value + '" onclick="AppEncuesta.RemovePregunta(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function gridParamView(params) {

    var idcommand = this.idcommand;

    params.model = {
        IdCommand: idcommand, Param: null
    };

    return JSON.stringify(params);
}

function CommandColumnListEncuesta(value, row, index) {

    var html = [];

    html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppListEncuesta.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Encuesta" data-action="see" data-id="' + value + '" onclick="AppListEncuesta.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

var AppEncuesta = {

    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?", MsgValidOpcion: "Requerido opciones de pregunta", MsgValidPregunta: "Requerido las preguntas", MsgValidIndicador: "Requerido seleccionar indicador" },

    LoadForm: function (html, $container) {
        var $that = this;

        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");
        $.validator.unobtrusive.parse("#" + id + " form");

        vHtml.find('[data-toggle="table"]').bootstrapTable();

        var indicadors = JSON.parse(vHtml.find("#JsonIndicador").val());

        vHtml.find("#tableSelIndicador").bootstrapTable("load", indicadors);

        var selTipoPregunta = vHtml.find('[name="IdTipoPregunta"]');
        AppUtil.LoadSelect({ element: selTipoPregunta, data: JSON.parse($("#JsonTipoPregunta").val()) });

        var sJsonPregunta = vHtml.find("#JsonPregunta").val();
        var sJsonOpcion = vHtml.find("#JsonOpcion").val();


        if (!AppUtil.IsNullOrEmpty(sJsonPregunta)) {

            var Preguntas = JSON.parse(sJsonPregunta);
            var opcions = [];

            if (!AppUtil.IsNullOrEmpty(sJsonOpcion)) {
                opcions = JSON.parse(sJsonOpcion);
            }

            $.each(Preguntas, function (i, row) {

                var opcion = opcions.filter(function (obj) { return obj.IdPregunta == row.IdPregunta });
                row.Opcion = opcion;
            });

            vHtml.find("#tablePregunta").bootstrapTable("load", Preguntas);

        }

        $container.toggle("slow");

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEdit").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            $that.LoadForm(html, $container);

        });

    },

    Edit: function (sender) {

        var $that = this;
        var $btn = $(sender);

        var url = $("#UrlCreateOrEdit").val();
        var id = $btn.data("id");

        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);
            var idpanel = vHtml.attr("id");

            var tr = $btn.parent().parent();
            var cols = tr.children().length;

            if (tr.is("div")) {
                tr = tr.parent().parent().parent();
            }

            var trDetail = $('<tr></tr>');
            var index = $btn.data("index");
            trDetail.attr("id", "detail_" + index);

            var td = $('<td></td>');
            td.attr("colspan", cols);

            vHtml.addClass("offset-md-1");

            trDetail.html(td);
            tr.after(trDetail);
            td.hide();

            $that.LoadForm(vHtml, td);
        });
    },

    Save: function (sender) {

        var $that = this;
        var $btn = $(sender);
        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);

        var frm = $panel.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        var Datalle = JSON.parse(JSON.stringify($panel.find("#tablePregunta").bootstrapTable("getData")));
        var selIndicador = $panel.find("#tableSelIndicador").bootstrapTable("getSelections");

        if (Datalle.length == 0) {
            Msg.MsgWarning(this.Local.MsgValidPregunta);
            return;
        }

        if (selIndicador.length == 0) {
            Msg.MsgWarning(this.Local.MsgValidIndicador);
            return;
        }

        if (selIndicador.length > 0) {
            vData.IdIndicador = selIndicador.map(function (row) { return row.IdIndicador; }).join(",");
        }

        var Model = {};
        Model.Detalle = {};

        var Pregunta = [];
        var vOpctions = [];

        Model.Maestro = vData;

        $.each(Datalle, function (i, v1) {

            var opcions = v1.Opcion;
            delete v1.Opcion;
            v1.UniqueId = i;
            Pregunta.push(v1);

            if (opcions.length > 0) {

                $.each(opcions, function (ii, v2) {
                    v2.UniqueId = i;
                    v2.OpcionUniqueId = ii;
                    vOpctions.push(v2);
                });
            }

        });

        var url = $("#hUrlMasterStoreJson").val();

        Model.Detalle.Pregunta = Pregunta;
        Model.Detalle.Opcion = vOpctions;
        Model.UseResponse = true;
        Model.IdCommand = "SAVE_ENCUESTA_PREGUNTA";

        var json = JSON.stringify(Model);

        Ajax.PostForm(url, { sJson: json }, function (dataJson) {

            var response = JSON.parse(dataJson);

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableListEncuesta").bootstrapTable("refresh");
            }
            else {
                ShowMsgResponse(response);
            }

        });

    },

    Cancel: function (sender) {

        var btn = $(sender);
        var idPanel = btn.data("idpanel");
        var $panel = $("#" + idPanel);

        $panel.toggle('slow', function () {
            var p = $panel.parent();
            $panel.remove();
            if (p.is("td")) {
                p.parent().remove();
            }
            else {
                p.hide();
            }
        });

    },

    AddPregunta: function (sender) {

        var $btn = $(sender);
        var $that = this;
        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);
        var tableOp = $panel.find("#tablePreguntaOption");
        var frm = $panel.find("#detPregunta");

        $.validator.unobtrusive.parse("#" + idpanel + " #detPregunta");
        if (!frm.valid()) return;

        var data = GetDataByContainer(frm);

        data.Opcion = JSON.parse(JSON.stringify(tableOp.bootstrapTable("getData")));

        if (data.IdTipoPregunta == 1 || data.IdTipoPregunta == 2) {
            if (data.Opcion.length == 0) {
                Msg.MsgWarning(this.Local.MsgValidOpcion);
                return;
            }
        }

        $panel.find("#tablePregunta").bootstrapTable("append", data);
        tableOp.bootstrapTable("removeAll");

        ClearByContainer(frm);
        frm.find('[name="IdTipoPregunta"]').focus();

        $that.ChangedTipoPregunta(frm.find('[name="IdTipoPregunta"]'));
    },

    ChangedTipoPregunta: function (sender) {

        var sel = $(sender);
        var idpanel = sel.data("idpanel");
        var $panel = $("#" + idpanel);

        $panel.find("#opRes1").hide();

        var divMax = $panel.find('[name="Maximo"]').parent().parent();
        divMax.hide();

        if (sel.val() == 1 || sel.val() == 2) {
            $panel.find("#opRes1").show();
        }
        else if (sel.val() == 3) {
            divMax.show();
        }
        else {
            $panel.find("#opRes1").hide();
        }
    },

    AddOptionRespuesta: function (sender) {
        var $btn = $(sender);
        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);

        $.validator.unobtrusive.parse("#" + idpanel + " #frmOpRes1");
        var frm = $panel.find("#frmOpRes1");

        if (!frm.valid()) return;

        var vData = GetDataByContainer(frm);

        var table = $panel.find("#tablePreguntaOption");

        table.bootstrapTable("append", vData);
        ClearByContainer(frm);

        frm.find('[name="Valor"]').focus();

    },

    Delete: function (sender) {

        var $that = this;
        var $btn = $(sender);

        Msg.Confirm.ShowOkCancel(this.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_ENCUESTA_PREGUNTA";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {
                    if (respose.Success) {
                        $("#tableListEncuesta").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }

        });
    },

    RemovePregunta: function (sender) {

        var $btn = $(sender);
        var $table = $btn.parents("table").eq(0);
        var index = $btn.data("index");
        var data = $table.bootstrapTable("getData");

        data.splice(index, 1);
        $table.bootstrapTable('load', data);
    }
}

var AppListEncuesta = {

    LoadForm: function (html, $container) {

        var $that = this;
        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");
        $.validator.unobtrusive.parse("#" + id + " form");
        InitDatePicker($container);

        //vHtml.find('[data-toggle="table"]').bootstrapTable();

        var JsonProductor = JSON.parse(vHtml.find("#JsonProductor").val());
        var JsonFinca = JSON.parse(vHtml.find("#JsonFinca").val());
        var JsonEncuesta = JSON.parse(vHtml.find("#JsonEncuesta").val());

        JsonProductor = JsonProductor.filter(function (p) { return p.IdTipoEnte == 1; });

        var selProductor = vHtml.find('[name="IdProductor"]');
        AppUtil.LoadSelect({ element: selProductor, data: JsonProductor });

        var selFinca = vHtml.find('[name="IdFinca"]');
        AppUtil.LoadSelect({ element: selFinca, data: JsonFinca });

        var selEncuesta = vHtml.find('[name="IdEncuesta"]');
        AppUtil.LoadSelect({ element: selEncuesta, data: JsonEncuesta });

        //vHtml.find("#tableSelIndicador").bootstrapTable("load", indicadors);

        //var selTipoPregunta = vHtml.find('[name="IdTipoPregunta"]');
        //AppUtil.LoadSelect({ element: selTipoPregunta, data: JSON.parse($("#JsonTipoPregunta").val()) });

        //var sJsonPregunta = vHtml.find("#JsonPregunta").val();
        //var sJsonOpcion = vHtml.find("#JsonOpcion").val();


        //if (!AppUtil.IsNullOrEmpty(sJsonPregunta)) {

        //    var Preguntas = JSON.parse(sJsonPregunta);
        //    var opcions = [];

        //    if (!AppUtil.IsNullOrEmpty(sJsonOpcion)) {
        //        opcions = JSON.parse(sJsonOpcion);
        //    }

        //    $.each(Preguntas, function (i, row) {

        //        var opcion = opcions.filter(function (obj) { return obj.IdPregunta == row.IdPregunta });
        //        row.Opcion = opcion;
        //    });

        //    vHtml.find("#tablePregunta").bootstrapTable("load", Preguntas);

        //}

        $container.toggle("slow", function () {

            if ($container.find("#IdRespuesta").val() > 0) {
                $that.OnChangedEncuesta($container.find('[name="IdEncuesta"]'));
            }
        });

    },

    OnChangedProductor: function (sender) {

        var selProductor = $(sender);
        var idProductor = selProductor.val();
        var $idPanel = selProductor.data("idpanel");
        var $panel = $("#" + $idPanel);

        var url = $("#hUrlStoreJson").val();

        var model = {};
        model.IdCommand = "CAT_ALL_FINCA";
        model.Param = { IdProductor: idProductor, IdExclu: null };
        model.UseResponse = true;

        Ajax.Post(url, JSON.stringify(model), function (response) {

            var selFinca = $panel.find('[name="IdFinca"]');
            var JsonFinca = response.Data.CAT_ALL_FINCA;
            AppUtil.LoadSelect({ element: selFinca, data: JsonFinca });

        });

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEdit").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            $that.LoadForm(html, $container);

        });
    },

    Edit: function (sender) {

        var $that = this;
        var $btn = $(sender);

        var url = $("#UrlCreateOrEdit").val();
        var id = $btn.data("id");


        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);
            var tr = $btn.parent().parent();
            var cols = tr.children().length;

            if (tr.is("div")) {
                tr = tr.parent().parent().parent();
            }

            var trDetail = $('<tr></tr>');
            var index = $btn.data("index");
            trDetail.attr("id", "detail_" + index);

            var td = $('<td></td>');
            td.attr("colspan", cols);

            vHtml.addClass("offset-md-1");
            trDetail.html(td);
            td.hide();
            tr.after(trDetail);

            $that.LoadForm(vHtml, td);

        });
    },

    OnChangedEncuesta: function (sender) {

        var el = $(sender);
        var id = el.val();

        var panel = $("#" + el.data("idpanel"));
        this.GetPregunta(id, panel);
    },

    GetPregunta: function (vId, container) {

        var url = $("#hUrlStoreListJson").val();
        var Model = [];
        var $that = this;
        var $panel = $(container);

        Model.push({ IdClient: "Preguntas", IdCommand: "GET_PREGUNTA_BYID_ENCU", Param: { Id: vId } });
        Model.push({ IdClient: "Opciones", IdCommand: "GET_OPCION_BYID_ENCU", Param: { Id: vId } });

        var vIdRe = $panel.find('[name="IdRespuesta"]').val();
        Model.push({ IdClient: "Repuestas", IdCommand: "GET_REPUESTA_DET_BYID", Param: { Id: vIdRe } });

        var json = JSON.stringify(Model);

        Ajax.Post(url, json, function (response) {

            if (response.Success) {

                var Preguntas = response.Data.Preguntas;
                var Opciones = response.Data.Opciones;
                var Repuestas = response.Data.Repuestas;

                $.each(Preguntas, function (i, pRow) {

                    pRow.Opcion = Opciones.filter(function (op) { return op.IdPregunta == pRow.IdPregunta; });
                    pRow.Respuesta = Repuestas.filter(function (re) { return re.IdPregunta == pRow.IdPregunta });

                });

                setTimeout(function () {
                    $that.RenderPregunta(Preguntas, $panel);
                }, 150);
            }
            else {
                ShowMsgResponse(response);
            }

        });
    },

    RenderPregunta: function (Preguntas, panel) {

        var elPanel = $(panel);
        var table = elPanel.find('#RespuestaDet');
        var body = table.find("tbody");
        var that = this;

        body.hide("slow", function () {
            body.children().remove();

            $.each(Preguntas, function (i, row) {

                var tr = $("<tr>");
                var td = $("<td>");
                var span = $("<span>");
                var div = $("<div>");

                tr.append(td);
                tr.data("index", i);

                td.append(span);
                td.append(div);

                tr.data("row", { IdPregunta: row.IdPregunta, IdTipoPregunta: row.IdTipoPregunta });

                span.text(row.Pregunta.toLocaleUpperCase());
                div.addClass("form-group");

                if (that.IsCheck(row)) {

                    $.each(row.Opcion, function (oi, oRow) {

                        var html = '<div class="checkbox">';
                        html += '<label><input type="checkbox" /> &nbsp;' + oRow.Opcion.toLocaleUpperCase() + '</label>';
                        html += '</div>';

                        var rHtml = $(html);

                        if (row.Respuesta.filter(function (r) { return r.IdOpcion == oRow.IdOpcion; }).length > 0) {
                            rHtml.find("input").prop("checked", true);
                        }

                        rHtml.find("input").data("Respuesta", { IdPregunta: row.IdPregunta, IdOpcion: oRow.IdOpcion, IdTipoPregunta: row.IdTipoPregunta });
                        div.append(rHtml);
                    });
                }
                else if (that.IsRadio(row)) {

                    $.each(row.Opcion, function (oi, oRow) {

                        var html = '<div class="checkbox">';
                        html += '<label><input type="radio" name="preg' + row.IdPregunta + '"' + ' /> &nbsp;' + oRow.Opcion.toLocaleUpperCase() + '</label>';
                        html += '</div>';
                        var checkHtml = $(html);

                        if (row.Respuesta.filter(function (r) { return r.IdOpcion == oRow.IdOpcion; }).length > 0) {
                            checkHtml.find("input").prop("checked", true);
                        }

                        checkHtml.find("input").data("Respuesta", { IdPregunta: row.IdPregunta, IdOpcion: oRow.IdOpcion, IdTipoPregunta: row.IdTipoPregunta });
                        div.append(checkHtml);
                    });
                }
                else if (that.IsNumber(row)) {

                    var html = '<input type="number" class="form-control" />';
                    var nHtml = $(html);

                    if (row.Respuesta.length > 0) {
                        nHtml.val(row.Respuesta[0].Valor);
                    }

                    nHtml.data("Respuesta", { IdPregunta: row.IdPregunta, IdOpcion: 0, IdTipoPregunta: row.IdTipoPregunta });
                    div.append(nHtml);
                }
                else if (that.IsText(row)) {

                    var html = '<textarea class="form-control"></textarea>';
                    var tHtml = $(html);

                    if (row.Respuesta.length > 0) {
                        tHtml.val(row.Respuesta[0].Valor);
                    }

                    tHtml.data("Respuesta", { IdPregunta: row.IdPregunta, IdOpcion: 0, IdTipoPregunta: row.IdTipoPregunta });
                    div.append(tHtml);
                }

                body.append(tr);

            });
            body.toggle("slow");
        });

    },

    IsRadio: function (row) {
        return row.IdTipoPregunta == 1;
    },
    IsCheck: function (row) {
        return row.IdTipoPregunta == 2;
    },
    IsNumber: function (row) {
        return row.IdTipoPregunta == 3;
    },
    IsText: function (row) {
        return row.IdTipoPregunta == 4;
    },

    Save: function (sender) {

        var btn = $(sender);
        var idPanel = btn.data("idpanel");
        var $panel = $("#" + idPanel);
        var frm = $panel.find("form");
        var that = this;

        if (!frm.valid()) return;

        var vData = {};
        var Det = [];
        var ar = frm.serializeArray();

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        vData.Fecha = $panel.find('[name="Fecha"]').datepicker("getDate");

        var RespuestaDet = $panel.find("#RespuestaDet");
        var rows = RespuestaDet.find("tr");

        $.each(rows, function (i, el) {

            var vRow = $(el);
            var res = vRow.data("row");
            var Item = {};

            if (that.IsRadio(res) || that.IsCheck(res)) {

                $.each(vRow.find("input:checked"), function (ii, inputEl) {

                    var vInput = $(inputEl);
                    Item = {};
                    Item.IdPregunta = res.IdPregunta;
                    Item.IdOpcion = vInput.data("Respuesta").IdOpcion;
                    Det.push(Item);
                });
            }
            else if (that.IsNumber(res)) {

                Item.IdPregunta = res.IdPregunta;
                Item.IdOpcion = 0;
                Item.Valor = vRow.find("input").val();
                Det.push(Item);
            }
            else if (that.IsText(res)) {

                Item.IdPregunta = res.IdPregunta;
                Item.IdOpcion = 0;
                Item.Valor = vRow.find("textarea").val();
                Det.push(Item);
            }

        });


        var model = {};
        model.IdCommand = "SAVE_RESPUESTA";
        model.Detalle = {};

        model.Detalle.EncuestaProductor = [vData];
        model.Detalle.EncuestaRespuesta = Det;

        var url = $("#hUrlMasterRowJson").val();

        Ajax.PostForm(url, { sJson: JSON.stringify(model) }, function (dataJson) {

            var response = JSON.parse(dataJson);
            if (response.Success) {
                that.Cancel(btn);
                $("#tableListEncuesta").bootstrapTable("refresh");
            }
            else {
                ShowMsgResponse(response);
            }

        });

    },
    Cancel: function (sender) {

        var btn = $(sender);
        var idPanel = btn.data("idpanel");
        var $panel = $("#" + idPanel);

        $panel.toggle('slow', function () {
            var p = $panel.parent();
            $panel.remove();

            if (p.is("td")) {
                p.parent().remove();
            }
            else {
                p.hide();
            }
        });
    },

    Delete: function (sender) {

        var $that = this;
        var $btn = $(sender);

        Msg.Confirm.ShowOkCancel(AppEncuesta.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_RESPUESTA";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {
                    if (respose.Success) {
                        $("#tableListEncuesta").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }
        });
    }

}
