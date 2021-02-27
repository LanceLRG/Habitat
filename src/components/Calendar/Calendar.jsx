import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';

function Calendar() {

    const dispatch = useDispatch();
    const store = useSelector(store => store)
    const jan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const feb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,]
    const mar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const apr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const may = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const jun = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const jul = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const aug = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const sep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const oct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const nov = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const dec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

    let onDay = [];
    let d = new Date();
    const [year, setYear] = useState(d.getFullYear())

    const isLeapYear = (year) => {
            if(year % 400 === 0) {
                (console.log(`it is a leap year!`))
                return true;
            } else if (year % 100 === 0) {
                (console.log(`it is NOT a leap year!`))
                return false;
            } else if (year % 4 === 0) {
                (console.log(`it is a leap year!`))
                return true;
            } else {
                (console.log(`it is NOT a leap year!`))
                return false;
            }
        }

    const renderDay = (month, monthName) => month.map((day) => <div className={`${monthName} ${day} ${year}`}>{day}</div>)

    const checkCompletion = () => {
        if (store.primaryHistory[0]) {
            for (let primary of store.primaryHistory) {
                if (primary.complete) {
                    console.log(moment(primary.date).format('l'));
                    onDay.push(moment(primary.date).format('l'));
                }
            }
            console.log(onDay);
        }
    }
    useEffect(() => {
        dispatch({ type: 'FETCH_PRIMARY' });
    }, [])

    useEffect(() => {
        checkCompletion();
    }, [store.primaryHistory])

    const everyDayTable = (<table>
        <thead>
            <tr>
                <th>jan</th>
                <th>feb</th>
                <th>mar</th>
                <th>apr</th>
                <th>may</th>
                <th>jun</th>
                <th>jul</th>
                <th>aug</th>
                <th>sep</th>
                <th>oct</th>
                <th>nov</th>
                <th>dec</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="jan 1">1</td>
                <td id="feb 1">1</td>
                <td id="mar 1">1</td>
                <td id="apr 1">1</td>
                <td id="may 1">1</td>
                <td id="jun 1">1</td>
                <td id="jul 1">1</td>
                <td id="aug 1">1</td>
                <td id="sep 1">1</td>
                <td id="oct 1">1</td>
                <td id="nov 1">1</td>
                <td id="dec 1">1</td>
            </tr>
            <tr>
                <td id="jan 2">2</td>
                <td id="feb 2">2</td>
                <td id="mar 2">2</td>
                <td id="apr 2">2</td>
                <td id="may 2">2</td>
                <td id="jun 2">2</td>
                <td id="jul 2">2</td>
                <td id="aug 2">2</td>
                <td id="sep 2">2</td>
                <td id="oct 2">2</td>
                <td id="nov 2">2</td>
                <td id="dec 2">2</td>
            </tr>
            <tr>
                <td id="jan 3">3</td>
                <td id="feb 3">3</td>
                <td id="mar 3">3</td>
                <td id="apr 3">3</td>
                <td id="may 3">3</td>
                <td id="jun 3">3</td>
                <td id="jul 3">3</td>
                <td id="aug 3">3</td>
                <td id="sep 3">3</td>
                <td id="oct 3">3</td>
                <td id="nov 3">3</td>
                <td id="dec 3">3</td>
            </tr>
            <tr>
                <td id="jan 3">3</td>
                <td id="feb 3">3</td>
                <td id="mar 3">3</td>
                <td id="apr 3">3</td>
                <td id="may 3">3</td>
                <td id="jun 3">3</td>
                <td id="jul 3">3</td>
                <td id="aug 3">3</td>
                <td id="sep 3">3</td>
                <td id="oct 3">3</td>
                <td id="nov 3">3</td>
                <td id="dec 3">3</td>
            </tr>
            <tr>
                <td id="jan 4">4</td>
                <td id="feb 4">4</td>
                <td id="mar 4">4</td>
                <td id="apr 4">4</td>
                <td id="may 4">4</td>
                <td id="jun 4">4</td>
                <td id="jul 4">4</td>
                <td id="aug 4">4</td>
                <td id="sep 4">4</td>
                <td id="oct 4">4</td>
                <td id="nov 4">4</td>
                <td id="dec 4">4</td>
            </tr>
            <tr>
                <td id="jan 5">5</td>
                <td id="feb 5">5</td>
                <td id="mar 5">5</td>
                <td id="apr 5">5</td>
                <td id="may 5">5</td>
                <td id="jun 5">5</td>
                <td id="jul 5">5</td>
                <td id="aug 5">5</td>
                <td id="sep 5">5</td>
                <td id="oct 5">5</td>
                <td id="nov 5">5</td>
                <td id="dec 5">5</td>
            </tr>
            <tr>
                <td id="jan 6">6</td>
                <td id="feb 6">6</td>
                <td id="mar 6">6</td>
                <td id="apr 6">6</td>
                <td id="may 6">6</td>
                <td id="jun 6">6</td>
                <td id="jul 6">6</td>
                <td id="aug 6">6</td>
                <td id="sep 6">6</td>
                <td id="oct 6">6</td>
                <td id="nov 6">6</td>
                <td id="dec 6">6</td>
            </tr>
            <tr>
                <td id="jan 7">7</td>
                <td id="feb 7">7</td>
                <td id="mar 7">7</td>
                <td id="apr 7">7</td>
                <td id="may 7">7</td>
                <td id="jun 7">7</td>
                <td id="jul 7">7</td>
                <td id="aug 7">7</td>
                <td id="sep 7">7</td>
                <td id="oct 7">7</td>
                <td id="nov 7">7</td>
                <td id="dec 7">7</td>
            </tr>
            <tr>
                <td id="jan 8">8</td>
                <td id="feb 8">8</td>
                <td id="mar 8">8</td>
                <td id="apr 8">8</td>
                <td id="may 8">8</td>
                <td id="jun 8">8</td>
                <td id="jul 8">8</td>
                <td id="aug 8">8</td>
                <td id="sep 8">8</td>
                <td id="oct 8">8</td>
                <td id="nov 8">8</td>
                <td id="dec 8">8</td>
            </tr>
            <tr>
                <td id="jan 9">9</td>
                <td id="feb 9">9</td>
                <td id="mar 9">9</td>
                <td id="apr 9">9</td>
                <td id="may 9">9</td>
                <td id="jun 9">9</td>
                <td id="jul 9">9</td>
                <td id="aug 9">9</td>
                <td id="sep 9">9</td>
                <td id="oct 9">9</td>
                <td id="nov 9">9</td>
                <td id="dec 9">9</td>
            </tr>
            <tr>
                <td id="jan 10">10</td>
                <td id="feb 10">10</td>
                <td id="mar 10">10</td>
                <td id="apr 10">10</td>
                <td id="may 10">10</td>
                <td id="jun 10">10</td>
                <td id="jul 10">10</td>
                <td id="aug 10">10</td>
                <td id="sep 10">10</td>
                <td id="oct 10">10</td>
                <td id="nov 10">10</td>
                <td id="dec 10">10</td>
            </tr>
            <tr>
                <td id="jan 11">11</td>
                <td id="feb 11">11</td>
                <td id="mar 11">11</td>
                <td id="apr 11">11</td>
                <td id="may 11">11</td>
                <td id="jun 11">11</td>
                <td id="jul 11">11</td>
                <td id="aug 11">11</td>
                <td id="sep 11">11</td>
                <td id="oct 11">11</td>
                <td id="nov 11">11</td>
                <td id="dec 11">11</td>
            </tr>
            <tr>
                <td id="jan 12">12</td>
                <td id="feb 12">12</td>
                <td id="mar 12">12</td>
                <td id="apr 12">12</td>
                <td id="may 12">12</td>
                <td id="jun 12">12</td>
                <td id="jul 12">12</td>
                <td id="aug 12">12</td>
                <td id="sep 12">12</td>
                <td id="oct 12">12</td>
                <td id="nov 12">12</td>
                <td id="dec 12">12</td>
            </tr>
            <tr>
                <td id="jan 13">13</td>
                <td id="feb 13">13</td>
                <td id="mar 13">13</td>
                <td id="apr 13">13</td>
                <td id="may 13">13</td>
                <td id="jun 13">13</td>
                <td id="jul 13">13</td>
                <td id="aug 13">13</td>
                <td id="sep 13">13</td>
                <td id="oct 13">13</td>
                <td id="nov 13">13</td>
                <td id="dec 13">13</td>
            </tr>
            <tr>
                <td id="jan 14">14</td>
                <td id="feb 14">14</td>
                <td id="mar 14">14</td>
                <td id="apr 14">14</td>
                <td id="may 14">14</td>
                <td id="jun 14">14</td>
                <td id="jul 14">14</td>
                <td id="aug 14">14</td>
                <td id="sep 14">14</td>
                <td id="oct 14">14</td>
                <td id="nov 14">14</td>
                <td id="dec 14">14</td>
            </tr>
            <tr>
                <td id="jan 15">15</td>
                <td id="feb 15">15</td>
                <td id="mar 15">15</td>
                <td id="apr 15">15</td>
                <td id="may 15">15</td>
                <td id="jun 15">15</td>
                <td id="jul 15">15</td>
                <td id="aug 15">15</td>
                <td id="sep 15">15</td>
                <td id="oct 15">15</td>
                <td id="nov 15">15</td>
                <td id="dec 15">15</td>
            </tr>
            <tr>
                <td id="jan 16">16</td>
                <td id="feb 16">16</td>
                <td id="mar 16">16</td>
                <td id="apr 16">16</td>
                <td id="may 16">16</td>
                <td id="jun 16">16</td>
                <td id="jul 16">16</td>
                <td id="aug 16">16</td>
                <td id="sep 16">16</td>
                <td id="oct 16">16</td>
                <td id="nov 16">16</td>
                <td id="dec 16">16</td>
            </tr>
            <tr>
                <td id="jan 17">17</td>
                <td id="feb 17">17</td>
                <td id="mar 17">17</td>
                <td id="apr 17">17</td>
                <td id="may 17">17</td>
                <td id="jun 17">17</td>
                <td id="jul 17">17</td>
                <td id="aug 17">17</td>
                <td id="sep 17">17</td>
                <td id="oct 17">17</td>
                <td id="nov 17">17</td>
                <td id="dec 17">17</td>
            </tr>
            <tr>
                <td id="jan 18">18</td>
                <td id="feb 18">18</td>
                <td id="mar 18">18</td>
                <td id="apr 18">18</td>
                <td id="may 18">18</td>
                <td id="jun 18">18</td>
                <td id="jul 18">18</td>
                <td id="aug 18">18</td>
                <td id="sep 18">18</td>
                <td id="oct 18">18</td>
                <td id="nov 18">18</td>
                <td id="dec 18">18</td>
            </tr>
            <tr>
                <td id="jan 19">19</td>
                <td id="feb 19">19</td>
                <td id="mar 19">19</td>
                <td id="apr 19">19</td>
                <td id="may 19">19</td>
                <td id="jun 19">19</td>
                <td id="jul 19">19</td>
                <td id="aug 19">19</td>
                <td id="sep 19">19</td>
                <td id="oct 19">19</td>
                <td id="nov 19">19</td>
                <td id="dec 19">19</td>
            </tr>
            <tr>
                <td id="jan 20">20</td>
                <td id="feb 20">20</td>
                <td id="mar 20">20</td>
                <td id="apr 20">20</td>
                <td id="may 20">20</td>
                <td id="jun 20">20</td>
                <td id="jul 20">20</td>
                <td id="aug 20">20</td>
                <td id="sep 20">20</td>
                <td id="oct 20">20</td>
                <td id="nov 20">20</td>
                <td id="dec 20">20</td>
            </tr>
            <tr>
                <td id="jan 21">21</td>
                <td id="feb 21">21</td>
                <td id="mar 21">21</td>
                <td id="apr 21">21</td>
                <td id="may 21">21</td>
                <td id="jun 21">21</td>
                <td id="jul 21">21</td>
                <td id="aug 21">21</td>
                <td id="sep 21">21</td>
                <td id="oct 21">21</td>
                <td id="nov 21">21</td>
                <td id="dec 21">21</td>
            </tr>
            <tr>
                <td id="jan 22">22</td>
                <td id="feb 22">22</td>
                <td id="mar 22">22</td>
                <td id="apr 22">22</td>
                <td id="may 22">22</td>
                <td id="jun 22">22</td>
                <td id="jul 22">22</td>
                <td id="aug 22">22</td>
                <td id="sep 22">22</td>
                <td id="oct 22">22</td>
                <td id="nov 22">22</td>
                <td id="dec 22">22</td>
            </tr>
            <tr>
                <td id="jan 23">23</td>
                <td id="feb 23">23</td>
                <td id="mar 23">23</td>
                <td id="apr 23">23</td>
                <td id="may 23">23</td>
                <td id="jun 23">23</td>
                <td id="jul 23">23</td>
                <td id="aug 23">23</td>
                <td id="sep 23">23</td>
                <td id="oct 23">23</td>
                <td id="nov 23">23</td>
                <td id="dec 23">23</td>
            </tr>
            <tr>
                <td id="jan 24">24</td>
                <td id="feb 24">24</td>
                <td id="mar 24">24</td>
                <td id="apr 24">24</td>
                <td id="may 24">24</td>
                <td id="jun 24">24</td>
                <td id="jul 24">24</td>
                <td id="aug 24">24</td>
                <td id="sep 24">24</td>
                <td id="oct 24">24</td>
                <td id="nov 24">24</td>
                <td id="dec 24">24</td>
            </tr>
            <tr>
                <td id="jan 25">25</td>
                <td id="feb 25">25</td>
                <td id="mar 25">25</td>
                <td id="apr 25">25</td>
                <td id="may 25">25</td>
                <td id="jun 25">25</td>
                <td id="jul 25">25</td>
                <td id="aug 25">25</td>
                <td id="sep 25">25</td>
                <td id="oct 25">25</td>
                <td id="nov 25">25</td>
                <td id="dec 25">25</td>
            </tr>
            <tr>
                <td id="jan 26">26</td>
                <td id="2/26/21">26{(onDay.includes('2/26/2021')) && <FontAwesomeIcon icon={['fas', `star`]} color="gold" size="1x" />}</td>
                <td id="mar 26">26</td>
                <td id="apr 26">26</td>
                <td id="may 26">26</td>
                <td id="jun 26">26</td>
                <td id="jul 26">26</td>
                <td id="aug 26">26</td>
                <td id="sep 26">26</td>
                <td id="oct 26">26</td>
                <td id="nov 26">26</td>
                <td id="dec 26">26</td>
            </tr>
            <tr>
                <td id="jan 27">27</td>
                <td id="feb 27">27</td>
                <td id="mar 27">27</td>
                <td id="apr 27">27</td>
                <td id="may 27">27</td>
                <td id="jun 27">27</td>
                <td id="jul 27">27</td>
                <td id="aug 27">27</td>
                <td id="sep 27">27</td>
                <td id="oct 27">27</td>
                <td id="nov 27">27</td>
                <td id="dec 27">27</td>
            </tr>
            <tr>
                <td id="jan 28">28</td>
                <td id="feb 28">28</td>
                <td id="mar 28">28</td>
                <td id="apr 28">28</td>
                <td id="may 28">28</td>
                <td id="jun 28">28</td>
                <td id="jul 28">28</td>
                <td id="aug 28">28</td>
                <td id="sep 28">28</td>
                <td id="oct 28">28</td>
                <td id="nov 28">28</td>
                <td id="dec 28">28</td>
            </tr>
            <tr>
                <td id="jan 29">29</td>
                <td id="feb 29">29</td>
                <td id="mar 29">29</td>
                <td id="apr 29">29</td>
                <td id="may 29">29</td>
                <td id="jun 29">29</td>
                <td id="jul 29">29</td>
                <td id="aug 29">29</td>
                <td id="sep 29">29</td>
                <td id="oct 29">29</td>
                <td id="nov 29">29</td>
                <td id="dec 29">29</td>
            </tr>
            <tr>
                <td id="jan 30">30</td>
                <td id="feb 30"></td>
                <td id="mar 30">30</td>
                <td id="apr 30">30</td>
                <td id="may 30">30</td>
                <td id="jun 30">30</td>
                <td id="jul 30">30</td>
                <td id="aug 30">30</td>
                <td id="sep 30">30</td>
                <td id="oct 30">30</td>
                <td id="nov 30">30</td>
                <td id="dec 30">30</td>
            </tr>
            <tr>
                <td id="jan 31">31</td>
                <td id="feb 31"></td>
                <td id="mar 31">31</td>
                <td id="apr 31"></td>
                <td id="may 31">31</td>
                <td id="jun 31"></td>
                <td id="jul 31">31</td>
                <td id="aug 31">31</td>
                <td id="sep 31"></td>
                <td id="oct 31">31</td>
                <td id="nov 31"></td>
                <td id="dec 31">31</td>
            </tr>
        </tbody>
    </table>)

    return (
        <>
            <button onClick={() => { checkCompletion() }}>gimme the days</button>
            <br />
            <button onClick={()=>{setYear(year-1)}}>{"<"}</button>
            <h1>{year}</h1>
            <button onClick={()=>{setYear(Number(year)+1)}}>{">"}</button>
            {/* {everyDayTable} */}
            {renderDay(jan, 'January')}
            {renderDay(feb, 'February')}{(isLeapYear(year) === true) && <div className={`February 29 ${year}`}>29</div>}
            {renderDay(mar, 'March')}
            {renderDay(apr, 'April')}
            {renderDay(may, 'May')}
            {renderDay(jun, 'June')}
            {renderDay(jul, 'July')}
            {renderDay(aug, 'August')}
            {renderDay(sep, 'September')}
            {renderDay(oct, 'October')}
            {renderDay(nov, 'November')}
            {renderDay(dec, 'December')}
        </>
    )
}

export default Calendar;