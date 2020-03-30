const htmlTemplateGenerator = (emailConfiguration, generalConfiguration) => {

const template = `<html>
    <head>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700,900" rel="stylesheet" type="text/css">
    <title>Bytacoin Email Template</title><!-- Responsive Styles and Valid Styles -->
    <style type="text/css">
    body{
      width: 100%;
      background-color: #F2F2F2;
      margin:0;
      padding:0;
      -webkit-font-smoothing: antialiased;
      mso-margin-top-alt:0px; mso-margin-bottom-alt:0px; mso-padding-alt: 0px 0px 0px 0px;
    }
    p,h1,h2,h3,h4{
      margin-top:0;
      margin-bottom:0;
      padding-top:0;
      padding-bottom:0;
    }
    .emailColoredBody a, .emailColoredBody a:link, .emailColoredBody a:hover, .emailColoredBody a:active, .emailColoredBody a:visited {
      color:#fff;
    }
    span.preheader{display: none; font-size: 1px;}
    html{
      width: 100%;
    }
    table{
      font-size: 14px;
      border: 0;
    }
    /* ----------- responsivity ----------- */
    @media only screen and (max-width: 640px){
      /*------ top header ------ */
      body[yahoo] .main-header{font-size: 24px !important;}
      body[yahoo] .show{display: block !important;}
      body[yahoo] .hide{display: none !important;}
      /*-------- container --------*/
      body[yahoo] .container590{width: 460px !important;}
      body[yahoo] .container580{width: 380px !important;}
      /*-------- secions ----------*/
      body[yahoo] .section-item{width: 460px !important;}
      body[yahoo] .section-img img{width: 460px !important; height: auto !important;}
    }
    @media only screen and (max-width: 479px){
      /*------ top header ------ */
      body[yahoo] .main-header{font-size: 22px !important;}
      /*-------- container --------*/
      body[yahoo] .container590{width: 280px !important;}
      body[yahoo] .container580{width: 250px !important;}
      /*------- CTA -------------*/
      body[yahoo] .main-button{width: 200px !important;}
      body[yahoo] .cta-text{font-size: 14px !important;}
    }
    </style>
    </head>
    <body>
    <!-- ======= main section ======= -->
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="F2F2F2" class="editablr">
    <tbody class="nana2"><tr class="tata"><td height="40" style="font-size: 40px; line-height: 40px;" class="sasa sasa2 ui-resizable">&nbsp;<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90; display: none;"></div></td></tr>
    <tr class="tata">
    <td align="center">
    <table border="0" align="center" width="460" cellpadding="0" cellspacing="0" class="container590">
    <tbody class="nana ui-sortable"><div class="koso" style="margin:0 auto;"> <tr class="tata2" style="outline: blue solid 0px; outline-offset: -1px;">
    <td align="center" mc:edit="main-header" style="color: #2780F0; font-size: 18px; font-family: Open Sans, sans-serif;; mso-line-height-rule: exactly; line-height: 22px;" class="title_color sasa">
    <!-- ======= section header ======= -->
    <div style="line-height: 22px;" class="edit_text sasa-w">
    <multiline spellcheck="false" style="display: inline-block; pointer-events: visible;">
    Hi `+ emailConfiguration.receiverName +`,
    </multiline>
    </div>
    </td>
    </tr></div>
    <div class="koso" style="margin:0 auto;"> <tr class="tata2" style="outline: blue solid 0px; outline-offset: -1px;"><td height="10" style="font-size: 10px; line-height: 10px;" class="sasa sasa2 ui-resizable">&nbsp;<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90; display: none;"></td></tr></div>
    <div class="koso" style="margin:0 auto;"> <tr class="tata2">
    <td align="center" mc:edit="main-text" style="color: #2780F0; font-size: 18px; font-family: Open Sans, sans-serif;; font-weight: 600; mso-line-height-rule: exactly; line-height: 22px;" class="text_color sasa">
    <div style="line-height: 22px" class="edit_text sasa-w">
    <!-- ======= section text ======= -->
    <multiline spellcheck="false" style="display: inline-block; pointer-events: visible;">
    `+ emailConfiguration.subTitle +`
    </multiline>
    </div>
    </td>
    </tr></div>
    </tbody></table>
    </td>
    </tr>
    <tr class="tata"><td height="45" style="font-size: 45px; line-height: 45px;">&nbsp;</td></tr>
    <tr class="tata">
    <td align="center">
    <table border="0" align="center" width="460" cellpadding="0" cellspacing="0" class="container590" style="box-shadow: 5px 9px 20px 0px rgba(0, 0, 0, 0.1);">
    <tbody class="nana ui-sortable"><div class="koso" style="margin:0 auto;"> <tr class="tata2" style="outline: blue solid 0px; outline-offset: -1px;">
    <td align="center" class="sasa">
    <table border="0" align="center" width="460" cellpadding="0" cellspacing="0" bgcolor="2780F0" class="container590 sasa-w" style="border-top-left-radius: 5px; border-top-right-radius: 5px; background-position: bottom center; background-repeat: no-repeat;">
    <tbody><tr><td height="35" style="font-size: 35px; line-height: 35px;">&nbsp;</td></tr>
    <tr>
    <td align="center">
    <table border="0" align="center" width="460" cellpadding="0" cellspacing="0" class="container590">
    <tbody><tr>
    <!-- ======= logo ======= -->
    <td align="center">
    <a href="" style="display: block; border-style: none !important; border: 0 !important;" class="edit_img"><img editable="true" mc:edit="logo" width="60" border="0" style="display: block;" src="https://www.netobjex.com/wp-content/themes/netobjex-4/images/nO_Logo.png" alt=""></a>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    <tr><td height="30" style="font-size: 60px; line-height: 30px;">&nbsp;</td></tr>
    <tr>
    <td align="center" mc:edit="main-header2" style="color: #ffffff; font-size: 28px; font-family: Open Sans, sans-serif;; mso-line-height-rule: exactly; line-height: 26px;" class="title_color main-header">
    <!-- ======= section header ======= -->
    <div style="line-height: 26px;" class="edit_text">
    <multiline spellcheck="false" style="display: inline-block; pointer-events: visible;">
    `+ emailConfiguration.mainTitle +`
    </multiline>
    </div>
    </td>
    </tr>
    <tr><td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td></tr>
    <tr>
    <td align="center">
    <table border="0" align="center" width="420" cellpadding="0" cellspacing="0" class="container580">
    <tbody><tr>
    <td align="center" mc:edit="main-text2" style="color: #fff; font-size: 14px; font-family: Lato, sans-serif; mso-line-height-rule: exactly; line-height: 22px;" class="text_color">
    <div style="line-height: 22px" class="edit_text emailColoredBody">
    <!-- ======= section text ======= -->
    <multiline spellcheck="false" style="display: inline-block; pointer-events: visible;">
    `+ emailConfiguration.mailContent +`
    </multiline>
    </div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    <tr><td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td></tr>
    <tr>
    <td align="center">
    <a href="`+ emailConfiguration.buttonLink +`" style="color: #ffffff; text-decoration: none;">
    <table border="0" align="center" width="191" cellpadding="0" cellspacing="0" style="border: 1px solid #ffffff; border-radius: 3px;">
    <tbody><tr><td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td></tr>
    <tr>
    <td align="center" style="color: #ffffff; font-size: 12px; font-family: Open Sans, sans-serif;; font-weight: 700;" mc:edit="main-button">
    <!-- ======= main section button ======= -->
    <div style="line-height: 25px;">
    <singleline>`+ emailConfiguration.buttonText +`</singleline>
    </div>
    </td>
    </tr>
    <tr><td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td></tr>
    </tbody></table>
    </a>
    </td>
    </tr>
    <tr class="hide"><td height="35" style="font-size: 35px; line-height: 35px;">&nbsp;</td></tr>
    <tr><td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td></tr>
    </tbody></table>
    </td>
    </tr></div>
    <div class="koso" style="margin:0 auto;"> <tr class="tata2">
    <td align="center" class="sasa">
    <table border="0" align="center" width="460" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="container590 sasa-w" style="border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;">
    <tbody><tr><td height="35" style="font-size: 35px; line-height: 35px;">&nbsp;</td></tr>
    <tr>
    <td align="center">
    <table border="0" width="320" align="center" cellpadding="0" cellspacing="0" class="container580">
    <tbody><tr>
    <td align="center" mc:edit="footer-text" style="color: #717993; font-size: 15px; font-family: Lato, sans-serif; mso-line-height-rule: exactly; line-height: 25px;" class="text_color">
    <div style="line-height: 25px" class="edit_text">
    <!-- ======= section text ======= -->
    <multiline contenteditable="false" spellcheck="false" style="display: inline-block; pointer-events: visible;">
    If you have any queries, then please reply to this email or contact us at <span style="color: #914297;">`+ generalConfiguration.supportEmail +`</span>
    </multiline>
    </div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    <tr><td height="10" style="font-size: 30px; line-height: 10px;">&nbsp;</td></tr>
    <tr>
    <td align="center">
    </td>
    </tr>
    <tr><td height="30" style="font-size: 30px; line-height: 30px;">&nbsp;</td></tr>
    </tbody></table>
    </td>
    </tr></div>
    </tbody></table>
    </td>
    </tr>
    <tr class="tata"><td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td></tr>
    <tr class="tata">
    <td align="center">
    <img src="`+ generalConfiguration.companyLogo +`" alt="`+ generalConfiguration.companyName +`" title="`+ generalConfiguration.companyName +`" width="100"/>
    </td>
    </tr>
    <tr class="tata"><td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td></tr>
    <tr class="tata">
    <td align="center">
    <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container580">
    <tbody class="nana ui-sortable"><div class="koso" style="margin:0 auto;"> <tr class="tata2">
    <td align="center" mc:edit="footer-text2" style="text-align:center; color: #a2a2a2; font-size: 11px; font-family: Lato, sans-serif; mso-line-height-rule: exactly; line-height: 25px;" class="sasa">
    <div style="line-height: 20px" class="edit_text sasa-w">
    <!-- ======= section text ======= -->
    <multiline spellcheck="false" style="display: inline-block; pointer-events: visible;">
    Copyright &copy; `+ generalConfiguration.companyName +`. All rights reserved. To ensure delivery to your inbox, add `+ generalConfiguration.supportEmail +` to your address book.<br />
    You are receiving this email because you have registered with `+ generalConfiguration.companyName +` and part of our growing audience network.
    </multiline>
    </div>
    </td>
    </tr></div>
    </tbody></table>
    </td>
    </tr>
    <tr class="tata"><td height="50" style="font-size: 50px; line-height: 50px;">&nbsp;</td></tr>
    </tbody></table>
    </body>
    </html>`;

    return (template);
  }

  module.exports = {
    htmlTemplateGenerator
  };
