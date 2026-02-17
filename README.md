# 🏦 Cheque Printing Software

A comprehensive web-based cheque printing solution designed for Indian banks with multi-language support, bulk printing capabilities, and integrated financial tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4?logo=php)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

## ✨ Features

### 🖨️ Cheque Printing
- **Multi-Bank Support**: Pre-configured templates for major Indian banks
  - Axis Bank
  - ICICI Bank
  - HDFC Bank
  - PDCCB Pune
  - Union Bank
- **Single & Bulk Printing**: Print individual cheques or bulk print from Excel files
- **Multi-Language Support**: English, Hindi (हिंदी), and Marathi (मराठी)
- **Cheque Types**: Bearer, Order, Crossed, Payee, Payee Not Negotiable, Cancel, Self
- **Customizable Styling**: Configure prefix/suffix for payee, amount, and amount in words
- **Front & Back Printing**: Support for both sides of the cheque
- **Auto Amount Conversion**: Automatic conversion of numbers to words in multiple languages

### 📊 Financial Tools
- **EMI Calculator**: Calculate loan EMIs with detailed amortization schedule
  - Support for variable EMI increases
  - Pre-payment options
  - Interest and principal breakdown
- **EMI Cheque Printing**: Generate post-dated cheques for EMI payments
- **Envelope Printing**: Print addresses on envelopes

### 🎨 User Interface
- Responsive Bootstrap 5 design
- Toggle controls for selective field printing
- Date picker with Indian date format (DD-MM-YYYY)
- Real-time preview before printing
- Sample Excel template for bulk operations

## 🚀 Getting Started

### Prerequisites
- PHP 7.4 or higher
- Web server (Apache/Nginx) or PHP built-in server
- Modern web browser (Chrome, Firefox, Edge)
- Node.js and npm (for building assets)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codersandip/cheque-print.git
   cd cheque-print
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build assets**
   ```bash
   npm run build
   ```
   Or on Windows:
   ```bash
   build.bat
   ```

4. **Start the server**
   
   Using PHP built-in server:
   ```bash
   php -S localhost:8000
   ```
   
   Or configure your Apache/Nginx to point to the project directory.

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## 📖 Usage

### Single Cheque Printing

1. Navigate to the home page (`index.php`)
2. Select your preferred language (English/Hindi/Marathi)
3. Choose the cheque type and bank
4. Enter the date, payee name, and amount
5. Toggle fields you want to print (Name/Amount/Date)
6. Click "Print" to preview and print

### Bulk Cheque Printing

1. Toggle "Single Cheque Print" switch to enable bulk mode
2. Download the sample Excel template
3. Fill in the cheque details in the Excel file
4. Upload the file
5. Set the number of pages
6. Click "Print" to generate all cheques

### EMI Calculator

1. Navigate to EMI Calculator (`emi-calculator.php`)
2. Enter loan amount, interest rate, and tenure
3. Set EMI start date
4. (Optional) Add yearly EMI increase percentage
5. (Optional) Add yearly pre-payment amount
6. Click "Calculate EMI" to view the amortization schedule

### Customizing Cheque Style

1. Navigate to Cheque Styling (`cheque-style.php`)
2. Set prefix/suffix for:
   - Payee name
   - Amount
   - Amount in words
3. Choose cheque alignment (Center/Left/Right)
4. Click "Save" to store preferences

## 📁 Project Structure

```
cheque-print/
├── assets/
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── images/           # Images and icons
│   └── Sample.xlsx       # Sample Excel template
├── build/                # Webpack build output
├── layout/
│   ├── css.php          # CSS includes
│   ├── js.php           # JavaScript includes
│   └── navbar.php       # Navigation bar
├── index.php            # Main cheque printing page
├── cheque-back.php      # Cheque back printing
├── cheque-style.php     # Styling configuration
├── emi-calculator.php   # EMI calculator
├── emi-cheque-print.php # EMI cheque printing
├── envelope-print.php   # Envelope printing
├── package.json         # NPM dependencies
├── webpack.config.js    # Webpack configuration
└── build.bat           # Windows build script
```

## 🛠️ Technologies Used

### Backend
- **PHP**: Server-side scripting

### Frontend
- **Bootstrap 5.3**: Responsive UI framework
- **jQuery 3.7**: DOM manipulation and AJAX
- **Font Awesome 6.7**: Icons
- **Gijgo**: Date picker component
- **Moment.js**: Date manipulation
- **to-words**: Number to words conversion
- **SheetJS (xlsx)**: Excel file processing
- **Dropzone**: File upload handling

### Build Tools
- **Webpack 5**: Module bundler
- **CSS Loader**: CSS processing
- **Style Loader**: Style injection

## 📝 Configuration

### Adding New Banks

To add support for a new bank, edit the bank selection dropdown in `index.php`:

```html
<select class="form-control form-control-sm" id="chequeFormBank">
    <option value="Your Bank Name">Your Bank Name</option>
</select>
```

Then create corresponding CSS styles for the bank's cheque layout.

### Customizing Languages

Language support is handled through the `to-words` library. Current supported locales:
- `en-IN` - English (India)
- `hi-IN` - Hindi (India)
- `mr-IN` - Marathi (India)

## 🖼️ Screenshots

### Main Interface
The main cheque printing interface with toggle controls and bank selection.

### EMI Calculator
Detailed EMI calculation with amortization schedule showing principal, interest, and balance.

### Bulk Printing
Excel-based bulk cheque printing for multiple transactions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Sandip Tawhare**

## 🙏 Acknowledgments

- Bootstrap team for the amazing UI framework
- Font Awesome for the comprehensive icon set
- All open-source contributors whose libraries made this project possible

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] Add more Indian bank templates
- [ ] Support for demand drafts
- [ ] Digital signature integration
- [ ] Cloud storage for cheque records
- [ ] Mobile app version
- [ ] PDF export functionality
- [ ] Multi-user support with authentication
- [ ] Cheque printing history and tracking

---

**Note**: This software is designed for legitimate business use. Please ensure compliance with your bank's policies and local regulations when using cheque printing software.
