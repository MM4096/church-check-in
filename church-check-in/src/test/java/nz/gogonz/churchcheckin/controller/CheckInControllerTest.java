package nz.gogonz.churchcheckin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import nz.gogonz.churchcheckin.dto.CheckInRequest;
import nz.gogonz.churchcheckin.dto.CheckInResult;
import nz.gogonz.churchcheckin.model.CheckIn;
import nz.gogonz.churchcheckin.repo.CheckInRepository;
import nz.gogonz.churchcheckin.repo.TestConfiguration;
import nz.gogonz.churchcheckin.service.CheckInService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class CheckInControllerTest {
    @Autowired
    private CheckInService checkInService;
    @Autowired
    private CheckInController checkInController;

    @Test
    public void newCheckIn() throws JsonProcessingException {
        CheckIn result = checkInService.save(new CheckInRequest(1L, new Timestamp(2020, 1, 1, 10, 10, 10, 10), new Timestamp(2020, 1, 1, 10, 10, 10, 10)));
        ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String resultJson = objectWriter.writeValueAsString(result);
        assertNotNull(result);
    }

    @Test
    public void getCheckInsByDate() {
        List<CheckInResult> result = checkInController.getCheckInsByDate("2020-01-11").getBody();
        assertNotNull(result);
    }
}