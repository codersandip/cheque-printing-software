<?php
$currentPage = basename($_SERVER['PHP_SELF']);
$navItems = [
    './' => ['label' => 'Cheque Print', 'file' => 'index.php'],
    './cheque-style.php' => ['label' => 'Cheque Styling', 'file' => 'cheque-style.php'],
    './cheque-back.php' => ['label' => 'Cheque Back', 'file' => 'cheque-back.php'],
    './envelope-print.php' => ['label' => 'Envelope Print', 'file' => 'envelope-print.php'],
    './emi-cheque-print.php' => ['label' => 'EMI Cheque Print', 'file' => 'emi-cheque-print.php'],
    './emi-calculator.php' => ['label' => 'EMI Calculator', 'file' => 'emi-calculator.php'],
];
?>
<nav class="navbar navbar-expand-xl app-navbar sticky-top">
  <div class="container-fluid px-4 px-xl-5 app-navbar__container">
    <a class="navbar-brand app-brand" href="./">
      <span class="app-brand__mark">CP</span>
      <span>
        <strong>Cheque Printing Software</strong>
        <small>Modern print workspace</small>
      </span>
    </a>
    <button class="navbar-toggler app-navbar__toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav app-navbar__links ms-auto">
        <?php foreach ($navItems as $href => $item): ?>
          <li class="nav-item">
            <a class="nav-link <?php echo $currentPage === $item['file'] ? 'active' : ''; ?>" href="<?php echo $href; ?>">
              <?php echo $item['label']; ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</nav>
