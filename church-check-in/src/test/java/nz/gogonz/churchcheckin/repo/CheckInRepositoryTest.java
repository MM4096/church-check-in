package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.CheckIn;
import nz.gogonz.churchcheckin.model.Person;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertFalse;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class CheckInRepositoryTest {
    @Autowired
    private CheckInRepository checkInRepository;

    @Test
    public void findAll() {
        List<CheckIn> result = checkInRepository.findAll();
//        for (CheckIn checkIn : result) {
//            System.out.println(checkIn);
//            System.out.println((checkIn.getCheckInTime().getClass()));
//        }
        assertFalse(result.isEmpty());
    }

    @Test
    public void findAllByCheckInTime() {
        // Define the start and end dates for the range
        Date startDate = new Timestamp(new GregorianCalendar(2000, Calendar.JANUARY, 1).getTimeInMillis());
        Date endDate = new Timestamp(new GregorianCalendar(2025, Calendar.DECEMBER, 31).getTimeInMillis());

        // Call the function with the defined range
        List<CheckIn> result = checkInRepository.findAllByCheckInTimeBetween(startDate, endDate);

        assertFalse(result.isEmpty());
    }


//    @Test
//    public void findAllByCheckInDate() {
//        Date checkInDate = new Timestamp(new GregorianCalendar(2021, Calendar.JANUARY, 1).getTimeInMillis());
//        List<CheckIn> result = checkInRepository.findAllByCheckInTime(checkInDate);
//        assertFalse(result.isEmpty());
//    }
}