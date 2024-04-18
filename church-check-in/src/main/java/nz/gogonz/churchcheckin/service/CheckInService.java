package nz.gogonz.churchcheckin.service;


import nz.gogonz.churchcheckin.dto.CheckInRequest;
import nz.gogonz.churchcheckin.dto.CheckInResult;
import nz.gogonz.churchcheckin.model.CheckIn;
import nz.gogonz.churchcheckin.repo.CheckInRepository;
import nz.gogonz.churchcheckin.repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Service
public class CheckInService {
    private final CheckInRepository checkInRepository;
    private final PersonRepository personRepository;

    public CheckInService(@Autowired CheckInRepository checkInRepository, @Autowired PersonRepository personRepository) {this.checkInRepository = checkInRepository; this.personRepository = personRepository;}

    public List<CheckIn> findAll() {return checkInRepository.findAll();}

    public List<CheckInResult> findAllAsResult() {
        return toResult(checkInRepository.findAll());
    }

    public List<CheckInResult> findByDate(Date date) {
        return toResult(checkInRepository.findAllByCheckInTime(date));
    }

    public List<CheckInResult> findByDate(int year, int month, int day) {
        Date date = new Timestamp(new GregorianCalendar(year, month, day).getTimeInMillis());
        Date nextDay = new Date(date.getTime() + (1000 * 60 * 60 * 24));
        return toResult(checkInRepository.findAllByCheckInTimeBetween(date, nextDay));
    }

    public List<CheckInResult> toResult(List<CheckIn> list) {
        try {
            List<CheckInResult> result = new ArrayList<>();
            for (CheckIn c : list) {
                Timestamp checkInTime = c.getCheckInTime();
                Timestamp checkOutTime = c.getCheckOutTime();
                result.add(new CheckInResult(personRepository.findById(c.getPersonId()), checkInTime, checkOutTime));
            }

            return result;
        }
        catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public CheckIn save(CheckInRequest request) {
        CheckIn checkIn = new CheckIn(request.getPersonId(), request.getCheckInTime(), request.getCheckOutTime());
        return checkInRepository.save(checkIn);
    }

    public CheckIn checkout(Long personId, Timestamp checkOutTime) {
        // Find the CheckIn entry with the given personId that has a null checkOutTime
        CheckIn checkIn = checkInRepository.findByPersonIdAndCheckOutTimeIsNull(personId);
        if (checkIn != null) {
            // Update the checkOutTime
            checkIn.setCheckOutTime(checkOutTime);
            // Save the updated CheckIn entry back to the database
            return checkInRepository.save(checkIn);
        } else {
            // Handle the case where no matching CheckIn entry was found
            throw new RuntimeException("No active check-in found for personId: " + personId);
        }
    }

    public List<CheckInResult> findAllByCheckOutTimeIsNull() {
        List<CheckIn> all = checkInRepository.findAll();
        List<CheckIn> result = new ArrayList<>();
        for (CheckIn c : all) {
            if (c.getCheckOutTime() == null) {
                result.add(c);
            }
        }
        return toResult(result);
//        return toResult(checkInRepository.findAllByCheckOutTimeIsNull());
    }
}
