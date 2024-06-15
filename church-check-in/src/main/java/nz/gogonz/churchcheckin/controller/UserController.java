package nz.gogonz.churchcheckin.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import nz.gogonz.churchcheckin.model.User;
import nz.gogonz.churchcheckin.service.TokenService;
import nz.gogonz.churchcheckin.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Objects;

@RestController
@RequestMapping("")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final TokenService tokenService;

    public UserController(@Autowired UserService userService, @Autowired TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @GetMapping("/user/authenticate")
    public ResponseEntity<Boolean> authenticate(HttpServletResponse response, @RequestParam("username") String username, @RequestParam("password") String password) {
        if (userService.usernamePasswordCorrect(username, password)) {
            User thisUser = userService.getUser(username);
            // token expiry set to 1 day
            Timestamp expiryDate = new Timestamp(System.currentTimeMillis() + 1000 * 60 * 60 * 24);
            String token = tokenService.createToken(thisUser.getId(), expiryDate);
            Cookie cookie = new Cookie("token", token);
            cookie.setAttribute("SameSite", "None");
            cookie.setMaxAge(60 * 60 * 24);
            cookie.setPath("/");
            response.addCookie(cookie);

            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("api/v1/user/create")
    public ResponseEntity<Boolean> createUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        try {
            userService.createUser(username, password);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/logout")
    public ResponseEntity<Boolean> logout(@CookieValue(value = "token", defaultValue = "") String token, HttpServletResponse response) {
        if (Objects.equals(token, "")) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        try {
            tokenService.invalidate(token);
            Cookie cookie = new Cookie("token", "");
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/check_token")
    public ResponseEntity<Boolean> checkToken(@CookieValue(value = "token", defaultValue = "") String token) {
        if (Objects.equals(token, "")) {
            logger.info("No token found");
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
        try {
            logger.info("Checking token: {}", token);
            return new ResponseEntity<>(tokenService.isValid(token), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
