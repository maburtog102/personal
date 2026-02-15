

function gridParamHato(params) {

    params.model = {
        IdCommand: "VIEW_HATO"
    };

    return JSON.stringify(params);
}

//function CommandColumnHato(value, row, index) {

//    var html = [
//        '<a class="btn-link" title="Editar" data-action="Edit" data-id="' + value + '" onclick="AppHato.Edit(this)" data-index="' + index + '">',
//        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
//        '</a>'
//    ];

//    return html.join(" ");
//}

function CommandColumnHatoDet(value, row, index) {

    var html = [
        '<button type="button" class="btn btn-default btn-sm" title="Eliminar" data-action="see" data-id="' + value + '" onclick="AppHato.Remove(this)" data-index="' + index + '">',
        '<i class="fa fa-trash" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function CommandColumnHatoDetPrecio(value, row, index) {

    var idpanel = this.idpanel;
    var $panel = $("#" + idpanel);

    var IdTipoMov = $panel.find('[name="IdTipoMov"]').val();

    //si es compra o venta
    if (IdTipoMov == 1 || IdTipoMov == 2) {

        var html = [
            '<input type="number" min="0" class="form-control form-control-sm itemPrecio" data-idpanel="' + idpanel + '" data-index="' + index + '" placeholder="Precio en dolar" value="' + value + '"  />'
        ];

        return html.join(" ");
    }

    return "";
}

function CommandColumnHatoDetPeso(value, row, index) {

    var idpanel = this.idpanel;
    var $panel = $("#" + idpanel);

    var IdTipoMov = $panel.find('[name="IdTipoMov"]').val();
    var html = [];

    //venta
    if (IdTipoMov == 2) {

        html = [
            '<input type="number" min="0" class="form-control form-control-sm itemPeso" data-idpanel="' + idpanel + '" data-index="' + index + '" placeholder="Peso actual" value="' + value + '"  />'
        ];

        return html.join(" ");
    }
    else {

        html.push(value)
    }
    
    

    return html.join(" ");;
}

function CommandColumnHatoIndex(value, row, index) {

    var html = [
        '<button type="button" class="btn btn-default btn-sm" title="Ver movimiento #' + value + '" data-action="View" data-id="' + value + '" onclick="AppHato.Edit(this)" data-index="' + index + '">',
        '<i class="fa fa-eye" aria-hidden="true"></i>',
        '</button>'
    ];

    return html.join(" ");
}

function HatoDetonPostBody() {

    var table = $(this.$el);
    table.find(".itemPrecio").change(function () {

        var input = $(this);
        var idpanel = input.data("idpanel");
        var $panel = $("#" + idpanel);
        var index = input.data("index");
        var val = input.val();
        var data = $panel.find("#tableHatoDet").bootstrapTable("getData");
        data[index].Precio = val;

    });
    
    table.find(".itemPeso").change(function () {

        var input = $(this);
        var idpanel = input.data("idpanel");
        var $panel = $("#" + idpanel);
        var index = input.data("index");
        var val = input.val();
        var data = $panel.find("#tableHatoDet").bootstrapTable("getData");
        data[index].Peso = val;

    });
}

var AppHato = {

    Local: { MsgRequireEnteFinca: "Se Requiere Productor y la Finca", MsgRequireMatadero: "Se Requiere Matadero", MsgRequireOtro:"Se requiere Otro productor" },

    LoadForm: function (html, $container) {
        var $that = this;
        var vHtml = $(html);
        $container.html(vHtml);
        var id = vHtml.attr("id");
        var idMovHato = vHtml.find('[name="IdMovHato"]').val();

        vHtml.find('[data-toggle="table"]').bootstrapTable();

        var selTipoMov = vHtml.find('[name="IdTipoMov"]');
        var sJsonTipoMov = $("#JsonCatTipoMov").val();
        var JsonTipoMov = JSON.parse(sJsonTipoMov);
        AppUtil.LoadSelect({ element: selTipoMov, data: JsonTipoMov });

        vHtml.find("#findAnimal").find("input").keyup(function (event) {

            if (event.keyCode == 13) {

                var input = $(this);

                if (input.val() == "") return;

                var idPanel = input.data("idpanel");
                var $panel = $("#" + idPanel);
                var url = $("#hUrlStoreJson").val();

                var model = {};
                model.IdCommand = "SEARCH_ANIMAL";
                model.Param = { search: input.val() };

                Ajax.Post(url, JSON.stringify(model), function (data) {
                    input.val("");
                    if (data != null && data.length > 0) {
                        var dataRow = data[0];
                        $that.AddAnimalRow(dataRow, $panel, 0);
                    }
                    else {
                        $that.OnSearchAnimal(input);
                    }

                });
            }
        });

        if (idMovHato != 0) {

            vHtml.find("input,textarea").attr("disabled", "disabled");

            //$that.OnChangedTipoEnte(vHtml.find('[name="IdTipoEnte"]:checked'));

            //var selFincaDestino = vHtml.find('[name="IdFincaDestino"]');
            //var sJsonFincaDest = vHtml.find("#JsonFinca").val();
            //var JsonFincaDest = JSON.parse(sJsonFincaDest);
            //AppUtil.LoadSelect({ element: selFincaDestino, data: JsonFincaDest });

            var url = $("#hUrlStoreJson").val();
            var model = {};
            model.IdCommand = "GET_MOVHATO_DET_BYID";
            model.Param = { IdMovHato: idMovHato };
            model.UseResponse = false;

            Ajax.Post(url, JSON.stringify(model), function (data) {

                vHtml.find("#tableHatoDet").bootstrapTable('load', data);

            });

        }

        $.validator.unobtrusive.parse("#" + id + " form");
        $container.toggle("slow");
        InitDatePicker($container);

    },
    Add: function (sender) {

        var $that = this;
        var $container = $("#divNew");
        var url = $("#UrlCreateOrEditHato").val();

        if ($container.css("display") != "none") {
            return;
        }

        Ajax.GetHtml(url, null, function (html) {

            $that.LoadForm(html, $container);

        });

    },

    Edit: function (sender) {

        var $that = this;
        var url = $("#UrlCreateOrEditHato").val();
        var $btn = $(sender);
        var id = $btn.data("id");

        Ajax.GetHtml(url, { Id: id }, function (html) {

            var vHtml = $(html);

            var tr = $btn.parents("tr")
            var cols = tr.children().length;

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
                $panel.remove();
                p.hide();
            }
        });
    },

    ShowModalEnteFinca: function (sender) {

        var $that = this;
        var btn = $(sender);
        var $idPanel = btn.data("idpanel");
        var $panel = $("#" + $idPanel);

        var elTipoEnte = $panel.find('[name="IdTipoEnte"]:checked');
        var IdTipoEnte = elTipoEnte.val();

        var cols = [];

        if (IdTipoEnte == 1) {
            cols = [

                {
                    title: 'Productor',
                    field: 'Ente',
                    sortable: true
                },
                {
                    title: 'Finca',
                    field: 'Finca',
                    sortable: true
                },
                {
                    title: 'Cue',
                    field: 'Cue',
                    sortable: true
                },
                {
                    title: 'Municipio',
                    field: 'Municipio',
                    sortable: true
                },
                {
                    title: 'Telefono',
                    field: 'Telefono',
                    sortable: true
                }
                ,
                {
                    title: 'Correo',
                    field: 'Correo',
                    sortable: true
                }
            ]
        }
        else {

            cols = [

                {
                    title: 'Matadero',
                    field: 'Ente',
                    sortable: true
                },
                {
                    title: 'Telefono',
                    field: 'Telefono',
                    sortable: true
                }
                ,
                {
                    title: 'Correo',
                    field: 'Correo',
                    sortable: true
                }
            ]

        }

        AppUtil.LoadTable({
            idPanel: $idPanel,
            idCommand: "GET_CAT_ENTE_FINCA",
            GetParam: function () {
                return { IdTipoEnte: IdTipoEnte };
            },
            SelectItem: $that.OnSelectEnteFinca,
            columns: cols
        });

    },
    OnSelectEnteFinca: function (dataRow, option, modal) {

        var idPanel = option.idPanel;
        var $panel = $("#" + idPanel);
        modal.modal("hide");

        $panel.find('[name="IdEnte"]').val(dataRow.IdEnte);
        $panel.find('[name="IdFincaDestino"]').val(dataRow.IdFinca);

        var container = $panel.find(".elementProductor");

        container.find('[data-display="finca"]').hide();

        if (dataRow.IdFinca > 0) {
            container.find('[data-display="finca"]').show();
        }

        container.find('[data-display="ente"]').find("span").text(dataRow.Ente);
        container.find('[data-display="finca"]').find("span").text(dataRow.Finca);

    },

    ShowNewAnimal: function (sender) {

        var btn = $(sender);
        var $idPanel = btn.data("idpanel");
        var $panel = $("#" + $idPanel);

        var $NewAnimal = $panel.find("#panelNewAnimal");

        var url = $("#UrlCreateOrEditAnimal").val();

        Ajax.GetHtml(url, null, function (html) {

            var vHtml = $(html);
            vHtml.hide();

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

            var toolAccion = vHtml.find(".btn-accion2");
            toolAccion.find("button").data("panel-hato", $idPanel);

            toolAccion.show();
            $NewAnimal.append(vHtml);

            var id = vHtml.attr("id");
            $.validator.unobtrusive.parse("#" + id + " form");

            $NewAnimal.show();
            vHtml.toggle('slow');
            InitDatePicker(vHtml);

            vHtml.find('[name="Sexo"]').attr("onclick", "AppHato.OnChangedSexo(this)");

        });

    },

    AddAnimal: function (sender) {

        var $btn = $(sender);
        var $that = this;

        var idpanel = $btn.data("idpanel");
        var idPanelHato = $btn.data("panel-hato");

        var $panel = $("#" + idpanel);
        var $panelHato = $("#" + idPanelHato);

        var frm = $panel.find("form");
        var $vData = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            $vData[value.name] = value.value;
        });

        $vData.FechaNac = frm.find('[name="FechaNac"]').datepicker('getDate');
        $vData.FechaRegistro = frm.find('[name="FechaRegistro"]').datepicker('getDate');

        var row = {};
        row.Cuia = $vData.Cuia;
        row.DescAnimal = $vData.DescAnimal;
        row.Precio = 0;
        row.IdAnimal = $vData.IdAnimal;
        row.Animal = $vData;

        $panelHato.find("#tableHatoDet").bootstrapTable("append", row);
        $that.Cancel(sender);

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

            var selFinca = $panel.find('[name="IdFincaDestino"]');
            var JsonFinca = response.Data.CAT_ALL_FINCA;
            AppUtil.LoadSelect({ element: selFinca, data: JsonFinca });

        });
    },

    OnChangedTipoEnte: function (sender) {

        var input = $(sender);
        var id = input.val();

        var $idPanel = input.data("idpanel");
        var $panel = $("#" + $idPanel);

        var selFinca = $panel.find('[name="IdFincaDestino"]');
        var selEnte = $panel.find('[name="IdEnte"]');
        var selEnteHato = $panel.find('[name="IdEnteHato"]');

        var selTipoMov = $panel.find('[name="IdTipoMov"]');
        //var conFinca = $panel.find(".elementFinca");
        var conProductor = $panel.find(".elementProductor");
        var Otro = $panel.find(".elementOtro");

        //this.OnEnteLoad($panel);
        //conFinca.hide();

        conProductor.hide();
        Otro.hide();

        selEnte.val(0);
        selFinca.val(0);
        selEnteHato.val(0)

        $panel.find('[name="NombreOtro"]').data("val", false);
        $panel.find('[name="IdEnte"]').data("val", false);
        $panel.find('[name="IdFincaDestino"]').data("val", false);

        conProductor.find('[data-istext="true"]').text("")

        if (id == 1) {

            conProductor.show();
            //conFinca.show();
            //conProductor.addClass("col-md-6");
            //conProductor.removeClass("col-md-12");

            $panel.find('[name="IdEnte"]').data("val", true);
            $panel.find('[name="IdFincaDestino"]').data("val", true);
            $panel.find('[name="NombreOtro"]').val("");


            this.OnChangedTipoMov(selTipoMov);

        }
        else if (id == 2) {

            //conProductor.addClass("col-md-12");
            //conProductor.removeClass("col-md-6");
            conProductor.show();
            $panel.find('[name="IdEnte"]').data("val", true);
            $panel.find('[name="NombreOtro"]').val("");
        }
        else if (id == 3) {
            Otro.show();
            $panel.find('[name="NombreOtro"]').data("val", true);
        }

        $.validator.unobtrusive.parse("#" + $idPanel + " form");

    },

    OnChangedTipoMov: function (sender) {

        var selTipoMov = $(sender);
        var id = selTipoMov.val();
        var $idPanel = selTipoMov.data("idpanel");
        var $panel = $("#" + $idPanel);

        var newAnimal = $panel.find("#newAnimal");
        var findAnimal = $panel.find("#findAnimal");

        newAnimal.hide();
        findAnimal.hide();
        $panel.find("#tableHatoDet").bootstrapTable("removeAll");

        var inputOtro = $panel.find('[data-tipodestino="3"]').parent();
        inputOtro.hide();

        //var inputFincaDestino = $panel.find('[name="IdFincaDestino"]');
        //var divFincaDestino = inputFincaDestino.parents(".elementFinca");
        //divFincaDestino.show();
        //inputFincaDestino.data("val", true);
        //this.OnEnteLoad($panel);

        if (id == 6) {
            newAnimal.show();
            var Otro = $panel.find(".elementOtro");
            Otro.hide();
            $panel.find('[name="NombreOtro"]').val("");
        }
        else if (id == 5) {

            //inputFincaDestino.val("");
            //divFincaDestino.hide();
            //inputFincaDestino.data("val", false);
            findAnimal.show();
        }
        else {
            findAnimal.show();
            inputOtro.show();
        }

        $.validator.unobtrusive.parse("#" + $idPanel + " form");
    },

    OnEnteLoad: function (senderPanel) {

        var $panel = $(senderPanel);

        var selEnte = $panel.find('[name="IdEnte"]');
        var selFinca = $panel.find('[name="IdFincaDestino"]');

        var sJsonProducto = $panel.find('#JsonProductor').val();
        var vJsonProducto = JSON.parse(sJsonProducto);

        var idTipoEnte = $panel.find('[name="IdTipoEnte"]:checked').val();
        var idTipoMov = $panel.find('[name="IdTipoMov"]').val();

        if (idTipoEnte) {

            //Venta
            if (idTipoMov == 2) {
                vJsonProducto = vJsonProducto.filter(function (row) { return row.IdTipoEnte == idTipoEnte; });
            }
            else {
                vJsonProducto = vJsonProducto.filter(function (row) { return row.IdTipoEnte == idTipoEnte && row.IsUsuarioAsignado == true; });
            }

            selFinca.val("");

            AppUtil.LoadSelect({ element: selEnte, data: vJsonProducto });
        }

    },

    ValidModel: function (model) {

        var result = true;

        if (!model.IdTipoEnte) {
            Msg.MsgWarning(this.Local.MsgRequireEnteFinca);
            result = false;
        }

        if (model.IdTipoEnte == 1) {

            if (model.IdEnte == 0 || model.IdFincaDestino == 0) {
                result = false;
                Msg.MsgWarning(this.Local.MsgRequireEnteFinca);
            }
        }

        if (model.IdTipoEnte == 2) {

            if (model.IdEnte == 0) {
                result = false;
                Msg.MsgWarning(this.Local.MsgRequireMatadero);
            }
        }

        if (model.IdTipoEnte == 3) {
            if (model.IdEnteHato == 0) {
                result = false;
                Msg.MsgWarning(this.Local.MsgRequireOtro);
            }
        }

        return result;

    },

    Save: function (sender) {

        var $that = this;
        var $btn = $(sender);
        var idPanel = $btn.data("idpanel");
        var $panel = $("#" + idPanel);

        var frm = $panel.find("form");
        var vData = {};
        var Model = {};
        var ar = frm.serializeArray();

        if (!frm.valid()) return;

        $.each(ar, function (index, value) {
            vData[value.name] = value.value;
        });

        if (!this.ValidModel(vData)) return;

        var table = $panel.find("#tableHatoDet");
        var det = table.bootstrapTable("getData");
        var MovDet = [];
        var MovAnimal = [];

        $.each(det, function (i, row) {
            row.UniqueId = i;
            MovDet.push(row);
            row.Animal.UniqueId = i;
            MovAnimal.push(row.Animal);
        });

        Model.Maestro = vData;
        Model.Detalle = {};
        Model.Detalle.MovDet = MovDet;
        Model.Detalle.Animal = MovAnimal;
        Model.UseResponse = true;
        Model.IdCommand = "SAVE_HATO";
        Model.Maestro.Fecha = $panel.find('[name="Fecha"]').datepicker('getDate');

        var json = JSON.stringify(Model);
        var url = $("#hUrlMasterStoreJson").val();

        Ajax.PostForm(url, { sJson: json }, function (dataJson) {

            var response = JSON.parse(dataJson);
            if (response.Success) {
                $that.Cancel($btn);
                $("#tableHato").bootstrapTable("refresh");
            }
            else {
                ShowMsgResponse(response);
            }

        });

    },

    OnSearchAnimal: function (sender) {

        var $that = this;
        var $btn = $(sender);
        var idpanel = $btn.data("idpanel");

        AppUtil.LoadTable({
            idPanel: idpanel,
            idCommand: "SEARCH_ANIMAL",
            SelectItem: $that.OnSelectAnimal,
            columns: [

                {
                    title: 'Cuia',
                    field: 'Cuia',
                    sortable: true
                },
                {
                    title: 'Arete',
                    field: 'Arete',
                    sortable: true
                },
                {
                    title: 'Raza',
                    field: 'Raza',
                    sortable: true
                },
                {
                    title: 'Finca',
                    field: 'Finca',
                    sortable: true
                },
                {
                    title: 'Productor',
                    field: 'Productor',
                    sortable: true
                },
                {
                    title: 'Sexo',
                    field: 'NombreSexo',
                    sortable: true
                },
                {
                    title: 'Peso (Kg)',
                    field: 'Peso',
                    sortable: true
                }
            ]
        });

    },

    OnSelectAnimal: function (dataRow, option, modal) {

        var idPanel = option.idPanel;
        var $panel = $("#" + idPanel);
        AppHato.AddAnimalRow(dataRow, $panel, 0);
        modal.modal("hide");
    },

    AddAnimalRow: function (xrow, xpanel, precio) {

        var $panel = $(xpanel);

        var row = {};
        row.IdAnimal = xrow.IdAnimal;
        row.Cuia = xrow.Cuia;
        row.DescAnimal = xrow.DescAnimal;
        row.Precio = precio;
        row.Animal = xrow;
        row.Peso = xrow.Peso;

        var table = $panel.find("#tableHatoDet");
        var eData = table.bootstrapTable("getData");

        if (eData.filter(function (r) { return r.IdAnimal == row.IdAnimal; }).length == 0) {
            table.bootstrapTable("append", row);
        }
    },

    Remove: function (sender) {

        var $btn = $(sender);
        var $table = $btn.parents("table").eq(0);
        var index = $btn.data("index");
        var data = $table.bootstrapTable("getData");
        data.splice(index, 1);
        $table.bootstrapTable('load', data);
    },

    View: function (sender) {

        var btn = $(sender);
        var id = btn.data("id");

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
        estAni.val("");

        if (val == 0) {

            estAni.data("val", true);
            divEstAni.show();
        }

        $.validator.unobtrusive.parse("#" + idPanel + " form");

    }

}