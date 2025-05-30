"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transcationVerfication = (transactionId, amount, date, description) => {
    return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
    <div class="message">Transaction Successful</div>
    <div class="body">
        <p>Dear User,</p>
        <p>We are pleased to inform you that your recent transaction has been successfully processed.</p>
        <h2 class="highlight">Transaction Details</h2>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p>If you have any questions or need assistance regarding this transaction, please feel free to reach out to us at <a href="mailto:info@easybank.com">info@easybank.com</a>. We are here to help!</p>
    </div>
    <div class="support">Thank you for choosing Easy Bank. We look forward to serving you again!</div>
</div>
	</body>
	
	</html>`;
};
exports.default = transcationVerfication;
