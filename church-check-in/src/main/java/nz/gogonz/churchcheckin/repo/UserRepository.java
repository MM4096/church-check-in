package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findById(long id);
    List<User> findByUsername(String username);
    List<User> findByUsernameAndPasswordHash(String username, String passwordHash);
}
