package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.CheckInResult;
import nz.gogonz.churchcheckin.model.CheckIn;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.repo.TestConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class CheckInServiceTest {
    @Autowired
    private CheckInService checkInService;

    @Test
    void findAll() {
    }

    @Test
    void findByDateBetween() {
        List<CheckInResult> result = checkInService.findByDate(2020, 0, 11);
        assertFalse(result.isEmpty());
    }
}