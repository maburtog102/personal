

function gridParamProject(params) {

    params.model = {
        IdCommand: "VIEW_PROYECTO", Param: null
    };
    return JSON.stringify(params);
}

function gridParamEnd(params) {

    params.model = {
        IdCommand: "VIEW_FIN", Param: { IdProyecto: null }
    };

    if (AppProject.Select.Project) {
        params.model.Param.IdProyecto = AppProject.Select.Project.IdProyecto;
    }


    return JSON.stringify(params);
}

function gridParamProposition(params) {

    params.model = {
        IdCommand: "VIEW_PROPOSITO", Param: { IdFin: null }
    };

    if (AppEnd.Select.End) {
        params.model.Param.IdFin = AppEnd.Select.End.IdFin;
    }

    return JSON.stringify(params);
}

function gridParamComponent(params) {

    params.model = {
        IdCommand: "VIEW_COMPONENTE", Param: { IdProposito: null }
    };

    if (AppProposition.Select.Pro) {
        params.model.Param.IdProposito = AppProposition.Select.Pro.IdProposito;
    }

    return JSON.stringify(params);
}

function gridParamActivity(params) {

    params.model = {
        IdCommand: "VIEW_PROGRAMACTIVIDAD", Param: { IdComponente: null }
    };

    if (AppComponent.Select.Componente) {
        params.model.Param.IdComponente = AppComponent.Select.Componente.IdComponente;
    }


    return JSON.stringify(params);
}

function gridParamIndicador(params) {
    params.model = {
        IdCommand: "VIEW_INDICADOR", Param: {}
    };

    params.model.Param.IdTipoIndicador = AppIndicador.Select.TipoIndicador.IdTipoIndicador;
    params.model.Param.Id = AppIndicador.Select.TipoIndicador.Codigo;

    return JSON.stringify(params);
}

function gridParamSupuesto(params) {
    params.model = {
        IdCommand: "VIEW_MV_SUPUESTO", Param: {}
    };

    params.model.Param.IdTipoIndicador = AppMvSu.Select.TipoIndicador.IdTipoIndicador;
    params.model.Param.Id = AppMvSu.Select.TipoIndicador.Codigo;
    params.model.Param.IdClase = 1;

    return JSON.stringify(params);
}

function gridParamMedioVerificacion(params) {
    params.model = {
        IdCommand: "VIEW_MV_SUPUESTO", Param: {}
    };

    params.model.Param.IdTipoIndicador = AppMvSu.Select.TipoIndicador.IdTipoIndicador;
    params.model.Param.Id = AppMvSu.Select.TipoIndicador.Codigo;
    params.model.Param.IdClase = 2;

    return JSON.stringify(params);
}

function gridParamReportaje(params) {
    params.model = {
        IdCommand: "GET_REPORTAJE_INDICADOR", Param: {}
    };

    if (AppReportaje.Select.current) {
        params.model.Param.IdIndicador = AppReportaje.Select.current.IdIndicador;
        params.model.Param.IdAnio = AppReportaje.Select.IdAnio;
    }
    else {
        params.model.Param.IdIndicador = null;
        params.model.Param.IdAnio = null;
    }

    return JSON.stringify(params);
}

function gridParamIndicadorFile(params) {

    var idcommand = this.idcommand;
    var id = this.idfiltro;

    params.model = {
        IdCommand: idcommand, Param: {}
    };

    params.model.Param.IdIndicador = id;

    return JSON.stringify(params);
}

function CommandColumnProject(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppProject.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Ver fines asociados al proyecto" data-action="see" data-id="' + value + '" onclick="AppProject.LoadFin(this)" data-index="' + index + '">',
        '<i class="fa fa-search" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar proyecto" data-action="see" data-id="' + value + '" onclick="AppProject.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnEnd(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppEnd.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Ver proposito asociados al fin" data-action="see" data-id="' + value + '" onclick="AppEnd.LoadProposito(this)" data-index="' + index + '">',
        '<i class="fa fa-search" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar fin" data-action="see" data-id="' + value + '" onclick="AppEnd.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnProposition(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppProposition.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Ver proposito asociados al fin" data-action="see" data-id="' + value + '" onclick="AppProposition.LoadComponente(this)" data-index="' + index + '">',
        '<i class="fa fa-search" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar proposito" data-action="see" data-id="' + value + '" onclick="AppProposition.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnComponent(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppComponent.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Ver actividad asociados al componente" data-action="see" data-id="' + value + '" onclick="AppComponent.LoadActividad(this)" data-index="' + index + '">',
        '<i class="fa fa-search" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar proposito" data-action="see" data-id="' + value + '" onclick="AppComponent.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnActivity(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppActivity.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        //'<button type="button"  class="btn btn-default btn-sm" title="Ver Indicadores, medios y supuestos" data-action="see" data-id="' + value + '" onclick="AppActivity.LoadIndicador(this)" data-index="' + index + '">',
        //'<i class="fa fa-search" aria-hidden="true"></i>',
        //'</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppActivity.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnIndicador(value, row, index) {


    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppIndicador.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Reportaje" data-action="see" data-id="' + value + '" onclick="AppReportaje.ShowModalReportaje(this)" data-index="' + index + '">',
        '<i class="fa fa-newspaper-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppIndicador.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    if (row.IdTipoMedicion != 5 && row.IdTipoMedicion != 0) {

        html = [
            '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppIndicador.Edit(this)" data-index="' + index + '">',
            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
            '</button>',

            '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppIndicador.Delete(this)" data-index="' + index + '">',
            '<i class="fa fa-trash" aria-hidden="true"></i>',
            '</button>'
        ];
    }

    return html.join(" ");
}

function CommandColumnSupuesto(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppMvSu.Edit(this,1)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppMvSu.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");

}

function CommandColumnMedioVerificacion(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppMvSu.Edit(this,2)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar proposito" data-action="see" data-id="' + value + '" onclick="AppMvSu.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandColumnReportaje(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppReportaje.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandColumnIndicadorFile(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Descargar archivo" data-action="Cargar" data-id="' + value + '" onclick="AppIndicador.DownloadFile(this)" data-index="' + index + '">',
        '<i class="fa fa-download" aria-hidden="true"></i>',
        '</button>',

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppIndicador.DeleteFile(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];


    if (!row.IdFile || row.IdFile < 0) {

        html = [
            '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppIndicador.DeleteFile(this)" data-index="' + index + '">',
            '<i class="fa fa-trash" aria-hidden="true"></i>',
            '</button>'
        ];

    }

    return html.join(" ");

}

var AppProject = {
    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?", MsgSelectedMarcoLogico: "Debe Selecionar un marco logico" },

    Select: { Project: null },

    OnClickSelectRow: function (field, value, row, $element) {

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEditProject").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");

            var selYearInicio = vHtml.find('[name="IdAnioInicio"]');
            var selYearFin = vHtml.find('[name="IdAnioFin"]');

            var sJsonAnio = vHtml.find("#JsonAnio").val();
            var JsonAnio = JSON.parse(sJsonAnio);

            AppUtil.LoadSelect({ element: selYearInicio, data: JsonAnio });
            AppUtil.LoadSelect({ element: selYearFin, data: JsonAnio });

            $.validator.unobtrusive.parse("#" + id + " form");

            $container.toggle("slow");

        });

    },

    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEditProject").val();
        var id = $btn.data("id");

        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);
            var tr = $btn.parent().parent();
            var cols = tr.children().length;
            var trDetail = $('<tr></tr>');
            var idpanel = vHtml.attr("id");


            if (tr.is("div")) {
                tr = tr.parent().parent().parent();
            }

            var selYearInicio = vHtml.find('[name="IdAnioInicio"]');
            var selYearFin = vHtml.find('[name="IdAnioFin"]');

            var sJsonAnio = vHtml.find("#JsonAnio").val();
            var JsonAnio = JSON.parse(sJsonAnio);

            AppUtil.LoadSelect({ element: selYearInicio, data: JsonAnio });

            var idAnioInicio = selYearInicio.data("val");

            JsonAnio = JsonAnio.filter(function (row) { return row.Codigo >= idAnioInicio; });


            AppUtil.LoadSelect({ element: selYearFin, data: JsonAnio });

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

    Delete: function (sender) {
        var $btn = $(sender);
        var $that = this;

        Msg.Confirm.ShowOkCancel($that.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_PROJECT";
                model.Param = { IdProyecto: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableProject").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    },

    LoadFin: function (sender) {

        var btn = $(sender);
        var idPro = btn.data("id");
        var row = $("#tableProject").bootstrapTable('getRowByUniqueId', idPro);
        this.Select.Project = row;
        $("#tableEnd").bootstrapTable('refresh');

        $('#myTab a[href="#tab_2"]').tab('show');
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

    ChangeYearInicio: function (sender) {

        var select = $(sender);
        var idAnio = select.val();

        var idpanel = select.data("idpanel");
        var $panel = $("#" + idpanel);

        var sJsonAnio = $panel.find("#JsonAnio").val();
        var JsonAnio = JSON.parse(sJsonAnio);
        var selYearFin = $panel.find('[name="IdAnioFin"]');
        selYearFin.val("");
        JsonAnio = JsonAnio.filter(function (row) { return row.Codigo >= idAnio; });
        AppUtil.LoadSelect({ element: selYearFin, data: JsonAnio });

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
        var model = { IdCommand: "SAVE_P_PROYECTO", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableProject").bootstrapTable("refresh");
            }
            else {
                Msg.MsgWarning(response.ResponseText);
            }
        });
    }

};

var AppEnd = {
    Select: { End: null },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewF");
        var url = $("#UrlCreateOrEdiEnd").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");


            if (AppProject.Select.Project) {
                vHtml.find("#Proyecto").val(AppProject.Select.Project.Proyecto);
                vHtml.find('[name="IdProyecto"]').val(AppProject.Select.Project.IdProyecto);
            }


            $container.toggle("slow");

        });

    },

    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEdiEnd").val();
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

    LoadProposito: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableEnd").bootstrapTable('getRowByUniqueId', id);
        this.Select.End = row;

        $("#tableProposito").bootstrapTable('refresh');
        $('#myTab a[href="#tab_3"]').tab('show');
    },

    OnClickSelectRow: function (field, value, row, $element) {
        if (field == "IdFin") return;
        AppIndicador.SetSelectTipo(1, row.IdFin, "Fin: " + row.Descripcion);
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

        if (vData.IdProyecto == 0) {
            return;
        }

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_END", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableEnd").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_END";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableEnd").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    }

};

var AppProposition = {
    Select: { Pro: null },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewP");
        var url = $("#UrlCreateOrEdiProposition").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");


            if (AppEnd.Select.End) {
                vHtml.find("#Fin").val(AppEnd.Select.End.Descripcion);
                vHtml.find('[name="IdFin"]').val(AppEnd.Select.End.IdFin);
            }

            $container.toggle("slow");

        });

    },

    Edit: function (sender) {

        var $that = this;
        var $btn = $(sender);

        var url = $("#UrlCreateOrEdiProposition").val();
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

            trDetail.toggle("slow");

            $.validator.unobtrusive.parse("#" + idpanel + " form");

        });

    },

    LoadComponente: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableProposito").bootstrapTable('getRowByUniqueId', id);
        this.Select.Pro = row;

        $("#tableComponente").bootstrapTable('refresh');
        $('#myTab a[href="#tab_4"]').tab('show');
    },

    OnClickSelectRow: function (field, value, row, $element) {
        if (field == "IdProposito") return;
        AppIndicador.SetSelectTipo(2, row.IdProposito, "Proposito: " + row.Proposito);
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

        if (vData.IdFin == 0) {
            return;
        }

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_PROPOSITO", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableProposito").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_PROPOSITO";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableProposito").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    }
}


var AppComponent = {
    Select: { Componente: null },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewC");
        var url = $("#UrlCreateOrEdiComponent").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");


            if (AppProposition.Select.Pro) {
                vHtml.find("#Proposito").val(AppProposition.Select.Pro.Proposito);
                vHtml.find('[name="IdProposito"]').val(AppProposition.Select.Pro.IdProposito);
            }

            $container.toggle("slow");

        });

    },

    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEdiComponent").val();
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

            trDetail.toggle("slow");

            $.validator.unobtrusive.parse("#" + idpanel + " form");

        });

    },

    LoadActividad: function (sender) {
        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableComponente").bootstrapTable('getRowByUniqueId', id);
        this.Select.Componente = row;

        $("#tableActividad").bootstrapTable('refresh');
        $('#myTab a[href="#tab_5"]').tab('show');
    },

    OnClickSelectRow: function (field, value, row, $element) {
        if (field == "IdComponente") return;
        AppIndicador.SetSelectTipo(3, row.IdComponente, "Componente: " + row.Componente);
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

        if (vData.IdProposito == 0) {
            return;
        }

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_COMPONENTE", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {
                $that.Cancel($btn);
                $("#tableComponente").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_COMPONENTE";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableComponente").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    }
}


var AppActivity = {

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewA");
        var url = $("#UrlCreateOrEdiActivity").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");


            if (AppComponent.Select.Componente) {
                vHtml.find("#Componente").val(AppComponent.Select.Componente.Componente);
                vHtml.find('[name="IdComponente"]').val(AppComponent.Select.Componente.IdComponente);
            }

            $container.toggle("slow");

        });

    },

    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEdiActivity").val();
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

            trDetail.toggle("slow");

            $.validator.unobtrusive.parse("#" + idpanel + " form");

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

        if (vData.IdComponente == 0) {
            return;
        }

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_PG_ACTIVIDAD", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {
                $that.Cancel($btn);
                $("#tableActividad").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_PG_ACTIVIDAD";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableActividad").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    },

    LoadIndicador: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableActividad").bootstrapTable('getRowByUniqueId', id);


    },
    OnClickSelectRow: function (field, value, row, $element) {
        if (field == "IdActividad") return;
        AppIndicador.SetSelectTipo(4, row.IdActividad, "Actividad: " + row.Actividad);
    }
}

var AppIndicador = {
    Select: {
        TipoIndicador: { IdTipoIndicador: null, Codigo: null }
    },

    LoadForm: function (html, $container) {
        var $that = this;

        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");
        $.validator.unobtrusive.parse("#" + id + " form");

        var JsonTipoPeriodo = JSON.parse($("#JsonTipoPeriodo").val());
        var JsonMedicion = JSON.parse($("#JsonMedicion").val());

        var elTipoPeriodo = vHtml.find('[name="IdTipoPeriodo"]');
        var elTipoMedicion = vHtml.find('[name="IdTipoMedicion"]');

        AppUtil.LoadSelect({ element: elTipoPeriodo, data: JsonTipoPeriodo });
        AppUtil.LoadSelect({ element: elTipoMedicion, data: JsonMedicion });

        vHtml.find('[name="IdTipoIndicador"]').val($that.Select.TipoIndicador.IdTipoIndicador);
        vHtml.find('[name="Codigo"]').val($that.Select.TipoIndicador.Codigo);

        vHtml.find("#tableIndicaodrFile").bootstrapTable();
        vHtml.find("#tableIndicaodrFile").data("UploadFile", []);

        $container.toggle("slow");
        InitDatePicker($container);

        vHtml.find(".file").change(function () {

            $(this).parent().removeClass("activeBorder");

            var files = this.files;

            var el = $(this);

            var idpanel = el.data("idpanel");
            var panel = $("#" + idpanel);
            var table = panel.find("#tableIndicaodrFile");
            var DataSetFile = table.data("UploadFile");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                DataSetFile.push(file);
                table.bootstrapTable("append", { Nombre: file.name });
            }

        });

        var inputFile = vHtml.find(".file");

        inputFile.on("dragenter", function () {
            $(this).parent().addClass("activeBorder");
        });

        inputFile.on("dragleave", function () {
            $(this).parent().removeClass("activeBorder");
        });

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNewIndicador");
        var url = $("#UrlCreateOrEditIndicador").val();

        if ($container.css("display") != "none") {
            return;
        }

        if (!$that.Select.TipoIndicador.IdTipoIndicador) {
            Msg.MsgInfo(AppProject.Local.MsgSelectedMarcoLogico);
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            $that.LoadForm(html, $container);

        });

    },
    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEditIndicador").val();
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

            //td.html(vHtml);
            //trDetail.hide();
            //$.validator.unobtrusive.parse("#" + idpanel + " form");
            //trDetail.toggle("slow");

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

        vData.FechaLineaBase = $panel.find('[name="FechaLineaBase"]').datepicker('getDate');

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_INDICADOR", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {

                var table = $panel.find("#tableIndicaodrFile");
                var DataSetFile = table.data("UploadFile");

                if (DataSetFile.length > 0) {
                    $that.UploadFileRecursive(response.Data.SAVE_INDICADOR[0], DataSetFile);
                }                

                $that.Cancel($btn);
                $("#tableIndicadorEnd").bootstrapTable("refresh");
            }
            else {
                ShowMsgResponse(response);
            }
        });
    },

    UploadFileRecursive: function (Indicador, files) {

        var $that = this;
        $that.ListFile = files;
        $that.Indicador = Indicador;

        $that.UpdadFile($that.ListFile[0], $that.Indicador.IdIndicador);
    },

    UpdadFile: function ($file, vIdIndicador) {

        var url = $("#hUrlStoreFile").val();
        var datof = new FormData();
        var $that = this;

        datof.append("File", $file);
        datof.append("IdCommand", "SAVE_INDICADOR_FILE");
        datof.append("Nota", "Evidencia Indicador");
        datof.append("IdClient", "Result");
        datof.append("Param", JSON.stringify({ IdIndicador: vIdIndicador }));
        $that.IsUploading = true;

        Msg.MsgInfo("Subiendo archivo ..." + $file.name);        

        Ajax.AjaxCustom({
            url: url,
            data: datof,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response.Success) {

                    $that.ListFile.splice(0, 1);

                    if ($that.ListFile.length > 0) {
                        $that.UpdadFile($that.ListFile[0], $that.Indicador.IdIndicador);
                    }
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_INDICADOR";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableIndicadorEnd").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }
        });
    },
    SetSelectTipo: function (IdTipoIn, Codigo, text) {
        var $that = this;
        $that.Select.TipoIndicador.Codigo = Codigo;
        $that.Select.TipoIndicador.IdTipoIndicador = IdTipoIn;

        if (text && text.length > 70) {
            text = text.substring(0, 70) + "...";
        }

        $(".valSelectedIndicador").text(text);

        $("#tableIndicadorEnd").bootstrapTable('refresh');
        AppMvSu.SetSelectTipo(IdTipoIn, Codigo);
    },

    DeleteFile: function (sender) {

        var $btn = $(sender);


        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var index = $btn.data("index");
                var id = $btn.data("id");
                var table = $btn.parents("#tableIndicaodrFile");
                var data = table.bootstrapTable("getData");
                data.splice(index, 1);
                table.bootstrapTable("load", data);

                if (id && id > 0) {

                    var model = {};
                    model.IdCommand = "DELETE_INDICADOR_ARCHIVO";
                    model.Param = { Id: id };
                    model.UseResponse = true;
                    var url = $("#hUrlStoreJson").val();

                    Ajax.Post(url, JSON.stringify(model), function (respose) {

                        if (respose.Success) {
                            Msg.MsgInfo("Archivo eliminado del sistema");
                        }
                        else {
                            ShowMsgResponse(respose);
                        }
                    });

                }
            }
        });

    },

    DownloadFile: function (sender) {

        var $btn = $(sender);
        var id = $btn.data("id");
        var url = $("#hUrlDownloadFile").val();


        Ajax.AjaxCustom({
            type: "POST",
            url: url,
            data: {IdFile: id},
            success: function (data, pr2, pr3) {

                var fileType = pr3.getResponseHeader("Content-Type");
                var blo = new Blob([data], { type: fileType });
                var el = document.createElement("a");
                var urlFile = URL.createObjectURL(blo);
                var fileName = pr3.getResponseHeader("Content-Disposition");
                fileName = fileName.substring(22, (fileName.length - 1));

                el.href = urlFile;
                el.download = fileName;
                document.body.appendChild(el);
                el.click();
                URL.revokeObjectURL(urlFile);
                document.body.removeChild(el);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Msg.MsgError(textStatus + ": " + jqXHR.statusText ?? "");
            }
        });


        //var url = $("#hUrlDownloadFile").val() + "?IdFile="+id; 
        //var el = $("#linkDownloadFile");

        //el.attr("href", url);
        ////el.click();

        //document.getElementById("linkDownloadFile").click();
    }

}

var AppMvSu = {
    Select: {
        TipoIndicador: { IdTipoIndicador: null, Codigo: null }
    },

    Add: function (sender, $IdClase) {
        var $that = this;
        var $container = $("#divNewSupuesto");
        var url = $("#UrlCreateOrEditMvSu").val();

        if ($container.css("display") != "none") {
            return;
        }

        if (!$that.Select.TipoIndicador.IdTipoIndicador) {
            Msg.MsgInfo(AppProject.Local.MsgSelectedMarcoLogico);
            return;
        }

        if ($that.Select.TipoIndicador.IdTipoIndicador > 3 && $IdClase == 1) {
            return;
        }

        if ($IdClase == 2) {
            $container = $("#divNewMV");
        }

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            $container.html(vHtml);
            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");

            vHtml.find('[name="IdTipo"]').val($that.Select.TipoIndicador.IdTipoIndicador);
            vHtml.find('[name="Codigo"]').val($that.Select.TipoIndicador.Codigo);
            vHtml.find('[name="IdClase"]').val($IdClase);

            $container.toggle("slow");

        });
    },
    Edit: function (sender) {
        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEditMvSu").val();
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
        var model = { IdCommand: "SAVE_SUPUESTO", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {
                $that.Cancel($btn);
                $("#tableSupuesto").bootstrapTable("refresh");
                $("#tableMedioVeri").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(AppProject.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_MV_SUPUESTO";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableSupuesto").bootstrapTable("refresh");
                        $("#tableMedioVeri").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }
        });
    },
    SetSelectTipo: function (IdTipoIn, Codigo) {
        var $that = this;
        $that.Select.TipoIndicador.Codigo = Codigo;
        $that.Select.TipoIndicador.IdTipoIndicador = IdTipoIn;
        setTimeout(function () {
            $("#tableSupuesto").bootstrapTable('refresh');
            $("#tableMedioVeri").bootstrapTable("refresh");
        }, 800);
    }

}

var AppReportaje = {
    Select: { current: null, IdAnio: null, reportaje: null },
    ShowModalReportaje: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableIndicadorEnd").bootstrapTable('getRowByUniqueId', id);
        $that.Select.current = row;

        var url = $("#hUrlStoreJson").val();
        var vData = { IdIndicador: row.IdIndicador };
        var model = { IdCommand: "GET_CAT_ANIO_INDICADOR", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {

                var reportIndicador = $("#ReportIndicador");
                var selAnio = reportIndicador.find('[name="IdAnio"]');
                AppUtil.LoadSelect({ element: selAnio, data: response.Data.GET_CAT_ANIO_INDICADOR });

                reportIndicador.find('[name="Indicador"]').val($that.Select.current.Indicador);

                reportIndicador.modal({ backdrop: 'static', show: true, keyboard: true });
                $("#tableReportaje").bootstrapTable("removeAll");

            }
            else {
                ShowMsgResponse(response);
            }
        });
    },
    OnLoadReportaje: function (sender) {

        var $sel = $(sender);
        var IdAnio = $sel.val();

        if (IdAnio != "") {

            this.Select.IdAnio = IdAnio;
            $("#tableReportaje").bootstrapTable("refresh");

        }
    },
    Edit: function (sender) {

        var $btn = $(sender);
        var $that = this;
        var id = $btn.data("id");

        var row = $("#tableReportaje").bootstrapTable('getRowByUniqueId', id);
        $that.Select.reportaje = row;

        var reportIndicador = $("#ReportIndicador");

        SetFormData(reportIndicador, row);
    },

    Save: function (sender) {

        var $that = this;
        var $panel = $("#ReportIndicador");
        var frm = $panel.find("form");

        var ar = frm.serializeArray();

        $.each(ar, function (index, value) {
            $that.Select.reportaje[value.name] = value.value;
        });

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_REPORTAJE", Param: $that.Select.reportaje, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {
            if (response.Success) {
                SetFormData($panel, { Indicador: "", Periodo: "", Meta: "", Logro: "", Varianza: "" });
                $("#tableReportaje").bootstrapTable("refresh");
            }
            else {
                ShowMsgResponse(response);
            }
        });
    }
}

