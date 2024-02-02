package nz.gogonz.churchcheckin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "Welcome to Church Check In!";
    }
}
