document.addEventListener("DOMContentLoaded", function() {
            const buttons = document.querySelectorAll(".button");

            buttons.forEach(function(button) {
                button.addEventListener("click", function(event) {
                    event.preventDefault();

                    let id;
                    let val;
                    setTimeout(function(){
                        switch (button.value) {
                            case 'door_close':
                                id = "290";
                                val = 0;
                                break;
                            case 'door_open':
                                id = "290";
                                val = 1;
                                break;
                            case 'ac_on':
                                id = "ac";
                                val = 1;
                                break;
                            case 'ac_off':
                                id = "ac";
                                val = 0;
                                break;
                            case 'stop':
                                id = "02F"
                                val = 0;
                                break;
                            case 'key_start':
                                id = "1B8";
                                val = 1;
                                break;
                            case 'key_stop':
                                id = "1B8";
                                val = 0;
                                break;
                            default:
                                return; 
                        }

                        var apiEndpoint = "https://api.thingspeak.com/update";
                        var apiKey = "I2PUZV4AQ7BJ9I8R";

                        var data = {
                            api_key: apiKey,
                            field1: id,
                            field2: val,
                            field3: 0,
                            field4: 0,
                            field5: 0,
                            field6: 22,
                            field7: 77,
                            field8: 'India'
                        };

                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', apiEndpoint, true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                        xhr.onload = function () {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                console.log('Data sent successfully:', id, val);
                            } 
                            else {
                                console.error('Unable to connect to the server:', xhr.statusText);
                            }
                        };

                        xhr.onerror = function () {
                            console.error('Network error occurred.');
                        };

                        xhr.send(encodeFormData(data));
                    },16000);
                    
                });
            });

            function encodeFormData(data) {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
            }
        });