var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      callback((xhr.status === 200)?null:xhr.status, xhr.response);
    };
    xhr.send();
};

var BTCtoUSD = 0;
var ETHtoUSD = 0;
function getUSDvalue() {

    //BTC
    element = document.querySelector("#exch_btc_usd_price_index");
    element_content = element.innerHTML;
    element_content = element_content.replace(",", "");
    element_content = parseFloat(element_content);
    BTCtoUSD = element_content;
    
    //ETH
    element =document.querySelector("#exch_eth_usd_price_index");
    element_content = element.innerHTML;
    element_content = element_content.replace(",", "");
    element_content = parseFloat(element_content);
    ETHtoUSD = element_content;
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }


function updatePNL(){

    getUSDvalue();
    //BTC

    //PNL
    element = document.querySelector("#accsum > tr:nth-child(1) > td:nth-child(6) > deribit-currency > span > span.ng-binding");
    element_content = element.innerHTML;
    element_content = element_content.split("(")[0];
    USD_value = Math.round(BTCtoUSD * parseFloat(element_content));
    element.innerHTML = element_content + " (<B>$</B> " +USD_value+")";
    //Equity
    element = document.querySelector("#acs_equity_header > span > deribit-currency > span > span");
    element_content = element.innerHTML;
    element_content = element_content.split("(")[0];
    USD_value = Math.round(BTCtoUSD * parseFloat(element_content));
    element.innerHTML = element_content + " (<B>$</B> " +USD_value+")";

    //ETH

    //PNL
    element =document.querySelector("#accsum > tr:nth-child(2) > td:nth-child(6) > deribit-currency > span > span.ng-binding");
    element_content = element.innerHTML;
    element_content = element_content.split("(")[0];
    USD_value = Math.round(ETHtoUSD * parseFloat(element_content));
    element.innerHTML = element_content + " (<B>$</B> " +USD_value+")";
    
    //Equity
    
    element = getElementByXpath("/html/body/div[3]/div[2]/div/div[1]/div/div/table/tbody/tr[2]/td[2]/span/deribit-currency/span/span")
    element_content = element.innerHTML;
    element_content = element_content.split("(")[0];
    USD_value = Math.round(ETHtoUSD * parseFloat(element_content));
    element.innerHTML = element_content + " (<B>$</B> " +USD_value+")";
}

window.addEventListener("load", function(){
    var t=setInterval(updatePNL,5000);
});