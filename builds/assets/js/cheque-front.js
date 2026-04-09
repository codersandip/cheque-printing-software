// const ToWords = require("to-words").ToWords;
// const moment = require("moment");

// const moment = require("moment");

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

    chequePrint();
    
    $('.cheque-form input, .cheque-form select').on('input change', function (e) {

        var data = $("#chequeFormBank").val() != "" ? ChequeData[$("#chequeFormBank").val()] : ChequeData[$("#chequeFormBank")[0][1].value];
        switch (this.id) {
            case "chequeToggle":
                if (e.type == "change") {
                    $(this).parent().find('label').text(this.checked ? 'Multiple Cheque Print' : 'Single Cheque Print');
                    $('.single-cheque, .multiple-cheque').toggleClass('d-none');
                }
                case "chequeFormType":
                    var chequeAcPayee = $(".cheque-ac-payee");
                    var chequeFormType = $("#chequeFormType").val();
                    $('.cheque-cancel').css("display", "none");
                    $('.cheque-negotiate').addClass('d-none');
                    $(".cheque-name, .cheque-date, .cheque-amount, .cheque-amount-word").removeClass('d-none');
                    chequeAcPayee.css("opacity", "0").css("color", "rgba(0, 0, 0, 0)");
                    if (chequeFormType == "Order") {
                    } else if (chequeFormType == "Payee") {
                        chequeAcPayee.css("opacity", "1").css("color", "rgba(0, 0, 0, 1)");
                    } else if (chequeFormType == "Crossed") {
                        chequeAcPayee.css("opacity", "1");
                    } else if (chequeFormType == "Payee Not Nigotiable") {
                        chequeAcPayee.css("opacity", "1").css("color", "rgba(0, 0, 0, 1)");
                        $('.cheque-negotiate').removeClass('d-none');
                    } else if (chequeFormType == "Self") {
                        $(".cheque-name").text(`${chequePrefix.payeePrefix}Self${chequePrefix.payeeSufix}`);
                    } else if (chequeFormType == "Cancel") {
                        $(".cheque-name, .cheque-date, .cheque-amount, .cheque-amount-word").addClass('d-none');
                        $('.cheque-cancel').css("display", "block");
                    }
                    break;

                case "chequeFormBank":
                    $('.cheque-name').attr('style', data.name_position);
                    $('.cheque-date').attr('style', data.date_position);
                    $('.cheque-amount').attr('style', data.amount_position);
                    $('.cheque-amount-word').attr('style', data.amount_word_position);

                    break;
                case "chequeFormLanguage":
                case "chequeFormDate":
                case "chequeFormName":
                    chequePrint()
                    break;
                case "chequeFormAmount":
                    if (!$(this).val()) {
                        return;
                    }
                    const numberRegex = /^-?\d+(\.\d{0,2})?$/;
                    if (!numberRegex.test($(this).val())) {
                        if ($(this).val().split(".").length == 2 && $(this).val().split(".")[1].length > 2) {
                            $(this).val($(this).val().split(".")[0] + "." + $(this).val().split(".")[1].slice(0, 2));
                        } else {
                            $(this).val('');
                            return;
                        }
                    }
                    chequePrint()
                    break;
                case "noOfPages":
                    if (!$(this).val() && e.type == "change") return;
                    chequePrint();
                    break;
                case "formFile":
                    var file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const data = new Uint8Array(e.target.result);
                            const workbook = XLSX.read(data, {
                                type: 'array'
                            });

                            // Get the first sheet's name
                            const firstSheetName = workbook.SheetNames[0];

                            // Get the first sheet's data
                            const worksheet = workbook.Sheets[firstSheetName];

                            // Convert sheet data to JSON
                            let output = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1
                            });
                            output = output.slice(1)
                            var arr = [];
                            $(output).each(function (index, value) {
                                if (value.length > 0) {
                                    var date = XLSX.SSF.parse_date_code(value[0]);
                                    arr[index] = getChequeHTML(
                                        value[1],
                                        dateHtml(moment(date.m + '-' + date.d + '-' + date.y).format('DD-MM-YYYY')),
                                        getAmount(value[2]),
                                        getAmountWord(value[2])
                                    );
                                }
                            });
                            getCheque(arr)
                            $('#formFile')[0].value = '';
                        };
                        reader.readAsArrayBuffer(file);
                    }

                    break;
                case "chequeNameToggle":
                    if (e.type !== 'change') return;
                    $('.cheque-name').toggleClass('d-none');
                    break;
                case "chequeAmountToggle":
                    if (e.type !== 'change') return;
                    $('.cheque-amount').toggleClass('d-none');
                    $('.cheque-amount-word').toggleClass('d-none');
                    break;
                case "chequeDateToggle":
                    if (e.type !== 'change') return;
                    $('.cheque-date').toggleClass('d-none');
                    break;
                    default:
                    break;
        }

    });
});


function dateHtml(date) {
    var date = date.replace(/-/g, "").split("");
    var html = "";
    date.forEach((element) => {
        html += `<div class="col p-0" style="width: ${
        $("#chequeFormBank").val() != ""
          ? $("#chequeFormBank").val()
          : "Axis Bank"
      };">${parseInt(element).toLocaleString($("#chequeFormLanguage").val())}</div>`;
    });
    return html;
}

function getAmountWord(amount) {
    if (amount == "") {
        return "";
    }
    const numberRegex = /^-?\d+(\.\d{0,2})?$/;
    if (numberRegex.test(amount)) {
        return (chequePrefix.amountWordsPrefix + getToWordsInstance($("#chequeFormLanguage").val()).convert(amount)) + chequePrefix.amountWordsSufix;
    } else {
        amount = amount.toString();
        if (
            amount.split(".").length == 2 &&
            amount.split(".")[1].length > 2
        ) {
            amount = amount.split(".")[0] + "." + amount.split(".")[1].slice(0, 2);
            return (chequePrefix.amountWordsPrefix + getToWordsInstance($("#chequeFormLanguage").val()).convert(amount)) + chequePrefix.amountWordsSufix;
        }
    }
}

function getAmount(amount) {
    if (amount == "") {
        return "";
    }
    const numberRegex = /^-?\d+(\.\d{0,2})?$/;
    if (numberRegex.test(amount)) {
        return chequePrefix.amountPrefix + parseFloat(amount).toLocaleString(
            $("#chequeFormLanguage").val()
        ) + chequePrefix.amountSufix;
    } else {
        amount = amount.toString();
        if (
            amount.split(".").length == 2 &&
            amount.split(".")[1].length > 2
        ) {
            amount = amount.split(".")[0] + "." + amount.split(".")[1].slice(0, 2);
            return chequePrefix.amountWordsPrefix + parseFloat(amount).toLocaleString(
                $("#chequeFormLanguage").val()
            ) + chequePrefix.amountWordsSufix;
        }

    }
}

function getChequeHTML(name, date, amount, amountWord) {
    var data = $("#chequeFormBank").val() != "" ? ChequeData[$("#chequeFormBank").val()] : ChequeData[$("#chequeFormBank")[0][1].value];

    var chequeHtml = `<div class="cheque-container  border front text-uppercase" data-width="${data.width}" data-height="${data.height}" style="width: ${data.width}; height: ${data.height};">\
    <button class="btn btn-primary single-cheque-print btn-sm top-0 end-0 position-absolute fas fa-print"></button>  
    <div class="cheque-ac-payee">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A/C Payee\
        Only&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>\
    <div class="cheque-name" style="${data.name_position}">${ (name == "" ? "" : chequePrefix.payeePrefix + name + chequePrefix.payeeSufix)}</div>\
    <div class="cheque-date" style="${data.date_position}">\
        <div class="row m-0">${date}</div>\
    </div>\
    <div class="cheque-negotiate position-absolute d-none">Not Negotiable</div>\
    <div class="cheque-amount" style="${data.amount_position}">${ amount }</div>\
    <div class="cheque-amount-word" style="${data.amount_word_position}">${ amountWord }</div>\
    <div class="cheque-cancel">Cancel</div>
</div>`;
    return chequeHtml;
}

function getCheque(html) {
    var chequeHtml = "";

    $(html).each(function (index, value) {
        chequeHtml += `<div class="print-page mt-3">${value}</div>`;
    });
    $(".print-container").html('<div>' + chequeHtml + '</div>');
    var chequeAcPayee = $(".cheque-ac-payee");
    var chequeFormType = $("#chequeFormType").val();
    $('.cheque-cancel').css("display", "none");
    chequeAcPayee.css("opacity", "0").css("color", "rgba(0, 0, 0, 0)")
    if (chequeFormType == "Payee") {
        chequeAcPayee.css("opacity", "1").css("color", "rgba(0, 0, 0, 1)");
    } else if (chequeFormType == "Crossed") {
        chequeAcPayee.css("opacity", "1");
    } else if (chequeFormType == "Self") {
        $(".cheque-name").text(`${chequePrefix.payeePrefix}Self${chequePrefix.payeeSufix}`);
    } else if (chequeFormType == "Cancel") {
        $(".cheque-name, .cheque-date, .cheque-amount, .cheque-amount-word").text('');
        chequeAcPayee.css("opacity", "0");
        $('.cheque-cancel').css("display", "block");

    }
}

function chequePrint() {
    var arr = [];
    for (let index = 0; index < parseInt($('#noOfPages').val() == "" ? 1 : $('#noOfPages').val()); index++) {
        arr[index] = getChequeHTML(
            $("#chequeFormName").val(),
            dateHtml($("#chequeFormDate").val()),
            getAmount($("#chequeFormAmount").val()),
            getAmountWord($("#chequeFormAmount").val())
        );
    }
    getCheque(arr);
}