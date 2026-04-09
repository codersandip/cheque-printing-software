
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


    $("#emiFormDate").datepicker({
        uiLibrary: "bootstrap5",
        format: "mm-yyyy",
        showRightIcon: true,
        value: moment().format("MM-YYYY"),
    });
    setTimeout(() => {
        $('.emi-form input:first').trigger('change');
    }, 1000);
    $('.emi-form input').on('keyup change', function (e) {
        const id = this.id;
        switch (this.id) {
            case 'loanAmount':
                $(this).next().html(this.value == "" ? "" : getToWordsInstance('en-IN').convert(this.value));
                break;
            default:
                break;
        }
        calculateEmi();
    });
    $('.emi-form').on('submit', function (e) {
        e.preventDefault();
        calculateEmi();
    });
});
const calculateEmi = () => {

    const loanAmount = $('#loanAmount').val();
    const interestRate = $('#rateOfInterest').val();
    const tenure = $('#tenure').val() * 12;
    let balanceAmount = loanAmount;
    let monthlyInterestRate = (interestRate / 12) / 100;
    let emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    let revise_emi = emi;
    let tr = "";
    let period = html = totalInterest = totalPayableAmount = 0;

    let break_for = false;
    for (let i = 1; i <= tenure; i++) {
        period = i;
        if (i % 12 == 1 && i != 1) {
            if ($('#emiIncreasePerYear').val() != "")
                revise_emi = parseFloat(revise_emi) + parseFloat((revise_emi * $('#emiIncreasePerYear').val() / 100).toFixed(2));
        }
        monthlyInterest = balanceAmount * monthlyInterestRate;
        principle = revise_emi - monthlyInterest;
        balanceAmount = balanceAmount - principle;
        if (balanceAmount < 0) {
            if (break_for) {
                break;
            }
            break_for = true;
        }

        totalInterest += parseFloat(monthlyInterest);
        totalPayableAmount += parseFloat(revise_emi);
        tr += "<tr>";
        tr += "<td>" + i + "</td>";
        tr += "<td>" + moment($("#emiFormDate")).add(i - 1, 'M').format("MM-YYYY") + "</td>";
        tr += "<td>" + revise_emi.toFixed(2) + "</td>";
        tr += "<td>" + principle.toFixed(2) + "</td>";
        tr += "<td>" + monthlyInterest.toFixed(2) + "</td>";
        tr += "<td>" + balanceAmount.toFixed(2) + "</td>";
        if (i % 12 == 0 && i != tenure && $('#emiPrePaymentPerYear').val() != "") {
            tr += "<td>" + (emi * parseFloat($("#emiPrePaymentPerYear").val())).toFixed(2) + "</td>";
            balanceAmount = balanceAmount - (emi * parseFloat($("#emiPrePaymentPerYear").val()));
        } else {
            tr += "<td></td>";
        }
        tr += "</tr>";
    }
    const olderDate = new Date(moment($("#emiFormDate")));
    const currentDate = new Date(moment($("#emiFormDate")).add(period, 'M'));
    
    html = `<div class="metric-card">
        <strong>Total Interest</strong>
        <span>${parseFloat(totalInterest.toFixed(2)).toLocaleString('en-IN')}</span>
    </div>
    <div class="metric-card">
        <strong>Total Payable Amount</strong>
        <span>${parseFloat(totalPayableAmount.toFixed(2)).toLocaleString('en-IN')}</span>
    </div>
    <div class="metric-card">
        <strong>Total Period</strong>
        <span>${dateDiffInMonths(olderDate, currentDate, true)}</span>
    </div>`;



    $('.data').html(html);
    $('#emiTable tbody').html(tr);
}

function dateDiffInMonths(a, b, asString = false) {
    var months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    var years = Math.floor(months / 12);
    months = months % 12;

    return asString ? `${years} Years ${months} Months` :   {
        years: years,
        months: months
    };
}
