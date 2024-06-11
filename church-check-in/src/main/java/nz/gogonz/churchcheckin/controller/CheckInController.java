package nz.gogonz.churchcheckin.controller;

import nz.gogonz.churchcheckin.dto.*;
import nz.gogonz.churchcheckin.model.CheckIn;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.service.CheckInService;
import nz.gogonz.churchcheckin.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CheckInController {
    private final CheckInService checkInService;

    public CheckInController(@Autowired CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @GetMapping("/checkin/all")
    public ResponseEntity<List<CheckInResult>> getAllCheckIns() {
        try {
            List<CheckInResult> checkIns = checkInService.findAllAsResult();

            return new ResponseEntity<>(checkIns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkin/date/{date}")
    public ResponseEntity<List<CheckInResult>> getCheckInsByDate(@PathVariable String date) {
        try {
            String[] dateParts = date.split("-");
            int year = Integer.parseInt(dateParts[0]);
            int month = Integer.parseInt(dateParts[1]) - 1;
            int day = Integer.parseInt(dateParts[2]);

            List<CheckInResult> checkIns = checkInService.findByDate(year, month, day);

            return new ResponseEntity<>(checkIns, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkin/date/range/{start}/{end}")
    public ResponseEntity<List<CheckInResult>> getCheckInsByDateRange(@PathVariable String start, @PathVariable String end) {
        try {
            String[] startParts = start.split("-");
            int startYear = Integer.parseInt(startParts[0]);
            int startMonth = Integer.parseInt(startParts[1]) - 1;
            int startDay = Integer.parseInt(startParts[2]);

            String[] endParts = end.split("-");
            int endYear = Integer.parseInt(endParts[0]);
            int endMonth = Integer.parseInt(endParts[1]) - 1;
            int endDay = Integer.parseInt(endParts[2]);

            List<CheckInResult> checkIns = checkInService.findByDateRange(startYear, startMonth, startDay, endYear, endMonth, endDay);

            return new ResponseEntity<>(checkIns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkin/notcheckedout")
    public ResponseEntity<List<CheckInResult>> getNotCheckedOut() {
        try {
            List<CheckInResult> checkIns = checkInService.findAllByCheckOutTimeIsNull();

            return new ResponseEntity<>(checkIns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkin/checkin")
    @ResponseBody
    public ResponseEntity<CheckIn> checkIn(@RequestBody CheckInRequest checkInRequest) {
        try {
            CheckIn checkIn = checkInService.save(checkInRequest);

            return new ResponseEntity<>(checkIn, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkin/checkout")
    @ResponseBody
    public ResponseEntity<CheckIn> checkOut(@RequestBody CheckInRequest checkOutRequest) {
        try {
            CheckIn checkIn = checkInService.checkout(checkOutRequest.getPersonId(), checkOutRequest.getCheckOutTime());

            return new ResponseEntity<>(checkIn, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

