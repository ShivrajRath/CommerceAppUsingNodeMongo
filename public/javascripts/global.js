// Productlist data array for filling in info box
var productListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateTable();

    $('#btnAddProduct').on('click', addProduct);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/products/productlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){

            productListData = data;

            tableContent += '<tr>';
            tableContent += '<td>' + this.productName + '</td>';
            tableContent += '<td>' + this.productDescription + '</td>';
            tableContent += '<td>' + this.rating + '</td>';
            tableContent += '<td>' + this.stockstatus + '</td>';
            tableContent += '<td>' + 'Rs.' + this.price + '</td>';
            tableContent += '</tr>';
        });

        console.log(tableContent);

        // Inject the whole content string into our existing HTML table
        $('#productList table tbody').html(tableContent);
    });
};


// Adds a product to database
function addProduct(event){
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount){
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }else{
        // If it is, compile all product info into one object
        var newProduct = {
            'productName': $('#addProduct fieldset input#inputProductName').val(),
            'productDescription': $('#addProduct fieldset input#inputProductDescription').val(),
            'rating': $('#addProduct fieldset input#inputProductRating').val(),
            'stockstatus': $('#addProduct fieldset input#inputProductInStock').val(),
            'price': $('#addProduct fieldset input#inputProductPrice').val()        
        }

        // Use AJAX to post the object to our addproduct service
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: '/products/addproduct',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
}
