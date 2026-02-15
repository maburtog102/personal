

var EventAjax = function (method, url, contentType, dataType, param, $callBack) {

    if (typeof param === 'function') {
        $callBack = param;
        param = null;
    }

    var ajaxConfig = {
        url: url,
        contentType: contentType,
        dataType: dataType,
        type: method,
        data: param,
        success: $callBack,
        error: function (jqXhr, textStatus, errorThrown) {
            Ajax.ExecuteLoading(false);
            Msg.MsgError('Ajax Error ' + textStatus, 5000, false);
        }
    };

    var requestHeader = {};
    //var geoLocation = Site.GetGeoLocation(true);
    geoLocation = null;

    if (geoLocation) {
        requestHeader.latitude = geoLocation.latitude;
        requestHeader.longitude = geoLocation.longitude;
    }

    ajaxConfig.headers = requestHeader;

    if (!param) {
        delete ajaxConfig["data"];
    }

    Ajax.AjaxCustom(ajaxConfig);
}

var Ajax = {

    DataType: "json",
    ContentType: "application/json", /*"application/json; charset=utf-8",*/
    LoadMask: { Show: true, Msg: "Procesando..." },
    GetCurrentLocal: function () {
        var culture = this.Locales;
        return culture;
    },
    Locales: {
        DefaultMsg: function () {
            return AppUtil.GetLocales().MarkProcess;
        }     
    },

    SetLoading: function ($fnLoading) {
        this.fnLoading = $fnLoading;
        $(document).ajaxStart(function () { Ajax.ExecuteLoading(true); }).ajaxStop(function () { Ajax.ExecuteLoading(false); });
    },

    ExecuteLoading: function (show) {
        if (this.LoadMask.Show) {
            this.fnLoading(show);
        }
    },

    StartIni: function () {
        //jQuery.ajaxSetup({ crossDomain: true, contentType: this.ContentType, dataType: this.DataType, global: true });
        jQuery.ajaxSetup({ crossDomain: true, global: true });
        jQuery.support.cors = true;
    },

    Post: function (url, param, $callBack) {

        EventAjax("post", url, this.ContentType, this.DataType, param, $callBack);
    },

    PostForm: function (url, param, $callBack, dataType) {

        if (!dataType) dataType = 'text';
        EventAjax('post', url, 'application/x-www-form-urlencoded; charset=UTF-8', dataType, param, $callBack);
    },

    PostHtml: function (url, param, $callBack, dataType) {

        if (!dataType) dataType = 'html';
        EventAjax('post', url, 'text/plain', dataType, param, $callBack);
    },

    Get: function (url, param, $callBack) {

        EventAjax("get", url, this.ContentType, this.DataType, param, $callBack);
    },

    GetForm: function (url, param, $callBack, dataType) {

        if (!dataType) dataType = 'text';

        EventAjax('get', url, 'application/x-www-form-urlencoded; charset=UTF-8', dataType, param, $callBack);
    },

    GetHtml: function (url, param, $callBack, dataType) {

        if (!dataType) dataType = 'html';

        EventAjax('get', url, 'text/plain', dataType, param, $callBack);
    },

    SetActiveSync: function (enable) {
        $.ajaxSetup({ async: enable });
    },

    AjaxCustom: function (JsonConfig) {

        //jQuery.ajax(JsonConfig).fail(function (xhr, statusText) {
        //    Ajax.ExecuteLoading(false);
        //    Msg.MsgError('Ajax Error ' + statusText);
        //});

        jQuery.ajax(JsonConfig);
    }
}

// jquery extend function
$.extend(
    {
        redirectPost: function (location, args, IsPageBlank) {
            var form = '';

            if (args) {
                $.each(args, function (key, value) {
                    form += '<input type="hidden" name="' + key + '" value="' + value + '">';
                });
            }

            var el = $('<form action="' + location + '" method="POST">' + form + '</form>');

            if (IsPageBlank) {
                el.attr("target", "_blank");
            }
            
            el.appendTo('body').submit();
        }
    });

jQuery(document).ready(function () {

    Ajax.SetLoading(function (show) {

        if (show) {

            //if (!this.LoadMask.Msg) {
            //    this.LoadMask.Msg = this.GetCurrentLocal().DefaultMsg();
            //}

            jQuery.blockUI({
                message: '<i class="fa fa-spinner fa-spin" style="font-size:24px;"></i> &nbsp;' + this.LoadMask.Msg,
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    '-ms-border-radius': '10px',
                    opacity: .5,
                    color: '#fff',
                    'z-index': 2000
                }
            });
        }
        else {
            jQuery.unblockUI();
            //this.LoadMask.Msg = null;
        }
    });

    Ajax.StartIni();
});
