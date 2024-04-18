package nz.gogonz.churchcheckin.repo;


import nz.gogonz.churchcheckin.model.CheckIn;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CheckInRepository extends CrudRepository<CheckIn, Long> {
    List<CheckIn> findAll();

    List<CheckIn> findAllByCheckInTime(Date checkInTime);

    List<CheckIn> findAllByCheckInTimeBetween(Date start, Date end);

    CheckIn findByPersonIdAndCheckOutTimeIsNull(Long id);

    List<CheckIn> findAllByCheckOutTimeIsNull();

//    List<CheckIn> findAllByCheckInDate(Date checkInDate);
}
