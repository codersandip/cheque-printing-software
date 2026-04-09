<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheque Printing Software - Prefix</title>
    <?php include_once('./layout/css.php'); ?>
</head>

<body>
    <?php include_once('./layout/navbar.php'); ?>
    <main class="container page-shell">
        <section class="page-hero cheque-title">
            <div class="page-hero__content">
                <div>
                    <p class="page-hero__eyebrow">Cheque Styling</p>
                    <h1>Control the text framing that gets printed on every cheque.</h1>
                    <p>Configure prefixes, suffixes, and default alignment from one settings page instead of editing values inside each print session.</p>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>Stored in</strong>
                        <span>Browser local storage</span>
                    </div>
                    <div class="hero-stat">
                        <strong>Applies to</strong>
                        <span>Payee, amount, and amount words</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="workspace-grid workspace-grid--single">
            <div class="surface-card control-panel">
                <div class="surface-card__header">
                    <div>
                        <span class="section-badge">Settings</span>
                        <h2>Cheque text presets</h2>
                        <p>These values are reused by the cheque print flow so the wording stays consistent.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <form id="saveChequePrefix" class="control-stack">
                        <div class="settings-grid">
                            <fieldset class="field-card">
                                <legend class="float-none w-auto px-0">Payee</legend>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="payeePrefix" class="form-label">Prefix</label>
                                        <input type="text" class="form-control" id="payeePrefix" placeholder="Prefix">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="payeeSufix" class="form-label">Suffix</label>
                                        <input type="text" class="form-control" id="payeeSufix" placeholder="Suffix">
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset class="field-card">
                                <legend class="float-none w-auto px-0">Amount</legend>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="amountPrefix" class="form-label">Prefix</label>
                                        <input type="text" class="form-control" id="amountPrefix" placeholder="Prefix">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="amountSufix" class="form-label">Suffix</label>
                                        <input type="text" class="form-control" id="amountSufix" placeholder="Suffix">
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset class="field-card">
                                <legend class="float-none w-auto px-0">Amount in words</legend>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="amountWordsPrefix" class="form-label">Prefix</label>
                                        <input type="text" class="form-control" id="amountWordsPrefix" placeholder="Prefix">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="amountWordsSufix" class="form-label">Suffix</label>
                                        <input type="text" class="form-control" id="amountWordsSufix" placeholder="Suffix">
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset class="field-card">
                                <legend class="float-none w-auto px-0">Cheque alignment</legend>
                                <label for="chequeAlign" class="form-label">Default align</label>
                                <select id="chequeAlign" class="form-select">
                                    <option value="top: 50%;right: 0;transform: translateY(-50%);">Center</option>
                                    <option value="top: 0%;right: 0;transform: translateY(-0%);">Left</option>
                                    <option value="top: 100%;right: 0;transform: translateY(-100%);">Right</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary px-5 w-fit">Save Style Settings</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>
    <?php include_once('./layout/js.php'); ?>
    <script>
        $(document).ready(function() {
            $("#saveChequePrefix").submit(function(e) {
                e.preventDefault();
                $(this).find('input, select').each(function(index, value) {
                    chequePrefix[$(value).attr('id')] = $(value).val();
                });
                localStorage.setItem("chequePrefix", JSON.stringify(chequePrefix));
                for (let x in chequePrefix) {
                    $(`#${x}`).val(chequePrefix[x]);
                }
            });
        });
    </script>
</body>

</html>
