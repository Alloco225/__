// Mark as terminated 
    var mkC = document.getElementsByClassName("markCompletedBtn");
    var i;

    for (i = 0; i < mkC.length; i++) {
        mkC[i].addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            // ajax
            this.innerHTML = "...";
            var btn = this;

            $.ajax({
                type: "POST",
                url: "{{ route('ajax.sos.markCompleted') }}",
                data: {
                    alert_id: id
                },
                dataType: "json",
                success: function (response) {
                    console.log("Ressponse succes");
                    btn.innerHTML = "Terminé";
                    // this.classList.remove("markCompletedBtn");
                },
                error: function (response) {
                    console.log("Error :");
                    console.log(response);

                },
            });
        });
    }
    var mkC = document.getElementsByClassName("markCancelledBtn");
    var i;

    for (i = 0; i < mkC.length; i++) {
        mkC[i].addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            // ajax
            this.innerHTML = "...";
            var btn = this;

            $.ajax({
                type: "POST",
                url: "{{ route('ajax.sos.markCancelled') }}",
                data: {
                    alert_id: id
                },
                dataType: "json",
                success: function (response) {
                    console.log("Ressponse succes");
                    btn.innerHTML = "Annulé";
                },
                error: function (response) {
                    console.log("Error :");
                    console.log(response);
                },
            });
        });
    }
