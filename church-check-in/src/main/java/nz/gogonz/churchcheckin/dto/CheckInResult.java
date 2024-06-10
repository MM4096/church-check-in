package nz.gogonz.churchcheckin.dto;

import nz.gogonz.churchcheckin.model.Person;

import java.sql.Time;
import java.sql.Timestamp;

public class CheckInResult {
    private Person person;
    private Timestamp checkInTime;
    private Timestamp checkOutTime;

    public CheckInResult() {
    }

    public CheckInResult(Person person, Timestamp checkInTime, Timestamp checkOutTime) {
        this.person = person;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Timestamp getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(Timestamp checkInTime) {
        this.checkInTime = checkInTime;
    }

    public Timestamp getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(Timestamp checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
}
