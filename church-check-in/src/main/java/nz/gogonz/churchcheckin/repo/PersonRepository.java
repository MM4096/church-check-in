package nz.gogonz.churchcheckin.repo;

import java.util.List;

import nz.gogonz.churchcheckin.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {
    List<Person> findByFirstname(String name);
    List<Person> findAll();

    Person findById(long id);

    List<Person> findByFirstnameIgnoreCaseLikeOrLastnameIgnoreCaseLike(String firstName, String lastName);

    List<Person> findByFirstnameIgnoreCaseLikeAndLastnameIgnoreCaseLike(String firstName, String lastName);

    List<Person> findByFirstnameIgnoreCaseOrLastnameIgnoreCase(String firstName, String lastName);

    List<Person> findByFirstnameLike(String name);

    List<Person> findByLastnameLike(String name);

    List<Person> findByFirstnameIgnoreCaseAndLastnameIgnoreCase(String firstname, String lastname);
}