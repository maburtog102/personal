
function gridParamSolCompra(params) {

    var idcommand = this.idcommand;

    params.model = {
        IdCommand: idcommand, Param: null
    };

    return JSON.stringify(params);
}

function CommandColumnCompra(value, row, index) {

    var html = [];

    html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="SolCompra.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',       

        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="SolCompra.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

var SolCompra = {

    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?" },

    LoadForm: function (html, $container) {

        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");

        var sJsonConcepto = $("#JsonConcepto").val();
        var JsonConcepto = JSON.parse(sJsonConcepto);

        var selCategoriaCosto = vHtml.find('[name="IdCategoriaCosto"]');
        AppUtil.LoadSelect({ element: selCategoriaCosto, data: JsonConcepto });

        var sJsonProductor = vHtml.find("#JsonProductor").val();
        var sJsonFinca = vHtml.find("#JsonFinca").val();

        var JsonProductor = JSON.parse(sJsonProductor);
        JsonProductor = JsonProductor.filter(function (p) { return p.IsUsuarioAsignado == true; });
        var JsonFinca = JSON.parse(sJsonFinca);

        var selProductor = vHtml.find('[name="IdEnte"]');
        var selFinca = vHtml.find('[name="IdFinca"]');

        AppUtil.LoadSelect({ element: selProductor, data: JsonProductor });
        AppUtil.LoadSelect({ element: selFinca, data: JsonFinca });

        $.validator.unobtrusive.parse("#" + id + " form");
        $container.toggle("slow");
        InitDatePicker($container);

        //vHtml.find('[data-toggle="table"]').bootstrapTable();

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEditCompra").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            $that.LoadForm(html, $container);

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

    Edit: function (sender) {

        var $that = this;
        var $btn = $(sender);

        var url = $("#UrlCreateOrEditCompra").val();
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
        
        if (!frm.valid()) return;

        var vData = {};
        var ar = frm.serializeArray();

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        vData.Fecha = $panel.find('[name="Fecha"]').datepicker("getDate");

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_SOL_COMPRA", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#table").bootstrapTable("refresh");
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

        Msg.Confirm.ShowOkCancel(this.Local.MsgDelete, function (tag) {

            if (tag == "ok") {

                var url = $("#hUrlStoreJson").val();
                var id = $btn.data("id");

                var model = {};
                model.IdCommand = "DELETE_SOL_GASTO";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#table").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }
                });
            }

        });
    }
}