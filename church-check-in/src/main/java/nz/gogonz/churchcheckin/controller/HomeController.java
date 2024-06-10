package nz.gogonz.churchcheckin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "Hello, World!";
    }

    @RequestMapping("/error")
    public String error() {
        return "404 - Resource Not Found";
    }
}
