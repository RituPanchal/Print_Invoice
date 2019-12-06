function salesInvoiceController(localStorageKey=undefined){
    let parsedObj = null;
    let salesKey = localStorageKey;

    let getStoredData = async function(){
        

        try{
            return await new Promise((resolve)=>{
                let storedJson = undefined;

                storedJson = localStorage.getItem(salesKey);
                // localStorage.clear();

                return resolve(storedJson);

            });
        }
        catch(ex){
            throw ex;
        }
    }

    let parseData = async function(storedJson){
        try {
            return await new Promise((resolve) => {

                parsedObj = JSON.parse(storedJson);
                
                console.log(parsedObj);

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let bindDataToUI = async function(){
        try{
            return await new Promise((resolve)=>{
                $("#lblCustomerName").html(parsedObj.customerModel.customerName);
                $("#lblCustomerType").html(parsedObj.customerModel.customerType);
                $("#lblCustomerState").html(parsedObj.customerModel.customerState);

                $("#lblProductName").html(parsedObj.productModel.productName);
                $("#lblProductPrice").html(parsedObj.productModel.productPrice);
                $("#lblProductQuantity").html(parsedObj.quantity);

                $("#lblTotalPrice").html(parsedObj.totalProductPrice);

                $("#lblDiscountRate").html(parsedObj.discountModel.discountRate);
                $("#lblDiscountPrice").html(parsedObj.discountModel.totalDiscountPrice);

                $("#lblGrossPrice").html(parsedObj.grossPrice);
                $("#lblCgst").html(parsedObj.gstModel.cgst);
                $("#lblSgst").html(parsedObj.gstModel.sgst);
                $("#lblIgst").html(parsedObj.gstModel.igst);
                $("#lblNetPrice").html(parsedObj.netPrice);

                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }
    
    //Public Method
    this.onLoadAsync = async function(){
        let storedJson = undefined;
        try{
            return await new Promise(async (resolve) =>{

            storedJson = await getStoredData();

            await parseData(storedJson);

            await bindDataToUI();

            return resolve(true);
            });
        }   
        catch(ex){
            console.log(ex.message);
            console.log(ex.stack);
        }
    }

}

function onLoadPageEvent(){
    let localStorageKey = undefined;
    try{

        localStorageKey = "localStoredData";

        salesInvoiceControllerObj = new salesInvoiceController(localStorageKey);
        salesInvoiceControllerObj
        .onLoadAsync()
        .then((resolve)=>console.log("Invoice generated"));
    }

    catch(ex){
        console.log(ex.message);
        console.log(ex.stack);
    }
}


onLoadPageEvent();