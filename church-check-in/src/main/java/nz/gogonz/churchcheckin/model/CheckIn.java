package nz.gogonz.churchcheckin.model;


import jakarta.persistence.*;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "checkin")
public class CheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "person_id")
    private long personId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "check_in_time")
    private Timestamp checkInTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "check_out_time")
    private Timestamp checkOutTime;

    public CheckIn() {
    }

    public CheckIn(long personId, Timestamp checkInTime, Timestamp checkOutTime) {
        this.id = id;
        this.personId = personId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPersonId() {
        return personId;
    }

    public void setPersonId(long personId) {
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

    @Override
    public String toString() {
        return "CheckIn{" +
                "id=" + id +
                ", personId=" + personId +
                ", checkInTime=" + checkInTime +
                ", checkOutTime=" + checkOutTime +
                '}';
    }
}
