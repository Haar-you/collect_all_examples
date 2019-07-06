// ==UserScript==
// @name         atcoder_collect_all_examples
// @namespace    https://github.com/Haar-you
// @version      1.0
// @description  入出力例をまとめた項目を生成
// @author       Haar-you
// @match        https://atcoder.jp/contests/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js
// ==/UserScript==

$(function(){
    'use strict';
    this.$ = this.jQuery = jQuery.noConflict(true);

    const part_iostyle = $($("#task-statement .io-style")[0]);
    const part_example = $("#task-statement .part");

    const text_input =
          part_example.filter(function(i,elem){
              const s = $($(elem).find("h3")[0]).text();
              return /入力例/.test(s);
          }).map(function(i,elem){
              return $($(elem).find("pre")[0]).text();
          }).get().join("\n");

    const text_output =
          part_example.filter(function(i,elem){
              const s = $($(elem).find("h3")[0]).text();
              return /出力例/.test(s);
          }).map(function(i,elem){
              return $($(elem).find("pre")[0]).text();
          }).get().join("\n");

    const pre_all_inputs = $("<pre></pre>", {
        text: text_input
    });
    const pre_all_outputs = $("<pre></pre>", {
        text: text_output
    });

    function copyExample(elem){
        window.getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNode(elem);
        window.getSelection().addRange(range);
        document.execCommand('copy');

        $(this).tooltip("show");
        var _this = this;
        setTimeout(function() {
            $(_this).tooltip('hide');
        }, 800);

        window.getSelection().removeAllRanges();
    }

    part_iostyle.after(
        $("<div></div>", {
            "class": "part"
        }).append(
            $("<section></section>").append(
                $("<h3></h3>", {text: "全入出力例 "}).append(
                    $("<span></span>", {
                        "class": "btn btn-default btn-sm",
                        text: "Copy input",
                        "data-toggle": "tooltip",
                        "data-trigger": "manual",
                        "data-title": "Copied!",
                        on:{
                            click: function(){
                                copyExample.call(this, pre_all_inputs.get(0));
                            }
                        }
                    }),
                    $("<span></span>", {
                        "class": "btn btn-default btn-sm",
                        text: "Copy output",
                        "data-toggle": "tooltip",
                        "data-trigger": "manual",
                        "data-title": "Copied!",
                        on:{
                            click: function(){
                                copyExample.call(this, pre_all_outputs.get(0));
                            }
                        }
                    })
                ),
                pre_all_inputs,
                pre_all_outputs
            )
        )
    );
});
