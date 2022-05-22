generateCustomerId();

var regExCustomerId = /^(C-)[0-9]{3}$/;
var regExCustomerName = /^([A-z\s. ]{3,80})$/;
var regExAddress = /^([A-z0-9/,\s]{3,})$/;
var regExTel = /^([0][0-9]{9}|[0][0-9]{2}[-\s][0-9]{7})$/;


/*Focusing and Validating Customer*/
$("#txtCusID").keyup(function (e) {
    enableAddCustomer();
    if (regExCustomerId.test($("#txtCusID").val())) {
        $("#txtCusID").css('border-color', '2px solid #079992');
        $("#errorCustomerId").css('display', 'none');
        if (e.key == "Enter") {
            $("#txtCusName").focus();
        }

    } else {
        $("#txtCusID").css('border-color', '2px solid #eb2f06');
        $("#errorCustomerId").css('display', 'block');
    }


});


$("#txtCusName").keyup(function (e) {
    enableAddCustomer();
    if (regExCustomerName.test($("#txtCusName").val())) {
        $("#txtCusName").css('border-color', '2px solid #079992');
        $("#errorCustomerName").css('display', 'none');
        if (e.key == "Enter") {
            $("#txtCusAddress").focus();
        }

    } else {
        $("#txtCusName").css('border-color', '2px solid #eb2f06');
        $("#errorCustomerName").css('display', 'block');
    }


});


$("#txtCusAddress").keyup(function (e) {
    enableAddCustomer();
    if (regExAddress.test($("#txtCusAddress").val())) {
        $("#txtCusAddress").css('border-color', '2px solid #079992');
        $("#errorCustomerAddress").css('display', 'none');
        if (e.key == "Enter") {
            $("#tel").focus();
        }
    } else {
        $("#txtCusAddress").css('border-color', '2px solid #eb2f06');
        $("#errorCustomerAddress").css('display', 'block');
    }

});

$("#txtCusTele").keyup(function (e) {
    enableAddCustomer();
    if (regExTel.test($("#txtCusTele").val())) {
        $("#txtCusTele").css('border-color', '2px solid #079992');
        $("#errorCustomerTel").css('display', 'none');

        if ($('#AddCustomer').is(':enabled') && e.key == "Enter") {
            addCustomer();
            $("#txtCusID").focus();
        }
    } else {
        $("#txtCusTele").css('border-color', '2px solid #eb2f06');
        $("#errorCustomerTel").css('display', 'block');
    }

});


function generateCustomerId() {
    var tempId;
    if (customers.length != 0) {

        var id = customers[customers.length - 1].getId();
        var temp = id.split("-")[1];
        temp++;
        tempId = (temp < 10) ? "C-00" + temp : (temp < 100) ? "C-0" + temp : "C-" + temp;

    } else {
        tempId = "C-001";
    }
    $("#txtCusID").val(tempId);
}


/////////////////////////
function enableAddCustomer() {
    if (customerNotExist() && regExCustomerId.test($("#txtCusID").val()) && regExCustomerName.test($("#txtCusName").val()) && regExAddress.test($("#txtCusAddress").val()) && regExTel.test($("#txtCusTele").val())) {
        $("#AddCustomer").attr('disabled', false);
    } else {
        $("#AddCustomer").attr('disabled', true);
    }
}

function addCustomer() {
    let saveCustomer = confirm("Do you want to save this customer?");
    if (saveCustomer.valueOf()) {
        let cusName = $("#txtCusName").val();
        let cusId = $("#txtCusID").val();
        let cusAddress = $("#txtCusAddress").val();
        let cusTel = $("#txtCusTele").val();


        customers.push(new CustomerDTO(cusId, cusName, cusAddress, cusTel));

        loadAllCustomers();

        clearCustomer();
        generateCustomerId();
        loadAllCustomersAndItems();
    }


}

function updateCustomer() {
    let updateCustomer = confirm("Do you want to update this customer?");
    if (updateCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#txtCusID").val()) {
                e.setName($("#txtCusName").val());
                e.setAddress($("#txtCusAddress").val());
                e.setTel($("#txtCusTele").val());
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
    }
}

function deleteCustomer() {
    let deleteCustomer = confirm("Do you want to delete this customer?");
    if (deleteCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#txtCusID").val()) {
                customers.splice(customers.indexOf(e), 1);
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
    }
}

function loadAllCustomers() {
    $("#customerTable>tr").remove();

    for (let customer of customers) {
        let row = `<tr><td>${customer.getId()}</td><td>${customer.getName()}</td><td>${customer.getAddress()}</td><td>${customer.getTel()}</td></tr>`;
        $("#customerTable").append(row)
    }

    /*To unbind click events added to rows*/
    $("#customerTable>tr").off('click');
    $("#customerTable>tr").off('dblclick');

    $("#customerTable>tr").click(function () {
        let id = $(this).children(':first-child').html();
        let name = $(this).children(':nth-child(2)').html();
        let address = $(this).children(':nth-child(3)').html();
        let tel = $(this).children(':nth-child(4)').html();

        $("#txtCusID").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusTele").val(tel);
    });

    $("#customerTable>tr").dblclick(function () {
        let deleteCustomer = confirm("Do you want to delete this customer?");
        if (deleteCustomer.valueOf()) {
            let rowCusId = $(this).children(':first-child').html();
            customers.find(function (e) {
                if (e.getId() == rowCusId) {

                    customers.splice(customers.indexOf(e), 1);
                }
            });

            loadAllCustomers();
            clearCustomer();
        }
    });
}

function clearCustomer() {
    $("#txtCusID").val("");
    $("#txtCusID").css('border-color', 'Silver');
    $("#txtCusName").val("");
    $("#txtCusName").css('border-color', 'Silver');
    $("#txtCusAddress").val("");
    $("#txtCusAddress").css('border-color', 'Silver');
    $("#txtCusTele").val("");
    $("#txtCusTele").css('border-color', 'Silver');
    enableAddCustomer();
}

function findCustomer() {
    customers.find(function (e) {
        if (e.getId() == $("#txtSearchCusID").val()) {
            $("#txtCusID").val(e.getId());
            $("#txtCusName").val(e.getName());
            $("#txtCusAddress").val(e.getAddress());
            $("#txtCusTele").val(e.getTel());
        }
    });
}

function customerNotExist(){
    for (let customer of customers) {
        if (customer.getId()==$("#txtCusID").val()){
            return false;
        }
    }
    return true;
}

$("#AddCustomer").click(function () {
    addCustomer();
});

$("#UpdateCustomer").click(function () {
    updateCustomer();
});

$("#DeleteCustomer").click(function () {
    deleteCustomer();
});

$("#searchCustomer").click(function () {
    findCustomer();

});

$("#cancelCustomer").click(function () {
    clearCustomer();
    generateCustomerId();
});
