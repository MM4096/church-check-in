package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.model.Token;
import nz.gogonz.churchcheckin.repo.TokenRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.List;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(TokenService.class);
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

    public TokenService(@Autowired TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public void invalidate(String token) {
        tokenRepository.findAllByToken(token).forEach(t -> {
            t.setValid(false);
            tokenRepository.save(t);
        });
    }

    public boolean isValid(String token) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        logger.info("Current time: {}", new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(now));
        for (Token t : tokenRepository.findAllByToken(token)) {
            logger.info("Token expiry date: {}", new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(t.getExpiryDate()));
        }

        return !tokenRepository.findByTokenAndIsValidIsTrueAndExpiryDateAfter(token, now).isEmpty();
    }

    public void createToken(long adminId, String token, Timestamp expiryDate) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        tokenRepository.save(new Token(adminId, now, expiryDate, token, true));
    }

    public String createToken(long adminId, Timestamp expiryDate) {
        String token = generateToken();
        logger.info("Generated token: {}", token);
        createToken(adminId, token, expiryDate);
        return token;
    }

    public boolean hasActiveToken(long adminId) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        return !tokenRepository.findByAdminIdAndIsValidIsTrueAndExpiryDateAfter(adminId, now).isEmpty();
    }

    public String generateToken() {
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }
}
