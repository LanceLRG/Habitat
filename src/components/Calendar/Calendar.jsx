import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Calendar.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Calendar() {

    const dispatch = useDispatch();
    const store = useSelector(store => store)
    const jan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    let feb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
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

    let d = new Date();
    const [year, setYear] = useState(d.getFullYear())



    const isLeapYear = (year) => {
        if (year % 400 === 0) {
            feb.push(29);
            return renderDay(feb, 2, 'February');
        } else if (year % 100 === 0) {
            return renderDay(feb, 2, 'February');
        } else if (year % 4 === 0) {
            feb.push(29)
            return renderDay(feb, 2, 'February');
        } else {
            return renderDay(feb, 2, 'February');
        }
    }

    const renderDay = (month, monthNum, monthName) => month.map((day) => {
    
        let star = <FontAwesomeIcon className="star" icon={['fas', `star`]} opacity=".2" size="1x" />;
        
    for (let entry of store.primaryHistory) {
        if((moment(entry.date).format('l') === `${monthNum}/${day}/${year}`) && entry.complete){
            star = <FontAwesomeIcon className="star" icon={['fas', `star`]} opacity="1" color="#ffbb3e" size="1x" />;
        }
    };

    return(
    <div className={`date`}>{day}{star}</div>)})

    useEffect(() => {
        dispatch({ type: 'FETCH_PRIMARY' });
    }, [])

    return (
        <>
            <Container fluid="md" >
                <Row>
                    <div id="year-bar">
                        <button onClick={() => { setYear(year - 1) }}><FontAwesomeIcon icon={['fas', 'chevron-left']} size="2x" /></button>
                        <h1>{year}</h1>
                        <button onClick={() => { setYear(Number(year) + 1) }}><FontAwesomeIcon icon={['fas', 'chevron-right']} size="2x" /></button>
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={"auto"}>
                        <h4>jan</h4>
                        {store.primaryHistory[0] && renderDay(jan, 1, 'January')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>feb</h4>
                        {store.primaryHistory[0] && isLeapYear(year)}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>mar</h4>
                        {store.primaryHistory[0] && renderDay(mar, 3, 'March')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>apr</h4>
                        {store.primaryHistory[0] && renderDay(apr, 4, 'April')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>may</h4>
                        {store.primaryHistory[0] && renderDay(may, 5, 'May')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>jun</h4>
                        {store.primaryHistory[0] && renderDay(jun, 6, 'June')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>jul</h4>
                        {store.primaryHistory[0] && renderDay(jul, 7, 'July')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>aug</h4>
                        {store.primaryHistory[0] && renderDay(aug, 8, 'August')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>sep</h4>
                        {store.primaryHistory[0] && renderDay(sep, 9, 'September')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>oct</h4>
                        {store.primaryHistory[0] && renderDay(oct, 10, 'October')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>nov</h4>
                        {store.primaryHistory[0] && renderDay(nov, 11, 'November')}
                    </Col>
                    <Col xs={"auto"}>
                        <h4>dec</h4>
                        {store.primaryHistory[0] && renderDay(dec, 12, 'December')}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Calendar;