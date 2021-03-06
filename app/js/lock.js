(function () {

    document.addEventListener('DOMContentLoaded', function () {

        /**
         *
         * @param inputId
         * @returns {{insert: insert, clear: clear, del: del, PINisValid: PINisValid, random: random}}
         * @constructor
         */
        var Input = function (inputId) {

            const PIN = "512";

            return {
                /**
                 * Inserts new value into input
                 * @param newValue
                 */
                insert: function (newValue) {
                    let input = document.getElementById(inputId);

                    if (input.value.length < PIN.length) {
                        input.value += "" + newValue;
                    }
                },
                /**
                 * Clears input
                 */
                clear: function () {
                    document.getElementById(inputId).value = "";
                },
                /**
                 * Delete last number in the input
                 */
                del: function () {
                    document.getElementById(inputId).value = document.getElementById(inputId).value.slice(0, -1);
                },
                /**
                 * @return {boolean}
                 */
                PINisValid: function () {
                    return document.getElementById(inputId).value === PIN;
                },
                /**
                 *
                 * @param min
                 * @param max
                 * @returns {number}
                 */
                random: function (min, max) {
                    return Math.floor(min + Math.random() * (max - min + 1));
                }
            }
        };

        /**
         *
         * @param lockId
         * @param upperLockId
         * @param alertId
         * @param labelTextId
         * @returns {{shake: shake, open: open, isOpen: isOpen, close: close, hide: hide, showAlert: showAlert}}
         * @constructor
         */
        var Lock = function (lockId, upperLockId, alertId, labelTextId) {

            var timeout = 0;

            return {
                /**
                 * Shakes lock
                 */
                shake: function () {
                    let lock = document.getElementById(lockId);

                    lock.classList.add("animated");

                    setTimeout(function () {
                        lock.classList.toggle("animated");
                    }, 200);
                },
                /**
                 * Opens lock
                 */
                open: function () {
                    document.getElementById(upperLockId).classList.add("open");
                },
                /**
                 * Check if lock is open
                 * @returns {boolean}
                 */
                isOpen: function () {
                    return document.getElementById(upperLockId).classList.contains("open");
                },
                /**
                 * Closes lock
                 */
                close: function () {
                    document.getElementById(upperLockId).classList.toggle("open");
                },
                /**
                 * Hides lock numbers
                 */
                hide: function () {
                    let lock = document.getElementById(lockId);
                    lock.classList.add("hidden-lock");

                    setTimeout(function () {
                        lock.classList.add("hidden");
                    }, 1000);
                },
                /**
                 * Shows alert, hides label for 1s
                 */
                showAlert: function () {

                    let alert = document.getElementById(alertId);
                    let labelText = document.getElementById(labelTextId);

                    clearTimeout(timeout);

                    alert.classList.add("show");
                    labelText.classList.add("hideText");

                    timeout = setTimeout(function () {
                        alert.classList.remove("show");
                        labelText.classList.remove("hideText");
                    }, 1000);

                }
            }
        };

        var input = new Input("number_input");
        var lock = new Lock("lock_container", "upper_lock", "alert", "label_text");

        var checkPIN = function () {

            if (input.PINisValid()) {
                lock.open();
                lock.hide();
            }
            else {
                if (!lock.isOpen()) {
                    input.clear();
                    lock.shake();
                    lock.showAlert();

                    var keyArray = document.querySelectorAll(".number_key");
                    var keyArrayLength = keyArray.length;
                    var numbersDiv = document.getElementById("lock_numbers");

                    for (var i = 0; i < keyArrayLength; i++) {
                        numbersDiv.insertBefore(keyArray[i], keyArray[input.random(0, keyArrayLength - 1)])
                    }
                    var clearKey = document.getElementById("clear_input");
                    numbersDiv.insertBefore(clearKey, document.querySelectorAll(".number_key")[keyArrayLength - 1]);
                }
            }
        };


        document.querySelector("body").addEventListener("click", function (event) {

            var target = event.target;

            if (target.className === "number_key") {
                var value = parseInt(target.innerHTML, 10);
                input.insert(value);
            }

            if (target.id === "clear_input") {
                input.clear();
            }

            if (target.id === "delete_number") {
                input.del();
            }

            if (target.id === "enter_button") {
                checkPIN();
            }

        });
        document.querySelector("body").addEventListener("keydown", function (event) {

            if (event.keyCode === 8) {
                input.del();
            }

            if (event.keyCode === 46) {
                input.clear();
            }

            if (event.keyCode === 13) {
                checkPIN();
            }
        });

    });


}());