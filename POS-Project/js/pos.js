$( document ).ready(function() {
    var selecteditem = false;
    var clickbool = false;
    var clickedrow = undefined;
    var _OrderID = 1;
    var _Count =0;
    var _Ordercount = 0; 
    var _Grandtotal = 0.00;
    var clicked = undefined;
    var orderstorearray = new Array();

    $("#inputorderid").val("OD"+_OrderID);

    function LoadCustomers(customerID,customerName){              /*---------------------------------------------load customers function--------------------------------------------- */
        this._customerID = customerID;
        this._customerName = customerName;
        this.getCustomerID = function(){
            return this._customerID;
        }
        this.getCustomerName = function(){
            return this._customerName;
        }
    }
    var customer1 = new LoadCustomers("c001","Harsha");
    var customer2 = new LoadCustomers("c002","Malaka");
    var customer3 = new LoadCustomers("c003","Sahan");

    var customerArray = [customer1,customer2,customer3];

    for(i=0;i<customerArray.length;i++){
        console.log(customerArray[i].getCustomerID());
        var coption = '<option value="'+customerArray[i].getCustomerID()+'">'+customerArray[i].getCustomerID() + '</option>';
        $("#custid").append(coption);
    }
  
    $("#custid").change(function(eventData){
        console.log("select una");
        var id = $("#custid").find(":selected").text();
        for(i = 0;i<customerArray.length;i++){
            if(id ==customerArray[i].getCustomerID()){
                $("#inputcusname").val(customerArray[i].getCustomerName());
            }
        }
    });
/* -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    function LoadItemDetails(itemID,itemDesc,unitPrice,qtyOnHand){    /*---------------------------------------------load Items function--------------------------------------------- */
        this._itemID = itemID;
        this._itemDesc = itemDesc;
        this._unitPrice = unitPrice;
        this._qtyOnHand = qtyOnHand;

        this.getItemID = function(){
            return this._itemID;
        }
        this.getItemDesc = function(){
            return this._itemDesc;
        }
        this.getUnitPrice = function(){
            return this._unitPrice;
        }
        this.getQtyOnHand = function(){
            return this._qtyOnHand;
        }
        this.setQtyOnHand = function(qtyOnHand){
            this._qtyOnHand = qtyOnHand;
        }
    }

    var item1 = new LoadItemDetails("I001","soap",100.00,30);
    var item2 = new LoadItemDetails("I002","milk",150.00,20);
    var item3 = new LoadItemDetails("I003","butter",350.00,35);

    var itemArray = [item1,item2,item3];

    for(i=0;i<itemArray.length;i++){
        var itemOption = '<option value="' + itemArray[i].getItemID() + '">' + itemArray[i].getItemID() + '</option>';
        $('#inputitemcode').append(itemOption);
    }
    
    $("#inputitemcode").change(function(){
        selecteditem = true;
        console.log("select una");
        var IID = $("#inputitemcode").find(":selected").text();
        for(i=0;i<itemArray.length;i++){
            if(IID == itemArray[i].getItemID()){
                $("#inputitemdec").val(itemArray[i].getItemDesc());
                $("#inputunitprice").val(itemArray[i].getUnitPrice());
                $("#inputqtyonHand").val(itemArray[i].getQtyOnHand());
            }
        }
    });

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function CusOrderVal(gorderID,count,oDate,custID,custName,itemCode,itemDesc,qty,unitPrice,total){
        this._gOrderID = gorderID;
        this._count = count;
        this._oDate = oDate;
        this._custID = custID;
        this._custName = custName;
        this._itemcode = itemCode;
        this._itemDesc = itemDesc;
        this._unitPrice = unitPrice;
        this._qty = qty;
        this._total = total;

        this.getGorderID = function(){
            return this._gOrderID;
        }
        this.getCount = function(){
            return this._count;
        }
        this.getODate = function(){
            return this._oDate;
        }
        this.getCustID = function(){
            return this._custID;
        }
        this.getcustName = function(){
            return this._custName;
        }
        this.getItemCode = function(){
            return this._itemcode;
        }
        this.getItemDesc = function(){
            return this._itemDesc;
        }
        this.getUnitPrice = function(){
            return this._unitPrice;
        }
        this.getQty = function(){
            return this._qty;
        }
        this.gettotal = function(){
            return this._total;
        }


    } 

    $("#btnadd").click(function(){    /*------------------------------------------------------------btn Add function---------------------------------------------------------------- */
    
        console.log("Click una");
        var tableValues  = new Array();

        var itemcode = $("#inputitemcode").val();
        var itemdesc = $("#inputitemdec").val();
        var unitprice = $("#inputunitprice").val();
        var qty = $("#inputqty").val();
        var qtyresult = /^[0-9]+$/.test(qty);
        var itemcoderesult = /^[I]{1}[0-9]{3}$/.test(itemcode);
        var validity  = true;
        if(itemcoderesult == false){
            $("#inputitemcode").css("border","1px solid red");
            $("#inputitemcode").focus();
            $("#inputitemcode").select();
            validity = false;
        }else if(qtyresult == false){
            $("#inputqty").css("border","1px solid red")
            $("#inputqty").focus();
            $("#inputqty").select();
            validity = false;
        }
        else{
            $("#inputitemcode").css("border","");  
            $("#inputqty").css("border","");  
        }

        if(validity == true){
            _Count = $("#itemtable tbody tr").length + 1;
            console.log("Count variable value is:"+_Count)
            var unittotal = unitprice*qty;
            _Grandtotal = _Grandtotal+unittotal;
            var result = false;
            for(i = 0;i<_Count;i++){
                if(_Count>1 && itemcode == $($("#"+i+1).children("th")).text()){
                    var nowqty =parseInt($($("#"+i+1).children("td").get("1")).text());
                    $($("#"+i+1).children("td").get("1")).text(nowqty+qty);
                    var nowunittotal =parseInt($($("#"+i+1).children("td").get("1")).text());
                    $($("#"+i+1).children("td").get("1")).text(unittotal+nowunittotal);
                    console.log("athulata aava");
                }else{
                    result = true;
                    console.log("true una");
                }
                console.log("loop una,check kla");
            }

            if(result == true){
                selecteditem = false;
                var trow = '<tr class="'+itemcode+'" id="'+_Count+'"><th class="itemid"  scope="row">'+itemcode+ '</th>'+'<td id="itemdesc">'+ itemdesc +'</td>'+'<td id="qty">'+ qty +'</td>'+'<td id="unitprice">'+ unitprice +'</td>'+'<td id="total">'+ unittotal +'</td><td>'+ '<img  class = "imaeg' + _Count + '" src = "images/recyclebin.png"></td></tr>';
                for(i = 0; i < itemArray.length;i++){
                    if(itemcode == itemArray[i].getItemID()){
                        itemArray[i].setQtyOnHand(itemArray[i].getQtyOnHand() - qty);
                        console.log("quantity eka adu una...");
                    }
                }
                $("#itemfooter").css("display","none");
                $(trow).appendTo("#itemtable tbody");
                $("#inputitemcode").val("");
                $("#inputitemdec").val("");
                $("#inputunitprice").val("");
                $("#inputqtyonHand").val("");
                $("#inputqty").val("");

                console.log(_Grandtotal);
                $("#inputtotal").val(_Grandtotal+".00");

                $("img").mouseenter(function (eventData) {
                    element = eventData.toElement.className; 
                    $("." + element).attr("src", "images/recyclebin-hover.png");
                    var rowID = element.split("imaeg");
                    var itemID =$($("#"+rowID[1]).children("th")).text();
                    console.log($($("#" + rowID[1]).children("td").get(1)).text());

                    $("."+element).click(function(){
                        for(i = 0; i < itemArray.length;i++){
                            if(itemID == itemArray[i].getItemID()){
                                var delqty = parseInt($($("#" + rowID[1]).children("td").get(1)).text());
                                itemArray[i].setQtyOnHand(delqty + itemArray[i].getQtyOnHand());
                            }
                        }
                        $("#" + rowID[1]).fadeOut("slow",function(){
                            $("#" + rowID[1]).remove();
                            if(rowID[1]==1 && $("#2").length){
                                $(".footer").show();
                            }
                        }); 
                    });
                
                });

                $("tr").mouseenter(function(){
                    $("tr").css("cursor","pointer");
                })

                $("img").mouseleave(function (eventData) {

                    $("." + element).attr("src", "images/recyclebin.png");
                
                });

            }

        }

    });


    $("#btnaddnew").click(function(){
        $("#inputorderid").val("OD"+_OrderID);
        $("#inputorderdate").val("");
        $("#custid").val("");
        $("#inputcusname").val("");
        $("#inputitemcode").val("");
        $("#inputitemdec").val("");
        $("#inputunitprice").val("");
        $("#inputqtyonHand").val("");
        $("#inputqty").val(""); 
        $("#inputtotal").val("");
        clickbool = false;
        $("#itemtable > tbody").html("");
        $("#"+clickedrow).css("background-color","");

    });


    $("#btnplaceorder").click(function(){
        var gorderid = $("#inputorderid").val();
        console.log("order id is: "+gorderid);
        var orderdate = $("#inputorderdate").val();
        console.log(orderdate);
        var custid = $("#custid").val();
        var cusname = $("#inputcusname").val();
        var orderDateresult = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(orderdate);
        console.log(orderDateresult);
        var custidresult = (custid != null)?true:false;
        var valid = true;
        if(custidresult == false){
            $("#custid").css("border","1px solid red");
            $("#custid").focus();
            $("#custid").select();
            valid = false;
        }else if(orderDateresult == false){
            $("#inputorderdate").css("border","1px solid red");
            $("#inputorderdate").focus();
            $("#inputorderdate").select();
            valid = false;
        }else{
            $("#custid").css("border","");
            $("#inputorderdate").css("border","");
        }


        if(valid == true && clickbool == false && selecteditem == false){
             _OrderID = _OrderID + 1;
             var count = $("#itemtable tbody tr").length;
             console.log("Row Count : " + count);
             console.log( $("#itemtable tbody tr"));
            for(i=0;i<count ;i++){
                //(,,,,,,itemDesc,,unitPrice,total)
                var item = new CusOrderVal(gorderid, //gorderID
                    _Count,  //count
                    orderdate,  //oDate
                    custid, //custID
                    cusname, // custName
                    $("#"+(i+1)).children("th").text(), // itemCode
                    $($("#"+(i+1)).children("td").get(0)).text(), // itemDesc
                    $($("#"+(i+1)).children("td").get(1)).text(), // qty
                    $($("#"+(i+1)).children("td").get(2)).text(), // unitPrice
                    $($("#"+(i+1)).children("td").get(3)).text()); //total
                orderstorearray.push(item); 
                $("#"+i).remove();

            }
            
            var trow2 = '<tr id="'+gorderid+'"><th class="orderid"  scope="row">'+gorderid+ '</th>'+'<td id="custID">'+ custid +'</td>'+'<td id="custname">'+ cusname +'</td>'+'<td id="date">'+ orderdate +'</td>'+'<td id="total">'+ _Grandtotal +'.00</td></tr>';
            $("#orderfooter").css("display","none");
            $(trow2).appendTo("#ordertbl tbody");  

            $("#inputorderid").val("OD"+_OrderID);
            $("#inputorderdate").val("");
            $("#custid").val("");
            $("#inputcusname").val("");
            $("#inputitemcode").val("");
            $("#inputitemdec").val("");
            $("#inputunitprice").val("");
            $("#inputqtyonHand").val("");
            $("#inputqty").val(""); 
            $("#inputtotal").val("");
            for(var i=0;i<_Count;i++){
                $("#"+_Count).fadeOut(function(){
                    $("#"+_Count).remove();
                })

            }

            $("tr").mouseenter(function(){
                $("tr").css("cursor","pointer");
            })

            $("#ordertbl tbody tr").off("click");
            $("#ordertbl tbody tr").click(function(eventData){
                clickbool = true;
                
                if(clickedrow == undefined){
                    var orderrowid = $(this).attr("id");
                    $("#"+orderrowid).css("background-color","#bac4ef");
                    clickedrow = orderrowid;
                }else{
                    var orderrowid = $(this).attr("id");
                    $("#"+clickedrow).css("background-color","");
                    $("#"+orderrowid).css("background-color","#bac4ef")
                    $("#itemtable > tbody").html("");
                    clickedrow = orderrowid;

                }

                
                var firstrowindex = 0 ;
                $("#itemtable tbody tr").remove();
                for( var i=0 ; i < orderstorearray.length ; i++){
                    if( orderrowid == orderstorearray[i].getGorderID() ){
                        console.log(orderstorearray[i]);
                        trow3 = '<tr class="'+orderstorearray[i].getItemCode()+'" id="'+i+'"><th class="itemid"  scope="row">'+ orderstorearray[i].getItemCode() + '</th>'+'<td id="itemdesc">'+ orderstorearray[i].getItemDesc() +'</td>'+'<td id="qty">'+ orderstorearray[i].getQty() +'</td>'+'<td id="unitprice">'+ orderstorearray[i].getUnitPrice() +'</td>'+'<td id="total">'+ orderstorearray[i].gettotal() +'</td><td>'+ '<img  class = "imaeg' + i+1 + '" src = "images/recyclebin.png"></td></tr>';
                        $("#itemfooter").css("display","none");
                        $(trow3).appendTo("#itemtable tbody");
                        firstrowindex = i;


                    }
                }

                $("#inputorderid").val(orderstorearray[firstrowindex].getGorderID());
                $("#inputorderdate").val(orderstorearray[firstrowindex].getODate());
                $("#custid").val(orderstorearray[firstrowindex].getCustID());
                $("#inputcusname").val(orderstorearray[firstrowindex].getcustName());
                $("#inputitemcode").val("");
                $("#inputitemdec").val("");
                $("#inputunitprice").val("");
                $("#inputqtyonHand").val("");
                $("#inputqty").val(""); 


            });

        }
        








    });

});




/* $("#inputorderid").mouseenter(function(eventData) {
    console.log("im on");
    $("#inputorderid").attr("disabled",true);

});

$("#inputcusname").mouseenter(function(eventData) {

    $("#inputcusname").prop("disabled",true);

});

$("#inputitemdec").mouseenter(function(eventData) {

    $("#inputitemdec").prop("disabled",true);

});
$("#inputunitprice").mouseenter(function(eventData) {

    $("#inputunitprice").prop("disabled",true);

});
$("#inputqtyonHand").mouseenter(function(eventData) {

    $("#inputqtyonHand").prop("disabled",true);

});
/*----------------------------------------------------------------------*/

/* $("#inputorderid").mouseleave(function(eventData) {
    console.log("im out");
    $("#inputorderid").prop("disabled",false);

});

$("#inputcusname").mouseleave(function(eventData) {

    $("#inputcusname").prop("disabled",false);

});

$("#inputitemdec").mouseleave(function(eventData) {

    $("#inputitemdec").prop("disabled",false);

});
$("#inputunitprice").mouseleave(function(eventData) {

    $("#inputunitprice").prop("disabled",false);

});
$("#inputqtyonHand").mouseleave(function(eventData) {

    $("#inputqtyonHand").prop("disabled",false);

}); */


/* function CusOrderval(gorderID,itemCode,itemDesc,unitPrice,qtyOnHand){
        this._gOrderID = gorderID;
        this._itemcode = itemCode;
        this._itemDesc = itemDesc;
        this._unitPrice = unitPrice;
        this._qtyOnHand = qtyOnHand;

        this.getGorderID = function(){
            return this._gOrderID;
        }
        this.getItemCode = function(){
            return this._itemcode;
        }
        this.getItemDesc = function(){
            return this._itemDesc;
        }
        this.getUnitPrice = function(){
            return this._unitPrice;
        }
        this.getQtyOnHand = function(){
            return this._qtyOnHand;
        }
        this.setQtyOnHand = function(qtyOnHand){
            this._qtyOnHand = qtyOnHand;
        }


    } */