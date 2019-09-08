// ==UserScript==
// @name         atcoder_collect_all_examples
// @namespace    https://github.com/Haar-you
// @version      1.0.1
// @description  入出力例をまとめた項目を生成
// @author       Haar-you
// @match        https://atcoder.jp/contests/*/tasks/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js
// ==/UserScript==

$(function(){
    'use strict';
    this.$ = this.jQuery = jQuery.noConflict(true);

    let examples_input = [];
    let examples_output = [];

    const navbar = $("#contest-nav-tabs");
    navbar.append(
        $("<ul></ul>", {"class": "nav nav-tabs"}).append(
            $("<li></li>").append(
                $("<button></button>", {
                    text: "Examples",
                    "class": "btn btn-link",
                    on: {
                        click: function(){
                            const win = window.open("", "_blank", "width=800, height=600");
                            constructWindow(win, examples_input, examples_output);
                        }
                    }
                })
            )
        )
    );

    getExamples(examples_input, examples_output);
});


function constructWindow(win, examples_input, examples_output){
    const style_pre = "display: block; margin: 0 0 10px; font-size: 13px; line-height: 1.42857143; word-break: break-all; word-wrap: break-word; color: #333; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 3px;";

    const style_copy_button = "";

    const pre_input =
          $("<pre></pre>", {
              style: style_pre,
              text: examples_input.join("\n")
          });

    const pre_output =
          $("<pre></pre>", {
              style: style_pre,
              text: examples_output.join("\n")
          });

    pre_input.css({
        "width": "100%",
        "white-space": "pre-wrap"
    });

    pre_output.css({
        "width": "100%",
        "white-space": "pre-wrap"
    });

    const problem_title = win.opener.document.title;
    win.document.title = problem_title;
    
    $(win.document.body).append(
        $("<div></div>", {
            "class": "part"
        }).append(
            $("<button></button", {
                text: "close (ESC)",
                on: {
                    click: function(){
                        win.close();
                    }
                }
            }),
            $("<section></section>").append(
                $("<h3></h3>", {text: problem_title}),
                $("<div></div>", {
                    style: "width: 100%;"
                }).append(
                    $("<div></div>", {style: "display: inline-block; width: 45%;"}).append(
                        $("<button></button>", {
                            text: "Copy input",
                            style: style_copy_button,
                            on: {
                                click: function(){
                                    copyExample(win, pre_input.get(0));
                                }
                            }
                        }),
                        pre_input
                    ),
                    $("<div></div>", {style: "display: inline-block; width: 45%; float: right;"}).append(
                        $("<button></button>", {
                            text: "Copy output",
                            style: style_copy_button,
                            on: {
                                click: function(){
                                    copyExample(win, pre_output.get(0));
                                }
                            }
                        }),
                        pre_output
                    )
                )
            )
        )
    );

    $(win).keydown((e) => {
        if(e.keyCode == 27){
            win.close();
        }
    });
}


function copyExample(win, elem){
    win.getSelection().removeAllRanges();
    const range = win.document.createRange();
    range.selectNode(elem);
    win.getSelection().addRange(range);
    win.document.execCommand('copy');
    win.getSelection().removeAllRanges();
}


function getExamples(examples_input, examples_output){

    
    
    const part_example = $("#task-statement .part");

    part_example
        .filter((i,elem) => {
            const s = $($(elem).find("h3")[0]).text();
            return /入力例/.test(s);
        })
        .each((i,elem) => {examples_input.push($(elem).find("pre")[0].innerText);});

    part_example
        .filter(function(i,elem){
            const s = $($(elem).find("h3")[0]).text();
            return /出力例/.test(s);
        })
        .each((i,elem) => {examples_output.push($(elem).find("pre")[0].innerText);});
}
