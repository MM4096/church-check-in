package nz.gogonz.churchcheckin.service;


import at.favre.lib.crypto.bcrypt.BCrypt;
import nz.gogonz.churchcheckin.model.User;
import nz.gogonz.churchcheckin.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(@Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean exists(String username) {
        return !userRepository.findByUsername(username).isEmpty();
    }

    public String generateHash(String password) {
        BCrypt.Hasher hasher = BCrypt.withDefaults();
        return hasher.hashToString(12, password.toCharArray());
    }

    public boolean compareHashes(String password, String hash) {
        BCrypt.Verifyer verifyer = BCrypt.verifyer();
        return verifyer.verify(password.toCharArray(), hash).verified;
    }

    public boolean usernamePasswordCorrect(String username, String password) {
        User user = userRepository.findByUsername(username).get(0);
        return compareHashes(password, user.getPasswordHash());
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).get(0);
    }

    public void createUser(String username, String password) {
        if (exists(username)) {
            throw new IllegalArgumentException("User already exists!");
        }
        User user = new User(username, "", generateHash(password));
        userRepository.save(user);
    }
}
