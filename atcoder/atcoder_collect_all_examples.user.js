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

    var part_iostyle = $($("#task-statement .io-style")[0]);
    var part_example = $("#task-statement .part");

    var all_input_text = "";
    all_input_text = part_example.filter(function(i,elem){
	const s = $($(elem).find("h3")[0]).text();
        return /入力例/.test(s);
    }).map(function(i,elem){
        return $($(elem).find("pre")[0]).text();
    }).get().join("\n");

    var all_output_text = "";
    all_output_text = part_example.filter(function(i,elem){
	const s = $($(elem).find("h3")[0]).text();
        return /出力例/.test(s);
    }).map(function(i,elem){
        return $($(elem).find("pre")[0]).text();
    }).get().join("\n");

    var pre_all_input = $("<pre></pre>", {style: "", text: all_input_text});
    var pre_all_output = $("<pre></pre>", {style: "", text: all_output_text});

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
                                window.getSelection().removeAllRanges();
                                var range = document.createRange();
                                range.selectNode(pre_all_input.get(0));
                                window.getSelection().addRange(range);
                                document.execCommand('copy');

                                $(this).tooltip("show");
                                var _this = this;
                                setTimeout(function() {
                                    $(_this).tooltip('hide');
                                }, 800);

                                window.getSelection().removeAllRanges();
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
                                window.getSelection().removeAllRanges();
                                var range = document.createRange();
                                range.selectNode(pre_all_output.get(0));
                                window.getSelection().addRange(range);
                                document.execCommand('copy');

                                $(this).tooltip("show");
                                var _this = this;
                                setTimeout(function() {
                                    $(_this).tooltip('hide');
                                }, 800);

                                window.getSelection().removeAllRanges();
                            }
                        }
                    })
                ),
                pre_all_input,
                pre_all_output
            )
        )
    );
});
