document.getElementById("navItem1").addEventListener("click",function (){
    document.getElementById("home").style.display="block";
    document.getElementById("customerPage").style.display="none";
    document.getElementById("itemPage").style.display="none";
    document.getElementById("orderPage").style.display="none";
})

document.getElementById("navItem2").addEventListener("click",function (){
    document.getElementById("customerPage").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("itemPage").style.display="none";
    document.getElementById("orderPage").style.display="none";

})

document.getElementById("navItem3").addEventListener("click",function (){
    document.getElementById("itemPage").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("customerPage").style.display="none";
    document.getElementById("orderPage").style.display="none";
})

document.getElementById("navItem4").addEventListener("click",function (){
    document.getElementById("orderPage").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("customerPage").style.display="none";
    document.getElementById("itemPage").style.display="none";
})