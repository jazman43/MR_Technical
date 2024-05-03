document.addEventListener("DOMContentLoaded", function(){
    var button = document.getElementById("CartButton");
    var dropdown = document.querySelector(".Dropdown-Content");

    button.addEventListener("click", function(){
        dropdown.classList.toggle("show");
    });

    window.addEventListener("click", function(event) {
        if(!event.target.matches("#CartButton")){
            dropdown.classList.remove("show");
        }
    });
});