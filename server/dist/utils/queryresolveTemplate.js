"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResolverTemplate = (user, queryType, resolve) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>${queryType} Confirmation</title>
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
              <div class="message">${queryType} Confirmation</div>
              <div class="body">
                  <p>Dear ${user},</p>
                  <p>Your query of type <span class="highlight">"${queryType}"</span> has been successfully resolved with the following details:</p>
                  <p><span class="highlight">${resolve}</span></p>
              </div>
              <div class="support">If you have any questions or need further assistance, please feel free to reach out to us at <a
                      href="mailto:info@EasyBank.com">info@EasyBank.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
};
exports.default = queryResolverTemplate;
