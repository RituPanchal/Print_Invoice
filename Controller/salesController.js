function salesController(salesBL = undefined){

    salesBLObj =  salesBL;
    //Private Method
    let fetchTheData = async function(){
        try{
            return await new Promise((resolve)=>{

            salesModelObj.customerModel.customerName = $("#customerNameId").val();
            salesModelObj.customerModel.customerType = $("#customerTypeId").val();
            salesModelObj.customerModel.customerState = $("#customerStateId").val();

            salesModelObj.productModel.productName = $("#productNameId").val();
            salesModelObj.productModel.productPrice = $("#productPriceId").val();

            salesModelObj.quantity = $("#productQtyId").val();

            console.log(salesModelObj.productModel.productPrice);

            return resolve(true);

            });
            
        }
        catch(ex){
            throw ex;
        }
    }

    let convertIntoJson = async function(salesCalculatedDataObj){
        try{
            return await new Promise((resolve)=>{

                stringData = JSON.stringify(salesModelObj);
                // console.log(salesModelObj);
                return resolve(stringData);
            });
        }
        catch(ex){
            throw ex;
        }
    }

    let storeDataInlocalStorage = async function(stringDataVar){
        try{
            return await new Promise((resolve)=>{

                localStorage.setItem("localStoredData",stringDataVar);
                
                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }

    let redirectPage = async function(){
        try{
            return await new Promise((resolve)=>{
                window.location.pathname = "/Users/Jenie/Desktop/iDeators/Invoice_Program/View/salesInvoice.html"
            });
        }
        catch(ex){
            throw ex;
        }
    }

    //Public Method
    this.onSubmit = async function(){
        try{
           
            return await new Promise(async (resolve) =>{
                
                await fetchTheData();

                await salesBLObj.salesCalculation();

                stringDataVar = await convertIntoJson();

                storedDataVar = await storeDataInlocalStorage(stringDataVar);

                await redirectPage();
            });

        }
        catch(ex){
            console.log(ex.message);
            console.log(ex.stack);
        }
    }//onSubmit

    this.onCancel = async function(){
        try{
            return await new Promise((resolve) =>{
                $("#customerNameId").val("");
                $("#customerTypeId").val("Select Customer Type");
                $("#customerStateId").val("");

                $("#productNameId").val("");
                $("#productPriceId").val("");

                $("#productQtyId").val("");

                $("#customerNameId").focus();

                return resolve(true);
            });
        }
        catch(ex){
            console.log(ex.message);
            console.log(ex.stack);
        }
    } //onCancel
} //salesController

function onSubmitClickEvent(){
    let salesControllerObj = null;
    let customerModelObj = null;
    let productModelObj = null;
    let discountModelObj = null;
    let gstModelObj = null;

    try{
        customerModelObj = new customerModel();
        productModelObj = new productModel();
        discountModelObj = new discountModel();
        gstModelObj = new gstModel();

        salesModelObj = new salesModel();


        salesModelObj.customerModel = customerModelObj;
        salesModelObj.productModel = productModelObj;
        salesModelObj.discountModel = discountModelObj;
        salesModelObj.gstModel = gstModelObj;

        salesBLObj = new salesBL(salesModelObj);
        
        salesControllerObj = new salesController(salesBLObj);

        salesControllerObj.onSubmit()
        .then((resolve) => console.log("Added Successfully"));
    }
    catch(ex){
        console.log(ex.message);
        console.log(ex.stack);
    } 
    
}

function onCancelClickEvent(){
    let salesControllerObj = null;
    try{
        salesControllerObj = new salesController();

        salesControllerObj
        .onCancel()
        .then((resolve) => console.log(resolve));
    }
    catch(ex){
        console.log(ex.message);
        console.log(ex.stack);
    }   
}