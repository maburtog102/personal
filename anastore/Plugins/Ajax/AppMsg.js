
var Msg = {

    DefaultTimer: 3000,
    Local: { DefaultTitle: "Confirmar" },

    MsgInfo: function (text) {

        $.notify({ message: text, icon: 'fa fa-exclamation-circle' }, { type: "info" });

    },

    MsgSuccess: function (text) {
        $.notify({ message: text, icon: 'fa fa-check-circle' }, { type: "success" });
    },

    MsgWarning: function (text) {
        $.notify({ message: text, icon: 'glyphicon glyphicon-warning-sign' }, { type: "warning" });
    },

    MsgError: function (text) {

        $.notify({ message: text, icon: 'fa fa-bug' }, { type: "danger", delay: 0 });

    },

    Confirm: {

        TargetMsg: null,
        StateBtn: "",
        fnCall: function (btnAction, param) { },

        GetMsgModal: function (title) {

            //$(document).find('body #myConfirmMsg').remove();
            //var Locales = AppUtil.GetLocales();

            if (!title) {
                title = Msg.Local.DefaultTitle;
            }

            var eleMsg = '<div class="modal fade" id="myConfirmMsg" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">';
            eleMsg += '<div class="modal-dialog modal-sm" role="document">';
            eleMsg += '<div class="modal-content">';

            eleMsg += '<div class="modal-header">';
            eleMsg += '<h2 class="modal-title h5" id="mySmallModalLabel">' + title + '</h2>';
            eleMsg += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>';
            eleMsg += '</div>';

            eleMsg += '<div class="modal-body">';
            eleMsg += '</div>';

            eleMsg += '<div class="modal-footer">';
            eleMsg += '<button type="button" class="btn btn-primary btnOK" data-dismiss="modal"><i class="fa fa-check" aria-hidden="true"></i> ' + 'Ok' + '</button>';
            eleMsg += '<button type="button" class="btn btn-danger btnCancel" data-dismiss="modal"> <i class="fa fa-ban" aria-hidden="true"></i> ' + 'Cancelar' + '</button>';
            eleMsg += '</div>';

            eleMsg += '</div>';
            eleMsg += '</div>';
            eleMsg += '</div>';

            var msg = $(eleMsg);
            this.TargetMsg = msg;
            return msg;
        },

        ShowOkCancel: function (text, fnCallBack, dataParam, title) {

            var $that = this;
            var msg = this.GetMsgModal(title);
            this.fnCall = fnCallBack;

            msg.find(".modal-body").append(text);

            var btnOk = msg.find(".btnOK");
            var btnCancel = msg.find(".btnCancel");

            if (dataParam) {
                msg.data("param", dataParam);
            }

            btnOk.click(function () {
                Msg.Confirm.StateBtn = "ok";                

                if (Msg.Confirm.fnCall) {
                    Msg.Confirm.fnCall(Msg.Confirm.StateBtn, $that.TargetMsg.data("param"));
                }                    

                Msg.Confirm.TargetMsg.unbind('hidden.bs.modal');
                Msg.Confirm.TargetMsg.modal('hide');
                
            });

            msg.modal({ backdrop: 'static', show: true, keyboard: true });

            msg.on('hidden.bs.modal', function (e) {
                Msg.Confirm.StateBtn = 'cancel';
                
                if (Msg.Confirm.fnCall)
                    Msg.Confirm.fnCall(Msg.Confirm.StateBtn, $that.TargetMsg.data("param"));

                $that.TargetMsg.remove();
            });

        }
    }
}