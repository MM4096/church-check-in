package nz.gogonz.churchcheckin.config;

import nz.gogonz.churchcheckin.service.TokenService;
import nz.gogonz.churchcheckin.service.UserService;
import nz.gogonz.churchcheckin.system.RequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final TokenService tokenService;
    private final UserService userService;

    public WebConfig(@Autowired TokenService tokenService, @Autowired UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }


//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("*")
//                .allowedHeaders("*");
//    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestInterceptor(userService, tokenService));
    }
}
