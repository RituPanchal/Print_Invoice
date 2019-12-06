function salesBL(salesModel){

    let salesModelObj = salesModel;

    //Private Method
    let calculateTotalProductPrice = async function(){
        try{
            return await new Promise((resolve)=>{
                salesModelObj.totalProductPrice = salesModelObj.productModel.productPrice*salesModelObj.quantity;
                // console.log(salesModelObj.totalProductPrice);
                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }

    let calculateDiscountPriceAsPerQuantity = async function(){
        try{
            return await new Promise((resolve)=>{

                customerType = salesModelObj.customerModel.customerType;

                if(customerType == "Diamond"){
                    salesModelObj.discountModel.discountRate = 20;
                }
                else if(customerType == "Platinum"){
                    salesModelObj.discountModel.discountRate = 15;
                }
                else if(customerType == "Gold"){
                    salesModelObj.discountModel.discountRate = 10;
                }
                else{
                    salesModelObj.discountModel.discountRate = 5;
                }
                salesModelObj.discountModel.discountPrice = salesModelObj.totalProductPrice * salesModelObj.discountModel.discountRate/100;

                // console.log(salesModelObj.discountModel.discountPrice);
                return resolve(true);

            });
        }
        catch(ex){
            throw ex;
        }
    }    

    let calculateGrandTotal = async function(){
        try{
            return await new Promise((resolve)=>{
                salesModelObj.grossPrice = salesModelObj.totalProductPrice - salesModelObj.discountModel.discountPrice;

                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }


    let calculateGST = async function(){
        let customerState = undefined;
        try{
            return await new Promise((resolve)=>{
                customerState = salesModelObj.customerModel.customerState;
                salesModelObj.gstModel.cgst = 0;
                salesModelObj.gstModel.sgst = 0;
                salesModelObj.gstModel.igst = 0;

                gst = salesModelObj.grossPrice * 18/100;
                // gst = salesModelObj.grandTotal * 18 / 100;

                if (customerState === "Maharashtra") {
                    // CGST & SGST
                    salesModelObj.gstModel.cgst = gst / 2;
                    salesModelObj.gstModel.sgst = gst / 2;
                }
                else {
                    // IGST
                    salesModelObj.gstModel.igst = gst;
                }

                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }

    let calculateNetPrice = async function(){
        try{
            return await new Promise((resolve)=>{
                salesModelObj.netPrice =
                    (salesModelObj.grossPrice)+
                    (salesModelObj.gstModel.cgst + salesModelObj.gstModel.sgst + salesModelObj.gstModel.igst);

                return resolve(true);
            });
        }
        catch(ex){
            throw ex;
        }
    }

    //Public Method
    this.salesCalculation = async function(){
        try{
            return await new Promise(async (resolve) =>{

                await calculateTotalProductPrice();

                await calculateDiscountPriceAsPerQuantity();

                await calculateGrandTotal();

                await calculateGST();

                await calculateNetPrice();

                return resolve(salesModelObj);
            });
        }
        catch(ex){
            throw ex;
        }
    }
}

