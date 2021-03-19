<script>
    window.livewire.on('notify',
    param => {
        // toastr[param['type']](param['message']);
        // alert(param['message'])
        $(".notificationText").html(param['message']);
        $("#notification").removeClass('notificationClosed');
        $("#notification").addClass('notificationOpen');
        if(param['action'] != null){
            $(".notificationAction").html(param['action']);
            $(".notificationAction").attr('href', param['url']);
            $(".notificationAction").removeClass('hidden');
            $(".notificationAction").addClass('flex');
        }

        var time = 10;
        if(param['time'] != null){
            time = param['time'];
        }

        setTimeout(function(){
            $("#notification").removeClass('notificationOpen');
            $("#notification").addClass('notificationClosed');

            if(param['action'] != null){
            $(".notificationAction").html('');
            $(".notificationAction").attr('href', '#');
            $(".notificationAction").removeClass('flex');
            $(".notificationAction").addClass('hidden');
        }
        }, time*1000);
    });
    window.livewire.on('notify-toast',
    param => {
        $(".notificationText").html(param['message']);
        $("#notification").removeClass('toastClosed');
        $("#notification").addClass('toastOpen');

        setTimeout(function(){
            $("#notification").removeClass('toastOpen');
            $("#notification").addClass('toastClosed');
        }, 5000);
    });
</script>
