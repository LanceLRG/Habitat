import React, {useState} from 'react';

function Timer() {

    /**
     * Self-adjusting interval to account for drifting
     * 
     * @param {function} workFunc  Callback containing the work to be done
     *                             for each interval
     * @param {int}      interval  Interval speed (in milliseconds) - This 
     * @param {function} errorFunc (Optional) Callback to run if the drift
     *                             exceeds interval
     */
    function AdjustingInterval(workFunc, interval, errorFunc) {
        let that = this;
        let expected, timeout;
        this.interval = interval;

        this.start = function () {
            expected = Date.now() + this.interval;
            timeout = setTimeout(step, this.interval);
        }

        this.stop = function () {
            clearTimeout(timeout);
        }

        function step() {
            let drift = Date.now() - expected;
            if (drift > that.interval) {
                // You could have some default stuff here too...
                if (errorFunc) errorFunc();
            }
            workFunc();
            expected += that.interval;
            timeout = setTimeout(step, Math.max(0, that.interval - drift));
        }
    }

    // For testing purposes, we'll just increment
    // this and send it out to the console.
    let justSomeNumber = 0;

    // Define the work to be done
    let doWork = function () {
        console.log(++justSomeNumber);
    };

    // Define what to do if something goes wrong
    let doError = function () {
        console.warn('The drift exceeded the interval.');
    };

    // (The third argument is optional)
    let ticker = new AdjustingInterval(doWork, 1000, doError);

    return (
        <>
            <button onClick={() => ticker.start()}>start</button>
            <button onClick={() => ticker.stop()}>start</button>
        </>
    )
}

export default Timer;