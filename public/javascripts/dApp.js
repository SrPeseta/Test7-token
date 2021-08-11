const tokenABI = [{
  "constant": true,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "name": "balance",
      "type": "uint256"
    }
  ],
  "payable": false,
  "type": "function"
},
{
	"constant": true,
	"inputs": [],
	"name": "decimals",
	"outputs": [
		{
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		}
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}]

let web3 = new Web3()

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

async function walletEnabled(){
    if (typeof window.ethereum !== 'undefined') {
      // Instancia para abrir Metamask
      web3 = new Web3(window.ethereum);
      try {
        // Abre Metamask para requerir acceso
        await window.ethereum.enable();

        return true
      } catch (e) {
        // Fallo o denegacion de acceso
        return false
      }

    }

    return false;
}



async function connectWallet(){
	if ((await walletEnabled()) == false) {
  		alert("Instala Metamask para utilizar esta aplicación");
	}
	
	var accountBalances = [];

	try {
      const accs = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      
      const tokenInst = new web3.eth.Contract(tokenABI,'0x216ba6E5D9429Cc4f14B86Ab2C30d89Cc80F9C6c')
      var numDecimals = await tokenInst.methods.decimals().call();
      
      for(i=0;i<accs.length;i++){
        const balance = await web3.eth.getBalance(accs[i]);
        
        var tstBalance = await tokenInst.methods.balanceOf(accs[i]).call();
        accountBalances.push({account:accs[i],BNB:web3.utils.fromWei(balance, 'ether'),TST7:parseFloat(tstBalance/parseFloat(Math.pow(10,numDecimals)))})
      }

    	if(accountBalances && accountBalances.length > 0){
    		let table = document.querySelector("table");
		    table.style.visibility = 'visible';
		    document.getElementById("resultadoNegativo").style.visibility = 'hidden';
		    let data = Object.keys(accountBalances[0]);
		    generateTableHead(table, data);
		    generateTable(table, accountBalances);
    	}else{
    		document.getElementById("resultadoNegativo").style.visibility = 'visible';
    		document.getElementById("resultadoNegativo").innerHTML = "No hay cuentas o ha ocurrido un error";
    		document.querySelector("table").style.visibility = 'hidden';
    	}
	} catch (error) {
      console.error(error)
    }
}
