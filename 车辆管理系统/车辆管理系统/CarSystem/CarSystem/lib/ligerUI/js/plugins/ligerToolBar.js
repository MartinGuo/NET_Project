﻿/**
* jQuery ligerUI 1.2.2
* 
* http://ligerui.com
*  
* Author daomi 2013 [ gd_star@163.com ] 
* 
*/
(function ($) {

    $.fn.ligerToolBar = function (options) {
        return $.ligerui.run.call(this, "ligerToolBar", arguments);
    };

    $.fn.ligerGetToolBarManager = function () {
        return $.ligerui.run.call(this, "ligerGetToolBarManager", arguments);
    };

    $.ligerDefaults.ToolBar = {};

    $.ligerMethos.ToolBar = {};

    $.ligerui.controls.ToolBar = function (element, options) {
        $.ligerui.controls.ToolBar.base.constructor.call(this, element, options);
    };
    $.ligerui.controls.ToolBar.ligerExtend($.ligerui.core.UIComponent, {
        __getType: function () {
            return 'ToolBar';
        },
        __idPrev: function () {
            return 'ToolBar';
        },
        _extendMethods: function () {
            return $.ligerMethos.ToolBar;
        },
        _render: function () {
            var g = this, p = this.options;
            g.toolbarItemCount = 0;
            g.toolBar = $(this.element);
            g.toolBar.addClass("l-toolbar");
            g.set(p);
        },
        _setItems: function (items) {
            var g = this;
            g.toolBar.html("");
            $(items).each(function (i, item) {
                g.addItem(item);
            });
        },
        reset: function () {
            var g = this, p = this.options;
            p.action = "";
            $("#" + g.id).html("");
            g._render();
        },
        removeItem: function (itemid) {
            var g = this, p = this.options;
            $("> .l-toolbar-item[toolbarid=" + itemid + "]", g.toolBar).remove();
        },
        setEnabled: function (itemid) {
            var g = this, p = this.options;
            $("> .l-toolbar-item[toolbarid=" + itemid + "]", g.toolBar).removeClass("l-toolbar-item-disable");
        },
        setDisabled: function (parm) {
            var g = this, p = this.options;
            $.each(parm, function (pkey, pvalue) {
                $.each(p.items, function (ikey, ivalue) {
                    if (ivalue.action == pkey) { ivalue.disable = pvalue; }
                });
            });
            g.reset();
        },
        isEnable: function (itemid) {
            var g = this, p = this.options;
            return !$("> .l-toolbar-item[toolbarid=" + itemid + "]", g.toolBar).hasClass("l-toolbar-item-disable");
        },
        addItem: function (item) {
            var g = this, p = this.options;
            if (item.line) {
                g.toolBar.append('<div class="l-bar-separator"></div>');
                return;
            }
            var ditem = $('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
            g.toolBar.append(ditem);
            if (!item.action) item.action = 'item-' + (++g.toolbarItemCount);
            ditem.attr("toolbarid", item.action);
            if (item.img) {
                ditem.append("<img src='" + item.img + "' />");
                ditem.addClass("l-toolbar-item-hasicon");
            }
            else if (item.action || item.icon) {
                var sIcon = item.action;
                if (item.icon) {
                    sIcon = item.icon;
                }
                ditem.append("<div class='l-icon l-icon-" + sIcon + "'></div>");
                ditem.addClass("l-toolbar-item-hasicon");
            }
            else if (item.color) {
                ditem.append("<div class='l-toolbar-item-color' style='background:" + item.color + "'></div>");
                ditem.addClass("l-toolbar-item-hasicon");
            }
            item.text && $("span:first", ditem).html(item.text);
            item.disable && ditem.addClass("l-toolbar-item-disable");
            item.click && ditem.click(function () { if ($(this).hasClass("l-toolbar-item-disable")) return; item.click(item); });
            if (item.menu) {
                item.menu = $.ligerMenu(item.menu);
                ditem.hover(function () {
                    if ($(this).hasClass("l-toolbar-item-disable")) return;
                    g.actionMenu && g.actionMenu.hide();
                    var left = $(this).offset().left;
                    var top = $(this).offset().top + $(this).height();
                    item.menu.show({ top: top, left: left });
                    g.actionMenu = item.menu;
                    $(this).addClass("l-panel-btn-over");
                }, function () {
                    if ($(this).hasClass("l-toolbar-item-disable")) return;
                    $(this).removeClass("l-panel-btn-over");
                });
            }
            else {
                ditem.hover(function () {
                    if ($(this).hasClass("l-toolbar-item-disable")) return;
                    $(this).addClass("l-panel-btn-over");
                }, function () {
                    if ($(this).hasClass("l-toolbar-item-disable")) return;
                    $(this).removeClass("l-panel-btn-over");
                });
            }
        }
    });
    //旧写法保留    
    $.ligerui.controls.ToolBar.prototype.setEnable = $.ligerui.controls.ToolBar.prototype.setEnabled;
    $.ligerui.controls.ToolBar.prototype.setDisable = $.ligerui.controls.ToolBar.prototype.setDisabled;
})(jQuery);