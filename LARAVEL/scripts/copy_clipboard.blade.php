<script>
    $("#copyToClipboardButton").click(function(){
        copyToClipBoard('{{$product->copy}}');
    });

    function copyToClipBoard(txt) {
        try {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(txt).select();
            var retVal = document.execCommand("copy");
            var tooltip = document.getElementById("copyTooltipContent");
            tooltip.innerHTML = "Produit copié";
            console.log('Copied Product: ' + retVal);
            console.log(txt);
            $temp.remove();
        } catch (err) {
            console.log('Could not copy Product: ' + err);
        }
    }
</script>
