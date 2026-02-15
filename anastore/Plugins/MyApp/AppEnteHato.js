

function gridParamEnteHato(params) {

    params.model = {
        IdCommand: "VIEW_ENTE_HATO", Param: {}
    };

    var elModal = $("#modalEnteHato");
    var frm = elModal.find("form");

    if (params.model.Param) {

        params.model.Param.Identificacion = frm.find('[name="Identificacion"]').val();
        params.model.Param.NombreEnte = frm.find('[name="NombreEnte"]').val();
        params.model.Param.Cue = frm.find('[name="Cue"]').val();
    }

    return JSON.stringify(params);
}

function CommandColumnEnteHato(value, row, index) {

    var html = [
        '<button type="button"  class="btn btn-default btn-sm" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppEnteHato.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}


var AppEnteHato = {

    Local: { MsgSaveEnteHato: "Se guardo registro correctamente, ¿Desea cerrar la ventana? ",  MsgModalTitleEnteHato:"Cerrar" },

    ShowModalEnteHato: function (sender) {

        var btn = $(sender);
        var elModal = $("#modalEnteHato");

        var sJsonMunicipio = $("#JsonMunicipio").val();
        var JsonMunicipio = JSON.parse(sJsonMunicipio);

        var selMu = elModal.find('[name="IdMunicipio"]');

        AppUtil.LoadSelect({ element: selMu, data: JsonMunicipio, labelValueOption: "0" });

        elModal.data("idpanel", btn.data("idpanel"));
        elModal.modal({ backdrop: 'static', show: true, keyboard: true });

    },

    Save: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var modal = $("#modalEnteHato");
        var frm = modal.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        var url = $("#hUrlStoreJson").val();
        var model = { IdCommand: "SAVE_ENTE_HATO", Param: vData, UseResponse: true };

        Ajax.Post(url, JSON.stringify(model), function (response) {

            if (response.Success) {
                $that.Cancel($btn);
                $("#tableEnteHatoSearch").bootstrapTable("refresh");
                //frm[0].reset();
                var $ItemEnteHato = response.Data.SAVE_ENTE_HATO[0];
                SetFormData(frm, $ItemEnteHato);
                
                Msg.Confirm.ShowOkCancel($that.Local.MsgSaveEnteHato, function (btn) {

                    if (btn == "ok") {
                        $that.SelectedEnteHato($ItemEnteHato);
                    }

                }, $that.Local.MsgSaveEnteHato);


            }
            else {
                ShowMsgResponse(response);
            }
        });

    },

    SelectedEnteHato: function ($row) {

        var $that = this;

        var modal = $("#modalEnteHato");

        var idpanel = modal.data("idpanel");
        var panel = $("#" + idpanel);

        var idEnteHato = panel.find('[name="IdEnteHato"]');
        var NombreOtro = panel.find('[name="NombreOtro"]');

        idEnteHato.val($row.IdEnteHato);
        NombreOtro.val($row.NombreEnte);

        modal.modal("hide");

    },
    Cancel: function (sender) {

        var modal = $("#modalEnteHato");
        var frm = modal.find("form");
        frm[0].reset();

    },

    Edit: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");
        var row = $("#tableEnteHatoSearch").bootstrapTable('getRowByUniqueId', id);

        var modal = $("#modalEnteHato");
        var frm = modal.find("form");

        SetFormData(frm, row);
    },

    OnClickSelectRow: function (field, value, row, $element) {

        if (field != "IdEnteHato") {
            var $that = AppEnteHato;
            $that.SelectedEnteHato(row);
        }        
    }
}

$(document).ready(function () {

    var eventKeyDown = function (event) {        
        if (event.keyCode == 13) {
            $("#tableEnteHatoSearch").bootstrapTable("refresh");
        }
    };

    $("#modalEnteHato").find('[name="Identificacion"],[name="NombreEnte"],[name="Cue"]').keydown(eventKeyDown);   

    $("#modalEnteHato").find('[name="Identificacion"],[name="NombreEnte"],[name="Cue"]').change(function () {

        $("#tableEnteHatoSearch").bootstrapTable("refresh");

    });

});