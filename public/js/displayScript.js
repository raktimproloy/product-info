const itemDetails = document.getElementById("itemDetails");
const showMore = document.getElementById("showMore");

if(itemDetails.innerText.length > 90){
    showMore.style.display = "inline";
}
