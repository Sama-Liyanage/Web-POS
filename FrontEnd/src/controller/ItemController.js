/*Item*/

generateItemId();

var regExItemId = /^(I-)[0-9]{3}$/;
var regExItemName = /^([A-z0-9/,\s]{3,})$/;
var regExPrice = /^([0-9.]{1,})$/;
var regExQty = /^([0-9]{1,})$/;


/*Focusing Item*/
$("#txtItemId").keyup(function (e) {
    enableAddItem();
    if (regExItemId.test($("#txtItemId").val())) {
        $("#txtItemId").css('border-color', 'Green');
        $("#errorItemId").css('display', 'none');
        if (e.key == "Enter") {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemId").css('border-color', 'Red');
        $("#errorItemId").css('display', 'block');
    }

});

$("#txtItemName").keyup(function (e) {
    enableAddItem();
    if (regExItemName.test($("#txtItemName").val())) {
        $("#txtItemName").css('border-color', 'Green');
        $("#errorItem").css('display', 'none');
        if (e.key == "Enter") {
            $("#txtItemPrice").focus();
        }
    } else {
        $("#txtItemName").css('border-color', 'Red');
        $("#errorItem").css('display', 'block');
    }
});

$("#txtItemPrice").keyup(function (e) {
    enableAddItem();
    if (regExPrice.test($("#txtItemPrice").val())) {
        $("#txtItemPrice").css('border-color', 'Green');
        $("#errorPrice").css('display', 'none');
        if (e.key == "Enter") {
            $("#txtItemQty").focus();
        }
    } else {
        $("#txtItemPrice").css('border-color', 'Red');
        $("#errorPrice").css('display', 'block');
    }

});

$("#txtItemQty").keyup(function (e) {
    enableAddItem();
    if (regExQty.test($("#txtItemQty").val())) {
        $("#txtItemQty").css('border-color', 'Green');
        $("#errorQty").css('display', 'none');

        if ($('#AddItem').is(':enabled') && e.key == "Enter") {
            addItem();
            $("#txtItemId").focus();
        }
    } else {
        $("#txtItemQty").css('border-color', 'Red');
        $("#errorQty").css('display', 'block');
    }
});


function generateItemId(){
    var tempId;
    if (items.length!=0){

        var id =items[items.length-1].getId();
        var temp=id.split("-")[1];
        temp++;
        tempId = (temp<10)? "I-00"+ temp : (temp<100) ? "I-0"+temp :"I-"+temp;

    }else{
        tempId="I-001";
    }
    $("#txtItemId").val(tempId);
}


function enableAddItem() {
    if (itemNotExist() && regExItemId.test($("#txtItemId").val()) && regExItemName.test($("#txtItemName").val()) && regExPrice.test($("#txtItemPrice").val()) && regExQty.test($("#txtItemQty").val())) {
        $("#AddItem").attr('disabled', false);
    } else {
        $("#AddItem").attr('disabled', true);
    }
}

function addItem() {
    let saveItem = confirm("Do you want to save this item?");
    if (saveItem.valueOf()) {
        let itemName = $("#txtItemName").val();
        let itemId = $("#txtItemId").val();
        let itemPrice = $("#txtItemPrice").val();
        let itemQty = $("#txtItemQty").val();

        items.push(new ItemDTO(itemId, itemName, itemPrice, itemQty));


        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function updateItem() {
    let updateItem = confirm("Do you want to update this item?");
    if (updateItem.valueOf()) {
        items.find(function (e) {
            if (e.getId() == $("#txtItemId").val()) {
                e.setName($("#txtItemName").val());
                e.setPrice($("#txtItemPrice").val());
                e.setQty($("#txtItemQty").val());
            }
        });

        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function deleteItem() {
    let deleteItem = confirm("Do you want to delete this item?");
    if (deleteItem.valueOf()) {
        items.find(function (e) {
            if (e.getId() == $("#txtItemId").val()) {
                items.splice(items.indexOf(e), 1);
            }
        });

        loadAllItems();
        clearItem();
        generateItemId();
    }

}

function loadAllItems(){
    $("#itemTable>tr").remove();

    for (let item of items) {

        let row = `<tr><td>${item.getId()}</td><td>${item.getName()}</td><td>${item.getPrice()}</td><td>${item.getQty()}</td></tr>`;
        $("#itemTable").append(row);

        $("#itemTable>tr").off('click');
        $("#itemTable>tr").off('dblclick');

        $("#itemTable>tr").click(function () {
            let id = $(this).children(':first-child').html();
            let itemName = $(this).children(':nth-child(2)').html();
            let price = $(this).children(':nth-child(3)').html();
            let qty = $(this).children(':nth-child(4)').html();

            $("#txtItemId").val(id);
            $("#txtItemName").val(itemName);
            $("#txtItemPrice").val(price);
            $("#txtItemQty").val(qty);
        });

        $("#itemTable>tr").dblclick(function () {
            var itemRowId =$(this).children(':first-child').html();
            items.find(function (e){
                if(e.getId()==itemRowId){
                    items.splice(items.indexOf(e),1);
                }
            });

            loadAllItems();
            clearItem();
        });
    }



}
////////////////
function clearItem() {
    $("#txtItemId").val("");
    $("#txtItemId").css('border-color', 'Silver');
    $("#txtItemName").val("");
    $("#txtItemName").css('border-color', 'Silver');
    $("#txtItemPrice").val("");
    $("#txtItemPrice").css('border-color', 'Silver');
    $("#txtItemQty").val("");
    $("#txtItemQty").css('border-color', 'Silver');
    enableAddItem();
}

function itemNotExist(){
    for (let item of items) {
        if (item.getId()==$("#txtItemId").val()){
            return false;
        }
    }
    return true;
}


$("#AddItem").click(function () {
    addItem();
});

$("#UpdateItem").click(function () {
    updateItem();
});

$("#DeleteItem").click(function () {
    deleteItem();
});

$("#cancelItem").click(function () {
    clearItem();
    generateItemId();
});

