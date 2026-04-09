const ToWords = require("to-words").ToWords;
const moment = require("moment");
// console.log(require("jspdf"));
// 
const { jsPDF } = window.jspdf;
const jspdf = new jsPDF({
    orientation: "p",
    unit: "in",
    format: "a4",
    floatPrecision: 16 
});
// console.log('doc', doc);


function getToWordsInstance(locale) {
    return new ToWords({
        localeCode: locale,
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
        },
    });
    
}

$(document).ready(function () {
    // Date picker initialization
    $("#chequeFormDate").datepicker({
        uiLibrary: "bootstrap5",
        format: "dd-mm-yyyy",
        showRightIcon: false,
        value: moment().format("DD-MM-YYYY"),
    });

    $('.front-print-btn').on('click', function (e) {
        e.preventDefault();
        // jspdf.html(document.body, {
        //     callback: function (pdf) {
        //         console.log('pdf');
        //         window.open(pdf.output("bloburl"), "a4Popup");
        //     },
        //     x: 0,
        //     y: 0
        // });
        $('.front').printThis({
            importCSS: true
        });
    })

    $('.back-print-btn').on('click', function (e) {
        e.preventDefault();
        $('.back').printThis({
            importCSS: true
        });
    })

    //  input name change event 
    $("#chequeFormName").on("input", function () {
        if (!$(this).val()) {
            $(".cheque-name").text("");
            return;
        }
        $(".cheque-name").text(`**` + $(this).val() + `**`);
    });

    // chequeFormBackData change event
    $("#chequeFormBackData").on("input", function () {
        $(".back").html(`<pre>${$(this).val()}</pre>`);
    });
    $("#chequeFormBackData").trigger("input");

    // input language change event
    $("#chequeFormLanguage").on("change", function () {
        getToWordsInstance($(this).val());
        $('#chequeFormAmount').trigger('keyup');
        $('#chequeFormName').trigger('input');
        $('#chequeFormDate').trigger('change');
    });

    // input amount change event
    $("#chequeFormAmount").on("keyup", function () {
        if (!$(this).val()) {
            $(".cheque-amount").text("");
            $(".cheque-amount-word").text("");
        }
        const numberRegex = /^-?\d+(\.\d{0,2})?$/;
        if (numberRegex.test($(this).val())) {
            $(".cheque-amount").text(
                `**` +
                parseFloat($(this).val()).toLocaleString(
                    $("#chequeFormLanguage").val()
                ) +
                `/-**`
            );
            $(".cheque-amount-word").text(
                `**` + getToWordsInstance($("#chequeFormLanguage").val()).convert($(this).val()) + `**`
            );
        } else {
            if (
                $(this).val().split(".").length == 2 &&
                $(this).val().split(".")[1].length > 2
            ) {
                $(this).val(
                    $(this).val().split(".")[0] +
                    "." +
                    $(this).val().split(".")[1].slice(0, 2)
                );
                $(".cheque-amount").text(
                    `**` +
                    parseFloat($(this).val()).toLocaleString(
                        $("#chequeFormLanguage").val()
                    ) +
                    `/-**`
                );
                $(".cheque-amount-word").text(
                    `**` + getToWordsInstance($("#chequeFormLanguage").val()).convert($(this).val()) + `**`
                );
                return;
            }
            $(this).val("");
        }
    });

    // input bank change event
    $("#chequeFormBank").on("change", function () {
        if ($(this).val() != "") {
            var data = ChequeData[$(this).val()];
        } else {
            var data = ChequeData[$(this)[0][1].value];
        }

        $(".cheque-container").attr("style", data.dimension);
        $(".cheque-date").attr("style", data.date_position);
        $(".cheque-name").attr("style", data.name_position);
        $(".cheque-amount").attr("style", data.amount_position);
        $(".cheque-amount-word").attr("style", data.amount_word_position);
        $(".cheque-date>.row .col").css("width", data.date_width);
    });

    // input cheque type change event
    $("#chequeFormType").on("change", function () {
        if ($(this).val() == "Bearer") {
            $(".cheque-ac-payee").css("opacity", "0");
        } else if ($(this).val() == "Payee") {
            $(".cheque-ac-payee").css("opacity", "1");
            $(".cheque-ac-payee").css("color", "rgba(0, 0, 0, 1)");
        } else if ($(this).val() == "Crossed") {
            $(".cheque-ac-payee").css("opacity", "1");
            $(".cheque-ac-payee").css("color", "rgba(0, 0, 0, 0)");
        } else if ($(this).val() == "Self") {
            $(".cheque-ac-payee").css("opacity", "0");
            $(".cheque-ac-payee").css("color", "rgba(0, 0, 0, 0)");
            $(".cheque-name").text(`**Self**`);
            $("#chequeFormName").val("Self");
        }
    });

    // input date change event
    $("#chequeFormDate").on("change", function () {
        var date = $(this).val().replace(/-/g, "").split("");
        var html = "";
        date.forEach((element) => {
            html += `<div class="col p-0" style="width: ${
        $("#chequeFormBank").val() != ""
          ? $("#chequeFormBank").val()
          : "Axis Bank"
      };">${parseInt(element).toLocaleString($("#chequeFormLanguage").val())}</div>`;
        });
        $(".cheque-date>.row").html(html);
    });

    $("#chequeFormBank").trigger("change");
    $(".cheque-ac-payee").css("opacity", "0");
    $("#chequeFormDate").trigger("change");
    $('#chequeFormName').val('Sandip Baliram Tawhare')
    $('#chequeFormName').trigger('input');
    $('#chequeFormAmount').val('10000')
    $('#chequeFormAmount').trigger('keyup');
});

/*    function openPrintView() {

           } */
// function openPrintView() {
//     const a4Width = 794;
//     const a4Height = 1123;

//     // Open the popup window
//     const popupWindow = window.open("", "a4Popup", `width=${a4Height},height=${a4Width}`);

//     // Optionally, set the window to be non-resizable
//     popupWindow.resizeTo(a4Height, a4Width);
//     popupWindow.moveTo(0, 0); // Position the window at the top-left corner of the screen

//     // Write content to the popup window
//     popupWindow.document.write(
//         "<h2>This is an A4-sized popup window!</h2><style>@media print { @page { size: A4 landscape; } } </style>"
//         );
//     // ... add your content here ...
//     popupWindow.document.close();
// }

const tempTitle = document.title;
window.addEventListener('beforeprint', () => {
    var date = new Date();
    document.title = date.getTime();
    // $('.cheque-container').append($('.cheque-container').html());
});
window.addEventListener('afterprint', () => {
    document.title = tempTitle;
});