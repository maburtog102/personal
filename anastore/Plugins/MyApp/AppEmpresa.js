

var AppEmpresa = {
    Logo: null,

    LoadForm: function (html) {

        var $that = this;

        var vHtml = $(html);        
        var id = vHtml.attr("id");
        $.validator.unobtrusive.parse("#" + id + " form");

        vHtml.find('#customFile').change(function () {
            var file = this.files[0];
            $that.Logo = file;
            $(".custom-file-label").text(file.name);
        });

    },

    Save: function (sender) {

        var $that = this;
        var $btn = $(sender);
        var url = $btn.data("url");
        var idpanel = $btn.data("idpanel");
        var $panel = $("#" + idpanel);

        var frm = $panel.find("form");
        var vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        var datof = new FormData();

        datof.append("Id", vData.Id);
        datof.append("Nombre", vData.Nombre);
        datof.append("File", this.Logo);        

        Ajax.AjaxCustom({
            url: url,
            data: datof,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response.Success) {

                }
                else {
                    ShowMsgResponse(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }

}