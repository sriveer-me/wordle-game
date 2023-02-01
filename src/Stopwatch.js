class Stopwatch {
    /**
     * @constructor
     * @param options
     * @param {callback} - callback function executes every 1 second..
     */
    constructor(callback = (formattedTimeString) => {}) 
    {
        //eslint-disable-next-line
        this.m_timer;

        this.m_started = false;
        this.m_milliSecondCounter = 0;
        this.m_seconds = 0;
        this.m_minutes = 0;
        this.callback = callback;
    }

    isTicking() {
        return this.m_started;
    }

    start() {
        if(this.m_started === false)
        {
            this.m_timer = setInterval(this.incrementElapsedTime.bind(this), 50);
            this.m_started = true;
        }
    }

    stop() {
        clearInterval(this.m_timer);
        this.m_started = false;
    }


    reset() {
        this.stop();
        this.m_milliSecondCounter = 0;
        this.m_seconds = 0;
        this.m_minutes = 0;
    }


    restart() {
        this.reset();
        this.start();
    }

    /**
     * @private
     */
    incrementElapsedTime() {
        this.m_milliSecondCounter += 50;

        if (this.m_milliSecondCounter >= 1000) {
            this.m_milliSecondCounter = 0;

            this.m_seconds += 1;

            //if 60 seconds have elapsed, increment the minute needle
            if(this.m_seconds >= 60){
                this.m_minutes += 1;
                this.m_seconds = this.m_seconds - 60;
            }

            //callback with the duration in qustion
            this.callback(
                `${String(this.m_minutes).padStart(2,'0')}:${String(this.m_seconds).padStart(2,'0')}`
            );
        }
    }
}

const stopwatch = new Stopwatch();
export default stopwatch;