package nz.gogonz.churchcheckin.dto;

import nz.gogonz.churchcheckin.model.Person;

import java.sql.Timestamp;

public class CheckInRequest {
    private Long personId;
    private Timestamp checkInTime;
    private Timestamp checkOutTime;

    public CheckInRequest() {
    }

    public CheckInRequest(Long personId, Timestamp checkInTime, Timestamp checkOutTime) {
        this.personId = personId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
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
