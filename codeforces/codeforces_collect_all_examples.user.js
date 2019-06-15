// ==UserScript==
// @name         codeforces_collect_all_examples
// @namespace    https://github.com/Haar-you
// @version      1.0
// @description  入出力例をまとめた項目を生成
// @author       Haar-you
// @match        https://codeforces.com/contest/*/problem/*
// @match        https://codeforces.com/problemset/problem/*/*
// @grant        none
// ==/UserScript==

$(function add_copyall_codeforces(){
    var part_input = $(".input");
    var part_output = $(".output");

    var all_input_text = "";
    part_input.each(function(i,elem){
        all_input_text += $($(elem).find("pre")[0]).html().replace(/<br>/g, "\n");
	all_input_text += "\n";
    });

    var all_output_text = "";
    part_output.each(function(i,elem){
        all_output_text += $($(elem).find("pre")[0]).html().replace(/<br>/g, "\n");
	all_output_text += "\n";
    });

    $($(".sample-tests")[0]).before(
	$("<div></div>", {"class": "sample-tests"}).append(
            $("<div></div>", {"class": "section-title", text: "All examples"}),
            $("<div></div>", {"class": "input"}).append(
		$("<div></div>", {"class": "title", text: "All input"}).append(
                    $("<div></div>", {
			"class": "input-output-copier",
			title: "Copy",
			text: "Copy",
			on:{
                            click: function(){
				window.getSelection().removeAllRanges();
				var range = document.createRange();
				range.selectNode($("#pre_all_input")[0]);
				window.getSelection().addRange(range);
				document.execCommand('copy');
				window.getSelection().removeAllRanges();

				Codeforces.showMessage("The example input has been copied into the clipboard");
                            }
			}
                    })
		),
		$("<pre></pre>", {id: "pre_all_input", text: all_input_text})
            ),
            $("<div></div>", {"class": "output"}).append(
		$("<div></div>", {"class": "title", text: "All output"}).append(
                    $("<div></div>", {
			"class": "input-output-copier",
			title: "Copy",
			text: "Copy",
			on:{
                            click: function(){
				window.getSelection().removeAllRanges();
				var range = document.createRange();
				range.selectNode($("#pre_all_output")[0]);
				window.getSelection().addRange(range);
				document.execCommand('copy');
				window.getSelection().removeAllRanges();

				Codeforces.showMessage("The example output has been copied into the clipboard");
                            }
			}
                    })
		),
		$("<pre></pre>", {id: "pre_all_output", text: all_output_text})
            )
	),
    );
});
