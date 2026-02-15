
function gridParamProductor(params) {

    params.model = {
        IdCommand: "VIEW_ENTE", Param: null
    };
    return JSON.stringify(params);
}

function gridParamFinca(params) {

    params.model = {
        IdCommand: "VIEW_FINCA", Param: { IdProductor: null }
    };

    if (AppEnte.Select.Current) {
        params.model.Param.IdProductor = AppEnte.Select.Current.IdEnte;
    }

    return JSON.stringify(params);
}

function gridParamAnimal(params) {

    params.model = {
        IdCommand: "VIEW_ANIMAL", Param: { IdFinca: null }
    };

    if (AppFinca.Select.Current) {
        params.model.Param.IdFinca = AppFinca.Select.Current.IdFinca;
    }

    return JSON.stringify(params);
}

function CommandColumnProductor(value, row, index) {
    var html = [];

    if (value != 0) {
        html = [
            '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppEnte.Edit(this)" data-index="' + index + '">',
            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
            '</button>',

            '<button type="button"  class="btn btn-default btn-sm" title="Ver fincas" data-action="see" data-id="' + value + '" onclick="AppEnte.LoadFinca(this)" data-index="' + index + '">',
            '<i class="fa fa-search" aria-hidden="true"></i>',
            '</button>',

            '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Productor" data-action="see" data-id="' + value + '" onclick="AppEnte.Delete(this)" data-index="' + index + '">',
            '<i class="fa fa-trash" aria-hidden="true"></i>',
            '</button>'
        ]
    }
    else {

        html = [
            '<button type="button"  class="btn btn-default btn-sm" title="Ver fincas" data-action="see" data-id="' + value + '" onclick="AppEnte.LoadFinca(this)" data-index="' + index + '">',
            '<i class="fa fa-search" aria-hidden="true"></i>',
            '</button>',
        ]
    }

    return html.join(" ");
}

function CommandColumnFinca(value, row, index) {


    var html = [];

    if (value != 0) {
        html = ['<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppFinca.Edit(this)" data-index="' + index + '">',
            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
            '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Ver Animales" data-action="see" data-id="' + value + '" onclick="AppFinca.LoadAnimal(this)" data-index="' + index + '">',
            '<i class="fa fa-search" aria-hidden="true"></i>',
            '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar Finca" data-action="see" data-id="' + value + '" onclick="AppFinca.Delete(this)" data-index="' + index + '">',
            '<i class="fa fa-trash" aria-hidden="true"></i>',
            '</button>']
    }
    else {
        html = [
            '<button type="button"  class="btn btn-default btn-sm" title="Ver Animales" data-action="see" data-id="' + value + '" onclick="AppFinca.LoadAnimal(this)" data-index="' + index + '">',
            '<i class="fa fa-search" aria-hidden="true"></i>',
            '</button>']
    }

    return html.join(" ");
}

function CommandColumnAnimal(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppAnimal.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandColumnControlPeso(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="delete" data-id="' + value + '" onclick="AppAnimal.EliminarPeso(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function gridParamHistoricoAnimal(params) {

    var idcommand = this.idcommand;
    var id = this.idfiltro;

    params.model = {
        IdCommand: idcommand, Param: {}
    };

    params.model.Param.Id = id;

    return JSON.stringify(params);
}

var AppEnte = {
    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?" },
    Select: { Current: null },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewProductor");
        var url = $("#UrlCreateOrEditProcutor").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");

            $.validator.unobtrusive.parse("#" + id + " form");

            $container.toggle("slow");

        });
    },
    Edit: function (sender) {

        var $that = this;
        var $btn = $(sender);

        var url = $("#UrlCreateOrEditProcutor").val();
        var id = $btn.data("id");

        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);
            var tr = $btn.parent().parent();
            var cols = tr.children().length;

            var idpanel = vHtml.attr("id");

            if (tr.is("div")) {
                tr = tr.parent().parent().parent();
            }

            var trDetail = $('<tr></tr>');
            var index = $btn.data("index");
            trDetail.attr("id", "detail_" + index);

            var td = $('<td></td>');
            td.attr("colspan", cols);

            vHtml.addClass("offset-md-1");
            td.html(vHtml);
            trDetail.html(td);
            trDetail.hide();
            tr.after(trDetail);

            $.validator.unobtrusive.parse("#" + idpanel + " form");
            trDetail.toggle("slow");

        });

    },
    Save: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);
        var frm = $panel.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_ENTE", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableProductor").bootstrapTable("refresh");
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
        var $btn = $(sender);
        var $that = this;
        Msg.Confirm.ShowOkCancel(AppEnte.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_ENTE";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableProductor").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    },
    LoadFinca: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableProductor").bootstrapTable('getRowByUniqueId', id);
        this.Select.Current = row;

        $("#tableFinca").bootstrapTable('refresh');
        $('#myTab a[href="#tab_2"]').tab('show');

    },

    DownloadTemplate: function (sender) {

        var btn = $(sender);
        var url = btn.data("url");
        var typeTemplete = btn.data("type-template");
        $.redirectPost(url, { IdTemplate: typeTemplete });

    },

    UploadFile: function (sender) {

        var btn = $(sender);





    }

}

var AppFinca = {
    Select: { Current: null },

    LoadForm: function (html, $container) {
        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");

        var sJsonProductor = vHtml.find("#JsonProductor").val();
        var sJsonMunicipio = vHtml.find("#JsonMunicipio").val();
        var JsonProductor = JSON.parse(sJsonProductor);
        var JsonMunicipio = JSON.parse(sJsonMunicipio);

        var IdProductor = vHtml.find('[name="IdProductor"]');
        var IdMunicipio = vHtml.find('[name="IdMunicipio"]');

        AppUtil.LoadSelect({ element: IdProductor, data: JsonProductor, labelValueOption: "0" });
        AppUtil.LoadSelect({ element: IdMunicipio, data: JsonMunicipio, labelValueOption: "0" });

        if (AppEnte.Select.Current)
            IdProductor.val(AppEnte.Select.Current.IdEnte);

        $.validator.unobtrusive.parse("#" + id + " form");
        $container.toggle("slow");

        InitDatePicker($container);
        vHtml.find('[data-toggle="table"]').bootstrapTable();
    },

    Add: function (sender) {
        var $that = this;
        var $container = $("#divNewFinca");
        var url = $("#UrlCreateOrEditFinca").val();

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

        var url = $("#UrlCreateOrEditFinca").val();
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
    Save: function (sender) {
        var $btn = $(sender);
        var $that = this;

        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);
        var frm = $panel.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        vData.FechaOrdeno = $panel.find('[name="FechaOrdeno"]').datepicker("getDate");

        delete vData["Precio"];

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_FINCA", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableFinca").bootstrapTable("refresh");
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
        var $btn = $(sender);
        var $that = this;
        Msg.Confirm.ShowOkCancel(AppEnte.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_FINCA";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableFinca").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }

        });
    },
    LoadAnimal: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableFinca").bootstrapTable('getRowByUniqueId', id);
        this.Select.Current = row;

        $("#tableAnimal").bootstrapTable('refresh');
        $('#myTab a[href="#tab_3"]').tab('show');

    },
    CalPrecio: function (sender) {

        var el = $(sender);

        var idPanel = el.data("idpanel");
        var panel = $("#" + idPanel);

        var elMonto = panel.find('[name="MontoTicket"]');
        var elLeche = panel.find('[name="CantidadLeche"]');
        var elPrecio = panel.find('[name="Precio"]');

        if (!AppUtil.IsNullOrEmpty(elMonto.val()) && !AppUtil.IsNullOrEmpty(elLeche.val())) {

            var vMonto = parseFloat(elMonto.val());
            var vLeche = parseFloat(elLeche.val());

            var precio = (vMonto / vLeche).toFixed(2);

            elPrecio.val(precio);
        }
        else {
            elPrecio.val(0);
        }
    }
}

var AppAnimal = {
    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?" },
    Select: { Current: null },

    LoadForm: function (html, $container) {
        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");

        var selArete = vHtml.find('[name="IdArete"]');
        var selRaza = vHtml.find('[name="IdRaza"]');
        var selPaisOrigen = vHtml.find('[name="IdPaisOrigen"]');
        var selCategoria = vHtml.find('[name="IdCategoria"]');
        var selAniEst = vHtml.find('[name="IdEstadoAnimal"]');
        
        var sJsonArete = vHtml.find("#JsonArete").val();
        var JsonArete = JSON.parse(sJsonArete);

        var sJsonRaza = vHtml.find("#JsonRaza").val();
        var JsonRaza = JSON.parse(sJsonRaza);

        var sJsonPaisOrigen = vHtml.find("#JsonPaisOrigen").val();
        var JsonPaisOrigen = JSON.parse(sJsonPaisOrigen);

        var sJsonAniCategoria = vHtml.find("#JsonAniCategoria").val();
        var JsonAniCategoria = JSON.parse(sJsonAniCategoria);

        var sJsonAniEst = vHtml.find("#JsonAniEst").val();
        var JsonAniEst = JSON.parse(sJsonAniEst);

        AppUtil.LoadSelect({ element: selArete, data: JsonArete });
        AppUtil.LoadSelect({ element: selRaza, data: JsonRaza });
        AppUtil.LoadSelect({ element: selPaisOrigen, data: JsonPaisOrigen });
        AppUtil.LoadSelect({ element: selCategoria, data: JsonAniCategoria });
        AppUtil.LoadSelect({ element: selAniEst, data: JsonAniEst });        

        vHtml.find(".accion1").show();

        vHtml.find('[data-toggle="table"]').bootstrapTable();

        $.validator.unobtrusive.parse("#" + id + " form");

        $container.toggle("slow");
        InitDatePicker($container);

        vHtml.find('[name="Sexo"]:checked').click();
    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewAnimal");
        var url = $("#UrlCreateOrEditAnimal").val();

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

        var url = $("#UrlCreateOrEditAnimal").val();
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
    Save: function (sender) {
        var $btn = $(sender);
        var $that = this;

        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);
        var frm = $panel.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        var selFechaNac = $panel.find('[name="FechaNac"]');
        vData.FechaNac = selFechaNac.datepicker("getDate");
        vData.FechaPesaje = $panel.find('[name="FechaPesaje"]').datepicker("getDate");

        var selFechaRegistro = $panel.find('[name="FechaRegistro"]');
        vData.FechaRegistro = selFechaRegistro.datepicker("getDate");

        delete vData["Productor"];
        delete vData["Finca"];

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_ANIMAL", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableAnimal").bootstrapTable("refresh");
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
        var $btn = $(sender);
        var $that = this;
        Msg.Confirm.ShowOkCancel(AppAnimal.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_ANIMAL";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableAnimal").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }

        });
    },
    EliminarPeso: function (sender) {

        var $btn = $(sender);
        var $that = this;

        Msg.Confirm.ShowOkCancel(AppAnimal.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_CONTROL_ANIMAL";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $btn.parents("table").eq(0).bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }

        });

    },
    OnChangedSexo: function (sender) {

        var el = $(sender);
        var val = el.val();
        var idPanel = el.data("idpanel");
        var panel = $("#" + idPanel);

        var estAni = panel.find('[name="IdEstadoAnimal"]');
        var divEstAni = estAni.parent().parent();
        divEstAni.hide();
        estAni.data("val", false);

        if (val == 0) {

            estAni.data("val", true);
            divEstAni.show();
        }
        else {
            estAni.val("");
        }

        $.validator.unobtrusive.parse("#" + idPanel + " form");
    }

}


var ImportData = {
    Local: { MsgSeletedFile: "No ha cargado el archivo o previsualizado" },
    DataSetFile: [],

    GetModal: function () {
        return $("#modalExcelImport");
    },

    ShowModal: function (sender) {

        var modal = $(this.GetModal());
        var btn = $(sender);

        var idOrigen = btn.data("idorigen");
        var sel = modal.find('[name="IdTipoOrigen"]');
        sel.val(idOrigen);
        this.OnChengedOrigen(sel);

        modal.modal({ backdrop: "static", keyboard: false, show: true });
    },

    OnChengedOrigen: function (sender) {

        var modal = $(this.GetModal());
        var table = modal.find("#tableImportData");

        var sel = $(sender);

        table.bootstrapTable();
        table.bootstrapTable("destroy");
        var header = table.find("thead");
        header.children().remove();

        var idOrigen = sel.val();
        var tr = $("<tr>");
        var th = "";

        if (idOrigen == 1) {

            th = '<th data-field="Cedula" data-sortable="true"> ' + "Cedula o Cupa" + '</th>';
            th += '<th data-field="Nombre" data-sortable="true" data-width="auto"> ' + "Productor" + '</th>';
            th += '<th data-field="Correo" data-sortable="true"> ' + "Correo" + '</th>';
            th += '<th data-field="Telefono" data-sortable="true"> ' + "Telefono" + '</th>';
            th += '<th data-field="Sexo" data-sortable="true"> ' + "Sexo" + '</th>';
            th += '<th data-field="Certificado" data-sortable="true"> ' + "Capacitado" + '</th>';
            tr.append(th);
        }
        else if (idOrigen == 2) {
            th = '<th data-field="NomProductor" data-sortable="true" data-width="auto"> ' + "Productor" + '</th>';
            th += '<th data-field="Muni" data-sortable="true"> ' + "Municipio" + '</th>';
            th += '<th data-field="Cedula" data-sortable="true"> ' + "Cedula" + '</th>';
            th += '<th data-field="Cue" data-sortable="true"> ' + "Cue" + '</th>';
            th += '<th data-field="Certificada" data-sortable="true"> ' + "Certificada" + '</th>';
            th += '<th data-field="AreaFincaHaX3" data-sortable="true"> ' + "Area Finca de Ha X3" + '</th>';
            th += '<th data-field="AreaInfraestHa" data-sortable="true"> ' + "Area Infraest Ha" + '</th>';
            th += '<th data-field="AreaBosqueCompacto" data-sortable="true"> ' + "Area de Bosque Compacto" + '</th>';
            th += '<th data-field="AreaAgricolaHa" data-sortable="true"> ' + "Area Agricola Ha" + '</th>';
            th += '<th data-field="ArbolesDisperso" data-sortable="true"> ' + "Arboles Disperso" + '</th>';
            th += '<th data-field="Brachiaria" data-sortable="true"> ' + "Brachiaria" + '</th>';
            th += '<th data-field="CercaViva" data-sortable="true"> ' + "Cerca Viva" + '</th>';
            th += '<th data-field="Estrella" data-sortable="true"> ' + "Estrella" + '</th>';
            th += '<th data-field="Jaragua" data-sortable="true"> ' + "Jaragua" + '</th>';
            th += '<th data-field="Mombaza" data-sortable="true"> ' + "Mombaza" + '</th>';
            th += '<th data-field="Natural" data-sortable="true"> ' + "Natural" + '</th>';
            th += '<th data-field="PastoCorte" data-sortable="true"> ' + "Pasto de Corte" + '</th>';
            tr.append(th);
        }
        else if (idOrigen == 3) {

            th = '<th data-field="NomProductor" data-sortable="true" data-width="auto"> ' + "Productor" + '</th>';
            th += '<th data-field="Cedula" data-sortable="true"> ' + "Cedula" + '</th>';
            th += '<th data-field="Finca" data-sortable="true"> ' + "Finca" + '</th>';
            th += '<th data-field="Cue" data-sortable="true"> ' + "Cue" + '</th>';
            th += '<th data-field="Cuia" data-sortable="true"> ' + "Cuia" + '</th>';
            th += '<th data-field="Categoria" data-sortable="true"> ' + "Categoria" + '</th>';
            th += '<th data-field="TipoArete" data-sortable="true"> ' + "Arete" + '</th>';
            th += '<th data-field="Sexo" data-sortable="true"> ' + "Sexo" + '</th>';
            th += '<th data-field="EstadoAnimal" data-sortable="true"> ' + "Estado" + '</th>';
            th += '<th data-field="FechaNac" data-sortable="true" data-formatter="ColumnDate"> ' + "Fecha Nacimiento" + '</th>';
            th += '<th data-field="Raza" data-sortable="true"> ' + "Raza" + '</th>';
            th += '<th data-field="PaisOrigen" data-sortable="true"> ' + "Pais" + '</th>';
            th += '<th data-field="PesoActual" data-sortable="true"> ' + "Peso Actual" + '</th>';
            th += '<th data-field="PesoNac" data-sortable="true"> ' + "Peso Nacimiento" + '</th>';
            th += '<th data-field="Descripcion" data-sortable="true"> ' + "Descripción" + '</th>';
            tr.append(th);
        }

        header.append(tr);
        table.bootstrapTable();
        table.bootstrapTable('resetView')
    },

    UploadFile: function (sender) {

        var btn = $(sender);
        var url = btn.data("url");
        var $that = this;
        var modal = $(this.GetModal());

        if (this.DataSetFile.length == 0)
            return;

        var idOrigen = modal.find('[name="IdTipoOrigen"]').val();
        var hoja = modal.find('[name="HojaName"]').val();

        var datof = new FormData();

        datof.append("File", this.DataSetFile[0]);
        datof.append("IdOrigen", idOrigen);
        datof.append("Hoja", hoja);
        datof.append("IdCommand", "IMPORT_DATA_EXCEL");
        datof.append("Nota", "Execel exportar");

        Ajax.AjaxCustom({
            url: url,
            data: datof,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response.Success) {

                    modal.find("#tableImportData").bootstrapTable("load", response.Data.ExcelData);
                    modal.find("#btnImportAplicar").data("session", response.Data.Session);
                    modal.find("#btnImportAplicar").data("idorigen", response.Data.IdOrigen);
                    modal.find("#tableImportData").bootstrapTable('resetView');
                }
                else {
                    ShowMsgResponse(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    },

    ImportAplicar: function (sender) {

        var btn = $(sender);
        var $that = this;
        var $modal = $(this.GetModal());

        var session = btn.data("session");
        var idOrigen = btn.data("idorigen");

        if (session && idOrigen) {

            var url = $("#hUrlStoreJson").val();
            var vData = {};

            vData.Session = session;
            vData.IdOrigen = idOrigen;

            var model = { IdCommand: "", Param: vData, UseResponse: true };

            if (idOrigen == 1 || idOrigen == 2 || idOrigen == 3) {
                model.IdCommand = "IMPORT_APLICAR";
            }

            Ajax.Post(url, JSON.stringify(model), function (response) {

                if (response.Success) {

                    $modal.modal("hide");
                    $modal.find("#tableImportData").bootstrapTable("removeAll");
                }
                else {
                    ShowMsgResponse(response);
                }
            });

        }
        else {
            Msg.MsgInfo(this.Local.MsgSeletedFile);
        }
    }



}
