

function gridParamUsers(params) {

    params.model = {
        IdCommand: "VIEW_USER", Param: { search: null } };
    return JSON.stringify(params);
}


function CommandColumnUser(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppUser.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>',
        '<button type="button"  class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppUser.Delete(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}


var AppUser = {
    Local: { MsgDelete: "¿Seguro quiere eliminar el registro?" },

    LoadForm: function (html, $container) {
        var $that = this;

        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");
        $.validator.unobtrusive.parse("#" + id + " form");

        //Grupo
        var sJsonRol = vHtml.find("#JsonRol").val();
        var JsonRol = JSON.parse(sJsonRol);
        var selRol = vHtml.find('[name="IdRol"]');
        AppUtil.LoadSelect({ element: selRol, data: JsonRol, labelValueOption: null });

        //EnteProductor
        var sJsonEnte = $("#JsonEnte").val();
        var JsonEnte = JSON.parse(sJsonEnte);
        JsonEnte = JsonEnte.filter(function (c) { return c.IdTipoEnte == 1; });
        var selEnte = vHtml.find('[name="IdEnte"]');
        AppUtil.LoadSelect({ element: selEnte, data: JsonEnte, labelValueOption: null });

        InitSelectPicker($container);

        $container.toggle("slow");

    },

    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEdi").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {           

            $that.LoadForm(html, $container);

        });               

    },

    Edit: function (sender) {
        
        var $btn = $(sender);
        var $that = this;

        var url = $("#UrlCreateOrEdi").val();
        var id = $btn.data("id");

        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);
            var tr = $btn.parents("tr");
            var cols = tr.children().length;                       
            
            var trDetail = $('<tr></tr>');
            tr.after(trDetail);            

            var index = $btn.data("index");
            trDetail.attr("id", "detail_" + index);

            var td = $('<td></td>');            
            td.hide();
            td.attr("colspan", cols);
            trDetail.html(td);

            $that.LoadForm(html, td);
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

        vData.IdRol = $panel.find('[name="IdRol"]').val().join(",");
        vData.IdEnte = $panel.find('[name="IdEnte"]').val().join(",");

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_USER", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableUser").bootstrapTable("refresh");
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
                model.IdCommand = "DELETE_USER";
                model.Param = { Id: id };
                model.UseResponse = true;

                Ajax.Post(url, JSON.stringify(model), function (respose) {

                    if (respose.Success) {
                        $("#tableUser").bootstrapTable("refresh");
                    }
                    else {
                        ShowMsgResponse(respose);
                    }

                });
            }

        });
    }

}