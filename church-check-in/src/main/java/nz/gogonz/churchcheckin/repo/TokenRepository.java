package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.Token;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface TokenRepository extends CrudRepository<Token, Long> {
    Token findById(long id);
    List<Token> findAllByToken(String token);
    List<Token> findAllByAdminId(long adminId);
    List<Token> findByTokenAndIsValid(String token, boolean isValid);
    List<Token> findByTokenAndIsValidIsTrueAndExpiryDateAfter(String token, Timestamp expiryDate);
    List<Token> findByAdminIdAndIsValidIsTrueAndExpiryDateAfter(long adminId, Timestamp expiryDate);
}
