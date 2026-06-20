<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheque Printing Software - Home</title>
    <?php include_once('./layout/css.php'); ?>
</head>

<body>
    <?php include_once('./layout/navbar.php'); ?>
    <main class="container-fluid px-4 px-xl-5 page-shell">
        <section class="page-hero cheque-title">
            <div class="page-hero__content">
                <div>
                    <p class="page-hero__eyebrow">EMI Calculator</p>
                    <h1>Analyse repayment schedules in a dashboard layout built for scanning the numbers.</h1>
                    <p>Update loan inputs, yearly increases, and prepayments while keeping the metrics and amortisation table visible.</p>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>Focus</strong>
                        <span>Loan breakdown and schedule</span>
                    </div>
                    <div class="hero-stat">
                        <strong>Includes</strong>
                        <span>Prepayment and annual EMI increase</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="workspace-grid">
            <div class="surface-card control-panel">
                <div class="surface-card__header">
                    <div>
                        <span class="section-badge">Inputs</span>
                        <h2>Loan configuration</h2>
                        <p>Enter the repayment assumptions here and the schedule will recalculate automatically.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <form name="emiForm" class="emi-form control-stack" autocomplete="off">
                        <div class="control-group">
                            <h3>Base values</h3>
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <label for="loanAmount" class="form-label">Loan amount</label>
                                    <input type="number" class="form-control" id="loanAmount" step="1000" pattern="^\d+(?:\.\d+)?$" placeholder="Loan Amount" value="500000">
                                    <small class="text-muted"><i></i></small>
                                </div>
                                <div class="col-md-6">
                                    <label for="rateOfInterest" class="form-label">Rate of interest</label>
                                    <input type="number" class="form-control" id="rateOfInterest" pattern="^\d+(?:\.\d+)?$" placeholder="Rate of Interest" value="9" step="0.25">
                                </div>
                                <div class="col-md-6">
                                    <label for="tenure" class="form-label">Tenure (years)</label>
                                    <input type="number" class="form-control" id="tenure" pattern="^\d+(?:\.\d+)?$" placeholder="Tenure" value="10">
                                </div>
                                <div class="col-md-12">
                                    <label for="emiFormDate" class="form-label">EMI starting from</label>
                                    <input type="text" class="form-control" id="emiFormDate" placeholder="Tenure">
                                </div>
                            </div>
                        </div>

                        <div class="control-group">
                            <h3>Advanced adjustments</h3>
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <label for="emiIncreasePerYear" class="form-label">EMI increase per year (%)</label>
                                    <input type="number" class="form-control" id="emiIncreasePerYear" placeholder="EMI Increase / Year">
                                </div>
                                <div class="col-md-12">
                                    <label for="emiPrePaymentPerYear" class="form-label">EMI prepayment per year</label>
                                    <input type="number" class="form-control" id="emiPrePaymentPerYear" placeholder="EMI Prepayment / Year">
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Calculate EMI</button>
                    </form>
                </div>
            </div>

            <div class="preview-shell">
                <div class="metrics-panel data mb-0"></div>
                <div class="surface-card table-shell">
                    <div class="surface-card__header">
                        <div>
                            <span class="section-badge">Schedule</span>
                            <h2>Repayment table</h2>
                            <p>The table tracks EMI, principal, interest, balance, and annual prepayments month by month.</p>
                        </div>
                    </div>
                    <div class="surface-card__body surface-card__body--compact">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="emiTable">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Month</th>
                                        <th scope="col">EMI</th>
                                        <th scope="col">Principal</th>
                                        <th scope="col">Interest</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Pre Payment</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <?php include_once('./layout/js.php'); ?>
    <script src="./assets/js/emi-calculator.js"></script>
</body>

</html>
