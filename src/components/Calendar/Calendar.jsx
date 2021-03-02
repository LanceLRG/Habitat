import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import './Calendar.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        if (year % 400 === 0) {
            return true;
        } else if (year % 100 === 0) {
            return false;
        } else if (year % 4 === 0) {
            return true;
        } else {
            return false;
        }
    }

    const renderDay = (month, monthNum, monthName) => month.map((day) => {
    
        let star = <FontAwesomeIcon className="star" icon={['fas', `star`]} opacity=".2" size="2x" />;
    // for (let date of store.primaryHistory) {
    //     if((moment(date.date).format('l') === `${monthNum}/${day}/${year}`) && date.complete){
    //         star = <FontAwesomeIcon className="star" icon={['fas', `star`]} opacity="1" color="gold" size="2x" />;
    //     }
    // };
    return(
    <div className={`date ${monthName} ${day} ${year}`}>{day}{star}</div>)})

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

    return (
        <>
            <Container fluid="md" >
                <Row>
                    <div id="year-bar">
                        {/* <button onClick={() => { checkCompletion() }}>gimme the days</button>
                    <br /> */}
                        <button onClick={() => { setYear(year - 1) }}><FontAwesomeIcon icon={['fas', 'chevron-left']} size="2x" /></button>
                        <h1>{year}</h1>
                        <button onClick={() => { setYear(Number(year) + 1) }}><FontAwesomeIcon icon={['fas', 'chevron-right']} size="2x" /></button>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    {/* <h2>jan feb mar apr may jun jul aug sep oct nov dev</h2> */}
                    <Col xs={"auto"}>
                        <h4>jan</h4>
                        {renderDay(jan, 1, 'January')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>feb</h4>
                        {renderDay(feb, 2, 'February')}{(isLeapYear(year)) && <div className={`date February 29 ${year}`}>29</div>}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>mar</h4>
                        {renderDay(mar, 3, 'March')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>apr</h4>
                        {renderDay(apr, 4, 'April')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>may</h4>
                        {renderDay(may, 5, 'May')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>jun</h4>
                        {renderDay(jun, 6, 'June')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>jul</h4>
                        {renderDay(jul, 7, 'July')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>aug</h4>
                        {renderDay(aug, 8, 'August')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>sep</h4>
                        {renderDay(sep, 9, 'September')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>oct</h4>
                        {renderDay(oct, 10, 'October')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>nov</h4>
                        {renderDay(nov, 11, 'November')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>dec</h4>
                        {renderDay(dec, 12, 'December')}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Calendar;