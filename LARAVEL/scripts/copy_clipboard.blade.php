{{-- Model --}}
function getCopyAttribute(){
    // $r = env('APP_URL')."/products/".$this->id;
    $n = "\n";
    $r = "";
    $r .= "Produit";
    $r .= $n.$this->title."";
    $r .= $n.$this->description;
    $r .= $n.$this->price;
    $r .= $n.$this->delivery;
    $r .= "";
    return $r;
}


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
