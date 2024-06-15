package nz.gogonz.churchcheckin.system;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nz.gogonz.churchcheckin.ChurchCheckInApplication;
import nz.gogonz.churchcheckin.service.TokenService;
import nz.gogonz.churchcheckin.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

public class RequestInterceptor implements HandlerInterceptor {
    private final UserService userService;
    private final TokenService tokenService;

    Logger logger = LoggerFactory.getLogger(RequestInterceptor.class);

    public RequestInterceptor(@Autowired UserService userService, @Autowired TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        logger.info("--------------------");
        logger.info("API request: {}", uri);
        // check for uri containing "api"
        if (uri.contains("/api/v1")) {
            // check for token
            Cookie cookie = WebUtils.getCookie(request, "token");
            if (cookie != null) {
                String token = cookie.getValue();
                if (token != null) {
                    boolean isValid = tokenService.isValid(token);
                    if (!isValid) {
                        logger.info("Invalid token: {}", token);
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        return false;
                    }
                }
                else {
                    logger.info("Token value was null found");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }
            }
            else {
                logger.info("No token found");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }

        }

        logger.info("Request allowed");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
